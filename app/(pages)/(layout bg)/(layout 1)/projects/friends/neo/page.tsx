
import { Metadata } from 'next';
import Image from 'next/image';
import HollowCircle from '@/components/shapes/hollowcircle';
import Stickyboard from '@/components/stickyboard';

import imageShitAsin from '@/public/static/images/Screenshot_20230416_174642.png'
import imageSoyjack from '@/public/static/images/IfIpVKM.png'
import imageLeon from "@/public/static/images/leonfucker.png"
import imageScreenshot from "@/public/static/images/Screenshot_20230411-202447.png"
import ButtonAudio from '@/components/buttonaudio';


import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"

//TODO: remap this to the Homepage metadata
export const metadata: Metadata = {
    title: 'Neo Downloaded Hamachi 4.15.0!',
    description: '+rep ass at stardew. possibly decent at csgo. -rep plays genshin',

    creator: 'M4cgyver',
    publisher: 'M4cgyver',

    openGraph: {
        title: 'Neo has downloaded a vunerable version of Hamachi!',
        description: '+rep ass at stardew. possibly decent at csgo. -rep plays genshin -rep anti connor stan',
        url: 'https://m4cgyver.com/friends/neo',
        locale: 'en-US',
        type: 'website',
    }
};

export default async function Neo() {
    return (<>
        <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
            <div className={stylesWin9x.title}>Title</div>
            <h1>{metadata.title?.toString()}</h1>
            <h2>{metadata.description?.toString()}</h2>
        </div>
        <main className={`${stylesWin9x.window} ${styles.neo} ${stylesLayout.children}`}>
            <div style={{ position: "relative" }}>
                <div className={stylesWin9x.title}>V*lorant Player</div>
                <Image src={imageShitAsin} width={962} height={800} alt="what the actual fuck is this steam profile pciture" style={{ width: "100%", height: "auto" }} quality={80} placeholder='blur' />

                <ButtonAudio src="/static/sounds/wth.mp3" style={{ cursor: 'pointer', opacity: 0, position: "absolute", top: "3.5%", left: "2%", zIndex: 2, width: "18.25%", height: "22.5%" }} />
                <HollowCircle width={325} height={75} color="red" strokeWidth={2} style={{ position: "absolute", top: "2.5%", left: "22%", zIndex: 2 }} />
                <HollowCircle width={325} height={75} color="red" strokeWidth={20} style={{ position: "absolute", top: "30%", left: "70%", zIndex: 2 }} />

                <Image src={imageSoyjack} alt="hollyshit" width={325} height={75} style={{ position: "absolute", top: "30%", left: "70%", width: "30%", height: "10%", zIndex: 2 }} quality={80} />

                <HollowCircle width={325} height={75} color="red" strokeWidth={20} style={{ position: "absolute", top: "80%", left: "1%", zIndex: 2 }} />

                <Image src={imageSoyjack} alt="hollyshit" width={325} height={75} style={{ position: "absolute", top: "80%", left: "1%", width: "30%", height: "10%", zIndex: 2 }} quality={80} />
                <Image src={imageLeon} alt="leon" width={120} height={120} style={{ position: "absolute", top: "50%", left: "50%", width: "50%", height: "50%", zIndex: 2 }} quality={80} />

                <ButtonAudio src="/static/sounds/leont.mp3" style={{ cursor: 'pointer', position: "absolute", opacity: 0, top: "50%", left: "50%", width: "50%", height: "50%", zIndex: 3 }} />

                <Image src={imageScreenshot} alt="math" width={120} height={120} style={{ position: "absolute", top: "30%", left: "10%", width: "20%", height: "4gus0%", zIndex: 2 }} quality={80} placeholder='blur' />

                <div style={{ position: "absolute", top: "20%", left: "22%", zIndex: 2 }}>
                    <Image src={imageScreenshot} width={80} height={80} alt="he needs jesus" style={{ float: "left" }} quality={80} placeholder='blur' />
                    <span style={{ color: 'white' }}>This man needs Jesus or his parrents needs to beat him more ong <br />Subscribe and comment down below if you agree! 😊✝️</span>
                </div>
            </div>

            <Stickyboard documentId="neo" routePath="/projects/friends/neo" />

        </main>
    </>);
}    