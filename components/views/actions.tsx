"use server";

import { prisma } from "@/libs/prisma";

export const getViews = ({ path, valid, datetime }: { path?: string, valid?: boolean, datetime?: Date }) => {
    const where = {
        ...(path && { path }),
        valid: valid || true,
        datetime: {
            gte: datetime || undefined,
        },
    };

    return prisma.views.findMany({
        where: where,
        distinct: ["sessionIdx"]
    }).then(views => views.length);
};

export const addView = ({ sessionIdx, path }: { sessionIdx: string, path?: string }) => {
    return prisma.views.create({
        data: {
            sessionIdx: sessionIdx,
            path: path || "/",
        },
    });
};

export const addAndGetViews = ({ sessionIdx, path, valid, datetime }: { sessionIdx: string, path?: string, valid?: boolean, datetime?: Date }): Promise<number> => {
    const ret = addView({ sessionIdx: sessionIdx, path:path }).then(() => getViews({path:path, valid:valid, datetime:datetime}));
    return ret;
}