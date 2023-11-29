import DateTimeLocally from "@/components/datetimelocal"; 
import Link from "next/link";
import styles from "./page.module.css" 
import { getArchiveSearchResults } from "./actions";

export const ArchiveSearchResults = async ({searchQuery, searchSize} : {searchQuery: string, searchSize: number}) => {
    const results = await getArchiveSearchResults(searchQuery, searchSize);

    return (<ul style={{ margin: 12, padding: 0, listStyle: "none" }}>
        {results.map((result, index) => {
            return (
                <li key={index} style={{ paddingTop: 4, paddingLeft: 2, paddingBottom: 4 }} className={(index % 2 == 1) ? styles.lighter : styles.darker}>
                    <Link style={{ color: "darkblue" }} prefetch={false} href={`/projects/archives/viewer?uri=${encodeURIComponent(result.warcTargetURI.slice(1, result.warcTargetURI.length - 1))}`}>{result.warcTargetURI}</Link>
                    <ul style={{ paddingTop: 4, paddingBottom: 12 }}>
                        <li><p style={{ margin: 0 }}><span style={{ fontWeight: "bold" }}>STATUS </span>{result.status}</p></li>
                        <li><p style={{ margin: 0 }}><span style={{ fontWeight: "bold" }}>TYPE </span>{result.contentType}</p></li>
                        {result.location && <li><p style={{ margin: 0 }}><span style={{ fontWeight: "bold" }}>LOCATION </span>
                            <Link style={{ color: "darkblue" }} prefetch={false} href={`/projects/archives/viewer?uri=${encodeURIComponent(result.location)}`}>{result.location}</Link>
                        </p></li>}
                        <li>
                            <ul style={{ padding: 0 }}><p style={{ margin: 0 }}><span style={{ fontWeight: "bold" }}>DATES MODIFIED</span></p>
                                {result.warcDate.map((resultDate, index) =>
                                    <li key={index} style={{ marginLeft: 40 }}>
                                        <Link style={{ color: "darkblue" }} prefetch={false} href={`/projects/archives/viewer?uri=${encodeURIComponent(result.warcTargetURI.slice(1, result.warcTargetURI.length - 1))}&dateArchived=${resultDate?.getTime()}`} >
                                            <DateTimeLocally date={new Date(resultDate?.toISOString() ?? "")} />
                                        </Link>
                                    </li>
                                )}
                            </ul>

                            <ul style={{ padding: 0 }}><p style={{ margin: 0 }}><span style={{ fontWeight: "bold" }}>DATES ARCHIVED</span></p>
                                {result.lastModified.map((resultDate, index) =>
                                    <li key={index} style={{ marginLeft: 40 }}>
                                        <Link style={{ color: "darkblue" }} prefetch={false} href={`/projects/archives/viewer?uri=${encodeURIComponent(result.warcTargetURI.slice(1, result.warcTargetURI.length - 1))}&dateModified=${resultDate?.getTime()}`} >
                                            <DateTimeLocally date={new Date(resultDate?.toISOString() ?? "")} />
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </li>)
        })}
    </ul>);
}