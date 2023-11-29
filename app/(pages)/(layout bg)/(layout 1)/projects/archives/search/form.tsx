"use client";

import { RedirectType, redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export const ArchiveSearchForum = ({ searchQuery, searchSize }: { searchQuery?: string, searchSize?: string | number }) => {

    const router = useRouter();
    const params = useSearchParams();
    const query = searchQuery ?? params.get("query") ?? "";
    const total = parseInt(searchSize?.toString() ?? params.get("total") ?? "32");

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const query = formData.get("query") ?? ""
        const total = formData.get("total") ?? 36;

        router.push(`/projects/archives/search?query=${query}&total=${total}` );
      }

    return (<form method='get' action="/projects/archives/search" onSubmit={onSubmit} style={{ display: "flex", backgroundColor: "#FFFFFF6F", padding: ".5em", margin: "2px", marginTop: "4px" }}>
        <label style={{ marginRight: ".2em" }}>Search: </label>
        <input type="input" id="query" name="query" defaultValue={query} style={{ flexGrow: 1, marginRight: ".5em" }} />
        <label>Total: </label>
        <select name="total" id="total" defaultValue={total} style={{ marginRight: ".5em" }}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="36">36</option>
            <option value="50">50</option>
            <option value="64">64</option>
            <option value="75">75</option>
            <option value="100">100</option>
            <option value="128">128</option>
        </select>
        <button type="submit">Search</button>
    </form>);
}