import type { Metadata } from 'next';   

import styles from "./not-found.module.css"
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"
import SlideshowWidget from '@/components/slideshowwidget';
import Navigation from '@/components/navigation';
import Frens from '@/components/freinds';

export const metadata: Metadata = {
  title:        'Error: 404 Page NotFound',
  description:  'You are trying to access a webpage that doesent exist! Please naviate to literall anyting else.',
  
  creator:        'M4cgyver',
  publisher:      'M4cgyver',

  openGraph: {
    title:        'Error: 404 Page NotFound',
    description:  'You are trying to access a webpage that doesent exist! Please naviate to literall anyting else.',
    url:          'https://m4cgyver.com/_not-found',
    locale:       'en-US',
    type:         'website',
  }
};

const title = <>
  <h1>{metadata.title?.toString()}</h1>
  <h2>{metadata.description?.toString()}</h2>
</>;

export default function ErrorPage404() {
  return (<>
    <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
      <div className={stylesWin9x.title}>Title</div>
      <h1>{metadata.title?.toString()}</h1>
      <h2>{metadata.description?.toString()}</h2>
    </div>

    <main className={`${stylesLayout.children} ${stylesWin9x.window}`}>
      <div className={stylesWin9x.title}>404 Page Not Found!</div>
 
    </main>


    <div className={stylesLayout.slideshow}>
      <SlideshowWidget />
    </div>

    <div className={stylesLayout.lefths}>
      <div className={`${stylesLayout.navigation} ${stylesWin9x.window}`}>
        <div className={stylesWin9x.title}>Navigation</div>
        <Navigation />
      </div>

      <div className={`${stylesLayout.frens} ${stylesWin9x.window}`}>
        <div className={stylesWin9x.title}>Views</div>
        {/*<Views />*/}
      </div>

      <div className={`${stylesLayout.frens} ${stylesWin9x.window}`}>
        <div className={stylesWin9x.title}>Frens and Interests</div>
        <Frens />
      </div>

    </div>

    <div className={stylesLayout.footer}>
      <div className={stylesWin9x.window}>
        <p>Not really Copyright 2023 M4cgyver © Creative Commons CC0, Just credit I really fucking hate the copyright system.</p>
      </div>
    </div>
    </>
  );
}