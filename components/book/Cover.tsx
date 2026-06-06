import React from 'react';

export const Cover = ({ title }: { title: string }) => {
    return (
        <div className="@container w-full h-full relative overflow-hidden bg-gradient-to-br from-[#EADAC4] to-[#CFA582] flex flex-col rounded-r-lg shadow-[-5px_0_25px_rgba(0,0,0,0.1),_inset_-2px_0_10px_rgba(0,0,0,0.05)]">

            {/* Texture & Glow */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none mix-blend-overlay z-0">
                <filter id="noiseFrontLight">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFrontLight)" />
            </svg>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#FFF8F0]/70 via-transparent to-transparent opacity-80 z-0"></div>

            {/* Spine Hinge (Left) */}
            <div className="absolute left-0 top-0 bottom-0 w-[8cqw] bg-gradient-to-r from-[#5C3A21]/30 via-[#5C3A21]/10 to-transparent z-10 mix-blend-multiply"></div>
            <div className="absolute left-[1.5cqw] top-0 bottom-0 w-[0.5cqw] bg-gradient-to-r from-white/60 via-white/30 to-transparent z-10 shadow-[1px_0_3px_rgba(92,58,33,0.1)]"></div>

            {/* Outer Border Box */}
            <div className="flex-1 ml-[10cqw] m-[4cqw] border border-[#8A6B53]/40 p-[4cqw] relative z-20 flex flex-col justify-between">

                {/* Corner Decals */}
                <div className="absolute top-0 left-0 w-[3cqw] h-[3cqw] border-t-[1.5px] border-l-[1.5px] border-[#8A6B53]"></div>
                <div className="absolute top-0 right-0 w-[3cqw] h-[3cqw] border-t-[1.5px] border-r-[1.5px] border-[#8A6B53]"></div>
                <div className="absolute bottom-0 left-0 w-[3cqw] h-[3cqw] border-b-[1.5px] border-l-[1.5px] border-[#8A6B53]"></div>
                <div className="absolute bottom-0 right-0 w-[3cqw] h-[3cqw] border-b-[1.5px] border-r-[1.5px] border-[#8A6B53]"></div>

                {/* Header */}
                <div className="text-center mt-[1cqw]">
                    <h1 className="text-[2.2cqw] font-serif font-bold text-[#4A3B32] tracking-[0.2em] uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">Ủy ban Nhân dân tỉnh Đắk Lắk</h1>
                    <h2 className="text-[1.4cqw] font-serif italic text-[#8A6B53] tracking-[0.1em] mt-[0.5cqw] uppercase">Dak Lak Provincial People's Committee</h2>
                    <div className="mx-auto w-[15cqw] h-[1px] bg-gradient-to-r from-transparent via-[#8A6B53]/60 to-transparent mt-[1.5cqw]"></div>
                </div>

                {/* Center Content: Images & Title */}
                <div className="flex flex-col items-center justify-evenly flex-1 w-full py-[4cqw]">

                    {/* Center Logo */}
                    <div className="flex justify-center items-center">
                        <img
                            src="/2aOboQbOZVYrEeziFPP2ONoi9UTDtLrdJI6Kt7TM-removebg-preview.png"
                            alt="Logo Đắk Lắk"
                            className="w-[28cqw] h-[28cqw] object-contain transition-transform duration-700 hover:scale-105 mix-blend-multiply drop-shadow-[0_10px_20px_rgba(92,58,33,0.2)]"
                        />
                    </div>

                    {/* Main Title */}
                    <div className="text-center w-full px-[2cqw]">
                        <h2 className="font-serif font-black uppercase leading-[1.2] drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                            <span className="text-[3cqw] tracking-[0.15em] block mb-[1.5cqw] text-[#5D4037]">Danh mục dự án đầu tư</span>
                            <div className="relative py-[2.5cqw] my-[1cqw]">
                                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#8A6B53]/60 to-transparent"></div>
                                <span className="text-[6cqw] tracking-[0.2em] bg-gradient-to-b from-[#3E2723] via-[#5D4037] to-[#3E2723] text-transparent bg-clip-text">TỈNH ĐẮK LẮK</span>
                                <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#8A6B53]/60 to-transparent"></div>
                            </div>
                            <span className="text-[3cqw] tracking-[0.1em] block mt-[1.5cqw] text-[#8A6B53]">Giai đoạn 2026 - 2030</span>
                        </h2>
                        <h3 className="text-[1.6cqw] font-serif italic font-medium tracking-[0.1em] text-[#8A6B53] mt-[2.5cqw] max-w-[90%] mx-auto leading-relaxed">
                            Investment Projects Portfolio for the Period 2026 - 2030
                        </h3>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between px-[2cqw] mb-[1cqw]">
                    <div className="flex flex-col text-left flex-1 pr-[4cqw]">
                        <div className="w-[12cqw] h-[2px] bg-[#8A6B53]/60 mb-[2cqw]"></div>
                        <p className="text-[1.6cqw] font-serif font-bold text-[#4A3B32] uppercase tracking-widest leading-[1.6] mb-[1cqw] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                            Tài liệu phục vụ Hội nghị công bố quy hoạch và xúc tiến Đầu tư tỉnh Đắk Lắk năm 2026
                        </p>
                        <p className="text-[1.3cqw] font-serif italic text-[#8A6B53] tracking-[0.05em]">
                            Documentation for the 2026 Investment Promotion Conference
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center shrink-0">
                        <div className="bg-white/80 p-[0.6cqw] rounded-sm shadow-[0_4px_10px_rgba(92,58,33,0.15)] hover:scale-105 transition-transform duration-300 backdrop-blur-sm border border-[#8A6B53]/20">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=3E2723&bgcolor=ffffff&data=${encodeURIComponent("https://daklak.gov.vn/investment")}`}
                                alt="Tài liệu Đầu tư Đắk Lắk"
                                className="w-[8cqw] h-[8cqw] mix-blend-multiply"
                            />
                        </div>
                        <span className="text-[1cqw] font-serif font-bold text-[#5D4037] mt-[1cqw] tracking-widest uppercase">Quét mã</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
