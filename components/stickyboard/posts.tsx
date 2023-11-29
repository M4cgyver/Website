"use client";

import styles from "./index.module.css"
import StickyboardForm from "./forum";
import StickyboardPostedNote from './posted';
import { Sticky } from "@prisma/client";

import { useOptimistic } from "react";
import { createStickies } from "./actions";

export const StickyboardPosts = ({ documentId, routePath, stickies }: { documentId: Sticky["documentId"], routePath: string, stickies: Sticky[] }) => {

    const [optimisticPosts, addOptimisticPosts] = useOptimistic([], (state: Sticky[], newPost: Sticky) => {
        return [...state, newPost];
    })

    return <>
        <div className={styles.note}>
            <StickyboardForm documentId={documentId} routePath={routePath} onPost={async (post: Sticky) => {

                addOptimisticPosts({
                    ...post,
                    id: Math.max(...optimisticPosts.map(item => item.id)) + 1
                });

                await createStickies(post, routePath);
            }} />
        </div>

        {stickies.map(sticky => <StickyboardPostedNote key={sticky.id} sticky={sticky} />)}
    </>
}