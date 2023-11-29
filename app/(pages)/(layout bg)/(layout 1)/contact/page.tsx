import { Metadata } from "next";
import Link from "next/link";

import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"

import Image from "next/image";
import icoPleroma from "@/public/static/images/pleroma_logo_vector_nobg_nopan.svg"
import icoYoutube from "@/public/static/images/youtube-icon-logo-png-transparent.png"
import icoNewgrounds from "@/public/static/images/ngicon.png"
import icoGmail from "@/public/static/images/Gmail_Icon_(2013-2020).svg"
import icoSnek from "@/public/static/images/1562d08139595a93957619d7bab7f6354b479e278bb8859303ecbea7ba4d527e_1 (1).png"
import TitleCube from "@/components/pizzacube";

export const metadata: Metadata = {
  title: 'Contact and Socials.',
  description: 'Heres my contact infomation and my socials. If you need or want to reach out for whatever these are the easiest methods!',

  keywords: ["m4cgyver", "contact", "socials", "social media"],

  creator: 'M4cgyver',
  publisher: 'M4cgyver',

  openGraph: {
    title: 'Contact and Socials.',
    description: 'Heres my contact infomation and my socials. If you need or want to reach out for whatever these are the easiest methods!',
    url: 'https://m4cgyver.com/projects',
    locale: 'en-US',
    type: 'website',
  }
};

export default function ContactPage() {
  return (<>
    <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
      <div className={stylesWin9x.title}>Title</div>
      <TitleCube />
      <h1>{metadata.title?.toString()}</h1>
      <h2>{metadata.description?.toString()}</h2>
    </div>

    <main className={`${styles.contact} ${stylesLayout.children} ${stylesWin9x.window}`}>
      <div className={stylesWin9x.title}>Socials</div>
      <br />
      <h3>Fell free to reachout however you want. NOTE: I am extreamly lazy and may not check my socials please be pacient.</h3>
      <ul>
        <li>
          <Image src={icoNewgrounds} alt="" height={64}></Image> <br />
          <Link href="https://m4cgyver.newgrounds.com/">Newgrounds</Link>
        </li>


        <li>
          <Image src={icoPleroma} alt="" height={64}></Image> <br />
          <Link href="http://fed.m4cgyver.net/users/m4c">Fediverse (Pleroma)</Link>
        </li>

        <li>
          <Image src={icoYoutube} alt="" height={64}></Image> <br />
          <Link href="https://www.youtube.com/@smgamingcoder3564">Youtube</Link>
        </li>

        <li>
          <Image src={icoGmail} alt="" height={64}></Image> <br />
          <Link href="mailto:recipient@example.com">m4cgyverisvoid@gmail.com</Link>
        </li>
      </ul>

      <Image src={icoSnek} alt="" height={200} quality={100} className={styles.snek} />
    </main>
  </>);
}
