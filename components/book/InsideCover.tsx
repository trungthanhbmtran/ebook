import React from 'react';

export const InsideCover = () => {
    return (
        <div className="page-dark w-full h-full relative bg-[#111622] shadow-[inset_-5px_0_15px_rgba(0,0,0,0.5)]">
            {/* Spine Curvature & Shadow - Gáy sách trang trong (Bên trái) */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/80 via-black/10 to-transparent pointer-events-none z-30 mix-blend-multiply"></div>
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black to-transparent pointer-events-none z-30 mix-blend-multiply"></div>
            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-l from-black to-transparent pointer-events-none z-30"></div>
        </div>
    );
};
