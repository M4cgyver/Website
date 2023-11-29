import styles from "@/libs/layout.module.css" 
import stylesWin9x from "@/libs/win98.module.css" 

import SlideshowWidget from "@/components/slideshowwidget"
import Navigation from "@/components/navigation"
import Frens from "@/components/freinds"

export default function PagesLayout({
    children,
    title,
}: {
    children: React.ReactNode
    title: React.ReactNode
}) {
    return (
        <div className={styles.container}>

            <div className={`${stylesWin9x.window} ${styles.title}`}>
                <div className={stylesWin9x.title}>Title</div>
                {title}
            </div>


            <div className={styles.slideshow}>
                <SlideshowWidget />
            </div>

            <div className={styles.children} >
                {children}
            </div>

            <div className={styles.lefths}>
            <div className={`${styles.navigation} ${stylesWin9x.window}`}>
                <div className={stylesWin9x.title}>Navigation</div>
                <Navigation />
            </div>

            <div className={`${styles.frens} ${stylesWin9x.window}`}>
                <div className={stylesWin9x.title}>Frens and Interests</div>
                <Frens />
            </div>

            <div className={`${styles.chatbox} ${stylesWin9x.window}`}>
                <div className={stylesWin9x.title}>Catterbox</div> 
            </div>
            </div>

            <div className={styles.footer}>
                <div className={stylesWin9x.window}>
                    <p>Not really Copyright 2023 M4cgyver © Creative Commons CC0, Just credit I really fucking hate the copyright system.</p>
                </div>
            </div>
        </div>
    )
}