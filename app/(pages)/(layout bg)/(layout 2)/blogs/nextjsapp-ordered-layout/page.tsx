import type { Metadata } from 'next';

import { fontHP100LX6x8 } from '@/libs/fonts';

import stylesWin9x from "@/libs/win98.module.css";
import stylesLayout from "@/libs/layout.module.css";
import styles from "./page.module.css";
import "./globals.css";

import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { nightOwl as codeStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { exampleCode1, exampleCode2Body, exampleCode2Content, exampleCode2Footer, exampleCode2Navigation, exampleCode2Title } from './code';
import Link from 'next/link';

import blogsIcon from "@/public/static/images/blogsnextjs13flexandordericon.jpeg";
import Stickyboard from '@/components/stickyboard';
import DateTimeLocally from '@/components/datetimelocal';
import backIcon from "@/public/static/images/go-back-arrow-svgrepo-com.svg";
import Image from 'next/image';
import Overlay from '@/components/overlay';
import { cookies } from 'next/headers';
import { addView, getCachedFiles, getCachedViews, getFiles } from './actions';
import { Views } from '@/components/views';

export const metadata: Metadata = {
    title: 'NextJS App Ordered Layouts',
    description: 'Explore effective strategies for structuring your NextJS App layouts with precision. Learn how to arrange elements seamlessly within page.tsx and layout.tsx. Use styles, flexbox, and flexbox ordering to decupple the components ordering dependence to enhance user experience. ',

    keywords: ["nextjs", "flex", "order", "m4cgyver", "blogs"],

    creator: 'M4cgyver',
    publisher: 'M4cgyver',
    authors: [{ name: "M4cgyver" }],

    openGraph: {
        title: 'NextJS App Ordered Layouts',
        description: 'Explore effective strategies for structuring your NextJS App layouts with precision. Learn how to arrange elements seamlessly within page.tsx and layout.tsx. Use styles, flexbox, and flexbox ordering to decupple the components ordering dependence to enhance user experience. ',
        url: 'https://m4cgyver.com/blogs/nextjsapp-ordered-layout',
        locale: 'en-US',
        type: 'article',

        images: [
            {
                url: blogsIcon.src
            }
        ]
    }
};
  
export default async function BlogsNextjsAppOrderedLayouts() {
    console.log(process.cwd());
    const cookiesStore = cookies();
    const sessionIdx = cookiesStore.get("sessionidx")?.value;
    const files = await getCachedFiles();

    if (sessionIdx) addView(sessionIdx, '/blogs/nextjsapp-ordered-layout');

    //console.log(files);

    return (
        <>
            <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
                <div className={stylesWin9x.title}>Title</div>
                <h1>{metadata.title?.toString()}</h1>
                <h2>{metadata.description?.toString()}</h2>
                <br />
                <div style={{ position: "relative" }}>
                    <span className={fontHP100LX6x8.className} style={{ float: 'left', fontSize: 18, marginLeft: 2, marginTop: 2, color: "blanchedalmond" }}>Author(s): M4cgyver</span>
                    <span className={fontHP100LX6x8.className} style={{ float: 'right', fontSize: 8, marginRight: 2, marginTop: 5, color: "blanchedalmond", textAlign: "right" }}>Published(s): <DateTimeLocally date={new Date('10/24/2023, 10:58:45 PM')} /> <br />Total Views: <Views /> </span>
                </div>
            </div>

            <div className={stylesLayout.children} style={{ display: "flex", flexDirection: "column" }}>
                <Link href="/blogs" className={`${fontHP100LX6x8.className}`} style={{ color: "blanchedalmond" }}>
                    <Image src={backIcon} alt="" height={18} style={{ marginRight: 12 }} />
                    Go back to the blog listings...
                </Link>

                <span style={{ height: 2 }} />

                <main className={`${stylesWin9x.window} ${styles.content}`}>
                    <div className={stylesWin9x.title}>Blog Posting</div>
                    <h2 className={`${styles.title} ${fontHP100LX6x8.className}`}>Abstract</h2>
                    <div className={styles.containerFloat}>
                        <p className={`${styles.paragraph} ${styles.paragraphFirst} ${styles.floatLeft} ${fontHP100LX6x8.className}`} style={{ width: "calc(100% - 390px)" }}>
                            When looking into the new NextJS (app) layout format, its important to look at all the different ways to format your website. One effective approach to <em>intertwining elements</em> within  <span className={styles.darkhighlight}>page.tsx</span> and  <span className={styles.darkhighlight}>layout.tsx</span> using <em>flex</em> and <em>order</em> properties. This method significantly reduces the amount of client-side code required for memorizing and caching props, especially since props in  <span className={styles.darkhighlight}>layout.tsx</span> remain static and do not update upon page changes. <br /><br />
                            For example (this website), you want a dynamic <em>Title/Introduction</em> component on your website in <span className={styles.darkhighlight}>page.tsx</span>, then you want to statically declaring the <em>Navigation</em> component in <span className={styles.darkhighlight}>layout.tsx</span>, dynamically assigning the Content component based on <span className={styles.darkhighlight}>page.tsx</span>, and once again statically declaring the <em>Footer</em> component in <span className={styles.darkhighlight}>layout.tsx</span>, you can achieve a streamlined and efficient website structure while minimizing how much page and layout data gets sent to the user-end. <br /><br />
                            In this blog post, we will delve into a method that organizes <span className={styles.darkhighlight}>page.tsx</span> and <span className={styles.darkhighlight}>layout.tsx</span> elements and components cohesively, employing CSS <em>flex</em> and <em>order</em> properties to optimize your website's layout and enhance user experience.<br /><br />
                        </p>

                        <table className={`${fontHP100LX6x8.className} ${styles.example1}`}>
                            <tbody>
                                <tr>
                                    <td><span className={styles.exwindow} style={{ backgroundColor: "rgba(40, 156, 17, 0.452)" }}>Introduction</span></td>
                                    <td>page.tsx</td>
                                </tr>
                                <tr>
                                    <td><span className={styles.exwindow}>Navigation</span></td>
                                    <td>layout.tsx</td>
                                </tr>
                                <tr>
                                    <td><span className={styles.exwindow} style={{ backgroundColor: "rgba(40, 156, 17, 0.452)" }}>Content</span></td>
                                    <td>page.tsx</td>
                                </tr>
                                <tr>
                                    <td><span className={styles.exwindow}>Footer</span></td>
                                    <td>layout.tsx</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <span className={styles.spacer}></span>

                    <h2 className={`${styles.title} ${fontHP100LX6x8.className}`}>Vanilla HTML</h2>
                    <p className={`${styles.paragraph} ${styles.paragraphFirst} ${styles.floatLeft} ${fontHP100LX6x8.className}`}>
                        According to the Mozilla Developer, <span className={styles.highlight1}>"The <em>order</em> CSS property sets the <em>order</em> to lay out an item in a <em>flex</em> or grid container. Items in a container are sorted by ascending <em>order</em> value and then by their source code <em>order</em>."</span> <br /> <br />
                        Lets look at an example in vanila HTML:
                    </p>

                    <div style={{ display: "flex", paddingLeft: ".5%", paddingRight: ".5%", marginTop: -18, marginBottom: 4 }}>
                        <div style={{ overflow: "auto" }}>
                            <div className={stylesWin9x.title}>Code: Vanilla HTML</div>
                            <SyntaxHighlighter language='html' style={codeStyle} customStyle={{ margin: 0, border: "2px inset #012027", borderTopStyle: "none" }}>
                                {exampleCode1.trim()}
                            </SyntaxHighlighter>
                        </div>

                        <span style={{ width: 12 }} />

                        <div style={{ overflow: "auto", width: 700, display: "flex", flexDirection: "column" }}>
                            <div className={stylesWin9x.title}>Code: Title</div>
                            <iframe srcDoc={exampleCode1.trim()} style={{ flexGrow: 1 }} />
                        </div>
                    </div>

                    <div className={`${styles.paragraph} ${styles.floatLeft} ${fontHP100LX6x8.className}`} style={{ marginTop: 0 }}>
                        <p style={{ marginBottom: 0 }}>There are a couple things to take away from the example;</p>
                        <ul style={{ marginTop: 0, marginBottom: 0 }}>
                            <li>First we declare the style of the ordered list to be a <Link href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox"><em>flexbox</em></Link> with the <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction"><em>flex-direction</em></Link> to be a <em>column</em>.</li>
                            <li>Then <span className={styles.highlight1}>(this step is not required)</span>, we declare <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator"><em>all of the child div elements</em></Link> to have color, font size, and margins to make our example look neater.</li>
                            <li>Finally, we <em>set the order</em> of the list in each div inline style. As we can see in the code we declared Bread first and Eggs second, though Eggs show up first in the list since we set the order for the Eggs to be the first (1). </li>
                        </ul>
                        <br />
                        <em>Exercise: </em> How would someone insert another list item called Apples in between Bread and Potatoes?
                    </div>

                    <span className={styles.spacer}></span>

                    <h2 className={`${styles.title} ${fontHP100LX6x8.className}`}>Next Implementation</h2>
                    <p className={`${styles.paragraph} ${styles.paragraphFirst} ${styles.floatLeft} ${fontHP100LX6x8.className}`}>
                        In order to seperate the content from the layout and form the page, we need to identify what we want as a "static" element (ie content that isnt page dependent) and elements that are "dynamic (ie content that is page dependent). <br />
                    </p>

                    <table className={`${styles.nextTable} ${fontHP100LX6x8.className}`}>
                        <tbody>
                            <tr>
                                <td><em>Element</em></td>
                                <td><em>Type</em></td>
                                <td><em>File</em></td>
                            </tr>

                            <tr>
                                <td>Title</td>
                                <td>Dynamic</td>
                                <td>page.tsx</td>
                            </tr>

                            <tr>
                                <td>Navigation</td>
                                <td>Static</td>
                                <td>layout.tsx</td>
                            </tr>

                            <tr>
                                <td>Content</td>
                                <td>Dynamic</td>
                                <td>page.tsx</td>
                            </tr>

                            <tr>
                                <td>Footer</td>
                                <td>Static</td>
                                <td>layout.tsx</td>
                            </tr>
                        </tbody>
                    </table>


                    <p className={`${styles.paragraph} ${styles.paragraphFirst} ${fontHP100LX6x8.className}`}>
                        With the elements we want defined, we can start creating the stylesheet for our NextJS web page. We can set the body's display to flex with the direction to the column. Then we can set each element's order to whatever we want. Lets create the needed style code snippets:
                    </p>


                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        <div style={{ overflow: "auto", marginTop: 8, width: "32%", display: "flex", flexDirection: "column" }}>
                            <div className={stylesWin9x.title}>Code: Body</div>
                            <SyntaxHighlighter language='css' style={codeStyle} customStyle={{ margin: 0, border: "2px inset #012027", borderTopStyle: "none", flex: 1 }}>
                                {exampleCode2Body.trim()}
                            </SyntaxHighlighter>
                        </div>

                        <span style={{ width: "4px" }} />

                        <div style={{ overflow: "auto", marginTop: 8, width: "32%", display: "flex", flexDirection: "column" }}>
                            <div className={stylesWin9x.title}>Code: Title</div>
                            <SyntaxHighlighter language='css' style={codeStyle} customStyle={{ margin: 0, border: "2px inset #012027", borderTopStyle: "none", flex: 1 }}>
                                {exampleCode2Title.trim()}
                            </SyntaxHighlighter>
                        </div>

                        <span style={{ width: "4px" }} />

                        <div style={{ overflow: "auto", marginTop: 8, width: "32%", display: "flex", flexDirection: "column" }}>
                            <div className={stylesWin9x.title}>Code: Navigation</div>
                            <SyntaxHighlighter language='css' style={codeStyle} customStyle={{ margin: 0, border: "2px inset #012027", borderTopStyle: "none", flex: 1 }}>
                                {exampleCode2Navigation.trim()}
                            </SyntaxHighlighter>
                        </div>

                        <span style={{ width: "4px" }} />

                        <div style={{ overflow: "auto", marginTop: 8, width: "32%", display: "flex", flexDirection: "column" }}>
                            <div className={stylesWin9x.title}>Code: Content</div>
                            <SyntaxHighlighter language='css' style={codeStyle} customStyle={{ margin: 0, border: "2px inset #012027", borderTopStyle: "none", flex: 1 }}>
                                {exampleCode2Content.trim()}
                            </SyntaxHighlighter>
                        </div>

                        <span style={{ width: "4px" }} />

                        <div style={{ overflow: "auto", marginTop: 8, width: "32%", display: "flex", flexDirection: "column" }}>
                            <div className={stylesWin9x.title}>Code: Footer</div>
                            <SyntaxHighlighter language='css' style={codeStyle} customStyle={{ margin: 0, border: "2px inset #012027", borderTopStyle: "none", flex: 1 }}>
                                {exampleCode2Footer.trim()}
                            </SyntaxHighlighter>
                        </div>
                    </div>


                    <p className={`${styles.paragraph} ${fontHP100LX6x8.className}`} style={{ marginTop: 48 }}>
                        Taking these code snippets we can create a new NextJS project and create a propper website. We can seperate the body code into <span className={styles.darkhighlight}>globals.css</span>, and all of the <em>.title</em>, <em>.navigation</em>, <em>.content</em>, <em>etc.</em> styles into <span className={styles.darkhighlight}>layout.module.css</span> and the <em>body</em> code in <span className={styles.darkhighlight}>globals.css</span> to reference the styles globally. <br /> <br />

                    </p>

                    <div style={{ display: "flex", marginTop: -36 }}>
                        <div style={{ overflow: "auto", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                            <div className={stylesWin9x.title}>Code: <em>globals.css</em></div>
                            <SyntaxHighlighter language='css' style={codeStyle} customStyle={{ margin: 0, border: "2px inset #012027", borderTopStyle: "none", flex: 1 }}>
                                {exampleCode2Body.trim()}
                            </SyntaxHighlighter>
                        </div>

                        <span style={{ width: 4 }} />

                        <div style={{ overflow: "auto", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                            <div className={stylesWin9x.title}>Code: <em>layout.module.css</em></div>
                            <SyntaxHighlighter language='css' style={codeStyle} customStyle={{ margin: 0, border: "2px inset #012027", borderTopStyle: "none", flex: 1 }}>
                                {[exampleCode2Title, exampleCode2Navigation, exampleCode2Content, exampleCode2Footer]
                                    .map(code => code.trim())
                                    .join('\n\n')}
                            </SyntaxHighlighter>
                        </div>

                    </div>

                    <p className={`${styles.paragraph} ${fontHP100LX6x8.className}`} style={{ marginTop: 40 }}>
                        In the final example, we have created a NextJS 13 project with all of the code snippets in their propper files. We also have a live published demo to the right hand side, as well as all of the <em>app/</em> files. Click on one of the files in the drop down menu or on the list to view the code.
                    </p>

                    <div style={{ display: "flex", marginTop: -14 }}>
                        <div style={{ overflow: "auto", width: "65%", display: "flex", flexDirection: "column" }}>
                            <div className={stylesWin9x.title}>Code: <div className={styles.dropdown}>
                                <span><em><u>Select to view</u></em></span>
                                <div className={styles.dropdownContent}>
                                    <ul>
                                        {files.map((file, index) => <li key={index}> <a href={`#code-${file.path.replaceAll(".", "d").replaceAll("/", "s")}`} ><span style={{ color: "white" }}>{file.path.replaceAll("/", " / ")}</span></a></li>)}
                                    </ul>
                                </div>
                            </div></div>

                            <div style={{ display: "block", position: "relative", overflow: "auto", height: 350 }}>
                                {/* Message div with lower z-index */}
                                <div style={{ zIndex: 0, position: "relative", top: 0, left: 0, width: "100%", height: '100%' }}>
                                    <Overlay button={false}> <span style={{ color: "black" }}>Please select a file to view!</span></Overlay>
                                </div>

                                {files.map(async (file) => (
                                    <div
                                        key={file.path}  // Add a unique key for each file
                                        id={`code-${file.path.replaceAll(".", "d").replaceAll("/", "s")}`}
                                        style={{ zIndex: 1, position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                                    >
                                        <SyntaxHighlighter language={file.path.split('.')[1]} style={codeStyle} customStyle={{ margin: 0, border: "2px inset #012027", borderTopStyle: "none", flex: 1 }}>
                                            {file.content}
                                        </SyntaxHighlighter>
                                    </div>
                                ))}
                            </div>


                        </div>

                        <span style={{ width: "8px" }} />

                        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                <div className={stylesWin9x.title}>Published Example</div>
                                <iframe src="/blogs/nextjs13-ordered-layout/exercise-2" style={{ flexGrow: 1 }} />
                            </div>

                            <span style={{ height: 12, width: "100%" }} />

                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div className={stylesWin9x.title}>Example File <em>Click to view</em></div>
                                <table style={{ backgroundColor: "rgba(128,64,32,.2)" }}>
                                    <tbody>
                                        {files.map((file, index) => <tr key={index}><td><a href={`#code-${file.path.replaceAll(".", "d").replaceAll("/", "s")}`} ><span style={{ color: "white" }}>{file.path.replaceAll("/", " / ")}</span></a></td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <span className={styles.spacer}></span>

                    <p className={`${styles.paragraph} ${styles.paragraphFirst} ${styles.floatLeft} ${fontHP100LX6x8.className}`}>
                        Thats about it, you can find the full project at <Link href="https://github.com/M4cgyver/NextJS-13-Flexbox-and-Order/">https://github.com/M4cgyver/NextJS-13-Flexbox-and-Order/</Link>.
                    </p>

                </main>

                <span style={{ height: 36 }} />

                <div className={`${stylesWin9x.window} ${stylesLayout.children} ${styles.content}`} style={{ flex: 1, width: "100%" }}>
                    <div className={stylesWin9x.title}>Sticky Board</div>
                    <Stickyboard documentId='nextjs13-ordered-layout' routePath='/blogs/nextjsapp-ordered-layout' />
                </div>

            </div>
        </>
    );
} 