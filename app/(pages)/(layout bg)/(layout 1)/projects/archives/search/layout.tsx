import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"
import { Metadata } from "next";
import { ArchiveSearchForum } from "./form";

export const metadata: Metadata = {
  title: 'M4cgyvers Archive File Search',
  description: 'Lookup a link to see if it has been archived yet! If you want to archive a page send me an email.',

  creator: 'M4cgyver',
  publisher: 'M4cgyver',

  openGraph: {
    title: 'M4cgyvers Archival Search',
    description: 'Lookup a link to see if it has been archived yet! If you want to archive a page or a website send me an email. ',
    url: 'https://m4cgyver.com/projects/archive/search',
    locale: 'en-US',
    type: 'website',
  }
};

const title = <>
  <h1>{metadata.title?.toString()}</h1>
  <h2>{metadata.description?.toString()}</h2>
</>;

export default function ArchiveSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>
    <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
      <div className={stylesWin9x.title}>Title</div>
      <h1>{metadata.title?.toString()}</h1>
      <h2>{metadata.description?.toString()}</h2>
    </div>

    <main className={`${styles.archivesearch} ${stylesWin9x.window} ${stylesLayout.children}`}>
      <div className={stylesWin9x.title}>Web Archive Lookup</div>

      <ArchiveSearchForum  />
      
      {children}

    </main>
  </>
  )
}