import type { Metadata } from "next";
import "./globals.css";
import { ResumeProvider } from "@/context/ResumeContext";
import { ATSScoreModal } from "@/components/ATSScoreModal";
import { JobMatcherModal } from "@/components/JobMatcherModal";

export const metadata: Metadata = {
  title: "CraftCV AI - Intelligent ATS Resume Studio & Career OS",
  description: "Real-time Split-Screen ATS Resume Builder and Career Copilot for Modern Professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-600 selection:text-white">
        <ResumeProvider>
          {children}
          <ATSScoreModal />
          <JobMatcherModal />
        </ResumeProvider>
      </body>
    </html>
  );
}
