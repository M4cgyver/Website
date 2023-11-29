import Navigation from "@/components/navigation"; 
import styles from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>
      <div className={`${styles.navigation2}`}>
        <Navigation />
      </div> 

      {children}

      <div className={styles.footer}>
        <div className={stylesWin9x.window}>
          <p>Not really Copyright 2023 M4cgyver © Creative Commons CC0, Just credit I really fucking hate the copyright system.</p>
        </div>
      </div>
    </>);
}