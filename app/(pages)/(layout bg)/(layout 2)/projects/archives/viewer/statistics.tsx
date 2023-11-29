import { prisma } from "@/libs/prisma"
 
import Link from "next/link";

export const ArchiveViewerStatistics = async ({ uri, file }: { uri: string, file?: string }) => {
    if (!uri) return <></>;

    const resultsUri = await prisma.httpHeaderEntry.findMany({
        where: {
            warcTargetURI: "<" + uri + ">"
        },
        select: {
            warcDate: true,
            lastModified: true,
            location: true,
            status: true
        }
    });

    const resultsFile = (file) ? await prisma.httpHeaderEntry.findMany({
        where: {
            fileName: file
        },
        select: {
            warcTargetURI: true,
            status: true
        },
    }).then(data => data.sort((a, b) => {
        const aSlashCount = a.warcTargetURI.match(/\//g)?.length ?? 0;
        const bSlashCount = b.warcTargetURI.match(/\//g)?.length ?? 0;

        return (aSlashCount != bSlashCount) ?
            aSlashCount - bSlashCount :
            a.warcTargetURI.localeCompare(b.warcTargetURI);
    })) : [];

    const set = new Set<string>();

    resultsUri.filter(result => { return result.location !== undefined }).forEach(result => { if (result.location) set.add(result.location) });

    const recursive: JSX.Element[] = await Promise.all(Array.from(set).map((result: any) => {
        return ArchiveViewerStatistics({ uri: result });
    }));

    return (<>
        <div style={{ marginTop: -4, marginBottom: 12, width: "100%" }}>
            <p style={{ marginLeft: 4, marginBottom: 0 }}><span style={{ fontWeight: "bolder" }}>Info on: </span> <Link href={uri}>{uri}</Link> </p>

            <table style={{ margin: 4, border: "1px solid", width: "99%" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid" }}>Archived</th>
                        <th style={{ border: "1px solid" }}>Modified</th>
                        <th style={{ border: "1px solid" }}>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {resultsUri.map((result, index) => {
                        return (<tr key={index} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{result.lastModified?.toUTCString()}</td>
                            <td style={{ border: "1px solid" }}>{result.warcDate?.toUTCString()}</td>
                            <td style={{ border: "1px solid" }}>{result.status}</td>
                        </tr>);
                    })}
                </tbody>
            </table>

            {recursive}

            {file ? <>
                <p style={{ marginLeft: 4, marginBottom: 0 }}><span style={{ fontWeight: "bolder" }}>URIs archived in: </span> <Link prefetch={false} href={file}>{file}</Link> </p>

                <div style={{ width: "99.25%", aspectRatio: 6 / 3, overflowY: "scroll" }}>
                    <table style={{ margin: 4, border: "1px solid", width: "98%" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid" }}>Uri</th>
                                <th style={{ border: "1px solid" }}>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {resultsFile.map((result, index) => {
                                return (<tr key={index} style={{ border: "1px solid" }}>
                                    <td style={{ border: "1px solid" }}>
                                        <Link prefetch={false} href={"/projects/archives/viewer?uri=" + encodeURIComponent(result.warcTargetURI.slice(1, result.warcTargetURI.length - 1))}> {result.warcTargetURI.slice(1, result.warcTargetURI.length - 1).slice(0, 96)}</Link>
                                    </td>
                                    <td style={{ border: "1px solid" }}>{result.status}</td>
                                </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
            </> : <></>}
        </div>
    </>)
}