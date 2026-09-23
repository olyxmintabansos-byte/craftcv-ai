export interface JobPreset {
  id: string;
  title: string;
  company: string;
  level: string;
  category: string;
  description: string;
  targetKeywords: string[];
}

export interface KeywordAnalysis {
  keyword: string;
  category: "Frontend" | "Backend" | "Cloud/DevOps" | "Architecture/AI" | "General";
  matched: boolean;
  inSkills: boolean;
  inExperience: boolean;
}

export interface JobMatchResult {
  matchScore: number;
  totalTarget: number;
  matchedCount: number;
  missingCount: number;
  keywords: KeywordAnalysis[];
  recommendations: string[];
}

export interface InterviewQuestion {
  id: number;
  round: string;
  category: "System Design" | "Frontend Architecture" | "AI & Agents" | "Leadership & Conflict" | "Security & Reliability";
  title: string;
  question: string;
  context: string;
  recommendedAnswer: string;
  keyPoints: string[];
}

export interface QuestionEvaluation {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  starBreakdown: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}
