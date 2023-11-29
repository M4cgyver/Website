import { Suspense } from "react";
import { ArchiveSearchResults } from "./results";
import { ArchiveSearchForum } from "./form"; 
import styles from "./page.module.css"
import Loading from "@/components/loading";

export const ArchiveSearchBody = async ({ searchParams }: { searchParams: { query: string, total: number } }) => {
    const searchQuery = searchParams.query ?? "";
    const searchSize = Number(searchParams.total) ?? 36;

    return <>
        <ArchiveSearchForum searchQuery={searchQuery} searchSize={searchSize} />

        <Suspense fallback=
            {<div className={styles.loading}>
                <Loading>
                    The archive's search query is loading, please wait...
                </Loading>
            </div>}>

            <ArchiveSearchResults searchQuery={searchQuery} searchSize={searchSize} />
        </Suspense>
    </>
}