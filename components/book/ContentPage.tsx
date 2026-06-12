import React from 'react';
import { MapPin, Maximize2, DollarSign } from 'lucide-react';

export interface ContentPageProps {
    pageData: any[];
    pageIndex: number;
    runningHeader: string;
    lang: 'vi' | 'en';
    onProjectClick?: (project: any, lang: 'vi' | 'en') => void;
}

const StopPropagationWrapper = ({ children, className }: any) => {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const stop = (e: Event) => e.stopPropagation();
        el.addEventListener('mousedown', stop);
        el.addEventListener('touchstart', stop, { passive: false });
        el.addEventListener('pointerdown', stop);
        return () => {
            el.removeEventListener('mousedown', stop);
            el.removeEventListener('touchstart', stop);
            el.removeEventListener('pointerdown', stop);
        };
    }, []);
    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};

const ContentPage = ({ pageData, pageIndex, runningHeader, lang, onProjectClick }: ContentPageProps) => {
    const isVi = lang === 'vi';

    const wrapperShadow = isVi
        ? "shadow-[inset_-5px_0_15px_rgba(0,0,0,0.02)]"
        : "shadow-[inset_5px_0_15px_rgba(0,0,0,0.02)]";

    const wrapperPadding = isVi
        ? "pt-4 pb-4 px-4 md:pt-8 md:pb-6 md:pl-8 md:pr-12"
        : "pt-4 pb-4 px-4 md:pt-8 md:pb-6 md:pr-8 md:pl-12";

    const spineCurvature = isVi ? (
        <>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-black/20 to-transparent pointer-events-none z-30"></div>
            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-black/10 pointer-events-none z-30"></div>
        </>
    ) : (
        <>
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-black/20 to-transparent pointer-events-none z-30"></div>
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/10 pointer-events-none z-30"></div>
        </>
    );

    const labels = {
        macroSpan: isVi ? "Lĩnh vực đầu tư" : "Sector",
        location: isVi ? "Địa điểm:" : "Location:",
        area: isVi ? "Diện tích:" : "Area:",
        capital: isVi ? "Tổng vốn đầu tư" : "Est. Capital",
        scale: isVi ? "Quy mô:" : "Scale:",
        page: isVi ? "Trang" : "Page"
    };

    const [isLoaded, setIsLoaded] = React.useState(pageIndex <= 5);

    React.useEffect(() => {
        if (pageIndex > 5) {
            const timer = setTimeout(() => {
                setIsLoaded(true);
            }, 200 + pageIndex * 30);
            return () => clearTimeout(timer);
        }
    }, [pageIndex]);

    return (
        <div className={`page-light bg-white w-full flex flex-col h-full relative ${wrapperShadow}`} style={{ backgroundColor: '#ffffff' }}>
            {!isLoaded ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#cba365] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className={`flex-1 flex flex-col h-full relative z-20 ${wrapperPadding}`}>
                    <div className="bg-[#5C3A21] w-full py-2 md:py-4 shrink-0 border-b-2 border-[#8A5A35] rounded-t-sm relative">
                        <h2 className="text-2xs md:text-sm font-bold text-white uppercase tracking-wider md:tracking-widest text-center px-8 md:px-4 leading-snug line-clamp-1">{runningHeader}</h2>
                    </div>

                    <div className="flex-1 py-2 md:py-3 overflow-hidden relative z-20">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2 md:gap-x-8 md:gap-y-5">
                            {pageData.map((item, itemIdx) => {
                                if (item.isMacroHeader) {
                                    const macroName = isVi ? item.macroGroupName : (item.macroGroupNameEn || item.macroGroupName);
                                    return (
                                        <div key={`${lang}-macro-${itemIdx}`} className="col-span-2 relative overflow-hidden mb-1 md:mb-1.5 shrink-0">
                                            <div className="bg-linear-to-r from-[#5C3A21] to-[#8A5A35] px-3 py-2 md:px-5 md:py-3 rounded-lg shadow-sm border-l-4 border-[#E5D3C1] flex justify-between items-center gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-1">
                                                        <span className="text-[9px] md:text-2xs font-bold text-[#E5D3C1] uppercase tracking-widnest md:tracking-[0.2em]">{labels.macroSpan}</span>
                                                    </div>
                                                    <h3 className="font-black text-[10px] md:text-base uppercase tracking-wider text-white leading-snug wrap-break-words">{macroName}</h3>
                                                </div>
                                                {item.projectCount > 0 && (
                                                    <div className="flex flex-col items-center justify-center bg-white/10 rounded-lg px-2.5 py-1 md:px-4 md:py-1.5 border border-white/20 shrink-0">
                                                        <span className="text-sm md:text-xl font-black text-[#E5D3C1] leading-none">{item.projectCount}</span>
                                                        <span className="text-[8px] md:text-3xs text-white/80 uppercase font-bold tracking-wider mt-0.5">
                                                            {isVi ? "Dự án" : "Projects"}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }

                                const name = isVi ? (item.name?.vi || item.tenDuAn || item.name || "Đang cập nhật") : (item.name?.en || item.tenDuAn || item.name || "Updating");
                                const location = isVi ? (item.location?.vi || item.diaDiem || "-") : (item.location?.en || item.diaDiem || "-");
                                const capital = isVi ? (item.investmentCapital?.vi || item.tongVon || "-") : (item.investmentCapital?.en || item.tongVon || "-");
                                const area = item.area || item.dienTich || "-";
                                
                                const expectedScale = isVi ? item.expectedInvestmentScale?.vi : item.expectedInvestmentScale?.en;
                                const originalScale = typeof item.scale === "string" ? item.scale : (isVi ? (item.scale?.vi || item.quyMo || "") : (item.scale?.en || item.quyMo || ""));
                                const scale = expectedScale || originalScale;
                                
                                const sttNum = item.stt ? (parseInt(item.stt) < 10 ? `0${item.stt}` : `${item.stt}`) : `0${itemIdx}`;

                                return (
                                    <div key={`${lang}-proj-${item.id || itemIdx}`} className="relative bg-white rounded-xl border border-[#CBA365]/40 flex flex-col group h-[245px] md:h-[285px] shrink-0 overflow-hidden shadow-sm hover:shadow-[0_8px_25px_rgba(138,90,53,0.15)] transition-shadow duration-300">
                                        {/* Accent top border */}
                                        <div className="h-1.5 w-full bg-gradient-to-r from-[#5C3A21] via-[#8A5A35] to-[#CBA365] shrink-0"></div>

                                        <div className="p-3 md:p-4 flex-1 flex flex-col min-h-0">
                                            {/* Title + STT */}
                                            <div className="flex items-start gap-2 mb-2 md:mb-3 shrink-0 h-[32px] md:h-[40px]">
                                                <div className="bg-[#5C3A21] text-white font-black text-[10px] md:text-xs px-2 py-1 rounded shadow-sm shrink-0 mt-0.5">
                                                    {sttNum}
                                                </div>
                                                <h5 className="flex-1 min-w-0 font-bold text-[11px] md:text-[13px] text-[#5C3A21] leading-snug uppercase line-clamp-2 group-hover:text-[#8A5A35] transition-colors" title={name}>
                                                    {name}
                                                </h5>
                                            </div>

                                            {/* Location */}
                                            <div className="flex items-start gap-1.5 mb-2 md:mb-3 shrink-0 text-[10px] md:text-xs h-[30px] md:h-[36px]">
                                                <MapPin size={14} className="text-[#CBA365] shrink-0 mt-[1px]" />
                                                <div className="flex-1 min-w-0 line-clamp-2 leading-snug" title={location}>
                                                    <span className="font-semibold text-[#8A5A35] mr-1">{labels.location}</span>
                                                    <span className="font-medium text-[#3B261A]">{location}</span>
                                                </div>
                                            </div>

                                            {/* Grid of Key Metrics (Area & Capital) */}
                                            <div className="grid grid-cols-2 gap-2 mb-2 md:mb-3 shrink-0 h-[56px] md:h-[64px]">
                                                <div className="bg-[#FDF8F3] h-full p-1.5 md:p-2 rounded-lg border border-[#CBA365]/30 flex flex-col justify-center items-center text-center min-w-0">
                                                    <span className="text-[8px] md:text-[8.5px] font-bold text-[#8A5A35] uppercase mb-0.5 tracking-tighter md:tracking-tight whitespace-nowrap w-full">{labels.area}</span>
                                                    <span className="text-[10px] md:text-xs font-black text-[#1A1A1A] leading-tight break-words w-full line-clamp-2">{area}</span>
                                                </div>
                                                <div className="bg-[#FDF8F3] h-full p-1.5 md:p-2 rounded-lg border border-[#CBA365]/30 flex flex-col justify-center items-center text-center min-w-0">
                                                    <span className="text-[8px] md:text-[8.5px] font-bold text-[#8A5A35] uppercase mb-0.5 tracking-tighter md:tracking-tight whitespace-nowrap w-full">{labels.capital}</span>
                                                    <span className="text-[10px] md:text-xs font-black text-[#C96E28] leading-tight break-words w-full line-clamp-2">{capital}</span>
                                                </div>
                                            </div>

                                            {/* Scale snippet */}
                                            <div className="flex-1 min-w-0 text-[9px] md:text-[10.5px] leading-relaxed text-[#555] overflow-hidden">
                                                {scale && (
                                                    <div className="line-clamp-2" title={scale}>
                                                        <span className="font-semibold text-[#8A5A35] mr-1">{labels.scale}</span>
                                                        {scale}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Footer Button */}
                                        <div className="px-3 pb-3 md:px-4 md:pb-4 shrink-0 flex justify-end mt-auto">
                                            <StopPropagationWrapper>
                                                <button
                                                    className="flex items-center gap-1 bg-gradient-to-r from-[#8A5A35] to-[#CBA365] hover:from-[#5C3A21] hover:to-[#8A5A35] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-[9px] md:text-xs font-bold uppercase tracking-wider shadow-md relative z-50 cursor-pointer group/btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        if (onProjectClick) onProjectClick(item, lang);
                                                    }}
                                                >
                                                    <span>{isVi ? "Xem chi tiết" : "Details"}</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:translate-x-1 transition-transform">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </StopPropagationWrapper>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pb-2 pt-3 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-[2px] bg-[#cba365]"></div>
                            <div className="w-1.5 h-[2px] bg-[#cba365]/40"></div>
                        </div>
                        <span className="text-2xs font-bold text-gray-400 tracking-wider">{labels.page} {pageIndex}</span>
                    </div>
                </div>
            )}

            {spineCurvature}
        </div>
    );
};

export const ContentPageLeft = ({ pageData, pageIndex, runningHeaderVi, onProjectClick }: { pageData: any[], pageIndex: number, runningHeaderVi: string, onProjectClick?: (project: any, lang: 'vi' | 'en') => void }) => {
    return <ContentPage pageData={pageData} pageIndex={pageIndex} runningHeader={runningHeaderVi} lang="vi" onProjectClick={onProjectClick} />;
};

export const ContentPageRight = ({ pageData, pageIndex, runningHeaderEn, onProjectClick }: { pageData: any[], pageIndex: number, runningHeaderEn: string, onProjectClick?: (project: any, lang: 'vi' | 'en') => void }) => {
    return <ContentPage pageData={pageData} pageIndex={pageIndex} runningHeader={runningHeaderEn} lang="en" onProjectClick={onProjectClick} />;
};
