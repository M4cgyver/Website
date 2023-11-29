import { ArchiveSearchResults } from "./results";

export default async function ArchiveSearch({ searchParams }: { searchParams: { query?: string, total?: string } }) {
    return <ArchiveSearchResults searchQuery={searchParams.query ?? ""} searchSize={parseInt(searchParams.total ?? "32")} />;
}