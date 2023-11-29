"use server";

import { prisma } from "@/libs/prisma";
import { warcRedirectBlob, warcRequestUri } from "@/libs/warc";

export const getWarcRequest = async ({ uri, dateArchived, dateModified, eTag }: { uri: string, dateArchived?: string, dateModified?: string, eTag?: string }): Promise<Response> => {

    const where = {
        warcTargetURI: "<" + uri + ">",
        ...(dateModified && { lastModified: new Date(parseInt(dateModified)) }),
        ...(dateArchived && { warcDate: new Date(parseInt(dateArchived)) }),
    };

    //console.log(where, uri, file, dateModified, dateArchived);

    const record = await prisma.httpHeaderEntry.findFirst({
        where: where
    })

    if (!record) {
        return new Response(JSON.stringify({ error: "Given URI not found in database!" }), { status: 404 });
    }

    if (record.status == 301 || record.status == 302 || record.status == 307 || record.status == 308 || record.status == 300) {

        if (!record.location)
            return new Response(JSON.stringify({ error: "The recorded url wants to redirect, but no new uri was recorded!" }), { status: 500 });

        const urlSrc = (record.location.startsWith("http://") || record.location.startsWith("https://"))
            ? record.location
            : (record.location.startsWith("/"))
                ? uri.replace(/\/[^/]*$/, '/') + record.location.slice(1)
                : uri.replace(/\/[^/]*$/, '/') + record.location

        const urlRedirect = "/api/v1/warc?uri=" + encodeURIComponent(urlSrc);

        const responseRedirect = new Response(null, { status: 301, headers: { "location": urlRedirect } });

        //console.log("REDIRECT", responseRedirect);

        return responseRedirect;
    }

    //console.log("TAG", req.headers.get("if-none-match"), record.eTag)

    if (eTag && record.eTag && eTag == record.eTag) {
        return new Response(null, { status: 304 });
    }

    const response = await warcRequestUri("public/" + record.fileName, record.warcOffset);

    response.headers.set("content-type", record.contentType ?? response.headers.get("content-type") ?? "");
    response.headers.set("etag", record.eTag ?? response.headers.get("etag") ?? "")

    const responseRedirected = await warcRedirectBlob(response, (uriHref: string) => {
        const urlSrc = (uriHref.startsWith("http://") || uriHref.startsWith("https://"))
            ? uriHref
            : (uriHref.startsWith("/"))
                ? uri.replace(/\/[^/]*$/, '/') + uriHref.slice(1)
                : (uriHref.startsWith("./"))
                    ? uri.replace(/\/[^/]*$/, '/') + uriHref.slice(2)
                    : uri.replace(/\/[^/]*$/, '/') + uriHref;

        //DEBUG: show redirect src
        //console.log(uri, uriHref, urlSrc);

        const urlRedirect = "/api/v1/warc?uri=" + encodeURIComponent(urlSrc);

        return urlRedirect;
    });

    // Get the current date and time
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 86400 * 1000); // 86400 seconds * 1000 milliseconds/second
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const formattedDate = `${days[futureDate.getUTCDay()]}, ${futureDate.getUTCDate()} ${months[futureDate.getUTCMonth()]} ${futureDate.getUTCFullYear()} ${futureDate.getUTCHours()}:${futureDate.getUTCMinutes()}:${futureDate.getUTCSeconds()} GMT`;
    responseRedirected.headers.set("cache-control", "max-age=86400");
    responseRedirected.headers.set("expires", formattedDate);

    //console.log(responseRedirected, responseRedirected.headers)

    return responseRedirected;
}
export const getWarcRequestText = async ({ uri, dateArchived, dateModified, eTag }: { uri: string, dateArchived?: string, dateModified?: string, eTag?: string }): Promise<string> => {
    return getWarcRequest({ uri: uri, dateArchived: dateArchived, dateModified: dateModified, eTag: eTag }).then(res => res.text());
}