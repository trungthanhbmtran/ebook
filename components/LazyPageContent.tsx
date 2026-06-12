import React, { createContext, useContext, useState, useEffect } from 'react';

export const FlipbookContext = createContext({ currentPage: 0 });

export const LazyPageContent = ({ pageIndex, children }: { pageIndex: number, children: React.ReactNode }) => {
    const { currentPage } = useContext(FlipbookContext);
    const [hasRendered, setHasRendered] = useState(false);
    
    // Render if within 4 pages of the current page
    const isVisible = Math.abs(currentPage - pageIndex) <= 4;
    
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
