"use client";

import stylesWin98 from "@/libs/win98.module.css"
import styles from "./page.module.css"
import { useState } from "react";
import { WarcRecord, parseDate, warcIndexFilesCallback, warcRequestGet, warcRequestReplace } from "./actions";

const htmlStatus = (header: string, status: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #121212;
    }
    
    .error-code, .error-message {
      color: #fff;
    }
  }

  .container {
    text-align: center;
  }

  .error-code {
    font-size: 4rem;
    color: #e74c3c;
    margin-bottom: 10px;
  }

  .error-message {
    font-size: 1.5rem;
    color: #333;
  }
</style>
<title>No link selected</title>
</head>
<body>
<div class="container">
  <div class="error-code">${header}</div>
  <div class="error-message">${status}</div>
</div>
</body>
</html>            
`;

export default function ArchiveViewerOffline() {
    const [records, setRecords] = useState<WarcRecord[]>([]);
    const [parsing, setParsing] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [iframeHtml, setIframeHtml] = useState<string>(htmlStatus("", "Please parse and select a .warc url to view!"));

    const handleSubmit = (formData: FormData) => {
        setParsing(true);

        Promise.all(files.map(f => warcIndexFilesCallback(f, ({ headerWarc, headerHTTP, file, offset }: { headerWarc: Record<string, any>, headerHTTP: Record<string, any>, file: string, offset: number }) => {
            const record: WarcRecord = {
                file: f,

                status: Number(headerHTTP["status"]),
                datetime: parseDate(headerHTTP["Date"] ?? headerHTTP["date"]),
                //expires: headerHTTP["expiry"] ? new Date(headerHTTP["expiry"]) : undefined,
                pragma: headerHTTP["Pragma"] ?? headerHTTP["pragma"],
                server: headerHTTP["Server"] ?? headerHTTP["server"],
                setCookie: headerHTTP["Set-Cookie"] ?? headerHTTP["Set-cookie"] ?? headerHTTP["set-cookie"],
                contentType: headerHTTP["Content-Type"] ?? headerHTTP["Content-type"] ?? headerHTTP["content-type"],
                lastModified: parseDate(headerHTTP["Last-Modified"] ?? headerHTTP["last-modified"]),
                contentSecurityPolicy: headerHTTP["Content-Security-Policy"] ?? headerHTTP["Content-Security-policy"] ?? headerHTTP["Content-security-policy"] ?? headerHTTP["content-security-policy"],
                eTag: headerHTTP["Etag"] ?? headerHTTP["etag"] ?? headerHTTP["ETag"],
                location: headerHTTP["Location"] ?? headerHTTP["location"],
                warcType: headerWarc["WARC-Type"],
                warcRecordID: headerWarc["WARC-Record-ID"],
                warcWarcinfoID: headerWarc["WARC-Warcinfo-ID"],
                warcConcurrentTo: headerWarc["WARC-Concurrent-To"],
                warcTargetURI: headerWarc["WARC-Target-URI"],
                warcDate: parseDate(headerWarc["WARC-Date"]),
                warcIpAddress: headerWarc["WARC-IP-Address"],

                warcOffset: offset.toString(), // Convert BigInt to string
                httpOffset: 0,
            };

            setRecords(records => [...records, record]);
        }))).then(() => setParsing(false));
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(Array.from(event.target?.files ?? []));
    };

    const handleSetRecord = (record: WarcRecord) => {
        setIframeHtml(htmlStatus("Loading", "Finding " + record.warcTargetURI + ", please wait..."));

        warcRequestGet(record.file, BigInt(record.warcOffset))
            .then(async req => {
                setIframeHtml(htmlStatus("Loading", "Replacing all online resources with local ones..."))
                return await warcRequestReplace(req, record, records)
            })
            .then(async req => setIframeHtml(await req.text()))
    }

    return (
        <main className={`${styles.archiveViewerOffline} ${stylesWin98.window}`}>
            <div className={stylesWin98.title}>Web Archive <span style={{ textDecoration: "underline" }}>Offline</span> Viewer</div>

            <iframe srcDoc={iframeHtml} />

            <form action={handleSubmit}>
                <label>Select .warc files:</label>
                <input type="file" accept=".warc" multiple onChange={handleFileChange} disabled={parsing} />
                <button type="submit" disabled={parsing} >Read and Parse</button>
            </form>

            <div className={styles.files}>
                <table>
                    <thead>
                        <tr>
                            <th>File</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => <tr key={index}>
                            <td>{file.name}</td>
                            <td>{file.size}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

            <div className={styles.uris}>
                <table>
                    <thead>
                        <tr>
                            <th>Uri</th>
                            <th>Status</th>
                            <th>Modified</th>
                            <th>Archived</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records
                            .sort((a, b) =>
                                (a.warcTargetURI ?? "").localeCompare(b.warcTargetURI ?? "", undefined, {
                                    sensitivity: "base"
                                }))
                            .map((record, index) => <tr key={index}>
                                <td title={record.warcTargetURI}>
                                    <a onClick={(event) => {
                                        event.preventDefault();
                                        handleSetRecord(record);
                                    }}>{record.warcTargetURI?.slice(0, 64)}</a>
                                </td>
                                <td>{record.status}</td>
                                <td>{record.lastModified?.toDateString()}</td>
                                <td>{record.warcDate?.toDateString()}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>

        </main>
    );
}
