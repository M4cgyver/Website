"use client";

import styles from './index.module.css';
import { useState } from 'react';

export default function Overlay({ children, button }: { children?: React.ReactNode, button?:boolean }) {
  const [showOverlay, setOverlay] = useState(true); 
  const showButton = button ?? true;

  return (
    <div className={`${styles.overlay} ${showOverlay ? '' : styles.hidden}`}>
      <span className={styles.alert}>Heads up!</span>
      {children}
      <button style={{display: `${(showButton) ? 'block' : 'none'}`}} className={styles.confirm} onClick={() => {setOverlay(false)}}>I Understand!</button>
    </div>
  );
}
