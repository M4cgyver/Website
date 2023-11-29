import cheerio from "cheerio";
import fs, { ReadPosition } from "fs";
import { Readable, ReadableOptions } from "stream";
import url from "url";
import * as promises from 'node:fs/promises';

export type WarcIndexEntry = { uri: string; file: string; offset: number };
 
interface StreamOptions {
    flags?: string | undefined;
    encoding?: BufferEncoding | undefined;
    fd?: number | promises.FileHandle | undefined;
    mode?: number | undefined;
    autoClose?: boolean | undefined;
    /**
     * @default false
     */
    emitClose?: boolean | undefined;
    start?: number | undefined;
    highWaterMark?: number | undefined;
}
interface ReadStreamOptions extends StreamOptions {
    end?: number | undefined;
}

function streamFile(path: string, options?: ReadStreamOptions): ReadableStream<Uint8Array> {
    const downloadStream = fs.createReadStream(path, options);

    return new ReadableStream({
        start(controller) {
            downloadStream.on("data", (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
            downloadStream.on("end", () => controller.close());
            downloadStream.on("error", (error: NodeJS.ErrnoException) => controller.error(error));
        },
        cancel() {
            downloadStream.destroy();
        },
    });
} 

/**
 * Helper function that splits a buffer on "\r\n\r\n" and returns an array of objects
 * where each object contains a header and its offset in the buffer
 * @param {Buffer} buffer - The buffer to split
 * @returns {Array} An array of objects where each object has a header and an offset property
 */
export const helperSplitBuffer = (buffer: Buffer) => {

    const newlinePattern = /\r?\n\r?\n/g; // pattern for 2 or more newlines
    let startIndex = 0;
    let matches = [];
    let match;

    while ((match = newlinePattern.exec(buffer.toString())) !== null) {
        const offset = match.index;
        const subbuffer = buffer.slice(startIndex, offset);
        matches.push({ header: subbuffer, offset });
        startIndex = offset + match[0].length;
    }

    if (startIndex < buffer.length) {
        const offset = startIndex;
        const subbuffer = buffer.slice(startIndex);
        matches.push({ header: subbuffer, offset });
    }

    return matches;
};

/**
 * Helper function that parses a WARC or HTTP header and returns an object with the key-value pairs
 * @param {object} header - The header object to parse
 * @returns {object} An object with the key-value pairs of the header
 */
export const helperParseHeaders = (header: Buffer) => {
    if (!header) return {};

    const buffer = header;
    const headerPattern = /^([^\s:]+)\s*:\s*(.+)$/gm;
    let headers: HeadersInit = {};
    let match;

    while ((match = headerPattern.exec(buffer.toString())) !== null) {
        headers[match[1]] = match[2];
    }

    const statusPattern = /HTTP\/\d\.\d\s+(\d+)\s+(.*)/i;
    const statusMatch = buffer.toString().trim().match(statusPattern);

    if (statusMatch) headers["status"] = statusMatch[1];


    return headers;
};

/**
 * Reads a WARC file and returns an object with the offsets of each WARC entry in the file
 * @param {string} filedir - The path of the WARC file to read
 * @param {CallableFunction} callback - action
 * @returns {Object} An object where the keys are the WARC-Target-URI values and the values are the offsets of the WARC entries in the file
 */
export const warcIndexFilesCallback = async (filedir: string, callback: CallableFunction) => {
    // Allocate the buffer and position
    const bufferTemp = Buffer.alloc(1);
    const fileBufferSize = 1024 * 2;
    const fileBuffer = Buffer.alloc(fileBufferSize);
    const fileHandle = fs.openSync(filedir, 'r');
    let filePosition = 0;
    const fileStats = fs.statSync(filedir);

    // Read all of the WARC entries
    while (filePosition < fileStats.size) {
        fileBuffer.fill(0);
        fs.readSync(fileHandle, fileBuffer, 0, Math.min(fileBufferSize, fileStats.size), filePosition);

        const headers = helperSplitBuffer(fileBuffer);
        const headerWarc = helperParseHeaders(headers[0]?.header);
        const headerHTTP = helperParseHeaders(headers[1]?.header);

        //if(headerWarc["WARC-Type"]?.trim() === "request") warcFiles[headerWarc["WARC-Target-URI"]] = filePosition;
        if (headerWarc["WARC-Type"] === "response")
        { 
            await callback({ headerWarc: headerWarc, headerHTTP: headerHTTP, file: filedir, offset: filePosition })
        }

        filePosition += parseInt(headerWarc["Content-Length"]) + headers[0].header.length + 6;
    }

    // Close the file
    fs.closeSync(fileHandle);
}; 

export const warcRequestUri = (file: string, offset: bigint): Response => {
    const fileBuffer = Buffer.alloc(2048);
    const fileHandle = fs.openSync(file, 'r');

    fs.readSync(fileHandle, fileBuffer, 0, fileBuffer.length, offset);

    const headers = helperSplitBuffer(fileBuffer);
    const headerWARC = helperParseHeaders(headers[0]?.header);
    const headerHTTP = helperParseHeaders(headers[1]?.header);

    switch ((headerHTTP["Transfer-Encoding"] || headerHTTP["transfer-encoding"])) {
        case "chunked": //fuck me
        
            //Method 1: create chunks and read them all
            const chunks: Array<Buffer> = new Array<Buffer>();
            let chunkOffset: bigint = BigInt(0);

            do {
                /// Get the chunk size
                //console.log("NEW CHUNK")
                const chunkSizeBuffer: Buffer = Buffer.alloc(32);
                //console.log("chunkSizeBuffer", chunkSizeBuffer.toString())
                
                fs.readSync(fileHandle, 
                                chunkSizeBuffer, 
                                0, 
                                chunkSizeBuffer.length, 
                                offset + chunkOffset + BigInt(headers[1].offset + 4));

                const chunkSizeHex: string = chunkSizeBuffer.toString().split('\r\n', 2)[0];
                //console.log("chunkSizeHex", chunkSizeHex);
                const chunkSize: number = parseInt('0x' + chunkSizeHex);

                if (chunkSize == 0) break;

                /// Get the chunk
                const chunk = Buffer.alloc(chunkSize);
                //Why did this work?
                //fs.readSync(fileHandle, chunkSizeBuffer, 0, chunkSize, offset + chunkOffset + BigInt(headers[1].offset + 4 + chunkSizeHex.length+4));
                fs.readSync(fileHandle, chunk, 0, chunk.length, offset + chunkOffset + BigInt(headers[1].offset + 4 + chunkSizeHex.length + 2));

                chunkOffset += BigInt(chunkSizeHex.length + 4 + chunkSize)

                ////console.log("New chunkOffset", chunkOffset)

                chunks.push(chunk);

            } while (true);

            ////console.log("Complete!")

            const buffer = Buffer.concat(chunks);

            ////console.log("DONE", headerHTTP["Content-Type"])
 
            return new Response(buffer, { status: parseInt(headerHTTP["status"]), headers: { "Content-Type": (headerHTTP["Content-Type"] || headerHTTP["content-type"]) } });

        default:
            const uriSize = parseInt(headerHTTP["Content-Length"] || headerHTTP["content-length"]);
            const uriBuffer = Buffer.alloc(uriSize);

            const bufferStart = offset + BigInt(headers[1].offset + 4);
            const bufferEnd = bufferStart + BigInt(uriSize);
            fs.closeSync(fileHandle);

            //fs.readSync(fileHandle, uriBuffer, 0, uriSize, bufferStart);
            //fs.closeSync(fileHandle);
 
            const stream = streamFile(file, {highWaterMark: 1024*4, start: Number(offset) + headers[1].offset + 4, end: Number(bufferEnd)})
            
            return new Response(stream, { status: parseInt(headerHTTP["status"]), headers: { "Content-Type": headerHTTP["Content-Type"], "Location": headerHTTP["Location"], "ETag": headerHTTP["ETag"] } });
    }
};

/**
 * Processes the Response object, resolving and modifying resource URLs in the HTML or CSS content.
 * @param {Response} request - The Response object containing the HTML or CSS content to process.
 * @param {CallableFunction} resolve - A function to resolve the URLs of the resources.
 * @returns {Promise<Response>} A Promise that resolves to a modified Response object with updated resource URLs.
 */
export const warcRedirectBlob = async (request: Response, resolve: CallableFunction) => {
    ////console.log("TYPE", request.headers.get("Content-Type"), request.headers.get("content-type"), request.headers); 

    const parseCss = (csss: string) => {
        let cssString = csss;
        const urlRegex = /url\((.*?)\)/g;
        const matches = cssString.match(urlRegex);

        if (matches) {
            for (const match of matches) {
                const urlRaw = match.substring(4, match.length - 1).replace(/"/g, '');
                const isBase64 = urlRaw.startsWith('data:');

                if (!isBase64) {
                    const resolvedUrl = resolve(urlRaw.replace("'", "").replace("'", ""));
                    cssString = cssString.replace(urlRaw, resolvedUrl);
                }
            }
        }

        return cssString;
    }

    const contentType = (request.headers.get("Content-Type") ?? request.headers.get("content-type"))?.split(';', 2)[0];

    switch (contentType) {
        case "text/html":
            const $ = cheerio.load(await request.text());

            // Replace the resource `image.png` with `redirect/image.png`
            $('img, script, link, a, iframe').each(function () {
                const link = $(this).attr('src') || $(this).attr('href');
                if (!link) return;

                const resolved = resolve(link);

                ////console.log("RESOLVED", resolved)

                $(this).attr('src', resolved);
                $(this).attr('href', resolved);
            });


            // Parse style elements
            $('style').each(function () {
                const cssString = $(this).html();
                const parsedCss = parseCss(cssString ?? "");
                $(this).html(parsedCss);
            });

            return new Response($.html(), { headers: request.headers, status: request.status });

        case "text/css":
            let cssString = (await request.text());

            return new Response(await parseCss(cssString), { headers: request.headers, status: request.status });

        default:
            ////console.log("TYPE", request.headers.get("Content-Type")); 
            return request;
    }
}
