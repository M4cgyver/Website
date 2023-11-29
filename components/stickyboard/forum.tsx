"use client";

import { Sticky } from "@prisma/client";
import { createStickies } from "./actions";
import styles from "./index.module.css"
import { LegacyRef, useRef } from "react";
import { FormButton } from "./formButton";


export default function StickyboardForm({ documentId, routePath, onPost }: { documentId: Sticky["documentId"], routePath: string, onPost:CallableFunction }) {
    const ref = useRef<HTMLFormElement>(null);

    return (
        <form ref={ref} action={async formData => {
            ref.current?.reset();

            await onPost({ 
                documentId: documentId,
                sessionIdx: "", //TODO: later implement
                username: formData.get("username") as string,
                content: formData.get("content") as string,
                datetime: new Date()
            })
        }}>
            <input className={styles.title} name="username" placeholder="Username" type="text" defaultValue="" />
            <textarea className={styles.content} name="content" placeholder="Content" defaultValue="" />
            <input name="documentId" type="text" defaultValue={documentId} hidden />
            <input name="routePath" type="text" defaultValue={routePath} hidden />
            <span className={styles.btnSpacer} />
            <FormButton />
        </form>
    );
}