import Image from "next/image";
import styles from "@/libs/layout.module.css";
import "./globals.css";

import backgroundImage1 from "@/public/static/images/download-db.png";
import backgroundImage2 from "@/public/static/images/asdf2.jpg";
import { fontEagleSpCGA_Alt2x2, fontMario, fontTerminal, fontToshibaTxL1 } from "@/libs/fonts";
import { Metadata, Viewport } from "next";
import SlideshowWidget from "@/components/slideshowwidget";

export const metadata: Metadata = {
  title: 'M4cgyvers Repurposed Mining Rig! ',
  description: 'Welcome to my (M4cgyver) website / resume (depending on whos reading). Written in NextJS 13 and NodeJs all within Docker!',

  creator: 'M4cgyver',
  publisher: 'M4cgyver', 

  openGraph: {
    title: 'M4cgyvers Repurposed Mining Rig! ',
    description: 'Welcome to my (M4cgyver) website / resume (depending on whos reading). Written in NextJS 13 and NodeJs all within a Docker container!',
    url: 'https://m4cgyver.com',
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,

  colorScheme: "dark light",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#970114' },
    { media: '(prefers-color-scheme: dark)', color: '#0d263c' },
  ],
} 

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) { 

  return (
    <html lang="en">
      <body className={`${fontMario.variable} ${fontTerminal.variable} ${fontToshibaTxL1.variable}`}>
        <div className={styles.background}>
          <div className={styles.backgroundDefault}>
            <Image
              src={backgroundImage1}
              alt="Background Image"
              quality={25}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              priority={true}
              loading="eager"
            />
          </div>
          <div className={styles.backgroundDark}>
            <Image
              src={backgroundImage2}
              alt="Background Image"
              quality={25}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              priority={true}
              loading="eager"
            />
          </div>
        </div>
        <div className={styles.container}>

          <div className={styles.slideshow}>
            <SlideshowWidget />
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
