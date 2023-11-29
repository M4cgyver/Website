"use server";

import { prisma } from "@/libs/prisma";
import { Sticky } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getStickies = async (documentId: Sticky["documentId"]) => {
    const stickies = await prisma.sticky.findMany(
        {
            where: { documentId: documentId },
            orderBy: { datetime: 'desc' },
        });
    return stickies;
}

export const createStickies = async (sticky:Sticky, routePath?: string) => {
    const stickyNew = await prisma.sticky.create({
        data: sticky
    }) 

    revalidatePath(routePath ?? "/");

    return stickyNew;
}