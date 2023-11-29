"use server";

import { prisma } from "@/libs/prisma";

interface SearchResult {
    warcTargetURI: string;
    status: string;
    contentType: string;
    location?: string;
    warcDate: Date[];
    lastModified: Date[];
}

export const getArchiveSearchResults = async (query: string, total: number): Promise<SearchResult[]> => {
    const searchResults = await prisma.httpHeaderEntry.findMany({
        take: total,

        where: {
            warcTargetURI: {
                contains: query
            }
        },

        select: {
            warcTargetURI: true,
            status: true,
            contentType: true,
            location: true,
        }
    });

    const warcTargetUris = searchResults.map((result:any) => result.warcTargetURI);

    const searchResultsDates = await prisma.httpHeaderEntry.findMany({
        where: {
            warcTargetURI: {
                in: warcTargetUris
            }
        },
        select: {
            warcTargetURI: true,
            lastModified: true,
            warcDate: true,
        }
    });

    // Aggregate the data
    const aggregatedResults = searchResults.map((result:any) => {
        const matchingDates = searchResultsDates.filter((dateEntry:any) => dateEntry.warcTargetURI === result.warcTargetURI);
        const lastModifiedArray = matchingDates.map((dateEntry:any) => dateEntry.lastModified);
        const warcDateArray = matchingDates.map((dateEntry:any) => dateEntry.warcDate);

        return {
            ...result,
            lastModified: lastModifiedArray,
            warcDate: warcDateArray,
        };
    }); 

    return aggregatedResults;
}