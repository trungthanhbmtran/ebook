export interface TOCItem {
    titleVi: string;
    titleEn: string;
    pageVi: number;
    pageEn: number;
}

interface TOCLayoutProps {
    items: TOCItem[];
    lang: 'vi' | 'en';
}

const TOCLayout = ({ items, lang }: TOCLayoutProps) => {
    const isVi = lang === 'vi';
    const spineShadow = isVi
        ? "absolute right-0 top-0 bottom-0 w-[8cqw] bg-gradient-to-l from-[#4A3B32]/10 to-transparent pointer-events-none z-30 mix-blend-multiply"
        : "absolute left-0 top-0 bottom-0 w-[8cqw] bg-gradient-to-r from-[#4A3B32]/10 to-transparent pointer-events-none z-30 mix-blend-multiply";
    const spineLine = isVi
        ? "absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-l from-[#4A3B32]/30 to-transparent pointer-events-none z-30"
        : "absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-r from-[#4A3B32]/30 to-transparent pointer-events-none z-30";
    const extraShadow = isVi ? "inset_-10px_0_20px_rgba(0,0,0,0.03)" : "inset_10px_0_20px_rgba(0,0,0,0.03)";
    const title = isVi ? "Mục Lục" : "Table of Contents";
    const titleClass = isVi
        ? "text-[5cqw] font-serif font-bold text-[#3E2723] uppercase tracking-[0.2em]"
        : "text-[4.5cqw] font-serif font-bold text-[#3E2723] uppercase tracking-[0.15em]";

    return (
        <div className={`@container page-light bg-[#FDF8F3] w-full h-full flex flex-col relative shadow-[${extraShadow}]`}>
            {/* Spine Shadow */}
            <div className={spineShadow}></div>
            <div className={spineLine}></div>
            {!isVi && <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/60 pointer-events-none z-40"></div>}

            <div className="p-[8cqw] flex-1 flex flex-col relative z-20 overflow-hidden">
                <div className="text-center mb-[8cqw]">
                    <h2 className={titleClass}>{title}</h2>
                    <div className="w-[10cqw] h-[2px] bg-[#8A6B53]/60 mx-auto mt-[2cqw]"></div>
                </div>

                <div className="flex-1 flex flex-col overflow-y-auto pr-[2cqw] pb-[4cqw] custom-scrollbar">
                    <div className="flex flex-col gap-[3cqw]">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex items-end group cursor-pointer hover:bg-[#E8D5C4]/40 px-[2cqw] py-[1cqw] -mx-[2cqw] rounded-lg transition-colors duration-300">
                                <span className={`font-serif font-semibold ${isVi ? 'text-[2cqw]' : 'text-[1.8cqw]'} text-[#4A3B32] uppercase tracking-wider leading-snug max-w-[85%] group-hover:text-[#3E2723] transition-colors`}>
                                    {isVi ? item.titleVi : item.titleEn}
                                </span>
                                <div className="flex-1 border-b-[2px] border-dotted border-[#8A6B53]/30 mb-[0.8cqw] mx-[2cqw] group-hover:border-[#8A6B53]/80 transition-colors"></div>
                                <span className="font-serif font-bold text-[#8A6B53] text-[2.5cqw] group-hover:scale-110 transition-transform origin-bottom-right">
                                    {isVi ? item.pageVi : item.pageEn}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TableOfContentsVi = ({ items }: { items: TOCItem[] }) => <TOCLayout items={items} lang="vi" />;
export const TableOfContentsEn = ({ items }: { items: TOCItem[] }) => <TOCLayout items={items} lang="en" />;
