"use client";

import React, { useState } from 'react';

import styles from "./slideshow.module.css"

type Props = {
  children?: React.ReactNode;
  slideWidth?: string;
};

const Slideshow = ({ children, slideWidth }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  }

  return (
    <div className={styles.slideshow}>
      
      <div className={styles.slides} style={{ transform: `translateX(-${activeIndex * (parseInt(slideWidth || "22") + 1)}%)`, transition: "transform 0.2s ease-in-out" }}>
        {React.Children.map(children, (child, index) => (
          <div className={`${styles.slide} ${index === activeIndex ? styles.active : ""}`} style={{ width: `${slideWidth}%` }} >
            {child}
          </div>
        ))}
      </div>

      <div className={styles.buttonContainer}>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${styles.button} ${index === activeIndex ? styles.active : ""}`}
              onClick={() => handleButtonClick(index)} // subtract 3 from the index to adjust for button labels
            >
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Slideshow;
