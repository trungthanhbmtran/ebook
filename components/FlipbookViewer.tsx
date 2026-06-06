import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import investmentData from "../data/investment-projects.json";
import Toolbar from "./Toolbar";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Cover } from "./book/Cover";
import { TableOfContentsVi, TableOfContentsEn, TOCItem } from "./book/TableOfContents";
import { ContentPageLeft, ContentPageRight } from "./book/ContentPage";
import { BackCover } from "./book/BackCover";
import { ProjectSummary } from "./book/ProjectSummary";
import MacroTab from "./MacroTab";
import dynamic from 'next/dynamic';

const ProjectModal = dynamic(() => import('./ProjectModal').then(mod => mod.ProjectModal), { ssr: false });

export default function FlipbookViewer() {
    const bookRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bookAreaRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const lastFlipTime = useRef<number>(0);

    const [currentPage, setCurrentPage] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [baseScale, setBaseScale] = useState(1);
    const [isDesktop, setIsDesktop] = useState(true);

    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [modalLang, setModalLang] = useState<'vi' | 'en'>('vi');
    const [hasOpenedModal, setHasOpenedModal] = useState(false);

    useEffect(() => {
        if (selectedProject) setHasOpenedModal(true);
    }, [selectedProject]);

    const handleProjectClick = useCallback((project: any, lang: 'vi' | 'en') => {
        setSelectedProject(project);
        setModalLang(lang);
    }, []);

    const handleResize = useCallback(() => {
        setIsDesktop(window.innerWidth >= 1024);
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    const updateScale = useCallback(() => {
        const targetWidth = isDesktop ? 1200 : 424;
        const targetHeight = isDesktop ? 750 : 600;

        const horizontalMargin = isDesktop ? 220 : 70;
        const verticalMargin = isDesktop ? 80 : 20;

        const screenW = window.innerWidth - horizontalMargin;
        const screenH = window.innerHeight - 50 - verticalMargin;

        const scaleW = screenW / targetWidth;
        const scaleH = screenH / targetHeight;

        setBaseScale(Math.min(scaleW, scaleH));
    }, [isDesktop]);

    useEffect(() => {
        updateScale();
        const timeout = setTimeout(updateScale, 100);
        window.addEventListener("resize", updateScale);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("resize", updateScale);
        };
    }, [updateScale]);

    const [inputPage, setInputPage] = useState("1");
    const [isReady, setIsReady] = useState(false);

    const { macroGroupsMenu, totalPages, bookPagesToRender } = React.useMemo(() => {
        const renderItems: any[] = [];

        if (investmentData.pages && Array.isArray(investmentData.pages)) {
            investmentData.pages.forEach((page: any) => {
                if (page.category) {
                    renderItems.push({
                        isMacroHeader: true,
                        macroGroupName: page.category.vi,
                        macroGroupNameEn: page.category.en,
                        projectCount: page.projects ? page.projects.length : 0
                    });
                }
                if (page.projects && Array.isArray(page.projects)) {
                    page.projects.forEach((project: any, index: number) => {
                        renderItems.push({
                            isProject: true,
                            stt: index + 1,
                            ...project
                        });
                    });
                }
            });
        }

        const contentPages: any[][] = [];
        let currentPageData: any[] = [];
        let currentSlots = 0;
        const MAX_SLOTS = 10;

        const getWeight = (item: any) => {
            if (item.isMacroHeader) return 3;

            let weight = 2.5;

            const nameVi = item.name?.vi || item.tenDuAn || item.name || "";
            const scaleVi = typeof item.scale === "string" ? item.scale : (item.scale?.vi || item.quyMo || "");

            const nameLen = nameVi.length;
            const scaleLen = scaleVi.length;

            if (nameLen > 70) weight += 0.5;
            if (scaleLen > 100) weight += 0.5;
            if (scaleLen > 200) weight += 0.5;
            if (scaleLen > 300) weight += 1.0;
            if (scaleLen > 400) weight += 1.0;

            return weight;
        };

        for (let i = 0; i < renderItems.length; i++) {
            const item = renderItems[i];
            const weight = getWeight(item);
            let lookaheadWeight = weight;

            if (item.isMacroHeader) {
                if (renderItems[i + 1]) lookaheadWeight += getWeight(renderItems[i + 1]);
                if (renderItems[i + 2]) lookaheadWeight += getWeight(renderItems[i + 2]);
            }

            if (currentSlots + lookaheadWeight > MAX_SLOTS && currentSlots > 0) {
                contentPages.push(currentPageData);
                currentPageData = [];
                currentSlots = 0;
            }
            currentPageData.push(item);
            currentSlots += weight;
        }
        if (currentPageData.length > 0) contentPages.push(currentPageData);

        const macroGroupsMenu: any[] = [];
        contentPages.forEach((page, pIdx) => {
            const macroItem = page.find((item: any) => item.isMacroHeader);
            if (macroItem) {
                macroGroupsMenu.push({
                    name: macroItem.macroGroupName.replace(/LĨNH VỰC /i, ""),
                    projectCount: macroItem.projectCount,
                    pageIndex: pIdx * 2 + 3
                });
            }
        });

        const tocItems = contentPages.reduce((acc: any[], page, pIdx) => {
            const macroItem = page.find((item: any) => item.isMacroHeader);
            if (macroItem) {
                acc.push({
                    titleVi: macroItem.macroGroupName,
                    titleEn: macroItem.macroGroupNameEn || macroItem.macroGroupName,
                    pageVi: pIdx * 2 + 3,
                    pageEn: pIdx * 2 + 4
                });
            }
            return acc;
        }, []);

        let totalPages = 1 + 2 + (contentPages.length * 2) + 1;
        if (totalPages % 2 !== 0) totalPages += 1;

        const bookPagesToRender: React.ReactNode[] = [];

        bookPagesToRender.push(
            <div key="front-cover" className="page-wrapper h-full">
                <Cover title={investmentData.bookTitle?.vi || "Danh mục dự án"} />
            </div>
        );

        bookPagesToRender.push(
            <div key="toc-vi" className="page-wrapper h-full">
                <TableOfContentsVi items={tocItems} />
            </div>
        );

        bookPagesToRender.push(
            <div key="project-summary" className="page-wrapper h-full">
                <ProjectSummary />
            </div>
        );

        contentPages.forEach((pageData, index) => {
            const macroGroupItem = pageData.find((item: any) => item.isMacroHeader) || pageData.find((item: any) => item.macroGroupName);
            const runningHeaderVi = macroGroupItem ? `${macroGroupItem.macroGroupName}` : "Danh mục xúc tiến đầu tư";
            const runningHeaderEn = macroGroupItem ? `${macroGroupItem.macroGroupNameEn || macroGroupItem.macroGroupName}` : "Investment Promotion Portfolio";

            bookPagesToRender.push(
                <div key={`page-left-${index}`} className="page-wrapper h-full">
                    <ContentPageLeft pageData={pageData} pageIndex={index * 2 + 3} runningHeaderVi={runningHeaderVi} onProjectClick={handleProjectClick} />
                </div>
            );

            bookPagesToRender.push(
                <div key={`page-right-${index}`} className="page-wrapper h-full">
                    <ContentPageRight pageData={pageData} pageIndex={index * 2 + 4} runningHeaderEn={runningHeaderEn} onProjectClick={handleProjectClick} />
                </div>
            );
        });

        while (bookPagesToRender.length < totalPages - 1) {
            const isLeftPage = bookPagesToRender.length % 2 !== 0;
            bookPagesToRender.push(
                <div key={`blank-${bookPagesToRender.length}`} className="page-light bg-[#f8f9fa] w-full flex flex-col h-full relative">
                    {isLeftPage ? (
                        <>
                            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[rgba(0,0,0,0.2)] to-transparent pointer-events-none z-30 print:hidden"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[rgba(0,0,0,0.1)] pointer-events-none z-30 print:hidden"></div>
                        </>
                    ) : (
                        <>
                            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[rgba(0,0,0,0.2)] to-transparent pointer-events-none z-30 print:hidden"></div>
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[rgba(0,0,0,0.1)] pointer-events-none z-30 print:hidden"></div>
                        </>
                    )}
                </div>
            );
        }

        bookPagesToRender.push(
            <div key="back-cover" className="page-wrapper h-full">
                <BackCover />
            </div>
        );

        return { macroGroupsMenu, totalPages, bookPagesToRender };
    }, [handleProjectClick]);

    useEffect(() => {
        const scrollZone = bookAreaRef.current;
        if (!scrollZone) return;
        const handleNativeWheel = (e: WheelEvent) => {
            e.preventDefault();
            const now = Date.now();
            if (now - lastFlipTime.current < 700) return;
            const absX = Math.abs(e.deltaX);
            const absY = Math.abs(e.deltaY);
            if (absY > absX) {
                if (e.deltaY > 25) { bookRef.current?.pageFlip()?.flipNext(); lastFlipTime.current = now; }
                else if (e.deltaY < -25) { bookRef.current?.pageFlip()?.flipPrev(); lastFlipTime.current = now; }
            } else {
                if (e.deltaX > 25) { bookRef.current?.pageFlip()?.flipNext(); lastFlipTime.current = now; }
                else if (e.deltaX < -25) { bookRef.current?.pageFlip()?.flipPrev(); lastFlipTime.current = now; }
            }
        };
        scrollZone.addEventListener("wheel", handleNativeWheel, { passive: false });
        return () => scrollZone.removeEventListener("wheel", handleNativeWheel);
    }, [isReady]);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith("#p=")) {
                const p = parseInt(hash.replace("#p=", ""), 10) - 1;
                if (!isNaN(p) && p >= 0 && p < totalPages && isReady) goToPage(p);
            }
        };
        if (isReady) handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [isReady, totalPages]);

    useEffect(() => {
        if (isReady) window.history.replaceState(null, "", `#p=${currentPage + 1}`);
        if (!isDesktop) {
            setInputPage((currentPage + 1).toString());
        } else {
            if (currentPage === 0) setInputPage("1");
            else if (currentPage === totalPages - 1) setInputPage(totalPages.toString());
            else {
                const leftPage = currentPage;
                const rightPage = currentPage + 1;
                setInputPage(rightPage >= totalPages ? `${leftPage}` : `${leftPage}-${rightPage}`);
            }
        }
    }, [currentPage, totalPages, isReady, isDesktop]);

    const goToPage = useCallback((pageIndex: number) => {
        if (bookRef.current?.pageFlip()) bookRef.current.pageFlip().flip(pageIndex);
    }, []);

    const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const p = parseInt(inputPage.split('-')[0], 10) - 1;
            if (!isNaN(p) && p >= 0 && p < totalPages) goToPage(p);
            else setInputPage(!isDesktop ? (currentPage + 1).toString() : (currentPage === 0 ? "1" : `${currentPage}-${currentPage + 1}`));
        }
    };

    const handleFlip = useCallback((e: any) => {
        setCurrentPage(e.data);
        if (soundEnabled && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
        }
    }, [soundEnabled]);

    const flipbookComponent = useMemo(() => (
        // @ts-ignore
        <HTMLFlipBook
            key={isDesktop ? "desktop" : "mobile"}
            width={isDesktop ? 600 : 424} height={isDesktop ? 750 : 600} size="fixed" maxShadowOpacity={0.4}
            showCover={true} mobileScrollSupport={true} className="w-full h-full" ref={bookRef}
            onInit={() => setIsReady(true)} onFlip={handleFlip} usePortrait={!isDesktop} drawShadow={true} flippingTime={650}
        >
            {bookPagesToRender}
        </HTMLFlipBook>
    ), [isDesktop, handleFlip, bookPagesToRender]);

    return (
        <div ref={containerRef} className="flex flex-col h-screen w-full font-sans overflow-hidden select-none relative back print:block print:h-auto print:overflow-visible print:w-full">
            <div className="absolute inset-0 z-0 flex pointer-events-none print:hidden">
                <div className="relative w-1/2 h-full opacity-100 sepia-[20%] transform-gpu">
                    <Image src="/nga-6-buon-ma-thuot-guong-mat-thuong-hieu-cua-thanh-pho-vung-cao-06-1652171304.jpg" alt="Buôn Ma Thuột Bg" fill sizes="50vw" priority quality={60} className="object-cover" />
                </div>
                <div className="relative w-1/2 h-full opacity-100 sepia-[20%] transform-gpu">
                    <Image src="/depositphotos659116602xl-1715649541611.jpg" alt="Nghinh Phong Bg" fill sizes="50vw" priority quality={60} className="object-cover" />
                </div>
            </div>

            <audio ref={audioRef} src="https://www.soundjay.com/misc/sounds/page-flip-01a.mp3" preload="auto" />

            <div ref={bookAreaRef} className="flex-1 w-full flex items-center justify-center overflow-hidden relative z-10 print:hidden">
                <button onClick={() => bookRef.current?.pageFlip()?.flipPrev()} className="absolute left-3 z-50 p-3 bg-[rgba(0,0,0,0.4)] hover:bg-[rgba(0,0,0,0.7)] text-white rounded-full backdrop-blur transition-all hidden sm:flex"><ChevronLeft size={28} /></button>
                <button onClick={() => bookRef.current?.pageFlip()?.flipNext()} className="absolute right-3 z-50 p-3 bg-[rgba(0,0,0,0.4)] hover:bg-[rgba(0,0,0,0.7)] text-white rounded-full backdrop-blur transition-all hidden sm:flex"><ChevronRight size={28} /></button>

                <div className={`flex items-center justify-center transition-all duration-500 transform-gpu ${isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ transform: `scale(${zoom * baseScale})` }}>
                    <div className="relative flex items-center justify-center " style={{ width: isDesktop ? 1200 : 424, height: isDesktop ? 750 : 600 }}>

                        <div className="absolute right-[calc(100%-1px)] top-8 flex-col gap-1.5 z-0 flex">
                            {macroGroupsMenu.map((menu, mIdx) => (
                                <MacroTab key={`left-${mIdx}`} menu={menu} mIdx={mIdx} currentPage={currentPage} side="left" onTabClick={goToPage} />
                            ))}
                        </div>

                        <div className="relative w-full h-full z-10  ">
                            {flipbookComponent}
                        </div>

                        <div className="absolute left-[calc(100%-1px)] top-8 flex-col gap-1.5 z-0 flex">
                            {macroGroupsMenu.map((menu, mIdx) => (
                                <MacroTab key={`right-${mIdx}`} menu={menu} mIdx={mIdx} currentPage={currentPage} side="right" onTabClick={goToPage} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Toolbar
                inputPage={inputPage} totalPages={totalPages} zoom={zoom} soundEnabled={soundEnabled}
                isFullscreen={isFullscreen} setInputPage={setInputPage} handlePageInput={handlePageInput}
                goToPage={goToPage} bookRef={bookRef} setZoom={setZoom} setSoundEnabled={setSoundEnabled}
                toggleFullscreen={() => { !document.fullscreenElement ? containerRef.current?.requestFullscreen() : document.exitFullscreen() }}
            />

            <div className="print:hidden">
                {hasOpenedModal && (
                    <ProjectModal
                        isOpen={!!selectedProject}
                        onClose={() => setSelectedProject(null)}
                        project={selectedProject}
                        lang={modalLang}
                    />
                )}
            </div>
        </div>
    );
}
