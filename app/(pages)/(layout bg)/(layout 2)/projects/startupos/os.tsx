"use client";
 
import { useEffect, useRef, useState } from "react";

import Script from "next/script"; 
import Loading from "@/components/loading";
import { fontToshibaTxL1 } from "@/libs/fonts";

declare const V86Starter: any;

export const StartupOs = () => {
    const [v86Emulator, setV86Emulator] = useState<typeof V86Starter>();
    const [v86EmulatorLoaded, setV86EmulatorLoaded] = useState<boolean>(false);
    const refScreen = useRef(null);

    const setEmulator = () => {
        if (typeof V86Starter === 'function') {
            setV86Emulator(new V86Starter({
                wasm_path: "/static/projects/v86/v86.wasm",
                memory_size: (1024 * 1024) * 4,
                vga_memory_size: (1024 * 1024) * 4,
                screen_container: refScreen.current,
                bios: {
                    url: "/static/projects/v86/bios/seabios.bin",
                },
                vga_bios: {
                    url: "/static/projects/v86/bios/vgabios.bin",
                },
                hda: {
                    url: "/static/projects/startupos/build/system.img",
                },
                autostart: true,
            }));
        }
    }

    useEffect(setEmulator, [])
    useEffect(setEmulator, [v86EmulatorLoaded])

    console.log(v86Emulator)

    return <>
        {(typeof V86Starter !== 'function') ?
            <div style={{width:"100%", height:"400px", position:"relative"}}>
                <Loading>
                    <span style={{color:"black"}}>The emulator is loading, please what a moment!</span>
                </Loading>
            </div>
            :
            <div ref={refScreen} style={{ margin: "auto", minHeight: "400px", position: "relative" }}>
                <div className={fontToshibaTxL1.className} style={{ whiteSpace: "pre", fontSize: 15, lineHeight: "normal" }}></div>
                <canvas style={{ display: "none" }}></canvas>
            </div>
        }

        <Script src="/static/projects/v86/libv86.js" onLoad={() => { setV86EmulatorLoaded(true) }} />

    </>
}