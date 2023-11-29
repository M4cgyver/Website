import Stickyboard from "@/components/stickyboard";
import { WarcIFrame } from "./iframe";
import { Suspense } from "react";
import { ArchiveViewerStatistics } from "./statistics";
import { prisma } from "@/libs/prisma";
import Loading from "@/components/loading";
import { Metadata } from "next";

import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"

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

export default async function ArchiveViewer({ searchParams }: { searchParams: { uri: string, file: string, dateModified: number, dateArchived: number } }) {
    const file = searchParams.file;
    const uri = searchParams.uri ?? await prisma.httpHeaderEntry.findFirst({
        select: {
            warcTargetURI: true
        },
        where: {
            fileName: file
        },
        orderBy: {
            warcTargetURI: "asc"
        }
    }).then(result => result?.warcTargetURI.slice(1, result?.warcTargetURI.length - 1));

    const dateModified = searchParams.dateModified;
    const dateArchived = searchParams.dateArchived;

    return (<>
        <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
            <div className={stylesWin9x.title}>Title</div>
            <h1>{metadata.title?.toString()}</h1>
            <h2>{metadata.description?.toString()}</h2>
        </div>

        <main className={`${styles.archivesearch} ${stylesWin9x.window} ${stylesLayout.children}`}>
            <div className={stylesWin9x.title}>Web Archive Viewer</div>

            <WarcIFrame uri={uri} dateModified={dateModified} dateArchived={dateArchived} />

            <Suspense fallback={<div style={{ height: "10vh", position: "relative", color: "black" }}>
                <Loading>Loading archive statistics for the current page...</Loading>
            </div>}>
                <ArchiveViewerStatistics uri={uri} file={file} />
            </Suspense>

            <Stickyboard documentId={`warcviwer ${file ?? uri}`} routePath={`/projects/archive/viewer?uri=${encodeURIComponent(uri)}&file=${encodeURIComponent(file)}&dateModified=${dateModified}&dateArchived=${dateArchived}`} />
        </main>
    </>);
}
