import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css" 

import imageMiner from "@/public/static/images/PXL_20230322_080050245.jpg"
import TitleCube from '@/components/pizzacube';
import websiteIcon from "@/public/favicon.ico"
import { fontVerite9x14 } from '@/libs/fonts';

export const metadata: Metadata = {
    title: 'M4cgyvers Repurposed Mining Rig! ',
    description: 'Welcome to my (M4cgyver) website / resume (depending on whos reading). Written in NextJS 13 and NodeJs all within Docker!',

    creator: 'M4cgyver',
    publisher: 'M4cgyver',

    referrer: 'origin-when-cross-origin',

    openGraph: {
        title: 'M4cgyvers Repurposed Mining Rig! ',
        description: 'Welcome to my (M4cgyver) website / resume (depending on whos reading). Written in NextJS 13 and NodeJs all within a Docker container!',
        url: 'https://m4cgyver.com',
        locale: 'en-US',
        type: 'website',

        images: websiteIcon.src,
        
    }
};

export default function Homepage() {

    return (<>
        <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
            <div className={stylesWin9x.title}>Title</div>
            <TitleCube />
            <h1>{metadata.title?.toString()}</h1>
            <h2>{metadata.description?.toString()}</h2>
            
        </div>

        <main className={`${styles.homepage} ${stylesLayout.children}`}>
            <div className={stylesWin9x.window}>
                <div className={stylesWin9x.title}>Introductions</div>
                <p hidden> I put this shit in chatgtp lmao</p>

                <div style={{ padding: "2px" }}>

                    <h1 style={{ margin: 0, float: "left", paddingRight: 2, fontSize: 64 }}>Hello World!</h1>
                    <p className={fontVerite9x14.className} style={{ marginTop: 26 }}>My name is Logan Rios, a California native with a passion for computer technology. I attended BOHS for high school, where I honed my skills in computer science. Currently, Im pursuing a degree in computer science and technology at Grand Canyon University in Arizona, where Im constantly exploring and expanding my knowledge in this field, though I always prefer self-taught methods such as YouTube videos and blog websites. My favorite form of learning is though creating fun projects that can be repurposed and reused in the future whenever needed. </p>

                    <div>
                        <div style={{ height: "20px" }} />
                        <Link href="/static/images/PXL_20230322_080050245.jpg" target={"_blank"}>
                            <Image src={imageMiner} alt="stupid mining rig" width={275} height={150} quality={10} style={{ marginTop: 2, float: "left", marginRight: 4, width: "calc(min(1.5vw, 1.7vh)*16)", height: "calc(min(1.5vw, 1.7vh)*9)" }} placeholder='blur' />
                        </Link>
                        <p className={fontVerite9x14.className} style={{ margin: 0 }}>In my free time, I enjoy creating unique and innovative hardware gimmicks, such as my gameboy that doubles as a keyfob or use a old mining rig to host a website and train AI models ready for everyone and anyone. I also have a strong interest in software development and enjoy pushing the boundaries of whats possible with obscure concepts and designs. One of my biggest software projects was creating a complete x86 opperating system (it booted and ran programs, thats about it. Could never figure out how to program interrupts so I just had a <span style={{ fontStyle: "italic" }}>jmp</span> table). I always have a love for old <span style={{ fontStyle: "italic" }}>retro</span> tech. If its games or just old computers parts I always love to make use of them. For example; Im using a stack of Floppy Disks to prop up my monitor because it fucking broke on the way to colledge :D. My passion for technology has led me on a journey of exploration and creativity, and Im excited to see where it takes me in the future.</p>
                    </div>

                    <div>
                        <div style={{ height: "20px" }} />
                        <p className={fontVerite9x14.className}>Honestly thats about it. Ill be posting blog updates on locations, tips, projects, and games. Anyone else that posts more than that on the internet has really bad opsec, bad with personal data, or isnt Kenenough.</p>
                    </div>
                    <div className={styles.fixFloat} />
                </div>

            </div>
        </main>
    </>);
}     