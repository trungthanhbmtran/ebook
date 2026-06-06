'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Khai báo type cho window.zaloJSV2
declare global {
    interface Window {
        zaloJSV2?: any;
    }
}

// 1. Tạo Context
const ZaloContext = createContext<{ isZaloReady: boolean; isZaloBrowser: boolean }>({
    isZaloReady: false,
    isZaloBrowser: false,
});

// 2. Component Provider bọc ngoài ứng dụng
export default function ZaloScript({ children }: { children: ReactNode }) {
    const [isZaloReady, setIsZaloReady] = useState(false);
    const [isZaloBrowser, setIsZaloBrowser] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Detect Zalo browser (bao gồm cả các biến thể UA)
        const ua = navigator.userAgent || '';
        const detected = /Zalo/i.test(ua) || /ZaloApp/i.test(ua);
        setIsZaloBrowser(detected);

        // Chờ zaloJSV2 inject (chỉ có trong Zalo WebView)
        let attempts = 0;
        const maxAttempts = 50;

        const checkZalo = setInterval(() => {
            attempts++;
            if (window.zaloJSV2) {
                setIsZaloReady(true);
                clearInterval(checkZalo);
            } else if (attempts >= maxAttempts) {
                clearInterval(checkZalo);
            }
        }, 100);

        return () => clearInterval(checkZalo);
    }, []);

    return (
        <ZaloContext.Provider value={{ isZaloReady, isZaloBrowser }}>
            {children}
        </ZaloContext.Provider>
    );
}

// 3. Custom Hook để các component khác sử dụng dễ dàng
export const useZalo = () => useContext(ZaloContext);