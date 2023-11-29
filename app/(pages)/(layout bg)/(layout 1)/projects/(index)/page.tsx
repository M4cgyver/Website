import type { Metadata } from 'next';
import { getProjects } from './actions';
import Image from 'next/image';
import Link from 'next/link';

import styles from "./page.module.css";
import stylesLayout from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"
import TitleCube from '@/components/pizzacube';

export const metadata: Metadata = {
  title: 'Projects and Workloads.',
  description: 'Here are some projects I have been working on, fell free to check them out. Javascript required for some projects!',

  keywords: ["m4cgyver", "projects"],

  creator: 'M4cgyver',
  publisher: 'M4cgyver',

  openGraph: {
    title: 'Projects and Workloads.',
    description: 'Here are some projects I have been working on, fell free to check them out. Javascript required for some projects!',
    url: 'https://m4cgyver.com/projects',
    locale: 'en-US',
    type: 'website',
  }
};

export default async function ProjectsIndexPage() {
  const projects = await getProjects();

  return (<>
    <div className={`${stylesWin9x.window} ${stylesLayout.title}`}>
      <div className={stylesWin9x.title}>Title</div>

      <TitleCube />
      <h1>{metadata.title?.toString()}</h1>
      <h2>{metadata.description?.toString()}</h2>
    </div>

    <main className={`${styles.homepage} ${stylesLayout.children} ${stylesWin9x.window}`}>
      <div className={stylesWin9x.title}>Projects </div>

      <div className={styles.projects}>
        {projects.map((project, index) =>
          <div className={styles.project} key={index}>
            <Link href={project.href} prefetch={false}>
              <Image src={project.icon} alt='image' width={265} height={156} quality={10} placeholder='blur' />
              <span className={styles.description}>
                <h1>{project.name}</h1>
                <h2>{project.descShort}</h2>
              </span>
            </Link>
          </div>
        )}
      </div>
    </main>
  </>);
}