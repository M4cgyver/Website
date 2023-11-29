import Link from "next/link";
import Slideshow from "@/components/slideshow";
import Image from "next/image";

import imageNextJS13OrderedLayout from "@/public/static/images/blogsnextjs13flexandordericon.jpeg"
import imageAlbanian from "@/public/static/images/flagalbainain.png";
import imageNeo from "@/public/static/images/neocrying.png";
import imageTate from "@/public/static/images/photofunny.net_.jpg";
import imageStardew from "@/public/static/images/stardew2.webp";
import { fontEagleSpCGA_Alt2x2 } from "@/libs/fonts";

export default function SlideshowWidget() {
    return (
        <div className={`${fontEagleSpCGA_Alt2x2.variable}`}>
            <Slideshow>
                <Link href="/blogs/nextjsapp-ordered-layout">
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1920/1080", overflow: "hidden", borderRadius: 10 }} >
                        <Image src={imageNextJS13OrderedLayout} width={230} height={130} alt="stardew" style={{ width: "100%", height: "100%" }} placeholder="blur" />

                        <div style={{ position: "absolute", zIndex: 2, top: 0, left: 0, width: "100%", aspectRatio: "1920/1080", color: "black", fontFamily: "var(--font-eaglespcga_alt2x2y)", backgroundColor: "rgba(214, 183, 157, .7)", wordWrap: "break-word" }}>
                            <div style={{ bottom: 0, position: "absolute", padding: 3 }} >
                                <span style={{ marginLeft: 4, fontSize: "1.25em" }}><b>Blog:</b> Next and Order </span> <br />
                                <span style={{ marginLeft: 4, fontSize: ".75em" }}>Learn about how to use order w/ flex <br />in Nextjs </span>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="/projects/friends/bic">
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1920/1080", overflow: "hidden", borderRadius: 10 }} >
                        <Image src={imageAlbanian} width={230} height={130} alt="stardew" style={{ width: "100%", height: "100%" }} placeholder="blur" />

                        <div style={{ position: "absolute", zIndex: 2, top: 0, left: 0, width: "100%", aspectRatio: "1920/1080", color: "black", fontFamily: "var(--font-eaglespcga_alt2x2y)", backgroundColor: "rgba(214, 183, 157, .7)", wordWrap: "break-word" }}>
                            <div style={{ bottom: 0, position: "absolute", padding: 3 }} >
                                <span style={{ marginLeft: 4, fontSize: "1.25em" }}>Bic Pen Island </span> <br />
                                <span style={{ marginLeft: 4, fontSize: ".75em" }}>He plays Genshin Impact He plays Genshin Impact <br />Spam his DMs with shitty TikToks its great</span>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="/projects/friends/neo">
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1920/1080", overflow: "hidden", borderRadius: 10 }} >
                        <Image src={imageNeo} width={230} height={130} alt="stardew" style={{ width: "100%", height: "100%" }} placeholder="blur" />

                        <div style={{ position: "absolute", zIndex: 2, top: 0, left: 0, width: "100%", aspectRatio: "1920/1080", color: "black", fontFamily: "var(--font-eaglespcga_alt2x2y)", backgroundColor: "rgba(154, 235, 146, .7)", wordWrap: "break-word" }}>
                            <div style={{ bottom: 0, position: "absolute", padding: 3 }} >
                                <span style={{ marginLeft: 4, fontSize: "1.25em" }}>Neos Dox </span> <br />
                                <span style={{ marginLeft: 4, fontSize: ".75em" }}>He plays Genshin Impact He plays Genshin Impact <br />-rep cant even do basic math ong</span>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="/projects/friends/cookie">
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1920/1080", overflow: "hidden", borderRadius: 10 }} >
                        <Image src={imageTate} width={230} height={130} alt="stardew" style={{ width: "100%", height: "100%" }} placeholder="blur" />

                        <div style={{ position: "absolute", zIndex: 2, top: 0, left: 0, width: "100%", aspectRatio: "1920/1080", color: "black", fontFamily: "var(--font-eaglespcga_alt2x2y)", backgroundColor: "rgba(230, 180, 134, .7)", wordWrap: "break-word" }}>
                            <div style={{ bottom: 0, position: "absolute", padding: 3 }} >
                                <span style={{ marginLeft: 4, fontSize: "1.25em" }}>Cookies Petition </span> <br />
                                <span style={{ marginLeft: 4, fontSize: ".75em" }}>This man was caught lacking with copper<br />Sign this petition to personally break him out!</span>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="/projects/friends/casmier">
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1920/1080", overflow: "hidden", borderRadius: 10 }} >
                        <Image src={imageStardew} width={230} height={130} alt="stardew" style={{ width: "100%", height: "100%" }} placeholder="blur" />
                        <div style={{ position: "absolute", zIndex: 2, top: 0, left: 0, width: "100%", aspectRatio: "1920/1080", color: "black", fontFamily: "var(--font-eaglespcga_alt2x2y)", backgroundColor: "rgba(128, 149, 232, .7)", wordWrap: "break-word" }}>
                            <div style={{ bottom: 0, position: "absolute", padding: 3 }} >
                                <span style={{ marginLeft: 4, fontSize: "1.25em" }}>Casmiers Webpage </span> <br />
                                <span style={{ marginLeft: 4, fontSize: ".75em" }}>He took too long to get back on Stardew Valley <br />so I decided to slander him</span>
                            </div>
                        </div>
                    </div>
                </Link>


            </Slideshow>
        </div>);
}