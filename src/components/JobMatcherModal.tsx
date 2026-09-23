"use client";

import React, { useState, useMemo } from "react";
import { useResume } from "@/context/ResumeContext";
import { JobPreset, KeywordAnalysis, JobMatchResult } from "@/types/jobMatcher";
import { X, Briefcase, CheckCircle2, AlertCircle, Plus, Sparkles, Check, ArrowRight } from "lucide-react";

const JOB_PRESETS: JobPreset[] = [
  {
    id: "preset-fullstack",
    title: "Senior Full-Stack & Cloud Engineer",
    company: "Global Tech Enterprise",
    level: "Senior / Lead",
    category: "Engineering",
    description:
      "Kami mencari Senior Full-Stack Engineer yang mahir membangun platform web terdistribusi skala tinggi dengan Next.js, TypeScript, Node.js/NestJS, Docker, Kubernetes, PostgreSQL, Redis, dan microservices architecture. Berpengalaman dalam CI/CD automated deployment, Redis caching, dan system design high availability.",
    targetKeywords: [
      "TypeScript",
      "React / Next.js",
      "Tailwind CSS",
      "Node.js / NestJS",
      "PostgreSQL & Prisma",
      "Docker & Kubernetes",
      "Redis",
      "GraphQL",
      "CI/CD",
      "Microservices",
      "System Design",
      "AWS",
    ],
  },
  {
    id: "preset-ai",
    title: "AI Systems & Solutions Architect",
    company: "NextGen AI Labs",
    level: "Staff / Principal",
    category: "Artificial Intelligence",
    description:
      "Mencari AI Systems Architect untuk memimpin perancangan pipeline AI agentic systems, RAG workflows, evaluasi performa LLM, fine-tuning, vector database, LangChain/LlamaIndex, dan integrasi API skala enterprise dengan latensi rendah.",
    targetKeywords: [
      "AI Agentic Systems",
      "TypeScript",
      "Python",
      "PyTorch",
      "RAG & Vector DB",
      "LangChain",
      "OpenAI API",
      "Docker & Kubernetes",
      "PostgreSQL & Prisma",
      "System Design",
    ],
  },
  {
    id: "preset-devops",
    title: "Lead DevOps & Platform SRE",
    company: "CloudScale Infra",
    level: "Lead",
    category: "Infrastructure",
    description:
      "Mencari Lead DevOps Engineer untuk mengelola cluster Kubernetes multi-region, Terraform infrastructure-as-code, GitHub Actions pipeline, observabilitas dengan Prometheus dan Grafana, serta security compliance sistem.",
    targetKeywords: [
      "Docker & Kubernetes",
      "Terraform",
      "GitHub Actions",
      "AWS",
      "Prometheus & Grafana",
      "CI/CD",
      "PostgreSQL & Prisma",
      "Node.js / NestJS",
      "Security Compliance",
    ],
  },
];

export function JobMatcherModal() {
  const { resume, isJobModalOpen, setIsJobModalOpen, addSkill } = useResume();
  const [selectedPresetId, setSelectedPresetId] = useState<string>("preset-fullstack");
  const [customJD, setCustomJD] = useState<string>(JOB_PRESETS[0].description);
  const [addedSkillsToast, setAddedSkillsToast] = useState<string | null>(null);

  const selectedPreset = JOB_PRESETS.find((p) => p.id === selectedPresetId) || JOB_PRESETS[0];

  const handleSelectPreset = (preset: JobPreset) => {
    setSelectedPresetId(preset.id);
    setCustomJD(preset.description);
  };

  const analysisResult: JobMatchResult = useMemo(() => {
    const targetList = selectedPreset.targetKeywords;
    const resumeText = [
      resume.personal.summary,
      ...resume.skills,
      ...resume.experiences.flatMap((e) => [e.role, e.company, ...e.bullets]),
      ...resume.projects.flatMap((p) => [p.title, p.description, ...p.techStack]),
    ].join(" ").toLowerCase();

    const keywords: KeywordAnalysis[] = targetList.map((kw) => {
      const kwLower = kw.toLowerCase();
      const inSkills = resume.skills.some((s) => s.toLowerCase().includes(kwLower) || kwLower.includes(s.toLowerCase()));
      const inExperience = resumeText.includes(kwLower);
      const matched = inSkills || inExperience;

      let cat: KeywordAnalysis["category"] = "General";
      if (/react|next|tailwind|typescript|graphql/i.test(kw)) cat = "Frontend";
      else if (/node|nest|postgres|prisma|redis|python|microservices/i.test(kw)) cat = "Backend";
      else if (/docker|kubernetes|aws|terraform|ci\/cd|prometheus/i.test(kw)) cat = "Cloud/DevOps";
      else if (/ai|agent|rag|vector|system design/i.test(kw)) cat = "Architecture/AI";

      return {
        keyword: kw,
        category: cat,
        matched,
        inSkills,
        inExperience,
      };
    });

    const matchedCount = keywords.filter((k) => k.matched).length;
    const missingCount = keywords.length - matchedCount;
    const matchScore = Math.round((matchedCount / keywords.length) * 100);

    const recommendations: string[] = [];
    if (missingCount > 0) {
      recommendations.push(
        `Tambahkan ${missingCount} kata kunci yang belum terdeteksi agar lolos filter ATS untuk posisi ${selectedPreset.title}.`
      );
    } else {
      recommendations.push("Profil CV Anda sangat cocok dan 100% selaras dengan kualifikasi lowongan ini!");
    }

    if (!resume.skills.some((s) => s.toLowerCase().includes("system design"))) {
      recommendations.push("Tambahkan 'System Design' untuk memperkuat profil level Senior/Lead Anda.");
    }

    return {
      matchScore,
      totalTarget: keywords.length,
      matchedCount,
      missingCount,
      keywords,
      recommendations,
    };
  }, [resume, selectedPreset]);

  const handleAddKeyword = (kw: string) => {
    addSkill(kw);
    setAddedSkillsToast(`Skill "${kw}" berhasil ditambahkan ke resume Anda!`);
    setTimeout(() => setAddedSkillsToast(null), 3000);
  };

  if (!isJobModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#0c111d] border border-slate-800 rounded-2xl shadow-2xl p-6 relative max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Job Description Matcher & Keyword Gap Analyzer
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">AI COPILOT</span>
              </h3>
              <p className="text-xs text-slate-400">Bandingkan resume Anda dengan kriteria loker incaran & tambahkan kata kunci yang kurang</p>
            </div>
          </div>
          <button
            onClick={() => setIsJobModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {addedSkillsToast && (
          <div className="my-2 p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in slide-in-from-top-1">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{addedSkillsToast}</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-1 space-y-5 my-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">Pilih Contoh Posisi Loker (Preset):</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {JOB_PRESETS.map((preset) => {
                const isActive = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/10"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-semibold">{preset.title}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{preset.company} • {preset.level}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Deskripsi Lowongan Kerja (Job Description):</label>
            <textarea
              rows={3}
              value={customJD}
              onChange={(e) => setCustomJD(e.target.value)}
              placeholder="Tempel Job Description lengkap di sini..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Tingkat Keselarasan Loker (Match Score):</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white font-mono">{analysisResult.matchScore}%</span>
                <span className={`text-xs font-semibold ${analysisResult.matchScore >= 80 ? "text-emerald-400" : analysisResult.matchScore >= 60 ? "text-amber-400" : "text-rose-400"}`}>
                  {analysisResult.matchScore >= 80 ? "Sangat Kompetitif" : analysisResult.matchScore >= 60 ? "Cukup Relevan" : "Perlu Optimasi"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {analysisResult.matchedCount} dari {analysisResult.totalTarget} kata kunci utama ditemukan di profil Anda.
              </p>
            </div>
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg font-mono ${
              analysisResult.matchScore >= 80 ? "border-emerald-500 text-emerald-400" : analysisResult.matchScore >= 60 ? "border-amber-500 text-amber-400" : "border-rose-500 text-rose-400"
            }`}>
              {analysisResult.matchScore}%
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Analisis Kata Kunci Kualifikasi:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {analysisResult.keywords.map((kw) => (
                <div
                  key={kw.keyword}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${
                    kw.matched
                      ? "bg-emerald-950/20 border-emerald-500/30 text-slate-200"
                      : "bg-rose-950/20 border-rose-500/30 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {kw.matched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <div>
                      <div className="font-semibold">{kw.keyword}</div>
                      <div className="text-[10px] text-slate-400">
                        {kw.category} • {kw.matched ? "Ditemukan di Resume" : "Belum Ada"}
                      </div>
                    </div>
                  </div>
                  {!kw.matched && (
                    <button
                      onClick={() => handleAddKeyword(kw.keyword)}
                      className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-[11px] font-semibold cursor-pointer transition-all shadow-sm"
                      title="Tambahkan kata kunci ini langsung ke daftar skill resume"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="font-semibold text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Rekomendasi Optimasi AI
            </div>
            {analysisResult.recommendations.map((rec, i) => (
              <p key={i} className="text-slate-300 text-[11px] leading-relaxed flex items-start gap-1.5">
                <span className="text-indigo-400">•</span> {rec}
              </p>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={() => setIsJobModalOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
