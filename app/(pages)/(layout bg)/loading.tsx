import Loading from "@/components/loading";

import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"

import { fontToshibaTxL1 } from "@/libs/fonts";

export default function DefaultLoading() {
    return (<>
        <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
            <div className={stylesWin9x.title}>Title</div>
            <h1>Loading...</h1>
            <h2>Why do non async pages need loading screens???</h2>
        </div>

        <main className={`${stylesLayout.children} ${stylesWin9x.window}`}>
            <div className={stylesWin9x.title}>Projects </div>
            <div style={{ position: "relative", aspectRatio: "1920/1080" }}>
                <Loading>
                    The page is loading, please wait...
                </Loading>
            </div>
        </main>
    </>);
}