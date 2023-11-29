import { Metadata } from "next"; 
import Image from "next/image";
import Stickyboard from "@/components/stickyboard";


import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"

export const metadata: Metadata = {
    title: 'Guston Bic brother is awesome',
    description: 'gus is pretty cool ig',

    creator: 'M4cgyver',
    publisher: 'M4cgyver',

    openGraph: {
        title: 'Guston Bic brother is awesome',
        description: 'gus is pretty cool ig',
        url: 'https://m4cgyver.com/friends/neo',
        locale: 'en-US',
        type: 'website',
    }
};

export default function Bic() {
    return (<>
        <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
            <div className={stylesWin9x.title}>Title</div>
            <h1>{metadata.title?.toString()}</h1>
            <h2>{metadata.description?.toString()}</h2>
        </div>

        <main className={`${stylesWin9x.window} ${stylesLayout.children}`} style={{ backgroundColor: "cyan", color: "black" }}>
            <div className={stylesWin9x.title}>Alban*ans</div>
            asdasdfl;sakdjf;laksjf <br /><br />Go camping <br /> <br /> shits geting uypdated live hold the fuckn on ima get a redbull <br /> what the fuck is aidn talking about

            <Image src="/static/images/flagalbainain.png" alt="slander" width={600} height={300} />

            try camping though, theres public land everywhere accross the blm lands (Beuro of land management()

            <span style={{ width: "100%", height: 12 }} />

            <Stickyboard documentId="bic" routePath="/projects/friends/bic" />
        </main>
    </>);
}    