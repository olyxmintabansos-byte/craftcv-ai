"use client";

import React from "react";
import { StudioNavbar } from "@/components/StudioNavbar";
import { ResumeFormEditor } from "@/components/ResumeFormEditor";
import { A4ResumeCanvas } from "@/components/A4ResumeCanvas";

export default function StudioPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <StudioNavbar />
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Form Editor */}
        <div className="w-full lg:w-[480px] xl:w-[540px] shrink-0 h-full overflow-hidden no-print">
          <ResumeFormEditor />
        </div>

        {/* Right Pane: Live A4 Canvas */}
        <div className="flex-1 h-full bg-[#070a10] overflow-auto flex justify-center p-8">
          <A4ResumeCanvas />
        </div>
      </div>
    </div>
  );
}
