"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { AccentColor } from "@/types/resume";

const ACCENT_COLORS: Record<AccentColor, { primary: string; light: string; border: string }> = {
  indigo: { primary: "#4f46e5", light: "#eef2ff", border: "#c7d2fe" },
  emerald: { primary: "#059669", light: "#ecfdf5", border: "#a7f3d0" },
  blue: { primary: "#2563eb", light: "#eff6ff", border: "#bfdbfe" },
  rose: { primary: "#e11d48", light: "#fff1f2", border: "#fecdd3" },
  slate: { primary: "#1e293b", light: "#f8fafc", border: "#cbd5e1" },
  violet: { primary: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe" },
};

export function A4ResumeCanvas() {
  const { resume, theme, zoom } = useResume();
  const colors = ACCENT_COLORS[theme.accentColor];

  return (
    <div
      style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
      className="transition-transform duration-150 select-text"
    >
      {theme.templateId === "modern" && (
        <div className="a4-sheet p-10 font-sans leading-relaxed text-slate-800 flex flex-col justify-between">
          <div>
            <div className="border-b-2 pb-5" style={{ borderColor: colors.primary }}>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {resume.personal.fullName}
              </h1>
              <p className="text-base font-semibold mt-1" style={{ color: colors.primary }}>
                {resume.personal.jobTitle}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-slate-600">
                {resume.personal.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {resume.personal.email}</span>}
                {resume.personal.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {resume.personal.phone}</span>}
                {resume.personal.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {resume.personal.location}</span>}
                {resume.personal.linkedin && <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-slate-400" /> {resume.personal.linkedin}</span>}
                {resume.personal.github && <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-slate-400" /> {resume.personal.github}</span>}
              </div>
            </div>

            {resume.personal.summary && (
              <div className="mt-5">
                <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.primary }}>
                  Ringkasan Profesional
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">{resume.personal.summary}</p>
              </div>
            )}

            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.border }}>
                Pengalaman Kerja
              </h2>
              <div className="space-y-4">
                {resume.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-bold text-xs text-slate-900">{exp.role}</span>
                        <span className="text-xs text-slate-600 font-medium"> — {exp.company}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <ul className="mt-1.5 list-disc list-inside space-y-1 text-xs text-slate-700">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {resume.projects.length > 0 && (
              <div className="mt-5">
                <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.border }}>
                  Proyek Unggulan
                </h2>
                <div className="space-y-2.5">
                  {resume.projects.map((proj) => (
                    <div key={proj.id} className="text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{proj.title}</span>
                        {proj.link && <span className="text-[10px] text-slate-400 font-mono">({proj.link})</span>}
                      </div>
                      <p className="text-slate-600 mt-0.5">{proj.description}</p>
                      <div className="flex gap-1.5 mt-1">
                        {proj.techStack.map((tech, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.border }}>
                Keahlian Teknis
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {resume.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] font-medium"
                    style={{ backgroundColor: colors.light, color: colors.primary, border: `1px solid ${colors.border}` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.border }}>
                Pendidikan
              </h2>
              <div className="space-y-2">
                {resume.educations.map((edu) => (
                  <div key={edu.id} className="flex justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{edu.degree}</span>
                      <p className="text-slate-600">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-slate-500 text-[11px]">{edu.year}</span>
                      {edu.gpa && <p className="text-[10px] text-slate-600 font-medium">{edu.gpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-mono">
            <span>CraftCV AI • Format ATS Terverifikasi</span>
            <span>Halaman 1 / 1</span>
          </div>
        </div>
      )}

      {theme.templateId === "tech-minimal" && (
        <div className="a4-sheet p-10 font-mono text-[11px] leading-relaxed text-slate-800 flex flex-col justify-between">
          <div>
            <div className="border-b pb-4 border-slate-900">
              <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
                {resume.personal.fullName}
              </h1>
              <p className="text-xs font-bold text-slate-700 mt-0.5">&gt; {resume.personal.jobTitle}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-slate-600">
                <span>{resume.personal.email}</span>
                <span>•</span>
                <span>{resume.personal.phone}</span>
                <span>•</span>
                <span>{resume.personal.location}</span>
                {resume.personal.github && (
                  <>
                    <span>•</span>
                    <span>{resume.personal.github}</span>
                  </>
                )}
              </div>
            </div>

            {resume.personal.summary && (
              <div className="mt-4">
                <p className="text-[11px] text-slate-700 leading-normal">{resume.personal.summary}</p>
              </div>
            )}

            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-slate-900 pb-0.5">
                // PENGALAMAN KERJA
              </h2>
              <div className="space-y-3">
                {resume.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{exp.role} @ {exp.company}</span>
                      <span>[{exp.startDate} - {exp.endDate}]</span>
                    </div>
                    <ul className="mt-1 space-y-1 text-slate-700">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>* {b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-slate-900 pb-0.5">
                // STACK TEKNIS
              </h2>
              <p className="text-slate-800 leading-normal">{resume.skills.join(" | ")}</p>
            </div>

            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-slate-900 pb-0.5">
                // PENDIDIKAN
              </h2>
              {resume.educations.map((edu) => (
                <div key={edu.id} className="flex justify-between text-slate-800">
                  <span>{edu.degree} - {edu.institution}</span>
                  <span>{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-300 text-[9px] text-slate-500 flex justify-between">
            <span>[EOF] CRAFTCV_ATS_SPEC_V2</span>
            <span>1/1</span>
          </div>
        </div>
      )}

      {theme.templateId === "executive" && (
        <div className="a4-sheet font-sans leading-relaxed text-slate-800 flex min-h-[297mm]">
          <div className="w-64 p-8 text-white flex flex-col justify-between" style={{ backgroundColor: colors.primary }}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{resume.personal.fullName}</h1>
                <p className="text-xs text-white/80 mt-1 font-medium">{resume.personal.jobTitle}</p>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1 mb-2">Kontak</h3>
                <div className="space-y-1.5 text-[11px] text-white/90">
                  <p>{resume.personal.email}</p>
                  <p>{resume.personal.phone}</p>
                  <p>{resume.personal.location}</p>
                  {resume.personal.website && <p>{resume.personal.website}</p>}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1 mb-2">Keahlian</h3>
                <div className="flex flex-wrap gap-1">
                  {resume.skills.map((s, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/15 text-white">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1 mb-2">Edukasi</h3>
                {resume.educations.map((ed) => (
                  <div key={ed.id} className="text-[11px] text-white/90 mb-2">
                    <p className="font-bold">{ed.degree}</p>
                    <p className="text-white/70 text-[10px]">{ed.institution}</p>
                    <p className="text-white/60 text-[10px]">{ed.year}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[9px] text-white/50 font-mono">Executive Format</p>
          </div>

          <div className="flex-1 p-8 flex flex-col justify-between">
            <div>
              {resume.personal.summary && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">Profil Eksekutif</h2>
                  <p className="text-xs text-slate-700 leading-relaxed">{resume.personal.summary}</p>
                </div>
              )}

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-3">Riwayat Karir</h2>
                <div className="space-y-4">
                  {resume.experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-900">{exp.role}</span>
                        <span className="text-slate-500 font-mono text-[11px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">{exp.company} • {exp.location}</p>
                      <ul className="mt-1 list-disc list-inside space-y-1 text-xs text-slate-700">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t text-[10px] text-slate-400 font-mono flex justify-between">
              <span>CraftCV AI</span>
              <span>1 / 1</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
