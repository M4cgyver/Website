import styles from './cube.module.css';

export default function Cube({ children }: {children?: React.ReactNode}) {
    return (
      <div className={styles.cube}>
        <div className={`${styles.side} ${styles.front}`}>{children}</div>
        <div className={`${styles.side} ${styles.back}`}>{children}</div>
        <div className={`${styles.side} ${styles.top}`}>{children}</div>
        <div className={`${styles.side} ${styles.bottom}`}>{children}</div>
        <div className={`${styles.side} ${styles.right}`}>{children}</div>
        <div className={`${styles.side} ${styles.left}`}>{children}</div>
      </div>
    );
  }