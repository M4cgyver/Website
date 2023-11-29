import Link from "next/link";
import { Metadata } from "next";
import { WarcFileProgress } from "@prisma/client";
import { prisma } from "@/libs/prisma";
import Overlay from "@/components/overlay";

import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"
import { ArchiveSearchForum } from "../search/form";

export const revalidate = 0;

export const metadata: Metadata = {
    title: 'M4cgyvers Amazing Archives',
    description: 'Sometimes websites and forums go under or go offline. Its important to archive and download what you love and what you like whenever possible!',

    openGraph: {
        title: 'M4cgyvers Amazing  Archives',
        description: 'Sometimes websites and forums go under or go offline. Its important to archive and download what you love and what you like whenever possible!',
        url: 'https://m4cgyver.com/projects',
        locale: 'en-US',
        type: 'website',
    }
};

function formatFileSize(size: number | bigint) {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let index = 0;

    while ((typeof size === 'number' && size >= 1024) || (typeof size === 'bigint' && size >= BigInt(1024)) && index < units.length - 1) {
        if (typeof size === 'number') {
            size /= 1024;
        } else {
            size /= BigInt(1024);
        }
        index++;
    }

    return `${Number(size).toFixed(2)} ${units[index]}`;
}


export default async function ArchiveIndex() {

    const warcFiles: WarcFileProgress[] = await prisma.warcFileProgress.findMany({});

    return (<>
        <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
            <div className={stylesWin9x.title}>Title</div>
            <h1>{metadata.title?.toString()}</h1>
            <h2>{metadata.description?.toString()}</h2>
        </div>

        <main className={`${stylesWin9x.window} ${styles.archive} ${stylesLayout.children}`} style={{ padding: 4 }}>
            <div className={stylesWin9x.title}>Archive</div>

            <h1
                style={{
                    margin: 0,
                    marginTop: 8,
                    textAlign: 'center',
                    textDecoration: 'underline',
                    width: '100%',
                }}
            > Here are my archives I (try) to keep up to date! Let me know if anything is broken.</h1>

            <div className={styles.warcExplanation}>
                <div className={styles.description}>
                    <h2 style={{ margin: 0 }}>[WARCS] Digital archives of websites (.warc files) of sites I find interesting! </h2>
                    <p style={{ margin: 0, marginLeft: 3 }}>
                        A Web ARChive (WARC) file is a digital archival format used to store and preserve collections of web resources,
                        including HTML pages, images, videos, and other digital content. It is typically created by web crawlers or
                        archiving tools to capture and record the entire state of a website or a collection of websites at a specific
                        point in time. WARC files are designed to be self-contained, portable, and standardized, allowing for easy
                        storage, transfer, and retrieval of web content for research, analysis, or preservation purposes. They are
                        widely used in digital libraries, archives, and other web preservation initiatives to ensure long-term access
                        and usability of web content.
                    </p>
                </div>
                <br />


                <div className={styles.search}>
                    <h3 style={{ margin: 0 }}>Type a link (or partial link) to see if its saved!</h3>
                    <ArchiveSearchForum searchQuery="" searchSize={36} />
                </div>

                <br />

                <div className={styles.table}>
                    <h3 style={{ margin: 0 }}>
                        Click on the link to view the contents of the web archive! Javascript required!
                    </h3>

                    <div style={{ position: "relative", aspectRatio: "8/3", overflowY: "scroll" }}>
                        {process.env.IS_OFFLINE && <Overlay>
                            <p>The archive is <span style={{ color: "red" }}>offline!</span> No archives are avaliable right now please check back later, maintanance may be the cause.</p>
                        </Overlay>}

                        <table className={styles.table} style={{ width: "100%", color: "black" }}>
                            <thead style={{ color: "white", backgroundColor: "grey", position: "sticky" }}>
                                <tr>
                                    <th className={styles.columnHeader}>File</th>
                                    <th className={styles.columnHeader}>Status</th>
                                    <th className={styles.columnHeader}>Size</th>
                                    <th className={styles.columnHeader}>Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warcFiles
                                    ?.sort((a, b) => a.fileName.localeCompare(b.fileName))
                                    .map((file) => (
                                        <tr
                                            key={file.fileName}
                                            className={file.status === "caching..." ? styles.cachingRow : ""}
                                        >
                                            <td>
                                                <Link prefetch={false} style={{ color: "blue" }} href={`/projects/archives/viewer?file=${encodeURIComponent(file.fileName)}`}>{file.fileName}</Link>
                                            </td>
                                            <td>{file.status}</td>
                                            <td>{file.fileName && formatFileSize(file.size)}</td>
                                            <td>
                                                {(file.status === "caching...")
                                                    ? (file.offset > BigInt(0)) 
                                                        ? (Number((file.offset + BigInt(1)) * BigInt(1000) / file.size) / 10).toString() + "%"
                                                        : "0%"
                                                    : "100%"}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </>);
}
