"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ResumeData, ThemeConfig, AccentColor, TemplateId, ATSBreakdown } from "@/types/resume";

interface ResumeContextType {
  resume: ResumeData;
  theme: ThemeConfig;
  ats: ATSBreakdown;
  zoom: number;
  setZoom: (z: number | ((prev: number) => number)) => void;
  updatePersonal: (data: Partial<ResumeData["personal"]>) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ResumeData["experiences"][0]>) => void;
  deleteExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData["educations"][0]>) => void;
  deleteEducation: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<ResumeData["projects"][0]>) => void;
  deleteProject: (id: string) => void;
  updateSkills: (skills: string[]) => void;
  addSkill: (skill: string) => void;
  setAccentColor: (color: AccentColor) => void;
  setTemplateId: (tpl: TemplateId) => void;
  isATSModalOpen: boolean;
  setIsATSModalOpen: (open: boolean) => void;
  isJobModalOpen: boolean;
  setIsJobModalOpen: (open: boolean) => void;
}

const SEED_RESUME: ResumeData = {
  personal: {
    fullName: "Rian Pratama, S.Kom.",
    jobTitle: "Senior Full-Stack & AI Systems Engineer",
    email: "rian.pratama@engineer.id",
    phone: "+62 812-8899-7721",
    location: "Jakarta Selatan, Indonesia",
    linkedin: "linkedin.com/in/rianpratama",
    github: "github.com/rian-pratama",
    website: "rianpratama.dev",
    summary:
      "Senior Engineer berpengalaman 5+ tahun dalam merancang sistem web skala tinggi, microservices terdistribusi, dan orkestrasi AI agentic workflows. Berhasil memangkas latensi sistem hingga 42% dan memimpin rilis 10+ produk SaaS siap produksi.",
  },
  experiences: [
    {
      id: "exp-1",
      role: "Lead Systems Architect",
      company: "PT FinTech Solusi Asia",
      location: "Jakarta",
      startDate: "2023",
      endDate: "Sekarang",
      current: true,
      bullets: [
        "Memimpin arsitektur sistem transaksi pembayaran bernilai Rp 12 Miliar/bulan menggunakan Next.js, Node.js, dan Redis.",
        "Mengembangkan automasi pipeline CI/CD yang mempercepat siklus rilis fitur dari 14 hari menjadi 2 hari.",
        "Mengintegrasikan model LLM untuk deteksi anomali fraud dengan akurasi 99.1%.",
      ],
    },
    {
      id: "exp-2",
      role: "Senior Frontend Engineer",
      company: "Nusantara Cloud Labs",
      location: "Bandung (Remote)",
      startDate: "2021",
      endDate: "2023",
      current: false,
      bullets: [
        "Membangun dashboard analitik data real-time berbasis WebSocket yang digunakan oleh 45.000+ pengguna harian.",
        "Meningkatkan skor performa Google Lighthouse dari 68 menjadi 98 melalui optimasi dynamic imports dan code-splitting.",
      ],
    },
  ],
  educations: [
    {
      id: "edu-1",
      degree: "S1 Teknik Informatika (Cum Laude)",
      institution: "Institut Teknologi Bandung (ITB)",
      year: "2017 - 2021",
      gpa: "IPK 3.84 / 4.00",
    },
  ],
  skills: [
    "TypeScript",
    "React / Next.js",
    "Tailwind CSS",
    "Node.js / NestJS",
    "PostgreSQL & Prisma",
    "Docker & Kubernetes",
    "AI Agentic Systems",
    "RESTful API & GraphQL",
  ],
  projects: [
    {
      id: "proj-1",
      title: "FinPulse AI - Intelligent SME Financial OS",
      description: "Platform pembukuan double-entry dan AI OCR receipt scanner dengan 0 error build.",
      techStack: ["Next.js 16", "TypeScript", "Tailwind v4", "Recharts"],
      link: "github.com/finpulse-ai",
    },
  ],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<ResumeData>(SEED_RESUME);
  const [theme, setTheme] = useState<ThemeConfig>({
    accentColor: "indigo",
    templateId: "modern",
  });
  const [zoom, setZoom] = useState(1);
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("craftcv_mega_resume");
    if (saved) {
      try {
        setResume(JSON.parse(saved));
      } catch (e) {
        setResume(SEED_RESUME);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("craftcv_mega_resume", JSON.stringify(resume));
    }
  }, [resume, isInitialized]);

  const calculateATS = (): ATSBreakdown => {
    let contactScore = 0;
    if (resume.personal.email) contactScore += 25;
    if (resume.personal.phone) contactScore += 25;
    if (resume.personal.location) contactScore += 25;
    if (resume.personal.linkedin || resume.personal.github) contactScore += 25;

    let skillsScore = Math.min(100, resume.skills.length * 12);

    const allBullets = resume.experiences.flatMap((e) => e.bullets);
    const actionVerbs = ["Memimpin", "Mengembangkan", "Membangun", "Meningkatkan", "Merancang", "Mengintegrasikan", "Mengoptimalkan"];
    
    let actionCount = 0;
    let metricCount = 0;

    allBullets.forEach((b) => {
      if (actionVerbs.some((v) => b.toLowerCase().includes(v.toLowerCase()))) actionCount++;
      if (/[0-9]|%|Rp|\$|Miliar/i.test(b)) metricCount++;
    });

    const actionVerbsScore = allBullets.length > 0 ? Math.min(100, Math.round((actionCount / allBullets.length) * 100)) : 0;
    const metricsScore = allBullets.length > 0 ? Math.min(100, Math.round((metricCount / allBullets.length) * 100)) : 0;

    const overallScore = Math.round(
      contactScore * 0.2 + skillsScore * 0.25 + actionVerbsScore * 0.25 + metricsScore * 0.3
    );

    const suggestions: string[] = [];
    if (metricsScore < 80) suggestions.push("Tambahkan lebih banyak metrik terukur (% peningkatan, nominal angka) pada poin pengalaman kerja.");
    if (skillsScore < 80) suggestions.push("Tambahkan minimal 8 keahlian teknis relevan dengan posisi incaran Anda.");
    if (actionVerbsScore < 80) suggestions.push("Awali setiap kalimat pencapaian dengan kata kerja aksi yang tegas (misal: 'Memimpin', 'Mengembangkan').");
    if (!resume.personal.summary || resume.personal.summary.length < 50) suggestions.push("Tulis ringkasan profesional minimal 2-3 kalimat padat di bagian profil.");

    return {
      overallScore: Math.max(60, overallScore),
      actionVerbsScore: Math.max(70, actionVerbsScore),
      metricsScore: Math.max(65, metricsScore),
      contactScore,
      skillsScore,
      suggestions,
    };
  };

  const ats = calculateATS();

  const updatePersonal = (data: Partial<ResumeData["personal"]>) => {
    setResume((prev) => ({ ...prev, personal: { ...prev.personal, ...data } }));
  };

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: "Jabatan Baru",
      company: "Nama Perusahaan",
      location: "Kota",
      startDate: "2024",
      endDate: "Sekarang",
      current: true,
      bullets: ["Memimpin inisiatif baru yang menghasilkan efisiensi sebesar 25%."],
    };
    setResume((prev) => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
  };

  const updateExperience = (id: string, data: Partial<ResumeData["experiences"][0]>) => {
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, ...data } : e)),
    }));
  };

  const deleteExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: "Gelar / Jurusan",
      institution: "Universitas / Institusi",
      year: "2020 - 2024",
    };
    setResume((prev) => ({ ...prev, educations: [...prev.educations, newEdu] }));
  };

  const updateEducation = (id: string, data: Partial<ResumeData["educations"][0]>) => {
    setResume((prev) => ({
      ...prev,
      educations: prev.educations.map((ed) => (ed.id === id ? { ...ed, ...data } : ed)),
    }));
  };

  const deleteEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      educations: prev.educations.filter((ed) => ed.id !== id),
    }));
  };

  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "Nama Proyek Baru",
      description: "Jelaskan dampak dan arsitektur sistem dari proyek ini.",
      techStack: ["Next.js", "TypeScript"],
    };
    setResume((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const updateProject = (id: string, data: Partial<ResumeData["projects"][0]>) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateSkills = (skills: string[]) => {
    setResume((prev) => ({ ...prev, skills }));
  };

  const addSkill = (newSkill: string) => {
    setResume((prev) => {
      const trimmed = newSkill.trim();
      if (!trimmed || prev.skills.includes(trimmed)) return prev;
      return { ...prev, skills: [...prev.skills, trimmed] };
    });
  };

  const setAccentColor = (accentColor: AccentColor) => {
    setTheme((prev) => ({ ...prev, accentColor }));
  };

  const setTemplateId = (templateId: TemplateId) => {
    setTheme((prev) => ({ ...prev, templateId }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        theme,
        ats,
        zoom,
        setZoom,
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
        addSkill,
        setAccentColor,
        setTemplateId,
        isATSModalOpen,
        setIsATSModalOpen,
        isJobModalOpen,
        setIsJobModalOpen,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within ResumeProvider");
  return context;
}
