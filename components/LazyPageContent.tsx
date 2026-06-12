import React, { createContext, useContext, useState, useEffect } from 'react';

export const FlipbookContext = createContext({ currentPage: 0, targetPage: 0 });

export const LazyPageContent = ({ pageIndex, alwaysRender = false, children }: { pageIndex: number, alwaysRender?: boolean, children: React.ReactNode }) => {
    const { currentPage, targetPage } = useContext(FlipbookContext);
    const [hasRendered, setHasRendered] = useState(alwaysRender);
    
    // Render if within 6 pages of the current page
    // OR if it's exactly the target spread (to ensure fast loading when jumping via MacroTab)
    // OR if it's explicitly marked to always render (e.g. Macro headers)
    const isVisible = alwaysRender || Math.abs(currentPage - pageIndex) <= 6 || pageIndex === targetPage || pageIndex === targetPage + 1;
    
    useEffect(() => {
        if (isVisible && !hasRendered) {
            setHasRendered(true);
        }
    }, [isVisible, hasRendered]);

    if (!hasRendered && !isVisible) {
        return (
            <div className="w-full h-full bg-[#faf8f4] flex flex-col items-center justify-center text-gray-400">
                <div className="h-8 w-8 rounded-full border-4 border-[#cba365]/30 border-t-[#cba365] animate-spin mb-2"></div>
                <span className="text-[10px] uppercase font-bold tracking-wider">Đang tải...</span>
            </div>
        );
    }

    return <>{children}</>;
};
