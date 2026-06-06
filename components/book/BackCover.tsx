import React from 'react';

export const BackCover = () => {
    return (
        <div className="page-light bg-gradient-to-br from-[#E3D0B9] to-[#C8A27B] w-full h-full relative shadow-[inset_10px_0_20px_rgba(0,0,0,0.15)] text-[#2E1A0F] overflow-hidden flex flex-col">
            {/* Background Texture */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none mix-blend-overlay z-0">
                <filter id="noise-back">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise-back)" />
            </svg>

            {/* Spine Hinge Haptic - Nếp gấp gáy sách ở bìa sau */}
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#5C3A21]/60 via-[#5C3A21]/20 to-transparent pointer-events-none z-20"></div>
            <div className="absolute right-3 md:right-6 top-0 bottom-0 w-[3px] md:w-[6px] bg-gradient-to-l from-[#2E1A0F]/40 via-[#5C3A21]/20 to-[#2E1A0F]/30 shadow-[-1px_0_3px_rgba(255,255,255,0.3)] pointer-events-none z-20"></div>
            <div className="absolute right-[12px] md:right-[28px] top-0 bottom-0 w-[1px] md:w-[2px] bg-white/40 pointer-events-none z-20"></div>

            {/* Khung viền đơn giản và Nội dung căn giữa hoàn hảo */}
            <div className="flex-1 border-[2px] border-[#5C3A21]/30 m-2 md:m-4 mr-10 md:mr-20 rounded-sm relative z-20 flex flex-col items-center justify-center p-4 md:p-8">

                {/* Họa tiết góc */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#5C3A21]/60"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#5C3A21]/60"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#5C3A21]/60"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#5C3A21]/60"></div>

                {/* Logo or Icon */}
                <div className="text-center opacity-60">
                    <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-[#5C3A21]/80 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                        <span className="font-serif text-xl md:text-2xl font-bold text-[#2E1A0F]">Đ</span>
                    </div>
                    <p className="tracking-[0.15em] md:tracking-[0.3em] text-3xs md:text-2xs uppercase font-bold text-[#2E1A0F]">Dak Lak Province</p>
                </div>
            </div>
        </div>
    );
};
