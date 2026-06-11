"use client";

import { useState, useEffect } from "react";

export function useScreenSize() {
    const [screenSize, setScreenSize] = useState(() => {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            return {
                isSm: width >= 640,
                isMd: width >= 768,
                isLg: width >= 1024,
                isXl: width >= 1280,
                isLoaded: true,
            };
        }
        return {
            isSm: false,
            isMd: false,
            isLg: false,
            isXl: false,
            isLoaded: false,
        };
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenSize({
                isSm: width >= 640,
                isMd: width >= 768,
                isLg: width >= 1024,
                isXl: width >= 1280,
                isLoaded: true,
            });
        };

        if (!screenSize.isLoaded) {
            handleResize();
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [screenSize.isLoaded]);

    return screenSize;
}
