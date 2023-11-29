import { addView as native_addView, getViews as native_getViews } from "@/components/views/actions";
import fs from "fs";
import { unstable_cache as cache, revalidatePath, revalidateTag } from "next/cache";
import path from 'path'; 

export const revalidate = Infinity;

export interface FileN13FAO {
    path: string,
    content: string
}
 
export const getFiles = async (): Promise<FileN13FAO[]> => {
    const dir = path.join(process.cwd(), 'app', '(pages)', '(layout specific)', 'blogs', 'nextjs13-ordered-layout', 'exercise-2');
    const filesDir = (await fs.readdirSync(dir, { recursive: true })) as string[];
    const files = filesDir.filter(file => file.includes("."));

    const contents = files.map(file => {
        return {
            path: file,
            content: fs.readFileSync(dir + "/" + file).toString()
        }
    });

    console.log("blogs/nextjsapp-ordered-layout.files");

    return contents;
}

export const addView = async (sessionIdx:string, path:string) => {
    console.log("adding views");

    await native_addView({sessionIdx: sessionIdx, path: path});

    revalidateTag("views");

    console.log("added view");
}
 
export const getCachedFiles = cache(async () => getFiles(), ["blogs/nextjsapp-ordered-layout.files"]);

export const getCachedViews = (path: string) => {
    const c = cache(() => native_getViews({path: path}), [path, "views"], {
        tags: ["views", path]
    });

    revalidatePath("blogs/nextjsapp-ordered-layout.files");

    return c();
}