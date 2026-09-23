"use client";

import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { User, Briefcase, GraduationCap, Wrench, FolderGit2, Plus, Trash2, Palette, LayoutTemplate } from "lucide-react";
import { AccentColor, TemplateId } from "@/types/resume";

export function ResumeFormEditor() {
  const {
    resume,
    theme,
    updatePersonal,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addProject,
    updateProject,
    deleteProject,
    updateSkills,
    setAccentColor,
    setTemplateId,
  } = useResume();

  const [activeTab, setActiveTab] = useState<"personal" | "experience" | "skills" | "projects" | "education">("personal");
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim() && !resume.skills.includes(skillInput.trim())) {
      updateSkills([...resume.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const colors: AccentColor[] = ["indigo", "emerald", "blue", "rose", "slate", "violet"];

  return (
    <div className="flex flex-col h-full bg-[#0c111d] border-r border-slate-800 text-slate-200">
      <div className="p-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-950/40">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="w-3.5 h-3.5 text-indigo-400" />
          <select
            value={theme.templateId}
            onChange={(e) => setTemplateId(e.target.value as TemplateId)}
            className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
          >
            <option value="modern">Template: Modern Tech</option>
            <option value="tech-minimal">Template: Tech Minimalist</option>
            <option value="executive">Template: Executive Sidebar</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setAccentColor(c)}
              className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                theme.accentColor === c ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#0c111d]" : "hover:scale-110"
              }`}
              style={{
                backgroundColor:
                  c === "indigo" ? "#4f46e5" : c === "emerald" ? "#059669" : c === "blue" ? "#2563eb" : c === "rose" ? "#e11d48" : c === "slate" ? "#334155" : "#7c3aed",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex border-b border-slate-800 text-xs overflow-x-auto">
        {[
          { id: "personal", label: "Profil", icon: User },
          { id: "experience", label: "Pengalaman", icon: Briefcase },
          { id: "skills", label: "Skills", icon: Wrench },
          { id: "projects", label: "Proyek", icon: FolderGit2 },
          { id: "education", label: "Edukasi", icon: GraduationCap },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive ? "border-b-2 border-indigo-500 text-indigo-400 bg-slate-900/60" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
        {activeTab === "personal" && (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Nama Lengkap & Gelar</label>
              <input
                type="text"
                value={resume.personal.fullName}
                onChange={(e) => updatePersonal({ fullName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Target Jabatan / Role</label>
              <input
                type="text"
                value={resume.personal.jobTitle}
                onChange={(e) => updatePersonal({ jobTitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={resume.personal.email}
                  onChange={(e) => updatePersonal({ email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">No. WhatsApp / HP</label>
                <input
                  type="text"
                  value={resume.personal.phone}
                  onChange={(e) => updatePersonal({ phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Domisili / Kota</label>
                <input
                  type="text"
                  value={resume.personal.location}
                  onChange={(e) => updatePersonal({ location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">GitHub / Portofolio Link</label>
                <input
                  type="text"
                  value={resume.personal.github || ""}
                  onChange={(e) => updatePersonal({ github: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Ringkasan Profesional (Summary)</label>
              <textarea
                rows={4}
                value={resume.personal.summary}
                onChange={(e) => updatePersonal({ summary: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-white leading-relaxed"
              />
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="font-semibold text-slate-300">Pengalaman Kerja</span>
              <button
                onClick={addExperience}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Posisi
              </button>
            </div>

            {resume.experiences.map((exp) => (
              <div key={exp.id} className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-xs">{exp.role}</span>
                  <button onClick={() => deleteExperience(exp.id)} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Jabatan"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Perusahaan"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Mulai (2023)"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Selesai (Sekarang)"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Poin Pencapaian & Dampak Bisnis</label>
                  <textarea
                    rows={3}
                    value={exp.bullets.join("\n")}
                    onChange={(e) =>
                      updateExperience(exp.id, {
                        bullets: e.target.value.split("\n").filter((b) => b.trim() !== ""),
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-4">
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                placeholder="Ketik skill (Docker, Next.js, Kubernetes)..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
              <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold">
                Tambah
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {resume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs flex items-center gap-1.5"
                >
                  {skill}
                  <button
                    onClick={() => updateSkills(resume.skills.filter((s) => s !== skill))}
                    className="text-slate-400 hover:text-rose-400 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="font-semibold text-slate-300">Proyek Unggulan</span>
              <button onClick={addProject} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                <Plus className="w-3.5 h-3.5" /> Tambah Proyek
              </button>
            </div>

            {resume.projects.map((proj) => (
              <div key={proj.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-xs">{proj.title}</span>
                  <button onClick={() => deleteProject(proj.id)} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Nama Proyek"
                  value={proj.title}
                  onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                />
                <textarea
                  rows={2}
                  placeholder="Deskripsi singkat pencapaian proyek"
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Tech Stack (pisahkan koma, misal: React, Node.js)"
                  value={proj.techStack.join(", ")}
                  onChange={(e) =>
                    updateProject(proj.id, {
                      techStack: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="font-semibold text-slate-300">Pendidikan</span>
              <button onClick={addEducation} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                <Plus className="w-3.5 h-3.5" /> Tambah
              </button>
            </div>

            {resume.educations.map((edu) => (
              <div key={edu.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-xs">{edu.degree}</span>
                  <button onClick={() => deleteEducation(edu.id)} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Gelar & Jurusan"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Institusi / Universitas"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
