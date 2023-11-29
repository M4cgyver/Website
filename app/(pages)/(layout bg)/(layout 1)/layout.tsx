import styles from "@/libs/layout.module.css"
import stylesWin9x from "@/libs/win98.module.css"

import Navigation from "@/components/navigation"
import Frens from "@/components/freinds"  
import { ViewsTable } from "@/components/views/table"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>
    {children}
 
    <div className={`${styles.lefths}`}>
      <div className={`${styles.navigation} ${stylesWin9x.window}`}>
        <div className={stylesWin9x.title}>Navigation</div>
        <Navigation />
      </div>

      <div className={`${styles.frens} ${stylesWin9x.window}`}>
        <div className={stylesWin9x.title}>Views</div>
        <ViewsTable/>
      </div>

      <div className={`${styles.frens} ${stylesWin9x.window}`}>
        <div className={stylesWin9x.title}>Frens and Interests</div>
        <Frens />
      </div>

    </div>

    <div className={styles.footer}>
      <div className={stylesWin9x.window}>
        <p>Not really Copyright 2023 M4cgyver © Creative Commons CC0, Just credit I really fucking hate the copyright system.</p>
      </div>
    </div>
  </>
  )
}