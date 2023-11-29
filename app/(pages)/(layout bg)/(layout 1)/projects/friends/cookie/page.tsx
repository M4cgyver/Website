import { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';
import Stickyboard from '@/components/stickyboard';
import Overlay from '@/components/overlay';

import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"

import backgroundImage from "@/public/static/images/paper.gif"

//TODO: remap this to the Homepage metadata
export const metadata: Metadata = {
  title: '#FreeCookie Political Movement!',
  description: 'Our friend Cookie, also known as David, is in jail for allegedly stealing copper wire. While it\'s a mistake, I don\'t think he should be in jail for it. Getting him back into our friend group is important because he\'s a valuable member of our Stardew Valley lobby, skilled at CSGO2, and a funny guy.',

  creator: 'M4cgyver',
  publisher: 'M4cgyver',

  openGraph: {
    title: '#FreeCookie Political Movement!',
    description: 'Our friend Cookie, also known as David, is in jail for allegedly stealing copper wire. While it\'s a mistake, I don\'t think he should be in jail for it. Getting him back into our friend group is important because he\'s a valuable member of our Stardew Valley lobby, skilled at CSGO2, and a funny guy.',
    url: 'https://m4cgyver.com/friends/cookie',
    locale: 'en-US',
    type: 'website',
  }
};

export default function Cookie() {

  return (<>
    <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
      <div className={stylesWin9x.title}>Title</div>
      <h1>{metadata.title?.toString()}</h1>
      <h2>{metadata.description?.toString()}</h2>
    </div>

    <main className={`${stylesWin9x.window} ${styles.cookie} ${stylesLayout.children}`}>
      
      <div className={stylesWin9x.title}>Cyka blyat</div>
      <div style={{ position: "relative" }}>

        <Overlay>
          <span style={{ textAlign: 'center' }}>
            This man now officially has a Job! <br /> He will steal copper from the job site (THIS IS A FUCKING JOKE)<br />
            <Link href="/static/images/Screenshot_20230430_082549.png" style={{ marginRight: 4 }}><Image src="/static/images/Screenshot_20230430_082549.png" width={400} height={250} alt="mald"></Image></Link>
            <Link href="/static/images/173BE7E0-E3E2-4EE7-9780-04ECDDEDD73C.jpg" ><Image src="/static/images/173BE7E0-E3E2-4EE7-9780-04ECDDEDD73C.jpg" width={250} height={250} alt="sexy motherfucker"></Image></Link>
          </span>
        </Overlay>

        <div style={{ padding: ".25em" }}>
          <div style={{ overflow: "auto" }}>
            <h1 style={{ float: "left" }}>Help, Our friend needs your help!</h1>
            <h1 style={{ float: "right" }}>#FreeCookie</h1>
          </div>
          <p>Jontavious higgle bottom, otherwise known as David is apperently in fucking jail or something because he tried to steal copper wire. Dont get me wrong this is incredibly fucking retarded but I dont think he should be in jail, yall acting as if he robbed a gass station or something. Its incredibly important that we get him back into our friend group for the main reasons listed down below:</p>

          <h2>Hes in our Stardew Valley lobby</h2>
          <p>Ill admit I fucked up Gusses Stardew character in order to get other people to join. In fairness though Casmier didnt toggle the option for other players to join so theres enough blame to go around :D</p>
          <p>If we loose cookie that is a lot of slave labor going out the window on Gusses account. Since I bew up a lot of shit with a megabomb and we need to make up that profit</p>

          <h2>Hes god at CSGO2</h2>
          <p>Well, imagine a guy who always has a funny one-liner ready, even in the most intense moments of a Counter-Strike: Global Offensive (CSGO) match. Hes quick with a joke and always keeps his teammates laughing and relaxed. But when it comes to gameplay, hes a force to be reckoned with. He seems to have an uncanny ability to predict where the enemy is hiding and always manages to pull off clutch plays that turn the tide of the match in his teams favor. In fact, hes so good that some opponents might even accuse him of cheating! But despite any accusations, he remains cool and collected, continuing to make incredible plays while cracking jokes and keeping his teams spirits high.</p>

          <h2>Hes a funny guy</h2>
          <p>Ive known David for about half a decade now and I can say for certain he is a great guy. A little bit retarted but hes a great guy. I have no complaints about metting him or knowing him. Im sure that if the $(COUNTY) understands that the economy is going to shit and inflation has really hit hard on the perc4s he can be released without question.</p>
        </div>

      </div>

      <br />

      <Stickyboard documentId="cookie" routePath="/projects/friends/cookie" />

      <span className={styles.clearfix} />
    </main>
  </>)
}    