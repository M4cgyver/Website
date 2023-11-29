import Link from "next/link";

export default function Navigation({ children }: { children?: React.ReactNode }) {
    return (<ul>
        <li><Link href="/">Homepage</Link></li>
        <li><Link href="/contact">Contact / Socials</Link></li>
        <li><Link href="/games">Movies / Games</Link></li>
        <li><Link href="/blogs">Blog Postings</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <ul>
            <li><Link href="/projects/archives">Archives</Link></li> 
            <li><Link href="/projects/startupos">StartupOS</Link></li> 
            <li>Friends
                <ul>
                    <li><Link href="/projects/friends/bic">Bic</Link></li>
                    <li><Link href="/projects/friends/casmier">Casmier</Link></li>
                    <li><Link href="/projects/friends/cookie">Cookie</Link></li>
                    <li><Link href="/projects/friends/neo">Neo</Link></li>
                </ul>
            </li>
        </ul>
    </ul>
    );
}