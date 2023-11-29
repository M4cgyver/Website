import '@fontsource/reenie-beanie';

import { Sticky } from "@prisma/client";
import { getStickies, createStickies } from "./actions";
import styles from "./index.module.css" 
import { StickyboardPosts } from './posts';

export default async function Stickyboard({ documentId, routePath }: { documentId: Sticky["documentId"], routePath: string }) {
    const stickies = await getStickies(documentId);

    return (
        <div className={styles.grid}>
           <StickyboardPosts documentId={documentId} routePath={routePath} stickies={stickies}/> 
        </div>
    )
}
