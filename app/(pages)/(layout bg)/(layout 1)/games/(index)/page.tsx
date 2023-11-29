import type { Metadata } from 'next';   

import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"
import TitleCube from '@/components/pizzacube';

export const metadata: Metadata = {
  title:        'General Good Entertainment',
  description:  'Here are some games or movies Ive made over the years, feel free to check them out!',
  
  creator:        'M4cgyver',
  publisher:      'M4cgyver',

  openGraph: {
    title:        'General Good Entertainment',
    description:  'Here are some games or movies Ive made over the years, feel free to check them out!',
    url:          'https://m4cgyver.com/games',
    locale:       'en-US',
    type:         'website',
  }
};

const title = <>
  <h1>{metadata.title?.toString()}</h1>
  <h2>{metadata.description?.toString()}</h2>
</>;

export default function GamesIndexPage() {
  return (<>
    <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
      <div className={stylesWin9x.title}>Title</div>
      <h1>{metadata.title?.toString()}</h1>
      <h2>{metadata.description?.toString()}</h2>

      <TitleCube />
    </div>

    <main className={`${styles.homepage} ${stylesLayout.children} ${stylesWin9x.window}`}>
      <div className={stylesWin9x.title}>Entertainment</div>
 
    </main>
    </>
  );
}