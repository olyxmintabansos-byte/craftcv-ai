# 📄 CraftCV AI — Intelligent ATS Resume Studio & Interview Coach

[![Live Demo](https://img.shields.io/badge/Live_Demo-Active-emerald?style=for-the-badge&logo=vercel)](https://olyxmintabansos-byte.github.io/craftcv-ai/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-cyan?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

> **Live Demo:** [https://olyxmintabansos-byte.github.io/craftcv-ai/](https://olyxmintabansos-byte.github.io/craftcv-ai/)  
> **AI Interview Coach:** [https://olyxmintabansos-byte.github.io/craftcv-ai/interview/](https://olyxmintabansos-byte.github.io/craftcv-ai/interview/)

CraftCV AI adalah platform karir terintegrasi yang menggabungkan studio pembuatan resume berstandar ATS (Applicant Tracking System) split-screen real-time dan simulator wawancara teknis AI interaktif dengan rubrik evaluasi STAR.

## 🚀 Fitur Utama
- **Split-Screen ATS Resume Builder:** Editor live interaktif berdampingan dengan preview kertas A4 pixel-perfect.
- **3 Template ATS Dinamis:** Modern Minimalist, Tech Lead Executive, dan Classic Academic.
- **Real-Time ATS Score Engine:** Kalkulasi skor keterbacaan bot HRD berbasis kata kunci teknis, metrik dampak, dan panjang teks.
- **AI Technical Interview Coach (/interview):** Simulasi wawancara kerja teknis dengan live audio/text feedback, timer, dan evaluasi rubrik STAR.
- **Export PDF Siap Cetak:** Format cetak standar global tanpa watermark.

## 🏗️ Diagram Arsitektur
```mermaid
graph LR
    A[Form Input Data] --> B[Resume State Manager]
    B --> C[Real-Time ATS Scorer]
    B --> D[A4 Print Renderer]
    E[Interview Route] --> F[AI Interview Engine & STAR Rubric]
```
