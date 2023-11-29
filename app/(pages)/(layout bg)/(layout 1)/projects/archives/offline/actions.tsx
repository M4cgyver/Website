import cheerio from 'cheerio';
import replaceAsync from "string-replace-async";

export interface WarcRecord {
    file: File;
    status: number;
    datetime?: Date;
    pragma?: string;
    server?: string;
    setCookie?: string;
    contentType?: string;
    lastModified?: Date;
    contentSecurityPolicy?: string;
    eTag?: string;
    location?: string;
    warcType?: string;
    warcRecordID?: string;
    warcWarcinfoID?: string;
    warcConcurrentTo?: string;
    warcTargetURI?: string;
    warcDate?: Date;
    warcIpAddress?: string;
    warcOffset: string; // Convert BigInt to string
    httpOffset: number;
}

export function parseDate(dateString: string) {
    const parsedDate: Date = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
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
 * Parse and index a given .warc `File`.
 * @param {File} file - The file to parse
 * @param {CallableFunction} callback - The header object to parse
 */
export const warcIndexFilesCallback = async (file: File, callback: CallableFunction) => {
    // Allocate the buffer and position 
    const fileBufferSize = 1024 * 2;
    let filePosition = 0;
    const fileSize = file.size;

    // Read all of the WARC entries
    while (filePosition < fileSize) {

        //fs.readSync(fileHandle, fileBuffer, 0, Math.min(fileBufferSize, fileSize), filePosition);
        const fileBuffer = Buffer.from(await file.slice(filePosition, Math.min(filePosition + fileBufferSize, fileSize)).arrayBuffer());

        const headers = helperSplitBuffer(fileBuffer);
        const headerWarc = helperParseHeaders(headers[0]?.header);
        const headerHTTP = helperParseHeaders(headers[1]?.header);

        //if(headerWarc["WARC-Type"]?.trim() === "request") warcFiles[headerWarc["WARC-Target-URI"]] = filePosition;
        if (headerWarc["WARC-Type"] === "response") {
            await callback({ headerWarc: headerWarc, headerHTTP: headerHTTP, file: file.name, offset: filePosition })
        }

        filePosition += parseInt(headerWarc["Content-Length"]) + headers[0].header.length + 6;
    }
};

/**
 * Get the request from the `warc` given a offset
 * @param {File} file - The file to parse
 * @param {bigint} offset - The offset of the header
 */
export const warcRequestGet = async (file: File, offset: bigint): Promise<Response> => {
    //const fileBuffer = Buffer.alloc(2048);
    //const fileHandle = fs.openSync(file, 'r');

    //fs.readSync(fileHandle, fileBuffer, 0, fileBuffer.length, offset);
    const fileBuffer = Buffer.from(await file.slice(Number(offset), Number(offset) + 2048).arrayBuffer());

    const headers = helperSplitBuffer(fileBuffer);
    const headerWARC = helperParseHeaders(headers[0]?.header);
    const headerHTTP = helperParseHeaders(headers[1]?.header);

    switch ((headerHTTP["Transfer-Encoding"] || headerHTTP["transfer-encoding"])) {
        case "chunked": //fuck me 
            const chunks: Array<Buffer> = new Array<Buffer>();
            let chunkOffset: bigint = BigInt(0);

            do {
                /// Get the chunk size
                //console.log("NEW CHUNK")
                //const chunkSizeBuffer: Buffer = Buffer.alloc(32);
                //console.log("chunkSizeBuffer", chunkSizeBuffer.toString())
                //fs.readSync(fileHandle, chunkSizeBuffer, 0, chunkSizeBuffer.length, offset + chunkOffset + BigInt(headers[1].offset + 4));
                const startPos = Number(offset + chunkOffset) + headers[1].offset + 4;
                const chunkSizeBuffer = Buffer.from(await file.slice(startPos, startPos + 32).arrayBuffer());

                const chunkSizeHex: string = chunkSizeBuffer.toString().split('\r\n', 2)[0];
                //console.log("chunkSizeHex", chunkSizeHex);
                const chunkSize: number = parseInt('0x' + chunkSizeHex);

                if (chunkSize == 0) break;

                /// Get the chunk
                //const chunk = Buffer.alloc(chunkSize);
                ///Why did this work?
                ///fs.readSync(fileHandle, chunkSizeBuffer, 0, chunkSize, offset + chunkOffset + BigInt(headers[1].offset + 4 + chunkSizeHex.length+4));

                //fs.readSync(fileHandle, chunk, 0, chunk.length, offset + chunkOffset + BigInt(headers[1].offset + 4 + chunkSizeHex.length + 2));
                const chunkStart = Number(offset + chunkOffset + BigInt(headers[1].offset + 4 + chunkSizeHex.length + 2));
                const chunk = Buffer.from(await file.slice(chunkStart, chunkStart + chunkSize).arrayBuffer());

                chunkOffset += BigInt(chunkSizeHex.length + 4 + chunkSize)

                ////console.log("New chunkOffset", chunkOffset)

                chunks.push(chunk);

            } while (true);

            ////console.log("Complete!")

            const buffer = Buffer.concat(chunks);

            ////console.log("DONE", headerHTTP["Content-Type"])

            return new Response(buffer, { status: parseInt(headerHTTP["status"]), headers: { "Content-Type": (headerHTTP["Content-Type"] || headerHTTP["content-type"]) } });
            break;

        default:
            const uriSize = parseInt(headerHTTP["Content-Length"] || headerHTTP["content-length"]);
            const uriBuffer = Buffer.alloc(uriSize);

            const bufferStart = offset + BigInt(headers[1].offset + 4);
            const bufferEnd = bufferStart + BigInt(uriSize);
            //fs.closeSync(fileHandle);

            //fs.readSync(fileHandle, uriBuffer, 0, uriSize, bufferStart);
            //fs.closeSync(fileHandle);

            //const stream = streamFile(file, {highWaterMark: 1024*4, start: Number(offset) + headers[1].offset + 4, end: Number(bufferEnd)})

            const buffer2 = Buffer.from(await file.slice(Number(offset) + headers[1].offset + 4, Number(bufferEnd)).arrayBuffer());

            return new Response(buffer2, { status: parseInt(headerHTTP["status"]), headers: { "Content-Type": headerHTTP["Content-Type"], "Location": headerHTTP["Location"], "ETag": headerHTTP["ETag"] } });
    }
};

export const warcRequestReplace = async (res: Response, record: WarcRecord, records: WarcRecord[]): Promise<Response> => {
    console.log(records);

    const contentType = res.headers.get("Content-Type" ?? res.headers.get("content-type")) ?? "";
    const baseUrl = record.warcTargetURI?.replace(/^<|>$/g, "") ?? "";

    if (!contentType.includes("text/html") || res.status !== 200) return res;

    const html = await res.text();
    const $ = cheerio.load(html);

    //Create a promise array replacing all script[src]
    const srcPromises = $('script[src]').map((index, element) => {
        const src = $(element).attr('src');

        if (!src) return;

        console.log("script tag found!", src);

        //Parse the url to get the entire url
        const urlSrc = (src.startsWith("http://") || src.startsWith("https://"))
            ? src
            : (src.startsWith("/"))
                ? baseUrl?.replace(/\/[^/]*$/, '/') + src.slice(1)
                : (src.startsWith("./"))
                    ? baseUrl?.replace(/\/[^/]*$/, '/') + src.slice(2)
                    : baseUrl?.replace(/\/[^/]*$/, '/') + src;

        //Get the archived src if its avaliable
        const warcUrlSrc = "<" + encodeURI(urlSrc) + ">";
        const srcResults = records.filter(r => r.warcTargetURI === warcUrlSrc)
        const getSrc = srcResults[0];

        console.log("warcsearch", warcUrlSrc, srcResults);

        if (!getSrc) {
            console.log(JSON.stringify({ error: "Resource not found!", src: urlSrc, warcSrc: warcUrlSrc }));
            //TODO: better error handling
            //STILL REMOVEI TI
            $(element).removeAttr("src");
            return;
        }

        const srcReplacePromise = warcRequestGet(getSrc.file, BigInt(getSrc.warcOffset)).then(async req => {
            $(element).removeAttr("src");
            $(element).text(await req.text());
        })

        return srcReplacePromise;
    });

    //Create a promise array replacing all img[src]
    const imagePromises = $('img').map((index, element) => {
        const src = $(element).attr('src');

        if (!src) {
            console.log("IMAGE WITH NO SRC", element);
            return;
        }

        //Parse the url to get the entire url
        const urlSrc = (src.startsWith("http://") || src.startsWith("https://"))
            ? src
            : (src.startsWith("/"))
                ? baseUrl?.replace(/\/[^/]*$/, '/') + src.slice(1)
                : (src.startsWith("./"))
                    ? baseUrl?.replace(/\/[^/]*$/, '/') + src.slice(2)
                    : baseUrl?.replace(/\/[^/]*$/, '/') + src;

        //Get the archived src if its avaliable
        const warcUrlSrc = "<" + encodeURI(urlSrc) + ">";
        const srcResults = records.filter(r => r.warcTargetURI === warcUrlSrc)
        const getSrc = srcResults[0];

        console.log("warcsearch", warcUrlSrc, srcResults);

        if (!getSrc) {
            console.log(JSON.stringify({ error: "Resource not found!", src: urlSrc, warcSrc: warcUrlSrc }));
            //TODO: better error handling
            //STILL REMOVEI TI
            $(element).removeAttr("src");
            return;
        }

        console.log(warcUrlSrc, getSrc);

        const srcReplacePromise = warcRequestGet(getSrc.file, BigInt(getSrc.warcOffset))
            .then(async resSrc => {
                const arrayBuffer = await resSrc.arrayBuffer();
                const base64String = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                const base64Src = `data:${resSrc.headers.get("Content-Type") ?? res.headers.get("content-type")};base64,${base64String}`;
                $(element).attr('src', base64Src);

                console.log("URL", urlSrc, warcUrlSrc, base64Src)
            });



        return srcReplacePromise;
    });

    //Create a promise array replacing all link[src]
    const stylesPromises = $('link[rel="stylesheet"]').map((index, element) => {
        const src = $(element).attr('href');

        if (!src) return;

        console.log("css tag found!", src);

        //Parse the url to get the entire url
        const urlSrc = (src.startsWith("http://") || src.startsWith("https://"))
            ? src
            : (src.startsWith("/"))
                ? baseUrl?.replace(/\/[^/]*$/, '/') + src.slice(1)
                : (src.startsWith("./"))
                    ? baseUrl?.replace(/\/[^/]*$/, '/') + src.slice(2)
                    : baseUrl?.replace(/\/[^/]*$/, '/') + src;

        //Get the archived src if its avaliable
        const warcUrlSrc = "<" + encodeURI(urlSrc) + ">";
        const srcResults = records.filter(r => r.warcTargetURI === warcUrlSrc)
        const getSrc = srcResults[0];

        console.log("warcsearch", warcUrlSrc, srcResults);

        if (!getSrc) {
            console.log(JSON.stringify({ error: "Resource not found!", src: urlSrc, warcSrc: warcUrlSrc }));
            //TODO: better error handling
            //STILL REMOVEI TI
            $(element).removeAttr("href");
            return;
        }

        const srcReplacePromise = warcRequestGet(getSrc.file, BigInt(getSrc.warcOffset)).then(async req => {
            $(element).remove(); // Remove the link element
            const cssContent = await req.text();
            const styleElement = $('<style>'); // Create a <style> element
            styleElement.attr('type', 'text/css');
            styleElement.text(cssContent);
            $('head').append(styleElement); // Append the <style> element to <head>
        });

        return srcReplacePromise;
    });

    //Await all promises
    await Promise.all(srcPromises);
    await Promise.all(imagePromises);
    await Promise.all(stylesPromises);

    //Change all of the urls in the stylesheet to base64 or local ones
    const stylesURLPromises = $('style').map(async (index, element) => {
        const css = $(element).text();
        const regexReplace = /url\(([^)]+)\)/g;

        /*
        const cssModified = css.replace(regexReplace, (match, url) => {
            const urlCssRaw = url.replace(/(^["'`]+)|(["'`]+$)/g, '');
            const urlComplete = encodeURI((url.startsWith("http://") || url.startsWith("https://"))
                ? urlCssRaw
                : (urlCssRaw.startsWith("/"))
                    ? baseUrl?.replace(/\/[^/]*$/, '/') + urlCssRaw.slice(1)
                    : (urlCssRaw.startsWith("./"))
                        ? baseUrl?.replace(/\/[^/]*$/, '/') + urlCssRaw.slice(2)
                        : baseUrl?.replace(/\/[^/]*$/, '/') + urlCssRaw);

            const warcUrlSrc = "<" + encodeURI(urlComplete) + ">";
            const srcResults = records.filter(r => r.warcTargetURI === warcUrlSrc);
            const getSrc = srcResults[0];

            if (!getSrc) {
                console.log(JSON.stringify({ error: "Resource not found!", src: urlComplete, warcSrc: warcUrlSrc }));
                //TODO: better error handling
                //STILL REMOVEI TI
                $(element).removeAttr("href");
                return url;
            }

            const base64Src = warcRequestGet(getSrc.file, BigInt(getSrc.warcOffset))
                .then(async resSrc => {
                    const arrayBuffer = await resSrc.arrayBuffer();
                    const base64String = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                    const base64Src = `data:${resSrc.headers.get("Content-Type") ?? res.headers.get("content-type")};base64,${base64String}`;
                    return base64Src;
                });

            return base64Src;
        }); */

        const cssModified = await replaceAsync(css, regexReplace, async (match, url) => {
            const urlCssRaw = url.replace(/(^["'`]+)|(["'`]+$)/g, '');
            const urlComplete = encodeURI((url.startsWith("http://") || url.startsWith("https://"))
                ? urlCssRaw
                : (urlCssRaw.startsWith("/"))
                    ? baseUrl?.replace(/\/[^/]*$/, '/') + urlCssRaw.slice(1)
                    : (urlCssRaw.startsWith("./"))
                        ? baseUrl?.replace(/\/[^/]*$/, '/') + urlCssRaw.slice(2)
                        : baseUrl?.replace(/\/[^/]*$/, '/') + urlCssRaw);

            const warcUrlSrc = "<" + encodeURI(urlComplete) + ">";
            const srcResults = records.filter(r => r.warcTargetURI === warcUrlSrc);
            const getSrc = srcResults[0];

            if (!getSrc) {
                console.log(JSON.stringify({ error: "Resource not found!", src: urlComplete, warcSrc: warcUrlSrc }));
                //TODO: better error handling
                //STILL REMOVEI TI
                $(element).removeAttr("href");
                return url;
            }

            const base64Src = await warcRequestGet(getSrc.file, BigInt(getSrc.warcOffset))
                .then(async resSrc => {
                    const arrayBuffer = await resSrc.arrayBuffer();
                    const base64String = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                    const contentType = resSrc.headers.get("Content-Type") ?? res.headers.get("content-type");
                    const base64Src = `data:${contentType};base64,${base64String}`;

                    console.log(url, urlCssRaw, urlComplete, base64Src, contentType);

                    return base64Src;
                });

            return `url(${base64Src})`;
        });

        console.log("css midfied\n", css, "\n=================================\n"+ cssModified);
        $(element).text(cssModified);
    });

    await Promise.all(stylesURLPromises);

    return new Response($.html(), { headers: res.headers });
};
