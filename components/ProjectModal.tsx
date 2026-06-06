import React, { useEffect } from 'react';
import { X, MapPin, Maximize2, DollarSign, Target } from 'lucide-react';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: any;
    lang: 'vi' | 'en';
}

export const ProjectModal = ({ isOpen, onClose, project, lang }: ProjectModalProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    const isVi = lang === 'vi';
    
    const labels = {
        title: isVi ? "Chi tiết dự án" : "Project Details",
        location: isVi ? "Địa điểm" : "Location",
        area: isVi ? "Diện tích" : "Area",
        capital: isVi ? "Tổng vốn đầu tư" : "Investment Capital",
        scale: isVi ? "Quy mô" : "Scale",
        unspecified: isVi ? "Chưa xác định" : "Not specified",
        close: isVi ? "Đóng" : "Close"
    };

    const name = isVi ? (project.name?.vi || project.tenDuAn || project.name || "Đang cập nhật") : (project.name?.en || project.tenDuAn || project.name || "Updating");
    const location = isVi ? (project.location?.vi || project.diaDiem || "-") : (project.location?.en || project.diaDiem || "-");
    const capital = isVi ? (project.investmentCapital?.vi || project.tongVon || labels.unspecified) : (project.investmentCapital?.en || project.tongVon || labels.unspecified);
    const area = project.area || project.dienTich || "-";
    const scale = typeof project.scale === "string" ? project.scale : (isVi ? (project.scale?.vi || project.quyMo || "") : (project.scale?.en || project.quyMo || ""));

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div 
                className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()} 
                onPointerDown={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-[#5C3A21] px-6 py-4 flex justify-between items-center shrink-0">
                    <h3 className="text-white font-bold text-lg uppercase tracking-wider">{labels.title}</h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-[#5C3A21] leading-snug uppercase mb-4">
                            {name}
                        </h2>
                        <div className="w-16 h-1 bg-[#CBA365] rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#FDF8F3] p-4 rounded-xl border border-[#CBA365]/30 flex items-start gap-3">
                            <MapPin className="text-[#CBA365] mt-0.5 shrink-0" size={20} />
                            <div>
                                <div className="text-xs font-bold text-[#8A5A35] uppercase tracking-wider mb-1">{labels.location}</div>
                                <div className="text-[#3B261A] font-medium leading-relaxed">{location}</div>
                            </div>
                        </div>

                        <div className="bg-[#FDF8F3] p-4 rounded-xl border border-[#CBA365]/30 flex items-start gap-3">
                            <Maximize2 className="text-[#CBA365] mt-0.5 shrink-0" size={20} />
                            <div>
                                <div className="text-xs font-bold text-[#8A5A35] uppercase tracking-wider mb-1">{labels.area}</div>
                                <div className="text-[#3B261A] font-medium leading-relaxed">{area}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#FDF8F3] p-4 rounded-xl border border-[#CBA365]/30 flex items-start gap-3">
                        <DollarSign className="text-[#CBA365] mt-0.5 shrink-0" size={20} />
                        <div>
                            <div className="text-xs font-bold text-[#8A5A35] uppercase tracking-wider mb-1">{labels.capital}</div>
                            <div className="text-[#C96E28] font-black text-lg">{capital}</div>
                        </div>
                    </div>

                    {scale && (
                        <div className="bg-[#FDF8F3] p-4 rounded-xl border border-[#CBA365]/30 flex items-start gap-3">
                            <Target className="text-[#CBA365] mt-0.5 shrink-0" size={20} />
                            <div>
                                <div className="text-xs font-bold text-[#8A5A35] uppercase tracking-wider mb-1">{labels.scale}</div>
                                <div className="text-[#3B261A] font-medium leading-relaxed whitespace-pre-line">{scale}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end shrink-0">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-[#5C3A21] hover:bg-[#8A5A35] text-white font-medium rounded-lg transition-colors"
                    >
                        {labels.close}
                    </button>
                </div>
            </div>
        </div>
    );
};
