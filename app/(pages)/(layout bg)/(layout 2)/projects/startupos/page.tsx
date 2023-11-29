import type { Metadata } from 'next';
import styesWin98 from "@/libs/win98.module.css";
import styles from "./page.module.css";
import stylesWin9x from "@/libs/win98.module.css"
import stylesLayout from "@/libs/layout.module.css"

import Image from 'next/image';
import Link from 'next/link';
import { StartupOs } from './os';

import imageMikeOs from "@/public/static/images/mikeos.gif"
import imageM4cgyer from "@/public/static/images/m4cgyver.png"
import imageLink from "@/public/static/images/icons8-link-64.png"
import Stickyboard from '@/components/stickyboard';
import { Views } from '@/components/views';
import { ViewsTable } from '@/components/views/table';

export const metadata: Metadata = {
    title: 'Startup OS Online VM',
    description: 'This is a x86 Assembly operating system Ive been working on on and off for years. Mainly crunched this thing back in 2018, I mostly work on it on and off now.',

    keywords: ["m4cgyver", "projects"],

    creator: 'M4cgyver',
    publisher: 'M4cgyver',

    openGraph: {
        title: 'Startup OS Online VM',
        description: 'This is a x86 Assembly operating system Ive been working on on and off for years. Mainly crunched this thing back in 2018, I mostly work on it on and off now.',
        url: 'https://m4cgyver.com/projects/startupos',
        locale: 'en-US',
        type: 'website',
    }
};

const title = <>
    <h1>{metadata.title?.toString()}</h1>
    <h2>{metadata.description?.toString()}</h2>
</>;

export default async function StartupOsProjectPage() {

    return (
        <>
            <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
                <div className={stylesWin9x.title}>Title</div>
                <h1>{metadata.title?.toString()}</h1>
                <h2>{metadata.description?.toString()}</h2>
            </div>


            <main className={`${styles.startup} ${stylesLayout.children}`}>
                <div className={`${styesWin98.window} ${styles.startup}`}>

                    <div className={styesWin98.title}>Startup OS <span style={{ color: "green" }}>ONLINE</span></div>

                    <span style={{ height: 8 }} />
                    <StartupOs />
                    <span style={{ height: 8 }} />
                </div>

                <div style={{ display: 'flex', marginTop: 32 }}>
                    <div>
                        <div className={styesWin98.window} style={{ width: 200, marginRight: 20 }}>
                            <div className={styesWin98.title}>Credits</div>

                            <ul style={{ listStyle: "none", margin: 4, padding: 0 }}>
                                <li style={{ display: "flex", marginBottom: 10 }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", marginRight: 10 }}>
                                        <Image src={imageMikeOs} alt="MikeOS" width={60} height={60} />
                                    </div>
                                    <div>
                                        <Link href="https://mikeos.sourceforge.net/" target="_blank" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                                            <h1 style={{ margin: 0, fontSize: 18 }}>Mike OS</h1>
                                            <Image src={imageLink} width={14} height={14} alt='' style={{ marginLeft: 4 }} />
                                        </Link>

                                        <h2 style={{ margin: 0, fontSize: 12, fontStyle: "italic", color: "white" }}>Programmer</h2>
                                        <h3 style={{ margin: 0, fontSize: 10, color: "lightgrey" }}>I based the entire bootloader and syscalls on him</h3>
                                    </div>
                                </li>

                                <li style={{ display: "flex", marginBottom: 10 }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", marginRight: 10 }}>
                                        <Image src={imageM4cgyer} alt="MikeOS" width={60} height={60} />
                                    </div>
                                    <div>
                                        <h1 style={{ margin: 0, fontSize: 18 }}>M4cgyver</h1>
                                        <h2 style={{ margin: 0, fontSize: 12, fontStyle: "italic", color: "white" }}>Programmer</h2>
                                    </div>
                                </li>
                            </ul>
                        </div>


                        <div className={styesWin98.window} style={{ width: 200, marginRight: 20, marginTop: 18 }}>
                            <div className={styesWin98.title}>Views</div>
                            <ViewsTable />
                        </div>
                    </div>

                    <div className={styesWin98.window} style={{ flex: 1 }}>
                        <div className={styesWin98.title}>Description</div>
                        <div className={styles.description}>
                            <h1>Startup OS; An entire operating system build in x86 assembly.</h1>
                            <p>I always loved the asthetic of old operating systems, primarilly how they were programmed. I decided to learn all about x86 assembly and try to work with it. For about a year and a half I managed to come up with this. Its a basic DOS-like operating system built off of the MikeOS operating system.</p>
                            <h2>Commands</h2>
                            <ul>
                                <li>HELLO: Echos <em>"Hello world!"</em>.</li>
                                <li>CLS: Clear the screen.</li>
                                <li>DIR: List all of the files in the <Link href="https://en.wikipedia.org/wiki/File_Allocation_Table#FAT12">Fat12 <Image src={imageLink} width={14} height={14} alt='' style={{ marginLeft: -4 }} /></Link> hard drive.</li>
                                <li>SCREEN: Basic screen test.</li>
                                <li>SHUTDOWN: Shutdowns the computer.</li>
                            </ul>
                            <p>As Im writing this out Im starting to realize its not much lmao. If you find any bugs or exploits please tell me so I can feature it here!</p>
                        </div>
                    </div>
                </div>

                <div className={styesWin98.window} style={{ marginTop: "12px" }} >
                    <Stickyboard documentId="startupos" routePath="/projects/startupos" />
                </div>
            </main>
        </>
    );
}