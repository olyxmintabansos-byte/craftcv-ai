"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResume } from "@/context/ResumeContext";
import { InterviewQuestion, QuestionEvaluation } from "@/types/jobMatcher";
import {
  ArrowLeft,
  Bot,
  Sparkles,
  Send,
  Award,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  FileText,
  Lightbulb,
} from "lucide-react";

const QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    round: "Ronde 1: System Design & Skalabilitas",
    category: "System Design",
    title: "High-Throughput Payment Architecture",
    question:
      "Di PT FinTech Solusi Asia, Anda menangani transaksi sebesar Rp 12 Miliar/bulan. Jika volume transaksi melonjak 10x lipat saat kampanye flash sale, bagaimana strategi Anda mencegah double-spending, mengelola concurrency locking pada database PostgreSQL, serta memanfaatkan Redis caching?",
    context: "Menguji pemahaman arsitektur backend, distributed locks, database isolation level, dan idempotency keys.",
    recommendedAnswer:
      "Untuk menangani lonjakan transaksi 10x dan mencegah double-spending, saya menerapkan pola Idempotency Key pada setiap payload request yang disimpan sementara di Redis dengan TTL 24 jam. Pada level database PostgreSQL, transaksi kritis menggunakan isolation level 'Serializable' atau pessimistic locking (SELECT FOR UPDATE) secara cermat. Di depan database, Redis digunakan untuk distributed locking (Redlock) dan rate limiting berbasis token-bucket. Selain itu, kami memigrasikan proses settlement non-kritis ke message broker event-driven (Kafka/RabbitMQ) sehingga core payment engine tetap responsif di bawah 50ms.",
    keyPoints: ["Idempotency Keys", "Redis Distributed Lock", "PostgreSQL Isolation Level", "Event-Driven Queue", "Rate Limiting"],
  },
  {
    id: 2,
    round: "Ronde 2: Frontend Performance & Core Web Vitals",
    category: "Frontend Architecture",
    title: "Lighthouse Performance & Rendering Optimization",
    question:
      "Anda berhasil mendongkrak skor Google Lighthouse dari 68 menjadi 98. Jelaskan metrik Core Web Vitals mana yang paling terdampak, dan teknik arsitektur apa yang Anda terapkan pada Next.js App Router untuk mencapainya?",
    context: "Menguji keahlian optimasi performa web modern, LCP, INP, CLS, dynamic imports, dan SSR/SSG caching.",
    recommendedAnswer:
      "Fokus utama perbaikan adalah metrik LCP (Largest Contentful Paint) dan INP (Interaction to Next Paint). Kami menganalisis bundle menggunakan Webpack Bundle Analyzer dan menemukan libraries charting besar dimuat secara sinkron. Solusinya: 1) Menerapkan dynamic imports (next/dynamic dengan ssr: false) untuk komponen berat; 2) Mengoptimalkan font menggunakan next/font yang zero-layout-shift; 3) Menggunakan modern CSS content-visibility: auto untuk list panjang; 4) Memanfaatkan edge caching pada Next.js Server Components sehingga TTFB terpangkas menjadi di bawah 80ms.",
    keyPoints: ["Dynamic Imports & Code Splitting", "next/font & CLS Zero", "Server Components TTFB", "Edge Caching"],
  },
  {
    id: 3,
    round: "Ronde 3: AI Systems & Agentic Workflows",
    category: "AI & Agents",
    title: "AI Reliability, Guardrails & Token Optimization",
    question:
      "Ketika Anda mengintegrasikan model LLM untuk deteksi fraud dan agentic workflows, bagaimana cara Anda memitigasi risiko halusinasi dan mengendalikan anggaran token agar biaya komputasi tetap efisien?",
    context: "Menguji arsitektur AI praktis: validation schemas (Zod), prompt chaining, fallback models, dan semantic caching.",
    recommendedAnswer:
      "Kami menerapkan 3 lapisan pengamanan: Pertama, Structured Outputs menggunakan JSON schema dengan validasi Zod ketat agar output deterministic. Kedua, Semantic Caching menggunakan Redis Vector DB untuk pertanyaan berulang, memangkas biaya token hingga 35%. Ketiga, Multi-stage reasoning pipeline: tugas klasifikasi ringan dikerjakan oleh model compact (Flash-level), sementara investigasi fraud kompleks diarahkan ke model penalaran tinggi dengan fallback otomatis jika terjadi timeout atau failure.",
    keyPoints: ["Zod Schema Validation", "Semantic Caching", "Model Cascading / Compact routing", "Guardrails"],
  },
  {
    id: 4,
    round: "Ronde 4: Leadership & Conflict Resolution",
    category: "Leadership & Conflict",
    title: "Menyeimbangkan Urgensi Bisnis vs Technical Debt",
    question:
      "Sebagai Lead Engineer, bagaimana Anda menangani situasi ketika Manajemen Produk mendesak rilis fitur dalam 2 hari, sementara arsitektur kode saat ini memiliki technical debt kritis yang berisiko merusak stabilitas produksi?",
    context: "Menguji kematangan kepemimpinan, komunikasi bisnis, risk management, dan mitigasi teknis terukur.",
    recommendedAnswer:
      "Saya menggunakan metode STAR. Situasi: tim bisnis butuh rilis kampanye cepat. Task: menjaga kepuasan stakeholder tanpa mengorbankan stabilitas sistem. Action: Saya mengundang Product Lead ke sesi 'Risk Matrix Review'. Alih-alih menolak mentah-mentah, saya menawarkan rilis bertahap (Feature Flagged MVP) dengan scope terbatas yang aman, didukung circuit breaker otomatis jika error rate naik >0.5%. Result: Kampanye sukses diluncurkan tepat waktu, dan kami mengalokasikan 20% sprint berikutnya untuk refactoring tech-debt tanpa hambatan.",
    keyPoints: ["Metode STAR", "Feature Flags & MVP Scope", "Risk Matrix Analysis", "Circuit Breakers"],
  },
  {
    id: 5,
    round: "Ronde 5: Security & Incident Management",
    category: "Security & Reliability",
    title: "Midnight Production Outage & Fraud Spike Runbook",
    question:
      "Jika terjadi lonjakan error 500 dan anomali transaksi mencurigakan pada jam 2 dini hari, jelaskan protokol investigasi darurat dan runbook mitigasi yang Anda pimpin.",
    context: "Menguji kesiapan on-call, incident command, rollback strategy, observabilitas, dan post-mortem blameless culture.",
    recommendedAnswer:
      "Protokol darurat: 1) Triage & Containment: aktifkan emergency maintenance mode pada endpoint terdampak atau downgrade ke fallback read-only via API Gateway; 2) Observabilitas: periksa dashboard Grafana dan log error terpusat untuk mengisolasi root cause; 3) Mitigasi: jika terjadi regresi akibat deployment terakhir, segera trigger automated rollback via CI/CD; 4) Komunikasi transparan kepada stakeholder via Statuspage; 5) Pasca insiden: memimpin blameless post-mortem dan menambahkan automated regression test.",
    keyPoints: ["Incident Command & Containment", "Automated Rollback", "Observability Triage", "Blameless Post-Mortem"],
  },
];

export default function InterviewCoachPage() {
  const { resume } = useResume();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [evaluations, setEvaluations] = useState<Record<number, QuestionEvaluation>>({});
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const currentQ = QUESTIONS[currentIdx];
  const currentAnswer = userAnswers[currentIdx] || "";
  const currentEval = evaluations[currentIdx];

  const handleFillDemoAnswer = () => {
    setUserAnswers((prev) => ({ ...prev, [currentIdx]: currentQ.recommendedAnswer }));
  };

  const handleEvaluate = () => {
    if (!currentAnswer.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      const charLen = currentAnswer.length;
      const matchedKeys = currentQ.keyPoints.filter((kp) =>
        currentAnswer.toLowerCase().includes(kp.toLowerCase().split(" ")[0])
      );
      let score = Math.min(98, 65 + matchedKeys.length * 7 + (charLen > 200 ? 5 : 0));
      const evaluation: QuestionEvaluation = {
        score,
        feedback:
          score >= 85
            ? "Jawaban sangat matang, komprehensif, dan mencerminkan kaliber Senior/Staff Engineer."
            : "Jawaban cukup baik, namun dapat diperkuat dengan contoh metrik nyata dan metodologi terstruktur.",
        strengths: [
          `Menyentuh konsep kunci: ${matchedKeys.slice(0, 2).join(", ") || currentQ.keyPoints[0]}.`,
          "Struktur penjelasan logis dan mudah dipahami evaluator teknis.",
          "Menunjukkan pemahaman trade-off performa vs reliabilitas.",
        ],
        improvements: [
          "Bisa menambahkan metrik angka riil (contoh: persentase penurunan latensi atau throughput qps).",
          "Gunakan penegasan metode STAR (Situation, Task, Action, Result) secara eksplisit.",
        ],
        starBreakdown: {
          situation: "Konteks sistem transaksi skala tinggi bernilai miliaran rupiah.",
          task: "Menjaga integritas data tanpa mengorbankan user experience.",
          action: "Penerapan locking terdistribusi dan caching strategis.",
          result: "Sistem stabil tanpa double-spending dengan latensi rendah.",
        },
      };
      setEvaluations((prev) => ({ ...prev, [currentIdx]: evaluation }));
      setIsEvaluating(false);
    }, 600);
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };

  const totalAnswered = Object.keys(userAnswers).length;
  const avgScore =
    Object.values(evaluations).length > 0
      ? Math.round(
          Object.values(evaluations).reduce((a, c) => a + c.score, 0) /
            Object.values(evaluations).length
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="h-16 border-b border-slate-800 bg-[#0c111d] flex items-center justify-between px-6 z-30 select-none">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Studio</span>
          </Link>
          <div className="h-5 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white flex items-center gap-2">
                AI Technical Interview Simulator
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">STAFF LEVEL</span>
              </h1>
              <p className="text-[10px] text-slate-400">
                Kandidat: <span className="text-slate-200 font-medium">{resume.personal.fullName}</span> ({resume.personal.jobTitle})
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Progress: <span className="text-purple-400 font-bold">{currentIdx + 1}</span> / {QUESTIONS.length}
          </div>
          <button
            onClick={() => setShowSummary(true)}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Rapor Akhir
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col gap-6">
        {showSummary ? (
          <div className="bg-[#0c111d] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Rapor Kesiapan Interview Kandidat</h2>
                  <p className="text-xs text-slate-400">Hasil simulasi interview teknis dan kepemimpinan sistem skala besar</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Rata-rata Skor:</div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">{avgScore}%</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Status Kualifikasi:</div>
                <div className="text-base font-bold text-emerald-400 mt-1">Staff / Lead Engineer Ready</div>
                <p className="text-[11px] text-slate-400 mt-1">Sangat kompetitif untuk posisi Principal atau Tech Lead di Unicorn/Tech Co.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Pertanyaan Selesai:</div>
                <div className="text-base font-bold text-white mt-1">{totalAnswered} / {QUESTIONS.length} Soal</div>
                <p className="text-[11px] text-slate-400 mt-1">Mencakup System Design, Frontend, AI, dan Incident Management.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Kekuatan Utama:</div>
                <div className="text-base font-bold text-indigo-400 mt-1">Distributed Architecture</div>
                <p className="text-[11px] text-slate-400 mt-1">Jawaban sistematis dengan penerapan STAR method yang meyakinkan.</p>
              </div>
            </div>
            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Kembali ke Soal Simulasi
              </button>
              <Link
                href="/"
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20"
              >
                Selesai & Buka Studio Resume
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left side */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-[#0c111d] border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold font-mono">
                    {currentQ.round}
                  </span>
                  <span className="text-slate-400">{currentQ.category}</span>
                </div>
                <h2 className="text-base font-bold text-white mb-2">{currentQ.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/80">
                  {currentQ.question}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 italic">{currentQ.context}</span>
                  <button
                    onClick={handleFillDemoAnswer}
                    className="flex items-center gap-1.5 text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Isi Jawaban Rekomendasi (Demo)</span>
                  </button>
                </div>
              </div>

              {/* Answer textarea */}
              <div className="bg-[#0c111d] border border-slate-800 rounded-2xl p-6 shadow-xl flex-1 flex flex-col">
                <label className="text-xs font-bold text-slate-300 block mb-2 flex items-center justify-between">
                  <span>Jawaban Anda:</span>
                  <span className="text-[11px] font-mono text-slate-400">{currentAnswer.length} karakter</span>
                </label>
                <textarea
                  rows={8}
                  value={currentAnswer}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, [currentIdx]: e.target.value }))
                  }
                  placeholder="Ketik jawaban teknis Anda di sini menggunakan metode STAR (Situation, Task, Action, Result)..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500 leading-relaxed resize-none flex-1 font-sans"
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={currentIdx === 0}
                      className="px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      Sebelumnya
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer flex items-center gap-1"
                    >
                      <span>Selanjutnya</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={handleEvaluate}
                    disabled={isEvaluating || !currentAnswer.trim()}
                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/20 cursor-pointer transition-all"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Menganalisis Jawaban...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Nilai dengan AI Coach</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {currentEval ? (
                <div className="bg-[#0c111d] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400">Skor Jawaban AI:</span>
                      <div className="text-2xl font-extrabold text-white font-mono mt-0.5">
                        {currentEval.score} <span className="text-xs font-sans text-purple-400">/ 100</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-purple-500 flex items-center justify-center font-bold text-sm text-purple-300 font-mono">
                      {currentEval.score}%
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic bg-purple-950/20 border border-purple-500/20 p-3 rounded-xl">
                    &quot;{currentEval.feedback}&quot;
                  </p>
                  {/* Strengths */}
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Poin Keunggulan Jawaban:
                    </h4>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      {currentEval.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* STAR */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1.5">
                    <span className="font-bold text-slate-200 block mb-1">Evaluasi Format STAR:</span>
                    <div><strong className="text-indigo-400">S (Situation):</strong> {currentEval.starBreakdown.situation}</div>
                    <div><strong className="text-indigo-400">T (Task):</strong> {currentEval.starBreakdown.task}</div>
                    <div><strong className="text-indigo-400">A (Action):</strong> {currentEval.starBreakdown.action}</div>
                    <div><strong className="text-indigo-400">R (Result):</strong> {currentEval.starBreakdown.result}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0c111d] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Menunggu Jawaban Anda</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Ketik jawaban Anda di sebelah kiri atau klik "Isi Jawaban Rekomendasi", lalu tekan "Nilai dengan AI Coach" untuk melihat umpan balik STAR instan.
                  </p>
                </div>
              )}

              {/* Key points checklist */}
              <div className="bg-[#0c111d] border border-slate-800 rounded-2xl p-5 shadow-xl text-xs space-y-2.5">
                <span className="font-bold text-slate-300 block">Kriteria Evaluasi Soal Ini:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentQ.keyPoints.map((kp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono">
                      {kp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
