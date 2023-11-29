"use client";

import { getWarcRequest, getWarcRequestText } from "@/app/api/v1/warc/actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const WarcIFrame = async ({ uri, dateModified, dateArchived }: { uri: string,  dateModified?: number, dateArchived?: number }) => {
    const apiRoute = `/api/v1/warc?uri=${encodeURIComponent(uri ?? "")}&dateModified=${dateModified?.toString() ?? ""}&dateArchived=${dateArchived?.toString() ?? ""}`;

    /* Client Props */
    const router = useRouter();
    const iframe = useRef<HTMLIFrameElement>(null);

    /* Client Actions */
    const handleClick = (event: MouseEvent) => {
        const element: HTMLElement = (event.target as HTMLElement);

        if (element.tagName !== "A") return;

        event.preventDefault();

        const anchor: HTMLAnchorElement = (event.target as HTMLAnchorElement);
        const url: URL = new URL(anchor.href);
        const params: URLSearchParams = new URLSearchParams(url.searchParams);

        router.push(`/projects/archives/viewer?uri=${encodeURIComponent(params.get("uri") ?? "")}&dateModified=${dateModified?.toString() ?? ""}&dateArchived=${dateArchived?.toString() ?? ""}`)
    }

    useEffect(() => {
        const contentWindow = iframe.current?.contentWindow;

        if (contentWindow) {
            contentWindow.addEventListener("click", handleClick);

            return () => {
                contentWindow.removeEventListener("click", handleClick);
            };
        }
    }, [iframe.current?.contentWindow]);

    return <>
        <iframe src={apiRoute} ref={iframe} sandbox="allow-top-navigation allow-same-origin allow-scripts" />
    </>;
}