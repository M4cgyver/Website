"use client";

import Image from "next/image";
import pizzaIcon from "@/public/static/images/pizza.png"

import { useRef } from "react";
import Cube from "./cube";

export default function TitleCube() {
  const audioBoom = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (audioBoom.current) {
      audioBoom.current.currentTime = 0.25;
      audioBoom.current.play();
    }
  };

  return (
    <div style={{ cursor: "pointer", position: "absolute", right: 32, top: 36 }} onClick={handleClick}>
      <Cube>
        <Image src={pizzaIcon} alt="funny pizza gif"
          quality={1}
          width={108}
          height={96}
          style={{
            marginLeft: -24,
            marginTop: -10,
            width: 108,
            height: 96,
          }} />
      </Cube>

      <audio ref={audioBoom} src="/static/sounds/boom.mp3" preload="auto" />
    </div>
  );
}