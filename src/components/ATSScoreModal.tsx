"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";
import { X, CheckCircle2, AlertCircle, Sparkles, ShieldCheck, Zap } from "lucide-react";

export function ATSScoreModal() {
  const { ats, isATSModalOpen, setIsATSModalOpen } = useResume();

  if (!isATSModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#0c111d] border border-slate-800 rounded-2xl shadow-2xl p-6 relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Analisis Skor ATS CV</h3>
              <p className="text-xs text-slate-400">Evaluasi kompatibilitas sistem seleksi HRD</p>
            </div>
          </div>
          <button
            onClick={() => setIsATSModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-300">Skor Total ATS:</span>
              <h2 className="text-3xl font-extrabold text-white font-mono mt-0.5">
                {ats.overallScore} <span className="text-sm font-sans text-emerald-400 font-semibold">/ 100</span>
              </h2>
              <p className="text-[11px] text-emerald-300 mt-1">Sangat Siap Lolos Mesin Screening Perusahaan</p>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-white font-mono text-base">
              {ats.overallScore}%
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Kelengkapan Informasi Kontak</span>
                <span className="font-mono text-emerald-400">{ats.contactScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${ats.contactScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Kepadatan Kata Kunci Teknis</span>
                <span className="font-mono text-blue-400">{ats.skillsScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${ats.skillsScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Kata Kerja Aksi Kuat (Action Verbs)</span>
                <span className="font-mono text-indigo-400">{ats.actionVerbsScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${ats.actionVerbsScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Metrik Terukur & Dampak Bisnis (Metrics)</span>
                <span className="font-mono text-purple-400">{ats.metricsScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${ats.metricsScore}%` }} />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Rekomendasi Optimasi:
            </span>
            <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
              {ats.suggestions.length === 0 ? (
                <li className="text-emerald-400">CV Anda sudah sangat optimal memenuhi standar ATS!</li>
              ) : (
                ats.suggestions.map((sug, i) => <li key={i}>{sug}</li>)
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
