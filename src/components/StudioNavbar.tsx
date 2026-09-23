"use client";

import React from "react";
import Link from "next/link";
import { useResume } from "@/context/ResumeContext";
import { Sparkles, Printer, ZoomIn, ZoomOut, ShieldCheck, Briefcase, Cpu } from "lucide-react";

export function StudioNavbar() {
  const { zoom, setZoom, ats, setIsATSModalOpen, setIsJobModalOpen } = useResume();

  return (
    <header className="h-16 border-b border-slate-800 bg-[#0c111d] flex items-center justify-between px-6 z-30 select-none">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h1 className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1.5">
            CraftCV <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono">STUDIO</span>
          </h1>
          <p className="text-[10px] text-slate-400">Intelligent ATS Resume & Career OS</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsATSModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold transition-all cursor-pointer shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Skor ATS: {ats.overallScore}%</span>
          <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300 font-mono">Detail</span>
        </button>

        <button
          onClick={() => setIsJobModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-semibold transition-all cursor-pointer shadow-sm"
        >
          <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
          <span>Cek Loker (Job Matcher)</span>
        </button>

        <Link
          href="/interview"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 text-xs font-semibold transition-all cursor-pointer shadow-sm"
        >
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>Simulasi Interview AI</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-slate-300">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Perkecil Zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono px-2">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Perbesar Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak PDF</span>
        </button>
      </div>
    </header>
  );
}
