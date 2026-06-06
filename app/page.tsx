"use client";

import dynamic from 'next/dynamic';

const FlipbookViewer = dynamic(() => import('../components/FlipbookViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
        <p className="text-muted-foreground font-medium text-lg">Đang tải sách...</p>
      </div>
    </div>
  ),
});

export default function EbookPage() {
  return (

    <FlipbookViewer />
  );
}
