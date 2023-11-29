import type { Metadata } from 'next';

import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"
import TitleCube from '@/components/pizzacube';
import { getBlogs } from './actions';
import Image from 'next/image';
import Link from 'next/link';
import { fontHP100LX6x8, fontToshibaTxL1, fontToshibaTxL2 } from '@/libs/fonts';
import DateTimeLocally from '@/components/datetimelocal';

export const metadata: Metadata = {
  title: 'M4cgyvers Bountifull Blog Posts. ',
  description: 'Here are a list of all of the thoughts or comments I have about anything happening on the Internet (or internet).',

  creator: 'M4cgyver',
  publisher: 'M4cgyver',

  openGraph: {
    title: 'M4cgyvers Bountifull Blog Posts. ',
    description: 'Here are a list of all of the thoughts or comments I have about anything happening on the Internet (or internet).',
    url: 'https://m4cgyver.com/blogs',
    locale: 'en-US',
    type: 'website',
  }
};
 

export default function BlogsIndexPage() {
  const blogs = getBlogs();

  return (
    <>
      <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
        <TitleCube />
        <div className={stylesWin9x.title}>Title</div>
        <h1>{metadata.title?.toString()}</h1>
        <h2>{metadata.description?.toString()}</h2>
      </div>

      <main className={`${styles.homepage} ${stylesLayout.children} ${stylesWin9x.window}`}>
        <div className={stylesWin9x.title}>Blog Entries</div>
        <div className={styles.blogs}>
          {
            blogs.map((blog, index) =>
              <div key={index}>
                <Link href={blog.href} prefetch={true}><Image src={blog.logo} alt="" width={140} placeholder='blur'/></Link>
                <Link href={blog.href} prefetch={true}><h1 className={`${fontHP100LX6x8.className}`}>{blog.title}</h1> </Link>
                <DateTimeLocally date={blog.date} className={`${fontToshibaTxL2.className}`} />
                <h2 className={`${fontToshibaTxL2.className}`}>{blog.description}</h2>
              </div>
            )
          }
        </div>
      </main>
    </>);
}