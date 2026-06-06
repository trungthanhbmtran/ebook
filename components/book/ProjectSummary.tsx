import React from 'react';
import investmentData from '../../data/investment-projects.json';

export const ProjectSummary = () => {
    // Lấy tổng dự án và thống kê theo từng lĩnh vực
    let totalProjects = 0;
    const categoryStats: { name: string, count: number }[] = [];

    if (investmentData.pages && Array.isArray(investmentData.pages)) {
        investmentData.pages.forEach((page: any) => {
            const count = page.projects ? page.projects.length : 0;
            totalProjects += count;
            if (page.category && page.category.vi) {
                categoryStats.push({
                    name: page.category.vi,
                    count: count
                });
            }
        });
    }

    return (
        <div className="page-light bg-[#Fdfbf7] w-full h-full flex flex-col relative shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)] pl-8 md:pl-[96px] pr-4 md:pr-8 py-4 md:py-8 text-[#2E1A0F]">
            {/* Spine Shadow - Gáy sách bên trái (Vì nằm ở trang phải) */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-30 mix-blend-multiply"></div>
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/50 pointer-events-none z-40"></div>

            <div className="flex-1 w-full h-full border-[2px] border-[#5C3A21]/30 p-6 md:p-10 flex flex-col items-center justify-center relative z-10 bg-gradient-to-br from-[#E3D0B9]/60 to-[#C8A27B]/60 backdrop-blur-sm">
                    
                    {/* Họa tiết góc */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#5C3A21]/60"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#5C3A21]/60"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#5C3A21]/60"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#5C3A21]/60"></div>

                    <h2 className="text-lg md:text-2xl font-black text-[#2E1A0F] uppercase text-center mb-2 tracking-widest">
                        Tổng Hợp Danh Mục
                    </h2>
                    <h3 className="text-xs md:text-sm font-bold text-[#5C3A21] uppercase text-center mb-6 md:mb-10 tracking-[0.2em]">
                        Dự Án Kêu Gọi Đầu Tư Tỉnh Đắk Lắk
                    </h3>

                    <div className="flex flex-col items-center justify-center mb-8 md:mb-12 relative">
                        <div className="absolute inset-0 bg-[#C8A27B] blur-3xl opacity-20 rounded-full"></div>
                        <span className="text-7xl md:text-9xl font-black text-[#5C3A21] drop-shadow-[0_4px_4px_rgba(46,26,15,0.2)] z-10">
                            {totalProjects}
                        </span>
                        <span className="text-base md:text-xl font-bold text-[#2E1A0F] uppercase tracking-[0.3em] mt-2 border-t-2 border-[#5C3A21]/30 pt-2 px-8 z-10">
                            Dự Án
                        </span>
                    </div>

                    <div className="w-full max-w-sm md:max-w-md mx-auto z-10">
                        <ul className="space-y-3 md:space-y-4">
                            {categoryStats.map((stat, idx) => (
                                <li key={idx} className="flex justify-between items-center border-b border-[#5C3A21]/15 pb-2">
                                    <span className="text-xs md:text-sm font-bold text-[#2E1A0F] max-w-[85%] leading-snug">
                                        {stat.name}
                                    </span>
                                    <span className="text-xs md:text-sm font-black text-[#Fdfbf7] bg-[#5C3A21] px-3 py-1 rounded shadow-sm">
                                        {stat.count}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

            </div>
        </div>
    );
};
