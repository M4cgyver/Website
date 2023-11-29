import { prisma } from "@/libs/prisma";
import { warcRedirectBlob, warcRequestUri } from "@/libs/warc";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { getWarcRequest } from "./actions";

export async function GET(req: NextRequest) {
    const uri = req.nextUrl.searchParams.get("uri");  
    const dateModified = req.nextUrl.searchParams.get("dateModified") ?? undefined;
    const dateArchived = req.nextUrl.searchParams.get("dateArchived") ?? undefined; 

    if (!uri || uri.trim() === "") {
        return new Response(JSON.stringify({ error: "Missing required argument: uri" }), { status: 400 });
    }

    return getWarcRequest({uri:uri, dateArchived: dateArchived, dateModified: dateModified, eTag: req.headers.get("if-none-match") ?? undefined});
}