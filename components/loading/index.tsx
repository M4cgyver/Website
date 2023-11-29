import styles from '@/components/overlay/index.module.css'

export default function Loading({ children }: { children?: React.ReactNode }) { 
  return (
    <div className={`${styles.overlay}`}>
      <span className={styles.alert}>Loading...</span>
      {children}
    </div>
  );
}
