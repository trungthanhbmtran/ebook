import React from "react";
import { MapPin, Maximize2, DollarSign } from "lucide-react";

interface ProjectCardProps {
    item: any;
    lang?: "vi" | "en";
}

export default function ProjectCard({ item, lang = "vi" }: ProjectCardProps) {
    const isEn = lang === "en";

    // 1. Nhãn tĩnh (labels)
    const labels = {
        location: isEn ? "Location:" : "Vị trí:",
        area: isEn ? "Area:" : "Diện tích:",
        investment: isEn ? "Investment:" : "Vốn đầu tư:",
        scale: isEn ? "Scale:" : "Quy mô:",
        unspecified: isEn ? "Not specified" : "Chưa xác định",
    };

    // 2. Trích xuất dữ liệu đa ngôn ngữ
    const tenDuAn = isEn
        ? (item.name?.en || item.tenDuAnEn || item.tenDuAn)
        : (item.name?.vi || item.tenDuAn || item.name);

    const diaDiem = isEn
        ? (item.location?.en || item.diaDiemEn || item.diaDiem)
        : (item.location?.vi || item.diaDiem || item.location);

    const tongVon = isEn
        ? (item.investmentCapital?.en || item.tongVonEn || item.tongVon)
        : (item.investmentCapital?.vi || item.tongVon || item.investmentCapital);

    const dienTich = item.area || item.dienTich;

    let quyMo = "";
    if (typeof item.scale === "string") {
        quyMo = item.scale;
    } else if (item.scale) {
        quyMo = isEn ? item.scale.en : item.scale.vi;
    } else {
        quyMo = item.quyMo;
    }

    return (
        <div className="rounded-xl border border-[#cba365]/25 p-[20px] shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 relative bg-white h-full text-black">

            {/* Thanh trang trí */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#cba365]"></div>

            {/* Tiêu đề dự án */}
            <div className="flex items-start gap-2 pt-1">
                <div className="bg-[#cba365] text-white font-black text-[10px] px-1.5 py-0.5 rounded shrink-0 mt-0.5 shadow-sm">
                    {item.stt ? (parseInt(item.stt) < 10 ? `0${item.stt}` : item.stt) : "01"}
                </div>
                <h5 className="font-bold text-[12.5px] text-gray-900 leading-snug uppercase wrap-break-word">
                    {tenDuAn || "ĐANG CẬP NHẬT..."}
                </h5>
            </div>

            {/* Khung thông tin chi tiết: Đã ĐỔI THÀNH FLEX-COL (Dọc) và BỎ TRUNCATE */}
            <div className="flex flex-col gap-2 text-[11px] text-gray-800 bg-[#faf8f4] p-2.5 rounded-lg border border-[#cba365]/15">

                {/* Vị trí */}
                <div className="flex items-start gap-1.5">
                    <MapPin size={13} className="text-[#cba365] shrink-0 mt-[2px]" />
                    <div className="wrap-break-word">
                        <span className="font-semibold text-gray-600">{labels.location}:</span>{" "}
                        <span className="text-blue-900 font-bold">{diaDiem || "-"}</span>
                    </div>
                </div>

                {/* Diện tích */}
                <div className="flex items-start gap-1.5">
                    <Maximize2 size={13} className="text-[#cba365] shrink-0 mt-[2px]" />
                    <div className="wrap-break-word">
                        <span className="font-semibold text-gray-600">{labels.area}</span>{" "}
                        <span className="text-gray-900 font-bold">{dienTich || "-"}</span>
                    </div>
                </div>

                {/* Vốn đầu tư */}
                <div className="flex items-start gap-1.5 border-t border-[#cba365]/20 pt-1.5 mt-0.5">
                    <DollarSign size={13} className="text-[#c17f3a] shrink-0 mt-[2px]" />
                    <div className="wrap-break-word">
                        <span className="font-semibold text-gray-600">{labels.investment}</span>{" "}
                        <strong className="text-[#a0622a] font-bold text-[11.5px]">
                            {tongVon || labels.unspecified}
                        </strong>
                    </div>
                </div>
            </div>

            {/* Quy mô dự án */}
            {quyMo && (
                <div className="text-[11px] leading-relaxed flex items-start gap-1.5 mt-0.5 px-1">
                    <span className="text-gray-600 font-semibold shrink-0">{labels.scale}</span>
                    {/* Giới hạn 3 dòng thay vì 2 dòng để đọc được nhiều hơn */}
                    <span className="line-clamp-3 text-gray-900 font-medium wrap-break-word">{quyMo}</span>
                </div>
            )}
        </div>
    );
}