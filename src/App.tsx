import { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  BookOpen,
  Cpu,
  Layers,
  SlidersHorizontal,
  FileText,
  Upload,
  Download,
  Globe,
  Database,
  Terminal,
  Check,
  CheckCircle2,
  Trash2,
  Plus,
  RefreshCw,
  Play,
  ArrowRight,
  Shield,
  FileSpreadsheet,
  Clock,
  ExternalLink,
  ClipboardCheck,
  Clipboard,
  ChevronRight,
  BarChart2,
  Award
} from "lucide-react";
import {
  CLO_LIST,
  PLO_INFO,
  ROMAN_URDU_NOTES,
  ENGLISH_NOTES,
  PRACTICE_QUIZ_QUESTIONS,
  SIMULATED_MIDTERM_EXAM,
  formatFileContents
} from "./data";

export default function App() {
  // Screens state: 'role-selection' | 'student-dashboard' | 'teacher-dashboard'
  const [currentScreen, setCurrentScreen] = useState<"role-selection" | "student-dashboard" | "teacher-dashboard">("role-selection");

  // Navigation configurations
  const [studentActiveNav, setStudentActiveNav] = useState<string>("upload");
  const [teacherActiveNav, setTeacherActiveNav] = useState<string>("upload");

  // Toast notifications state
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // -------------------------------------------------------------
  // TRANSCRIPTION SIMULATORS
  // -------------------------------------------------------------
  
  // Student transcription simulator state
  const [studentFile, setStudentFile] = useState<{ name: string; size: string; duration: string } | null>({
    name: "Python_OOP_Lecture.mp3",
    size: "38.4 MB",
    duration: "43:18"
  });
  const [studentProgress, setStudentProgress] = useState<number>(100);
  const [studentTranscribeState, setStudentTranscribeState] = useState<"idle" | "processing" | "done">("done");
  const [studentLogs, setStudentLogs] = useState<string[]>([
    "Initializing whisper-small model...",
    "Loading audio: Python_OOP_Lecture.mp3",
    "Processing audio chunks...",
    "Language detected: Urdu (confidence: 0.943)",
    "Transcription complete. 43 minutes processed in 2m 17s.",
    "Sending to Gemini 2.5 for note generation...",
    "Notes generated successfully. ✓"
  ]);

  // Teacher transcription simulator state
  const [teacherFile, setTeacherFile] = useState<{ name: string; size: string; duration: string } | null>({
    name: "DataStructures_Lecture3.mp3",
    size: "46.1 MB",
    duration: "51:44"
  });
  const [teacherProgress, setTeacherProgress] = useState<number>(100);
  const [teacherTranscribeState, setTeacherTranscribeState] = useState<"idle" | "processing" | "done">("done");
  const [teacherLogs, setTeacherLogs] = useState<string[]>([
    "Model: whisper-small loaded.",
    "Processing: DataStructures_Lecture3.mp3",
    "Language detected: English (confidence: 0.991)",
    "Transcription complete. 51 minutes in 2m 38s.",
    "English notes generated via Gemini 2.5. ✓",
    "Notes embedded into FAISS. ✓"
  ]);

  // Timers and simulation triggers
  const startStudentTranscription = (fileName: string = "Python_OOP_Lecture.mp3") => {
    setStudentTranscribeState("processing");
    setStudentProgress(0);
    setStudentLogs(["> Initializing whisper-small model..."]);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      if (progress >= 100) {
        clearInterval(interval);
        setStudentProgress(100);
        setStudentTranscribeState("done");
        setStudentLogs(prev => [
          ...prev,
          `> Loading audio: ${fileName}`,
          `> Processing audio chunks across tensor grids...`,
          `> Language detected: Roman Urdu/Hindi (dual mode, confidence: 94.3%)`,
          `> Transcription complete. Computed 43 minutes in 1.8s.`,
          `> Dispatching text buffers to Gemini API 2.5 hierarchy...`,
          `> Success: Academic study notes generated contextually! ✓`,
          `> FAISS Vector Index synced: 648 active chunk dimensions created.`
        ]);
        showToast("Audio parsed & study notes generated successfully!", "success");
      } else {
        setStudentProgress(progress);
        if (progress === 20) {
          setStudentLogs(prev => [...prev, `> Loading audio binary: ${fileName}`]);
        } else if (progress === 44) {
          setStudentLogs(prev => [...prev, `> Segmenting wave frames with Whisper small encoder...`]);
        } else if (progress === 72) {
          setStudentLogs(prev => [...prev, `> Confidence estimation: 94.3% Urdu + English hybrid speech.`]);
        } else if (progress === 92) {
          setStudentLogs(prev => [...prev, `> Injecting prompt maps & executing RAG alignment...`]);
        }
      }
    }, 80);
  };

  const startTeacherTranscription = (fileName: string = "DataStructures_Lecture3.mp3") => {
    setTeacherTranscribeState("processing");
    setTeacherProgress(0);
    setTeacherLogs(["> Triggering Whisper micro instance on container port 3000..."]);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setTeacherProgress(100);
        setTeacherTranscribeState("done");
        setTeacherLogs(prev => [
          ...prev,
          `> Loading file metadata: ${fileName}`,
          `> Target language identified: English (confidence: 99.1%)`,
          `> Transcription success: 51 minutes processed cleanly.`,
          `> Mapping lecture semantics against course syllabus goals...`,
          `> Completed. FAISS Vector Database total chunks: 686. Ready for CLO assessment.`
        ]);
        showToast("Lecture transcribed & mapped to CLOs!", "success");
      } else {
        setTeacherProgress(progress);
        if (progress === 25) {
          setTeacherLogs(prev => [...prev, `> Analyzing speech patterns for Data Structures terms (BST, stack, sorting)...`]);
        } else if (progress === 60) {
          setTeacherLogs(prev => [...prev, `> Running deep parsing algorithms for BLOOM taxonomic keywords...`]);
        } else if (progress === 85) {
          setTeacherLogs(prev => [...prev, `> Building FAISS indexes / syncing embeddings...`]);
        }
      }
    }, 70);
  };

  const handleCustomFileUpload = (isTeacher: boolean, customName: string) => {
    if (isTeacher) {
      setTeacherFile({
        name: customName,
        size: "34.1 MB",
        duration: "38:12"
      });
      startTeacherTranscription(customName);
    } else {
      setStudentFile({
        name: customName,
        size: "29.8 MB",
        duration: "24:50"
      });
      startStudentTranscription(customName);
    }
  };

  // -------------------------------------------------------------
  // STUDENT INTERACTIVE QUIZ CONFIG-STUDENT STATE
  // -------------------------------------------------------------
  const [quizType, setQuizType] = useState<"mcq" | "short" | "mixed">("mixed");
  const [quizNumQuestions, setQuizNumQuestions] = useState<number>(15);
  const [quizDifficulty, setQuizDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState<boolean>(false);
  const [quizGenerationCount, setQuizGenerationCount] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [qId: string]: boolean }>({});

  const handleSelectQuizAnswer = (qId: string, idx: number) => {
    if (selectedAnswers[qId] !== undefined) return; // Answer locked
    setSelectedAnswers(prev => ({ ...prev, [qId]: idx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
    showToast(`Locked in option for question ${qId.toUpperCase()}`);
  };

  const generateCustomQuiz = () => {
    setIsGeneratingQuiz(true);
    setTimeout(() => {
      setIsGeneratingQuiz(false);
      setQuizGenerationCount(prev => prev + 1);
      setSelectedAnswers({});
      setShowExplanation({});
      showToast("RAG successfully queried! New quiz compiled.", "success");
    }, 1200);
  };

  // -------------------------------------------------------------
  // TEACHER ASSESSMENT GENERATOR STATE
  // -------------------------------------------------------------
  const [assessmentType, setAssessmentType] = useState<"Midterm" | "Final" | "Quiz" | "Assignment">("Midterm");
  const [totalMarks, setTotalMarks] = useState<number>(50);
  const [allowedDuration, setAllowedDuration] = useState<string>("2 Hours");
  const [includeCLOMappings, setIncludeCLOMappings] = useState<boolean>(true);
  const [isGeneratingAssessment, setIsGeneratingAssessment] = useState<boolean>(false);
  const [assessmentCount, setAssessmentCount] = useState<number>(0);

  const generateAssessmentAction = () => {
    setIsGeneratingAssessment(true);
    setTimeout(() => {
      setIsGeneratingAssessment(false);
      setAssessmentCount(prev => prev + 1);
      showToast(`${assessmentType} Exam paper compiled from FAISS vectors & CLOs!`, "success");
    }, 1400);
  };

  // -------------------------------------------------------------
  // TEXT & FILE DOWNLOAD EXPORT GENERATOR (DURABLE PERSISTENCE LOGIC)
  // -------------------------------------------------------------
  const [notesActiveTab, setNotesActiveTab] = useState<"roman" | "english">("roman");

  const triggerDownload = (fileName: string, title: string, mainContent: string) => {
    const headerDecorated = formatFileContents(title, mainContent);
    const element = document.createElement("a");
    const file = new Blob([headerDecorated], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`File "${fileName}" saved offline successfully!`, "success");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Notes copied to clipboard!", "success");
  };

  return (
    <div className="min-h-screen bg-gradient-custom text-slate-800 selection:bg-[#2563EB] selection:text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* BACKGROUND FLOATING PARTICLES - CSS Drifting Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[8%] left-[12%] w-4 h-4 rounded-full bg-[#2563EB]/40 blur-md focus-particle" style={{ animation: "float 14s infinite ease-in-out" }}></div>
        <div className="absolute top-[34%] left-[78%] w-6 h-6 rounded-full bg-[#0EA5A0]/30 blur-lg" style={{ animation: "float 18s infinite ease-in-out", animationDelay: "2s" }}></div>
        <div className="absolute top-[75%] left-[18%] w-5 h-5 rounded-full bg-[#2563EB]/40 blur-md" style={{ animation: "float 22s infinite ease-in-out", animationDelay: "4s" }}></div>
        <div className="absolute top-[82%] left-[84%] w-4 h-4 rounded-full bg-[#0EA5A0]/30 blur-sm" style={{ animation: "float 12s infinite ease-in-out", animationDelay: "1s" }}></div>
        <div className="absolute top-[52%] left-[45%] w-7 h-7 rounded-full bg-[#2563EB]/30 blur-xl" style={{ animation: "float 25s infinite ease-in-out", animationDelay: "3s" }}></div>
        <div className="absolute top-[18%] left-[62%] w-4 h-4 rounded-full bg-[#2563EB]/40 blur" style={{ animation: "float 16s infinite ease-in-out", animationDelay: "5s" }}></div>
        <div className="absolute top-[62%] left-[5%] w-3 h-3 rounded-full bg-[#0EA5A0]/40 blur-sm" style={{ animation: "float 20s infinite ease-in-out", animationDelay: "0.5s" }}></div>
        <div className="absolute top-[40%] left-[25%] w-5 h-5 rounded-full bg-[#2563EB]/40 blur-lg" style={{ animation: "float 15s infinite ease-in-out" }}></div>
      </div>

      {/* TOAST NOTIFICATION CONTAINER */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-[#2563EB]/20 px-5 py-3.5 rounded-lg shadow-xl animate-slide-in duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></div>
          <span className="text-sm font-medium text-slate-800">{toast.message}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. ENTRY SCREEN — ROLE SELECTION */}
      {/* ========================================================================= */}
      {currentScreen === "role-selection" && (
        <div className="flex-1 w-full flex flex-col justify-center items-center px-4 py-12 relative z-10 min-h-screen">
          <div className="max-w-4xl w-full text-center mb-10 flex flex-col items-center">
            
            {/* Title & Glowing Branding */}
            <h1 className="text-6xl md:text-8xl font-black font-syne tracking-tighter rulen-glow mb-3">
              RULEN
            </h1>
            
            <p className="text-lg md:text-2xl font-bold font-syne text-[#2563EB] tracking-wide mb-2 uppercase">
              Real-Time Unified Lecture Extraction Network
            </p>
            
            <p className="text-sm md:text-base font-medium text-slate-600 max-w-xl text-center mb-6">
              Department of Artificial Intelligence, School of Systems and Technology<br />
              University of Management and Technology (UMT), Lahore, Pakistan
            </p>

            {/* Gradient Line Divider */}
            <div className="w-80 h-[2px] bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent mb-8"></div>

            {/* Tech badging line */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {["OpenAI Whisper", "Google Gemini 2.5", "FAISS DB", "RAG Pipeline", "LangChain", "Flask Server"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono border-l-2 border-[#2563EB] bg-white text-slate-600 rounded shadow-sm hover:text-[#2563EB] transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-xs text-slate-500/80 italic font-medium">
              Supervised Demo Module Developed by: M. Zaid Wasim, Syed Muhammad Ali Ashar, and Alisha Saleem
            </p>
          </div>

          {/* Cards container */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full px-4 mb-16">
            
            {/* Student Dashboard Entry */}
            <div
              onClick={() => {
                setCurrentScreen("student-dashboard");
                showToast("Welcome to Student Dashboard. Virtual Environment loaded.");
              }}
              className="card role-card cursor-pointer p-8 transition-all duration-300 flex flex-col justify-between h-[300px] group"
              id="student-role-card"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-5xl">🎓</div>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono bg-[#2563EB]/10 text-[#2563EB] rounded-full uppercase border border-[#2563EB]/25">
                    Multilingual Study Aid
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-syne text-slate-800 group-hover:text-[#2563EB] transition-colors mb-2">
                  Student Dashboard
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Upload raw lecture recordings to instantly acquire translation transcripts (Roman Urdu/English), parse index chunks, prepare dynamic custom study quizzes, and download materials offline.
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded">Notes</span>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded">Quiz Prep</span>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded">Dual Language</span>
                </div>
                <span className="text-sm font-semibold text-[#2563EB] group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                  Enter Dashboard <ArrowRight size={14} />
                </span>
              </div>
            </div>

            {/* Teacher Dashboard Entry */}
            <div
              onClick={() => {
                setCurrentScreen("teacher-dashboard");
                showToast("Welcome to Faculty Evaluator Console. Academic metrics synced.");
              }}
              className="card role-card cursor-pointer p-8 transition-all duration-300 flex flex-col justify-between h-[300px] group"
              id="teacher-role-card"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-5xl">👩‍🏫</div>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono bg-[#0EA5A0]/10 text-[#0EA5A0] rounded-full uppercase border border-[#0EA5A0]/25">
                    CLO Outcome System
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-syne text-slate-800 group-hover:text-[#0EA5A0] transition-colors mb-2">
                  Teacher Dashboard
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Transcribe classroom lectures, align session taxonomy automatically with department Board of Studies CLO/PLO outcomes mapping, and export fully balanced structured exam papers.
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded">CLO/PLO Mapping</span>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded">Midterms/Finals</span>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded">OBE Assessment</span>
                </div>
                <span className="text-sm font-semibold text-[#0EA5A0] group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                  Faculty Entry <ArrowRight size={14} />
                </span>
              </div>
            </div>

          </div>

          <footer className="mt-auto text-xs text-slate-500 font-semibold text-center uppercase tracking-widest font-mono">
            RULEN V1.0.0 • AI STUDIO PRESENTATION HARNESS
          </footer>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. STUDENT DASHBOARD SCREEN */}
      {/* ========================================================================= */}
      {currentScreen === "student-dashboard" && (
        <div className="flex-1 flex flex-col z-10 select-none">
          
          {/* TOP BAR HEADER */}
          <header className="h-[60px] bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-syne text-[#2563EB] tracking-tighter">RULEN</span>
              <span className="h-4 w-[1px] bg-slate-300"></span>
              <span className="text-xs text-slate-600 font-mono font-semibold uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200">STUDENT HUB</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-syne font-medium text-slate-700 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse"></span>
                Lecture: OOP Python
              </span>
              <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 font-medium">whisper-small</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 font-medium">gemini-2.5-flash</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 font-medium">FAISS + RAG</span>
                <span className="h-2 w-2 rounded-full bg-[#10B981] animate-ping"></span>
                <span className="text-[#10B981] font-bold">Active Mode</span>
              </div>
              <button
                onClick={() => setCurrentScreen("role-selection")}
                className="px-3 py-1 text-xs hover-glow bg-slate-100 border border-slate-200 rounded text-slate-700 hover:bg-slate-200 duration-150 cursor-pointer font-medium"
                id="student-role-switch-header"
              >
                Switch Role
              </button>
            </div>
          </header>

          {/* MAIN SPACE (Sidebar + Workspace container) */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* SIDEBAR NAVIGATION */}
            <aside className="w-[240px] bg-white border-r border-slate-200 flex flex-col shrink-0">
              
              {/* Profile Avatar */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#0ea5a0] flex items-center justify-center font-bold text-white shadow-md">
                  ST
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Academic Student</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-mono font-medium">Roll: F23-UMT-AI</p>
                </div>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                <button
                  onClick={() => setStudentActiveNav("upload")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center gap-3 duration-150 transition-all ${
                    studentActiveNav === "upload"
                      ? "bg-[#2563EB]/10 text-[#2563EB] border-l-4 border-[#2563EB]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                  id="tab-student-upload"
                >
                  <Upload size={15} />
                  <span>Upload Audio</span>
                  {studentTranscribeState === "processing" && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  )}
                </button>

                <button
                  onClick={() => setStudentActiveNav("notes")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center gap-3 duration-150 transition-all ${
                    studentActiveNav === "notes"
                      ? "bg-[#2563EB]/10 text-[#2563EB] border-l-4 border-[#2563EB]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                  id="tab-student-notes"
                >
                  <FileText size={15} />
                  <span>My Notes</span>
                  <span className="ml-auto text-[9px] font-mono bg-slate-100 border border-slate-200 px-1 rounded-sm text-slate-500">Urdu+Eng</span>
                </button>

                <button
                  onClick={() => setStudentActiveNav("materials")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center gap-3 duration-150 transition-all ${
                    studentActiveNav === "materials"
                      ? "bg-[#2563EB]/10 text-[#2563EB] border-l-4 border-[#2563EB]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                  id="tab-student-materials"
                >
                  <Layers size={15} />
                  <span>Supp. Materials</span>
                  <span className="ml-auto text-[9px] font-mono bg-[#10B981]/15 text-[#10B981] px-1 rounded-sm font-bold">648 Chunks</span>
                </button>

                <button
                  onClick={() => setStudentActiveNav("quiz")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center gap-3 duration-150 transition-all ${
                    studentActiveNav === "quiz"
                      ? "bg-[#2563EB]/10 text-[#2563EB] border-l-4 border-[#2563EB]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                  id="tab-student-quiz"
                >
                  <Cpu size={15} />
                  <span>Prepare Quiz</span>
                  <span className="ml-auto text-[9px] font-mono bg-[#2563EB]/20 text-[#2563EB] px-1.5 rounded-md font-bold">RAG</span>
                </button>

                <button
                  onClick={() => setStudentActiveNav("downloads")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center gap-3 duration-150 transition-all ${
                    studentActiveNav === "downloads"
                      ? "bg-[#2563EB]/10 text-[#2563EB] border-l-4 border-[#2563EB]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                  id="tab-student-downloads"
                >
                  <Download size={15} />
                  <span>Downloads Hub</span>
                  <span className="ml-auto text-[9px] font-mono bg-[#2563EB]/20 text-[#2563EB] px-1.5 rounded-sm font-bold">3 Files</span>
                </button>
              </nav>

              {/* Sidebar Infrastructure Bottom Info */}
              <div className="p-4 bg-slate-50 text-[10px] font-mono text-slate-500 border-t border-slate-200/80 space-y-1 select-none">
                <p>Model: whisper-small</p>
                <p>Embeddings: MiniLM-L6-v2</p>
                <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-200/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span className="font-semibold text-slate-600">FAISS Cluster: ONLINE</span>
                </div>
                <p className="text-[9px] text-slate-400 mt-1">Harness v1.0.0 • UMT AIR</p>
              </div>
            </aside>

            {/* MAIN DASHBOARD CONTENT AREA */}
            <main className="flex-1 p-8 overflow-y-auto space-y-12">
              
              {/* ======================= STUDENT SUB-SECTION 1: UPLOAD AUDIO ======================= */}
              {studentActiveNav === "upload" && (
                <div className="space-y-6 max-w-4xl animate-fade-in">
                  <div>
                    <h2 className="text-3xl font-bold font-syne text-slate-800 mb-1">
                      Upload Lecture Audio
                    </h2>
                    <p className="text-sm text-slate-600">
                      Transcribe and segment audio inputs. Dual translation mappings run locally via fine-tuned Whisper schemas.
                    </p>
                  </div>

                  {/* Drag-and-drop Audio Upload Simulated Block */}
                  <div className="bg-white border-2 border-dashed border-[#2563EB]/30 hover:border-[#2563EB]/60 focus-within:ring-2 rounded-xl p-10 text-center transition-all duration-200 shadow-sm">
                    <div className="max-w-md mx-auto space-y-4">
                      <div className="w-14 h-14 rounded-full bg-[#2563EB]/10 flex items-center justify-center mx-auto text-[#2563EB]">
                        <Upload size={28} className="animate-bounce" />
                      </div>
                      <div>
                        <p className="text-slate-800 font-bold text-sm">Drag & drop raw educational lecture audio</p>
                        <p className="text-[11px] text-slate-500 mt-1">Supports standard MP3, WAV, FLAC, AAC up to 100MB</p>
                      </div>
                      
                      <div className="flex justify-center gap-2 pt-2">
                        <button
                          onClick={() => handleCustomFileUpload(false, "Python_OOP_Lecture.mp3")}
                          className="px-4 py-1.5 text-xs bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded font-semibold duration-150 cursor-pointer shadow-sm shadow-blue-500/10"
                        >
                          Simulate OOP Lecture
                        </button>
                        <button
                          onClick={() => handleCustomFileUpload(false, "MachineLearning_Overview.mp3")}
                          className="px-4 py-1.5 text-xs bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 rounded font-semibold duration-150 cursor-pointer"
                        >
                          Simulate ML Lecture
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded File Block Indicator */}
                  {studentFile && (
                    <div className="bg-white border border-slate-250 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                          <span className="text-xl">🎵</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{studentFile.name}</h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Duration: {studentFile.duration} | Size: {studentFile.size} | Format: MP3 File
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {studentTranscribeState === "idle" ? (
                          <button
                            onClick={() => startStudentTranscription(studentFile.name)}
                            className="px-4 py-2 text-xs bg-[#10B981] hover:bg-[#10B981]/90 text-white rounded font-semibold shadow duration-150 flex items-center gap-2 cursor-pointer"
                          >
                            <Play size={14} /> Start Transcription
                          </button>
                        ) : studentTranscribeState === "processing" ? (
                          <div className="flex items-center gap-3 w-[150px]">
                            <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/60">
                              <div
                                className="bg-[#2563EB] h-full duration-100"
                                style={{ width: `${studentProgress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-[#2563EB] font-mono font-bold">{studentProgress}%</span>
                          </div>
                        ) : (
                          <span className="text-xs bg-[#10B981]/15 text-[#10B981] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <Check size={14} /> Completed
                          </span>
                        )}

                        <button
                          onClick={() => {
                            setStudentFile(null);
                            setStudentTranscribeState("idle");
                            showToast("Lecture file deleted. Local state cleared.");
                          }}
                          className="p-2 text-xs text-slate-500 hover:text-red-500 bg-slate-50 rounded border border-slate-200 duration-100 cursor-pointer"
                          title="Remove file"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Dual Mode Language Detected Result Flag */}
                  {studentTranscribeState === "done" && (
                    <div className="bg-white border border-slate-200 border-l-4 border-l-[#0EA5A0] rounded-r-xl p-5 space-y-2 shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#0EA5A0] font-bold">
                        <Globe size={14} />
                        <span>LANGUAGE DETECTION COMPILER</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Primary Language</p>
                          <p className="text-sm font-bold text-slate-800">Urdu / Hindi Mixed</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Model Confidence</p>
                          <p className="text-sm font-bold text-[#10B981]">94.3% Accent Aligned</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Dual Translation Target</p>
                          <p className="text-sm font-bold text-slate-800">English + Roman Urdu</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-mono font-semibold">System Output</p>
                          <p className="text-sm font-bold text-[#0EA5A0]">Bilingual Chapters Read</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Terminal Log Console */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-bold">
                      <Terminal size={14} strokeWidth={2.5} />
                      <span>BILINGUAL TRANSCRIPTION COGNITIVE ENGINE LOGS</span>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-800 shadow-inner h-52 overflow-y-auto space-y-1.5 custom-scrollbar">
                      {studentLogs.map((log, index) => (
                        <div key={index} className="flex gap-2 leading-relaxed">
                          <span className="text-slate-400 font-medium select-none">[{10 + index}]</span>
                          <span className={index === studentLogs.length - 1 && studentTranscribeState === "processing" ? "terminal-caret" : ""}>
                            {log}
                          </span>
                        </div>
                      ))}
                      {studentTranscribeState === "processing" && (
                        <div className="h-6 animate-pulse flex items-center pl-6 text-[#2563EB] text-[10px]">
                          [Streaming Speech Packets via cloud infrastructure...]
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Primary Trigger Button */}
                  {studentTranscribeState === "idle" && (
                    <button
                      onClick={() => handleCustomFileUpload(false, "Python_OOP_Lecture.mp3")}
                      className="w-full py-4 bg-[#2563EB] hover:bg-[#2563EB]/90 hover:scale-[1.005] active:scale-[0.99] text-white font-bold tracking-wide rounded-xl shadow-lg shadow-blue-500/10 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer duration-200"
                    >
                      <Cpu size={16} /> Load Default Sample & Process Notes →
                    </button>
                  )}
                </div>
              )}

              {/* ======================= STUDENT SUB-SECTION 2: MY NOTES ======================= */}
              {studentActiveNav === "notes" && (
                <div className="space-y-6 max-w-4xl animate-fade-in">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold font-syne text-slate-800 mb-1">Generated Lecture Notes</h2>
                      <p className="text-sm text-slate-600">Instant output generated from FAISS database using RULEN semantic maps.</p>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto">
                      <button
                        onClick={() => triggerDownload("Python_OOP_Notes_English.docx", "Python OOP Lecture Notes - English", ENGLISH_NOTES)}
                        className="px-3.5 py-2 text-xs bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 hover:bg-[#2563EB] hover:text-white rounded font-semibold flex items-center gap-1.5 duration-150 cursor-pointer shadow-sm"
                        id="student-download-english-notes"
                      >
                        <Download size={14} /> Download English .docx
                      </button>
                      <button
                        onClick={() => triggerDownload("Python_OOP_Notes_RomanUrdu.docx", "Python OOP Lecture Notes - Roman Urdu", ROMAN_URDU_NOTES)}
                        className="px-3.5 py-2 text-xs bg-[#0EA5A0]/10 text-[#0EA5A0] border border-[#0EA5A0]/20 hover:bg-[#0EA5A0] hover:text-white rounded font-semibold flex items-center gap-1.5 duration-150 cursor-pointer shadow-sm"
                        id="student-download-urdu-notes"
                      >
                        <Download size={14} /> Download Roman Urdu .docx
                      </button>
                    </div>
                  </div>

                  {/* Tabs Switcher Panels */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 border-b border-slate-200 flex items-center p-2 justify-between">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setNotesActiveTab("roman")}
                          className={`px-4 py-2 rounded text-xs font-semibold cursor-pointer transition-all duration-150 ${
                            notesActiveTab === "roman"
                              ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/10"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                          id="btn-tab-roman-notes"
                        >
                          🇵🇰 Roman Urdu Notes
                        </button>
                        <button
                          onClick={() => setNotesActiveTab("english")}
                          className={`px-4 py-2 rounded text-xs font-semibold cursor-pointer transition-all duration-150 ${
                            notesActiveTab === "english"
                              ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/10"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                          id="btn-tab-english-notes"
                        >
                          🇺🇸 English Notes
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(notesActiveTab === "roman" ? ROMAN_URDU_NOTES : ENGLISH_NOTES)}
                          className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md hover:scale-105 duration-100 flex items-center gap-1 cursor-pointer font-medium"
                          title="Copy text to clipboard"
                        >
                          <Clipboard size={14} /> Copy Content
                        </button>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 font-sans max-h-[550px] overflow-y-auto leading-relaxed space-y-6">
                      {notesActiveTab === "roman" ? (
                        <div className="space-y-6">
                          <div>
                            <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono font-bold bg-[#0EA5A0]/10 text-[#0EA5A0] rounded border border-[#0EA5A0]/25">
                              Urdu Dual-Track Layer
                            </span>
                            <h3 className="text-2xl font-bold font-syne text-slate-800 mt-1.5">Python OOP (Object Oriented Programming)</h3>
                            <p className="text-xs text-slate-500 mt-0.5 font-mono font-semibold">Topic: Software Blueprints & Structures</p>
                          </div>

                          <div className="border-l-2 border-[#2563EB]/40 pl-4 space-y-2">
                            <h4 className="text-base font-bold text-slate-800">1. Introduction to OOP Paradigm</h4>
                            <p className="text-sm text-slate-600">
                              Object-Oriented Programming (OOP) ek aisi coding methodology hai jismein hum apne logic code ko objects ke roop mein organize karte hain. Yeh approach software architecture ko reuse, maintain aur scale karna nihayat aasan banata hai. Isse code repeat nahi karna parta (DRY principle).
                            </p>
                          </div>

                          <div className="border-l-2 border-[#2563EB]/45 pl-4 space-y-3">
                            <h4 className="text-base font-bold text-slate-800">2. Class aur Object kya hotay hain?</h4>
                            <p className="text-sm text-slate-600">
                              Class hamare paas ek blueprint (template) hoti hai. Jab hum is blueprint ko memory space mein real value dete hain, usko Object bolte hain.
                            </p>
                            <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs text-emerald-400">
                              {`# Class Definition
class Car:
    def __init__(self, brand, color):
        self.brand = brand  # Car ka brand name
        self.color = color  # Car ka rhang

# Instantiating the Blueprint (Object Creation)
my_civic = Car("Honda Civic", "Metallic Grey")
print(my_civic.brand)  # Output: Honda Civic`}
                            </div>
                            <p className="text-xs text-slate-700 bg-blue-50 border border-blue-200/50 p-3 rounded-lg leading-relaxed">
                              💡 <strong>Real Life Example:</strong> Car ka naksha (blueprint) ek Class hai, jabkeh factory se ban kar nikli hui gaari (Honda, Toyota) iska Object (aslool) hai.
                            </p>
                          </div>

                          <div className="border-l-2 border-[#2563EB]/50 pl-4 space-y-2">
                            <h4 className="text-base font-bold text-slate-800">3. Inheritance (Wirasaat)</h4>
                            <p className="text-sm text-slate-600">
                              Inheritance aik aisi technique hai jiske through aik new class (Subclass) apne parent class (Base class) ki tamam capabilities aur fields ko automatically acquire kar leti hai. Iska faida yeh hai ke aapko purana likha hua code dobara nahi likhna parta, balkeh naye features add karne ke liye usko extend kiya jata hai.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div>
                            <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono font-bold bg-[#2563EB]/10 text-[#2563EB] rounded border border-[#2563EB]/25">
                              English Standard Layer
                            </span>
                            <h3 className="text-2xl font-bold font-syne text-slate-800 mt-1.5">Object-Oriented Programming Patterns</h3>
                            <p className="text-xs text-slate-500 mt-0.5 font-mono font-semibold">Topic: Classes, Encapulation, and Modular abstraction</p>
                          </div>

                          <div className="border-l-2 border-[#2563EB]/40 pl-4 space-y-2">
                            <h4 className="text-base font-bold text-slate-800">1. Core Concepts & Paradigm Philosophy</h4>
                            <p className="text-sm text-slate-600">
                              The main focus of Object-Oriented Programming (OOP) in python is to bind data structures and operational functions together as structural templates. This represents real-world entities into digital environments coherently, which allows teams to build complex, solid scalable backends.
                            </p>
                          </div>

                          <div className="border-l-2 border-[#2563EB]/45 pl-4 space-y-3">
                            <h4 className="text-base font-bold text-slate-800">2. Syntax and Abstract Elements</h4>
                            <p className="text-sm text-slate-600">
                              Python supports fully custom OOP behaviors easily. Attributes store instance properties, while methods control actions:
                            </p>
                            <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs text-teal-300">
                              {`class BankAccount:
    def __init__(self, owner: str, balance: float):
        self.__balance = balance # Private attribute
        self.owner = owner

    def deposit(self, val: float):
        self.__balance += val
        return f"Current Balance: Rs.{self.__balance}"`}
                            </div>
                          </div>

                          <div className="border-l-2 border-[#2563EB]/50 pl-4 space-y-2">
                            <h4 className="text-base font-bold text-slate-800">3. The Four Core Pillars of OOP</h4>
                            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5 list-outside">
                              <li><strong>Encapsulation:</strong> Limits direct modifier access on state keys using private identifiers (double underscores).</li>
                              <li><strong>Inheritance:</strong> Establishes child subclass properties referencing parent states without re-declaration.</li>
                              <li><strong>Polymorphism:</strong> Subclasses alter parental functions seamlessly using method overriding.</li>
                              <li><strong>Abstraction:</strong> Defines basic interfaces via python's `abc` package to hide core engine processing details.</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ======================= STUDENT SUB-SECTION 3: SUPPLEMENTARY MATERIALS ======================= */}
              {studentActiveNav === "materials" && (
                <div className="space-y-6 max-w-4xl animate-fade-in">
                  
                  <div>
                    <h2 className="text-3xl font-bold font-syne text-slate-800 mb-1">Knowledge Base Supplementary Materials</h2>
                    <p className="text-sm text-slate-600">
                      Upload curriculum slides or books to expand local context. The platform segments files, generates embeddings, and maps them directly to active FAISS clusters.
                    </p>
                  </div>

                  {/* Smaller PDF/Slide Upload Selector */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0EA5A0]/10 flex items-center justify-center text-[#0EA5A0]">
                        <Plus size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Enrich Quiz Context with Course Materials</h4>
                        <p className="text-xs text-slate-500 font-medium">Upload PDF textbooks, PowerPoint slides, or text logs</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCustomFileUpload(false, "Syllabus_Bilingual_AI.pdf")}
                        className="px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded font-semibold duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        + Add PDF Chapter
                      </button>
                    </div>
                  </div>

                  {/* Materials Embedded Table List */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                      <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500">Embedded Materials List</h3>
                    </div>

                    <div className="divide-y divide-slate-100 text-sm">
                      <div className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🎵</span>
                          <div>
                            <p className="font-bold text-slate-800">Python_OOP_Lecture.mp3</p>
                            <p className="text-[11px] text-slate-500 font-medium">Primary Classroom Recording • Transcribed Transcript File</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] text-slate-500 font-mono font-semibold">247 Chunks</span>
                          <span className="px-2.5 py-0.5 text-[10px] bg-[#10B981]/15 text-[#10B981] font-bold rounded-full border border-[#10B981]/25">Embedded ✅</span>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📑</span>
                          <div>
                            <p className="font-bold text-slate-800">OOP_Slides_Week4.pptx</p>
                            <p className="text-[11px] text-slate-500 font-medium">Professor's Slide Deck • Unified UML Structures</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] text-slate-500 font-mono font-semibold">89 Chunks</span>
                          <span className="px-2.5 py-0.5 text-[10px] bg-[#10B981]/15 text-[#10B981] font-bold rounded-full border border-[#10B981]/25">Embedded ✅</span>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📘</span>
                          <div>
                            <p className="font-bold text-slate-800">PythonProgramming_Ch5.pdf</p>
                            <p className="text-[11px] text-slate-500 font-medium">Supplementary Textbook Chapter • Python Encapulation Guidelines</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] text-slate-500 font-mono font-semibold">312 Chunks</span>
                          <span className="px-2.5 py-0.5 text-[10px] bg-[#10B981]/15 text-[#10B981] font-bold rounded-full border border-[#10B981]/25">Embedded ✅</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FAISS Vector DB Status Card */}
                  <div className="bg-gradient-to-r from-white to-slate-50 border border-slate-200/90 p-6 rounded-xl relative overflow-hidden flex items-center justify-between shadow-sm">
                    <div className="space-y-2 relative z-10">
                      <div className="flex items-center gap-2">
                        <Database className="text-[#2563EB]" size={18} />
                        <span className="font-mono text-xs uppercase text-[#2563EB] font-bold tracking-wider">FAISS Local Vector Cluster</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                        <div>
                          <p className="text-[10px] font-mono text-slate-500 font-semibold uppercase">Total Dimensions</p>
                          <p className="text-base font-bold text-slate-800">384 L6-v2 Embeddings</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-slate-500 font-semibold uppercase">Sum Chunks Indexed</p>
                          <p className="text-base font-bold text-slate-800">648 Active Node Clusters</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-slate-500 font-semibold uppercase">Database Status</p>
                          <p className="text-base font-bold text-[#10B981] flex items-center gap-1.5 font-sans">
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
                            Ready for Retrieval
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Visual schematic symbol background */}
                    <div className="absolute right-[-20px] top-[-10px] opacity-5 select-none pointer-events-none">
                      <Layers size={140} className="text-slate-800 font-black" />
                    </div>
                  </div>

                </div>
              )}

              {/* ======================= STUDENT SUB-SECTION 4: PREPARE QUIZ ======================= */}
              {studentActiveNav === "quiz" && (
                <div className="space-y-6 max-w-4xl animate-fade-in">
                  <div>
                    <h2 className="text-3xl font-bold font-syne text-slate-800 mb-1">RAG-Powered Quiz Generator</h2>
                    <p className="text-sm text-slate-600">
                      Configure parameters below to let RULEN retrieve context elements across FAISS slices and synthesize a custom preparation exam.
                    </p>
                  </div>

                  {/* Horizontal Configuration Panel Filters */}
                  <div className="bg-white border border-slate-200 p-5 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 align-items-center shadow-sm">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-500 mb-2 font-bold">Quiz Format</label>
                      <div className="flex rounded border border-slate-200 bg-slate-50 p-1 gap-1">
                        <button
                          onClick={() => setQuizType("mcq")}
                          className={`flex-1 py-1 px-2 rounded text-[11px] font-semibold text-center cursor-pointer transition-all ${
                            quizType === "mcq" ? "bg-[#2563EB] text-white" : "text-slate-600"
                          }`}
                        >
                          MCQ Only
                        </button>
                        <button
                          onClick={() => setQuizType("short")}
                          className={`flex-1 py-1 px-2 rounded text-[11px] font-semibold text-center cursor-pointer transition-all ${
                            quizType === "short" ? "bg-[#2563EB] text-white" : "text-slate-600"
                          }`}
                        >
                          Short Qs
                        </button>
                        <button
                          onClick={() => setQuizType("mixed")}
                          className={`flex-1 py-1 px-2 rounded text-[11px] font-semibold text-center cursor-pointer transition-all ${
                            quizType === "mixed" ? "bg-[#2563EB] text-white" : "text-slate-600"
                          }`}
                        >
                          Mixed ✓
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-500 mb-2 font-bold">Num Questions</label>
                      <div className="relative">
                        <select
                          value={quizNumQuestions}
                          onChange={(e) => setQuizNumQuestions(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 px-3 py-1.5 rounded text-xs text-slate-800 font-semibold focus:outline-none"
                        >
                          <option value={5}>5 Questions</option>
                          <option value={10}>10 Questions</option>
                          <option value={15}>15 Questions (Ideal)</option>
                          <option value={20}>20 Questions</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-500 mb-2 font-bold">Difficulty Level</label>
                      <div className="flex rounded border border-slate-200 bg-slate-50 p-1 gap-1">
                        {(["easy", "medium", "hard"] as const).map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setQuizDifficulty(lvl)}
                            className={`flex-1 py-1 rounded text-[11px] font-semibold capitalize text-center cursor-pointer transition-all ${
                              quizDifficulty === lvl
                                ? lvl === "easy"
                                  ? "bg-[#10B981] text-white"
                                  : lvl === "medium"
                                  ? "bg-[#2563EB] text-white"
                                  : "bg-red-500 text-white"
                                : "text-slate-600"
                            }`}
                          >
                            {lvl === "medium" ? "Medium ✓" : lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={generateCustomQuiz}
                        disabled={isGeneratingQuiz}
                        className="w-full py-2.5 bg-[#2563EB] hover:bg-[#2563EB]/90 cursor-pointer text-white rounded text-xs font-bold tracking-wider hover-glow flex items-center justify-center gap-1.5 duration-100 uppercase shadow-sm"
                      >
                        {isGeneratingQuiz ? (
                          <>
                            <RefreshCw className="animate-spin" size={14} /> Generating...
                          </>
                        ) : (
                          <>Generate Quiz →</>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ACTIVE GENERATED QUIZ CARD CONTAINER */}
                  {isGeneratingQuiz ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-16 flex flex-col justify-center items-center text-center space-y-4 shadow-sm animate-pulse">
                      <RefreshCw size={40} className="animate-spin text-[#2563EB]" />
                      <div>
                        <p className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">Retrieving FAISS vector embeddings...</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Context aligned with RAG nodes. Creating logical parameters via LLM model...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <p className="text-[10px] uppercase font-mono tracking-wider text-[#0EA5A0] font-bold">RAG-Synthesized Practice Exam</p>
                          <h3 className="text-2xl font-bold font-syne text-slate-800 mt-1">Python OOP — Custom Practice Quiz</h3>
                          <p className="text-xs text-slate-550 mt-0.5 font-medium">
                            Compiled from index clusters | Format: {quizType.toUpperCase()} | Difficulty: {quizDifficulty.toUpperCase()}
                          </p>
                        </div>
                        <button
                          onClick={() => triggerDownload("Python_OOP_Quiz_Mixed_15Q.docx", "Python OOP Generated Practice Quiz", PRACTICE_QUIZ_QUESTIONS.map((q, i) => `${i+1}. ${q.question}\nOptions: ${q.options ? q.options.join(', ') : 'Open answer'}\n\n`).join('\n'))}
                          className="px-3.5 py-2 text-xs bg-[#2563EB]/10 text-[#2563EB] hover:bg-[#2563EB] hover:text-white border border-[#2563EB]/20 rounded font-bold flex items-center gap-1.5 duration-150 self-start md:self-auto cursor-pointer shadow-sm"
                        >
                          <Download size={14} /> Download Quiz as .docx
                        </button>
                      </div>

                      <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2">
                        
                        {/* Interactive Questions Loop */}
                        {PRACTICE_QUIZ_QUESTIONS.filter(q => quizType === "mixed" || q.type === quizType).map((q, idx) => (
                          <div key={q.id} className="space-y-3 bg-slate-50/60 p-5 rounded-xl border border-slate-200/80">
                            <div className="flex items-start gap-2.5">
                              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0 border border-slate-300 font-bold">
                                {idx + 1}
                              </span>
                              <div>
                                <h4 className="text-slate-800 font-bold text-sm leading-relaxed">{q.question}</h4>
                                <span className="inline-block mt-1 text-[9px] font-mono uppercase tracking-wide bg-[#2563EB]/10 text-[#2563EB] px-1.5 py-0.5 rounded font-bold">
                                  {q.type === "mcq" ? "Section A — MCQ" : "Section B — Short Answer (C3)"}
                                </span>
                              </div>
                            </div>

                            {/* Option buttons for MCQ type */}
                            {q.type === "mcq" && q.options && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-8.5">
                                {q.options.map((opt, oIdx) => {
                                  const isSelected = selectedAnswers[q.id] === oIdx;
                                  const isCorrect = q.correctIndex === oIdx;
                                  const anySelected = selectedAnswers[q.id] !== undefined;

                                  let optClass = "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm";
                                  if (anySelected) {
                                    if (isCorrect) {
                                      optClass = "bg-[#10B981]/10 border-[#10B981] text-emerald-800 font-bold";
                                    } else if (isSelected && !isCorrect) {
                                      optClass = "bg-red-50 border-red-300 text-red-700 font-bold";
                                    } else {
                                      optClass = "bg-slate-50/40 border-slate-100 text-slate-400";
                                    }
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleSelectQuizAnswer(q.id, oIdx)}
                                      disabled={anySelected}
                                      className={`w-full text-left p-2.5 rounded text-xs border transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                                    >
                                      <span>
                                        <strong className="font-mono text-[#2563EB] mr-2">
                                          {String.fromCharCode(65 + oIdx)}.
                                        </strong>
                                        {opt}
                                      </span>
                                      {anySelected && isCorrect && <Check size={14} className="text-[#10B981] shrink-0" />}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {/* Short answer input mock block */}
                            {q.type === "short" && (
                              <div className="pl-8.5 space-y-2">
                                <textarea
                                  placeholder="Type your response here to evaluate or trace against guidelines..."
                                  rows={2}
                                  className="w-full bg-white border border-slate-200 rounded-md p-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] shadow-sm"
                                ></textarea>
                                <button
                                  onClick={() => setShowExplanation(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                                  className="px-3.5 py-1 text-[10px] uppercase font-mono bg-slate-100 hover:bg-slate-200 text-[#0ea5a0] font-bold rounded duration-100 border border-slate-200 cursor-pointer"
                                >
                                  {showExplanation[q.id] ? "Hide Aligned Key" : "Reveal Rubric Marking Key"}
                                </button>
                              </div>
                            )}

                            {/* Interactive Explanation view */}
                            {showExplanation[q.id] && (
                              <div className="mt-3 bg-[#10B981]/5 rounded-r-lg p-3 pl-4 border-l-4 border-l-[#10B981] text-xs text-slate-700 animate-slide-in">
                                <strong className="text-[#10B981] block mb-1">RULEN Cognitive Scoring Rubric:</strong>
                                <p className="leading-relaxed font-sans font-medium">{q.explanation}</p>
                              </div>
                            )}

                          </div>
                        ))}

                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* ======================= STUDENT SUB-SECTION 5: DOWNLOADS HUB ======================= */}
              {studentActiveNav === "downloads" && (
                <div className="space-y-6 max-w-4xl animate-fade-in">
                  
                  <div>
                    <h2 className="text-3xl font-bold font-syne text-slate-800 mb-1">Bilingual Academics Downloads Hub</h2>
                    <p className="text-sm text-slate-600">
                      All files compiled by RULEN during your study sessions are cached offline below and ready for export.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">📄</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">Python_OOP_Notes_English.docx</h4>
                          <p className="text-xs text-slate-500 font-medium">Duration Core • 128 KB | Today</p>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerDownload("Python_OOP_Notes_English.docx", "Python OOP Notes English", ENGLISH_NOTES)}
                        className="p-2.5 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded duration-100 cursor-pointer"
                        title="Download English File"
                      >
                        <Download size={15} />
                      </button>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">📄</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">Python_OOP_Notes_RomanUrdu.docx</h4>
                          <p className="text-xs text-slate-500 font-medium">Bilingual Layer • 119 KB | Today</p>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerDownload("Python_OOP_Notes_RomanUrdu.docx", "Python OOP Notes Roman Urdu", ROMAN_URDU_NOTES)}
                        className="p-2.5 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded duration-100 cursor-pointer"
                        title="Download Urdu File"
                      >
                        <Download size={15} />
                      </button>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">Python_OOP_Quiz_Mixed_15Q.docx</h4>
                          <p className="text-xs text-slate-500 font-medium">RAG Compiled • 87 KB | Today</p>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerDownload("Python_OOP_Quiz_Mixed_15Q.docx", "Python OOP Practice Quiz", PRACTICE_QUIZ_QUESTIONS.map(q => q.question).join('\n'))}
                        className="p-2.5 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded duration-100 cursor-pointer"
                        title="Download Practice Quiz"
                      >
                        <Download size={15} />
                      </button>
                    </div>

                  </div>

                </div>
              )}

            </main>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TEACHER DASHBOARD SCREEN */}
      {/* ========================================================================= */}
      {currentScreen === "teacher-dashboard" && (
        <div className="flex-1 flex flex-col z-10 select-none animate-fade-in bg-slate-50">
          
          {/* TOP BAR HEADER */}
          <header className="h-[60px] bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-syne text-slate-800 tracking-tighter">RULEN</span>
              <span className="h-4 w-[1px] bg-slate-200"></span>
              <span className="text-xs text-[#0EA5A0] font-mono font-bold uppercase bg-[#0EA5A0]/10 px-2 py-0.5 rounded">Teacher Admin</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-syne font-semibold text-slate-700 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5A0] animate-pulse"></span>
                Course: CS301 DSA
              </span>
              <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-slate-500 font-semibold">
                <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200">whisper-small-aligned</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200">OBE Alignment Engine</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200">FAISS Clustering</span>
                <span className="h-2 w-2 rounded-full bg-[#10B981]"></span>
                <span className="text-[#10B981] font-bold">Active Console</span>
              </div>
              <button
                onClick={() => setCurrentScreen("role-selection")}
                className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-700 font-bold duration-150 cursor-pointer shadow-xs"
                id="teacher-role-switch-header"
              >
                Switch Role
              </button>
            </div>
          </header>

          {/* MAIN SPACE (Sidebar + Workspace container) */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* SIDEBAR NAVIGATION */}
            <aside className="w-[240px] bg-white border-r border-slate-200 flex flex-col shrink-0">
              
              {/* Profile Avatar */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0EA5A0] flex items-center justify-center font-bold text-white shadow-sm">
                  TC
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">DR. EVALUATOR</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-mono font-bold">Dept of AI, UMT Lahore</p>
                </div>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                <button
                  onClick={() => setTeacherActiveNav("upload")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center gap-3 duration-150 transition-all cursor-pointer ${
                    teacherActiveNav === "upload"
                      ? "bg-[#0EA5A0]/10 text-[#0EA5A0] border-l-4 border-[#0EA5A0] font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                  id="tab-teacher-upload"
                >
                  <Upload size={15} />
                  <span>Transcribe Lecture</span>
                  {teacherTranscribeState === "processing" && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-[#0EA5A0] animate-ping"></span>
                  )}
                </button>

                <button
                  onClick={() => setTeacherActiveNav("embed")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center gap-3 duration-150 transition-all cursor-pointer ${
                    teacherActiveNav === "embed"
                      ? "bg-[#0EA5A0]/10 text-[#0EA5A0] border-l-4 border-[#0EA5A0] font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                  id="tab-teacher-embed"
                >
                  <Layers size={15} />
                  <span>Embed Course Docs</span>
                  <span className="ml-auto text-[9px] font-mono bg-slate-100 p-1 py-0.5 rounded text-slate-500 font-bold border border-slate-200">686 Chs</span>
                </button>

                <button
                  onClick={() => setTeacherActiveNav("clo-plo")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center gap-3 duration-150 transition-all cursor-pointer ${
                    teacherActiveNav === "clo-plo"
                      ? "bg-[#0EA5A0]/10 text-[#0EA5A0] border-l-4 border-[#0EA5A0] font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                  id="tab-teacher-cloplo"
                >
                  <Award size={15} />
                  <span>CLO/PLO Upload</span>
                  <span className="ml-auto text-[9px] font-mono bg-[#10B981]/15 text-[#10B981] px-1 rounded-sm font-bold">Active Mappings</span>
                </button>

                <button
                  onClick={() => setTeacherActiveNav("assessment")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center gap-3 duration-150 transition-all cursor-pointer ${
                    teacherActiveNav === "assessment"
                      ? "bg-[#0EA5A0]/10 text-[#0EA5A0] border-l-4 border-[#0EA5A0] font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                  id="tab-teacher-assessment"
                >
                  <FileText size={15} />
                  <span>Generate Assessment</span>
                  <span className="ml-auto text-[9px] font-mono bg-[#0EA5A0]/15 text-[#0EA5A0] px-1.5 rounded-md font-bold">OBE Paper</span>
                </button>

                <button
                  onClick={() => setTeacherActiveNav("downloads")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center gap-3 duration-150 transition-all cursor-pointer ${
                    teacherActiveNav === "downloads"
                      ? "bg-[#0EA5A0]/10 text-[#0EA5A0] border-l-4 border-[#0EA5A0] font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                  id="tab-teacher-downloads"
                >
                  <Download size={15} />
                  <span>Faculty Downloads</span>
                  <span className="ml-auto text-[9px] font-mono bg-[#0EA5A0] text-white px-1.5 rounded-sm font-bold">4 Files</span>
                </button>
              </nav>

              {/* Sidebar Infrastructure Bottom Info */}
              <div className="p-4 bg-slate-50 text-[10px] font-mono text-slate-500 border-t border-slate-200 space-y-1 select-none flex-col flex shrink-0">
                <p>Course Code: CS301</p>
                <p>Credit Hours: 3+1 Lab</p>
                <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  <span className="font-semibold">Board of Studies Approved</span>
                </div>
              </div>
            </aside>

            {/* MAIN DASHBOARD CONTENT AREA */}
            <main className="flex-1 p-8 overflow-y-auto space-y-12">
              
              {/* ======================= TEACHER SUB-SECTION 1: TRANSCRIBE LECTURE ======================= */}
              {teacherActiveNav === "upload" && (
                <div className="space-y-6 max-w-4xl animate-fade-in">
                  <div>
                    <h2 className="text-3xl font-bold font-syne text-slate-800 mb-1">Transcribe Classroom Lectures</h2>
                    <p className="text-sm text-slate-600">Automatically align session curriculum recordings against cognitive learning parameters.</p>
                  </div>

                  {/* Drag-and-drop Audio Upload Simulated Block */}
                  <div className="bg-white border-2 border-dashed border-[#0EA5A0]/30 hover:border-[#0EA5A0]/60 focus-within:ring-2 rounded-xl p-10 text-center transition-all duration-205 shadow-xs">
                    <div className="max-w-md mx-auto space-y-4">
                      <div className="w-14 h-14 rounded-full bg-[#0EA5A0]/10 flex items-center justify-center mx-auto text-[#0EA5A0]">
                        <Upload size={28} className="animate-pulse text-[#0EA5A0]" />
                      </div>
                      <div>
                        <p className="text-slate-800 font-bold text-sm">Upload classroom voice recorders or direct mics</p>
                        <p className="text-[11px] text-slate-500 mt-1 font-medium">Recommended files: MP3, WAV, M4A up to 150MB</p>
                      </div>
                      
                      <div className="flex justify-center gap-2 pt-2">
                        <button
                          onClick={() => handleCustomFileUpload(true, "DataStructures_Lecture3.mp3")}
                          className="px-4 py-1.5 text-xs bg-[#0EA5A0] hover:bg-[#0EA5A0]/90 text-white rounded font-bold duration-150 cursor-pointer shadow-sm"
                        >
                          Simulate CS301 Lecture
                        </button>
                        <button
                          onClick={() => handleCustomFileUpload(true, "SoftwareArch_Mockup.mp3")}
                          className="px-4 py-1.5 text-xs bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600 hover:text-slate-800 rounded font-bold duration-150 cursor-pointer"
                        >
                          Load AI Workshop
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded File Block Indicator */}
                  {teacherFile && (
                    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#0EA5A0]/10 text-[#0EA5A0] flex items-center justify-center shrink-0">
                          <span className="text-xl">🎵</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{teacherFile.name}</h4>
                          <p className="text-xs text-slate-500 font-semibold">
                            Duration: {teacherFile.duration} | Size: {teacherFile.size} | Language Mode: English
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {teacherTranscribeState === "idle" ? (
                          <button
                            onClick={() => startTeacherTranscription(teacherFile.name)}
                            className="px-4 py-2 text-xs bg-[#10B981] hover:bg-[#10B981]/90 text-white rounded font-bold shadow duration-150 flex items-center gap-2 cursor-pointer"
                          >
                            <Play size={14} /> Transcribe Audio
                          </button>
                        ) : teacherTranscribeState === "processing" ? (
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div
                                  className="bg-[#0EA5A0] h-full duration-100"
                                  style={{ width: `${teacherProgress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-[#0EA5A0] font-mono font-bold">{teacherProgress}%</span>
                          </div>
                        ) : (
                          <span className="text-xs bg-[#10B981]/15 text-[#10B981] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#10B981]/25">
                            <Check size={14} /> Completed
                          </span>
                        )}

                        <button
                          onClick={() => {
                            setTeacherFile(null);
                            setTeacherTranscribeState("idle");
                            showToast("Lecture file deleted. Core state cleared.");
                          }}
                          className="p-2 text-xs text-slate-500 hover:text-red-400 bg-slate-55 border border-slate-200 rounded duration-100 cursor-pointer"
                          title="Remove file"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Terminal Log Console */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-bold uppercase">
                      <Terminal size={14} strokeWidth={2.5} />
                      <span>COGNITIVE OBE TRANSCRIPTION CORE FEED LOGS</span>
                    </div>
                    
                    <div className="bg-slate-900 border border-slate-350 rounded-xl p-4 font-mono text-xs text-[#10B981]/90 shadow-inner h-50 overflow-y-auto space-y-1.5">
                      {teacherLogs.map((log, index) => (
                        <div key={index} className="flex gap-2 leading-relaxed">
                          <span className="text-slate-500 select-none">[{100 + index}]</span>
                          <span className={index === teacherLogs.length - 1 && teacherTranscribeState === "processing" ? "terminal-caret" : ""}>
                            {log}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ======================= TEACHER SUB-SECTION 2: EMBED COURSE DOCS ======================= */}
              {teacherActiveNav === "embed" && (
                <div className="space-y-6 max-w-4xl animate-fade-in">
                  <div>
                    <h2 className="text-3xl font-bold font-syne text-slate-800 mb-1">Knowledge Base Course Materials</h2>
                    <p className="text-sm text-slate-600 font-medium">FAISS indexed materials vector repository allocated for CS301.</p>
                  </div>

                  {/* Materials Embedded Table List */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-slide-in">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                      <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500">CS301 Active Syllabus Indices</h3>
                    </div>

                    <div className="divide-y divide-slate-100 text-sm">
                      <div className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📄</span>
                          <div>
                            <p className="font-bold text-slate-800">DataStructures_Lecture3.mp3 → Notes</p>
                            <p className="text-[11px] text-slate-500 font-semibold">Primary Lecture Content • Stack, Queues, traversals</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] text-slate-500 font-mono font-bold">389 Chunks</span>
                          <span className="px-2.5 py-0.5 text-[10px] bg-[#10B981]/15 text-[#10B981] font-bold rounded-full border border-[#10B981]/25">Embedded ✅</span>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📑</span>
                          <div>
                            <p className="font-bold text-slate-800">DS_Chapter3_Trees.pdf</p>
                            <p className="text-[11px] text-slate-500 font-semibold">Classroom Textbook Section • Tree and Hierarchical structures</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] text-slate-500 font-mono font-bold">203 Chunks</span>
                          <span className="px-2.5 py-0.5 text-[10px] bg-[#10B981]/15 text-[#10B981] font-bold rounded-full border border-[#10B981]/25">Embedded ✅</span>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📊</span>
                          <div>
                            <p className="font-bold text-slate-800">Week3_Slides_Sorting.pptx</p>
                            <p className="text-[11px] text-slate-500 font-semibold">Sorting slides overview • Time and space bounds</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] text-slate-500 font-mono font-bold">94 Chunks</span>
                          <span className="px-2.5 py-0.5 text-[10px] bg-[#10B981]/15 text-[#10B981] font-bold rounded-full border border-[#10B981]/25">Embedded ✅</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FAISS status card */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between select-none shadow-sm">
                    <div className="flex gap-3 items-center">
                      <Database className="text-[#0EA5A0]" size={20} />
                      <div>
                        <p className="text-xs uppercase font-mono tracking-wide text-slate-500 font-bold">Total Active Nodes</p>
                        <p className="text-lg font-bold text-slate-800">686 Aligned Chunks Cache</p>
                      </div>
                    </div>
                    <span className="text-xs bg-[#10B981]/10 text-[#10B981] font-mono font-bold px-3 py-1.5 rounded flex items-center gap-1.5 border border-[#10B981]/15 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
                      CLUSTER ACTIVE
                    </span>
                  </div>

                </div>
              )}

              {/* ======================= TEACHER SUB-SECTION 3: CLO/PLO OUTCOME UPLOAD ======================= */}
              {teacherActiveNav === "clo-plo" && (
                <div className="space-y-6 max-w-4xl animate-fade-in">
                  
                  <div>
                    <h2 className="text-3xl font-bold font-syne text-slate-800 mb-1">Outcome Alignment — CLO/PLO Documents</h2>
                    <p className="text-sm text-slate-600">
                      View course mappings approved by the Board of Studies. Generated examination items are automatically parsed against these target vectors.
                    </p>
                  </div>

                  {/* Loaded status card */}
                  <div className="bg-white border border-[#10B981]/40 p-4.5 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📋</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">CS301_CLOs_Semester5.docx</h4>
                        <p className="text-xs text-slate-550 font-semibold">Loaded successfully • 4 Key Cognitive Learning Outcomes mapped</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1.5 rounded">Loaded & Activated</span>
                  </div>

                  {/* CLO Preview Table */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                      <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500">Course Learning Outcomes (CLOs)</h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 bg-slate-50 font-mono font-bold uppercase">
                            <th className="p-4 w-16">ID</th>
                            <th className="p-4">Course Learning Outcome</th>
                            <th className="p-4 w-32">Bloom's Level</th>
                            <th className="p-4 w-28">PLO Mapping</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                          {CLO_LIST.map((clo) => (
                            <tr key={clo.id} className="hover:bg-slate-50/50 cursor-pointer group">
                              <td className="p-4 font-mono font-bold text-[#0EA5A0]">{clo.code}</td>
                              <td className="p-4 font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                                {clo.outcome}
                              </td>
                              <td className="p-4">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-[10px] font-bold">
                                  {clo.level}
                                </span>
                              </td>
                              <td className="p-4 text-xs font-bold text-[#10B981]">
                                {clo.plo}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* PLO Info Reference Cards */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-bold uppercase">
                      <Shield size={14} className="text-[#0EA5A0]" />
                      <span>PLO OUTCOME COMPLIANCE DIRECTORY (OBE MANUAL)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(PLO_INFO).map(([ploCode, text]) => (
                        <div key={ploCode} className="bg-white p-4 rounded-xl border border-slate-200 space-y-1 hover:border-[#0EA5A0]/40 transition-all duration-150 shadow-sm">
                          <span className="text-xs font-mono font-bold text-[#0EA5A0] tracking-wide block">{ploCode}</span>
                          <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ======================= TEACHER SUB-SECTION 4: GENERATE ASSESSMENT ======================= */}
              {teacherActiveNav === "assessment" && (
                <div className="space-y-6 max-w-4xl animate-fade-in">
                  
                  <div>
                    <h2 className="text-3xl font-bold font-syne text-slate-800 mb-1">Assessment Generator — CLO/PLO Aligned</h2>
                    <p className="text-sm text-slate-600">
                      Retrieve active FAISS course content, optimize Bloom's cognitive taxonomy distribution ratios, and compile a fully validated academic assessment sheet.
                    </p>
                  </div>

                  {/* Horizontal Configuration Panel Filters */}
                  <div className="bg-white border border-slate-200 p-5 rounded-xl grid grid-cols-2 lg:grid-cols-5 gap-4 items-end animate-slide-in shadow-sm">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-2 font-bold">Assessment Type</label>
                      <select
                        value={assessmentType}
                        onChange={(e) => setAssessmentType(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 px-2 py-1.5 rounded text-xs text-slate-800 font-semibold focus:outline-none"
                      >
                        <option value="Midterm">Midterm Examination</option>
                        <option value="Final">Final Examination</option>
                        <option value="Quiz">Quick Classroom Quiz</option>
                        <option value="Assignment">Practical Lab Assignment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-2 font-bold">Total Marks</label>
                      <input
                        type="number"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-1.5 rounded text-xs text-slate-800 text-center font-bold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-2 font-bold">Time Allowed</label>
                      <select
                        value={allowedDuration}
                        onChange={(e) => setAllowedDuration(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-2 py-1.5 rounded text-xs text-slate-800 font-semibold focus:outline-none"
                      >
                        <option value="1 Hour">1 Hour (Quiz)</option>
                        <option value="2 Hours">2 Hours (Midterm)</option>
                        <option value="3 Hours">3 Hours (Finals)</option>
                        <option value="1 Week">1 Week (Project)</option>
                      </select>
                    </div>

                    <div className="flex items-center h-10">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={includeCLOMappings}
                          onChange={(e) => setIncludeCLOMappings(e.target.checked)}
                          className="rounded border-slate-300 text-[#0EA5A0] focus:ring-[#0EA5A0] bg-slate-50 w-4 h-4 cursor-pointer"
                        />
                        <span className="text-[11px] font-mono font-bold uppercase text-slate-500">CLO Mapping</span>
                      </label>
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <button
                        onClick={generateAssessmentAction}
                        disabled={isGeneratingAssessment}
                        className="w-full py-2.5 bg-[#0EA5A0] hover:bg-[#0EA5A0]/90 cursor-pointer text-white rounded text-xs font-bold tracking-wider hover-glow flex items-center justify-center gap-1.5 duration-100 uppercase shadow-sm"
                      >
                        {isGeneratingAssessment ? "Compiling..." : "Generate →"}
                      </button>
                    </div>
                  </div>

                  {/* ACTIVE GENERATED ASSESSMENT EXAM SHEET */}
                  {isGeneratingAssessment ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-16 flex flex-col justify-center items-center text-center space-y-4 shadow-sm animate-pulse">
                      <RefreshCw size={40} className="animate-spin text-[#0EA5A0]" />
                      <div>
                        <p className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">Synthesizing OBE compliant structures...</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Extracting taxonomy seeds and clustering questions balanced over course CLO parameters...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      
                      {/* Formatted Examination Sheet Printout */}
                      <div className="bg-white border border-slate-200 rounded-xl p-8 md:p-12 space-y-8 shadow-sm relative select-text">
                        
                        {/* Print Header */}
                        <div className="text-center space-y-2 border-b-2 border-slate-200 pb-6">
                          <p className="text-xs font-mono tracking-widest text-slate-500 select-none font-bold">UMT BOARD OF EXAMINERS DIRECTORY</p>
                          <h3 className="text-xl md:text-2xl font-black text-slate-800 font-syne tracking-tight uppercase leading-none">
                            UNIVERSITY OF MANAGEMENT AND TECHNOLOGY, LAHORE
                          </h3>
                          <p className="text-xs text-slate-500 uppercase font-mono font-bold">
                            School of Systems and Technology • Department of Artificial Intelligence
                          </p>
                          
                          <div className="pt-4 flex flex-wrap justify-between text-xs text-slate-600 max-w-2xl mx-auto border-t border-slate-100 mt-4 select-none uppercase font-mono font-bold">
                            <p><strong>Course:</strong> CS301 DSA</p>
                            <p><strong>Total Marks:</strong> {totalMarks}</p>
                            <p><strong>Allowed Time:</strong> {allowedDuration}</p>
                            <p><strong>Evaluation:</strong> OBE Schema</p>
                          </div>
                        </div>

                        {/* Exam Content Paper */}
                        <div className="space-y-8 leading-relaxed font-sans text-xs md:text-sm text-slate-700 pr-2 max-h-[500px] overflow-y-auto">
                          
                          <div>
                            <h4 className="text-base font-bold text-[#0EA5A0] font-syne uppercase tracking-wider mb-2 select-none font-extrabold">
                              SECTION A — Multiple Choice Questions (10 Marks)
                            </h4>
                            <p className="text-slate-500 text-[11px] mb-4 italic select-none font-bold uppercase">
                              Circle the correct alternative choices. All questions are mandatory. [CLO 1, CLO 2]
                            </p>
                            
                            <div className="space-y-5 pl-4">
                              <div className="space-y-1">
                                <p className="font-bold text-slate-800 font-sans">Q1. Which of the following represents a linear data structure following LIFO principle?</p>
                                <p className="text-slate-650 font-medium">(A) Standard FIFO Queue &nbsp;&bull;&nbsp; (B) Stack (LIFO) &nbsp;&bull;&nbsp; (C) AVL Search Tree &nbsp;&bull;&nbsp; (D) Max Heap Buffer</p>
                                <span className="inline-block text-[9px] font-mono text-[#0EA5A0] font-bold bg-[#0EA5A0]/10 px-1 py-0.2 rounded mt-0.5 select-none">[CLO 1, LEVEL C3]</span>
                              </div>

                              <div className="space-y-1">
                                <p className="font-bold text-slate-800 font-sans">Q2. What is the guaranteed runtime operational complexity of performing a Binary Search algorithm?</p>
                                <p className="text-slate-650 font-medium">(A) Linear O(N) &nbsp;&bull;&nbsp; (B) Logarithmic O(Log N) &nbsp;&bull;&nbsp; (C) Quadratic O(N^2) &nbsp;&bull;&nbsp; (D) Constant O(1)</p>
                                <span className="inline-block text-[9px] font-mono text-[#0EA5A0] font-bold bg-[#0EA5A0]/10 px-1 py-0.2 rounded mt-0.5 select-none">[CLO 2, LEVEL C4]</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4">
                            <h4 className="text-base font-bold text-[#0EA5A0] font-syne uppercase tracking-wider mb-2 select-none border-t border-slate-100 pt-4 font-extrabold">
                              SECTION B — Short Answer Questions (20 Marks)
                            </h4>
                            <p className="text-slate-500 text-[11px] mb-4 italic select-none font-bold uppercase">
                              Write clear logical codes and analytical notes for each. [CLO 1, CLO 2, CLO 3]
                            </p>
                            
                            <div className="space-y-5 pl-4">
                              <div className="space-y-1.5">
                                <p className="font-bold text-slate-800 font-sans">
                                  Q11. <span className="text-[#0EA5A0] font-mono font-bold">[CLO 1, Level C3] (5 Marks)</span> Write a complete Python Class representing a Stack using standard node pointer variables. Include clear methods for append, retrieve and isEmpty verification routines.
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <p className="font-bold text-slate-800 font-sans">
                                  Q12. <span className="text-[#0EA5A0] font-mono font-bold">[CLO 2, Level C4] (5 Marks)</span> Graphically trace the partition and merge operational states of performing a stable Merge Sort algorithm on the array segment: [12, 5, 29, 14, 4]. Express operations count as Big-O complexities.
                                </p>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Export Action Controls */}
                        <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
                          <p className="text-xs text-slate-500 italic font-medium">Departmental Verification: Automated validation clean ✓</p>
                          <button
                            onClick={() => triggerDownload(`CS301_Midterm_Exam_${assessmentType}.docx`, `${assessmentType} Examination CS301`, SIMULATED_MIDTERM_EXAM)}
                            className="px-6 py-3 bg-[#0EA5A0] hover:bg-[#0EA5A0]/90 text-white rounded-lg font-bold text-sm hover-glow flex items-center gap-2 cursor-pointer duration-150 shadow-sm"
                          >
                            <Download size={15} /> Download Assessment as .docx (Formatted)
                          </button>
                        </div>
                      </div>

                      {/* CLO Coverage summary card */}
                      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
                        <div className="flex items-center gap-2">
                          <BarChart2 className="text-[#0EA5A0]" size={18} />
                          <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">Cognitive Learning Outcome Coverage Weight</span>
                        </div>

                        <div className="space-y-3 pt-2">
                          <div>
                            <div className="flex justify-between text-xs text-slate-600 mb-1 font-semibold">
                              <span>CLO 1 (Apply Stack & Queue implementations)</span>
                              <span className="font-bold text-slate-800 uppercase font-mono">100% Balanced</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-[#0EA5A0] to-blue-500 h-full rounded-full" style={{ width: "100%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs text-slate-600 mb-1 font-semibold">
                              <span>CLO 2 (Complexity analysis with Big-O notation)</span>
                              <span className="font-bold text-slate-800 uppercase font-mono">80% Covered</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-[#0EA5A0] to-blue-500 h-full rounded-full" style={{ width: "80%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs text-slate-600 mb-1 font-semibold">
                              <span>CLO 3 (Tree traversal algorithms on hierarchical trees)</span>
                              <span className="font-bold text-slate-800 uppercase font-mono">90% Covered</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-[#0EA5A0] to-blue-500 h-full rounded-full" style={{ width: "90%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs text-slate-600 mb-1 font-semibold">
                              <span>CLO 4 (Graph algorithms BFS & DFS)</span>
                              <span className="font-bold text-slate-800 uppercase font-mono">50% Checked</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-[#0EA5A0] to-blue-300 h-full rounded-full" style={{ width: "50%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* ======================= TEACHER SUB-SECTION 5: ALL DOWNLOADS HUB ======================= */}
              {teacherActiveNav === "downloads" && (
                <div className="space-y-6 max-w-4xl animate-fade-in">
                  
                  <div>
                    <h2 className="text-3xl font-bold font-syne text-slate-800 mb-1">Lead Evaluator Core Downloads</h2>
                    <p className="text-sm text-slate-600">Cache database of all educational metrics sheets mapped by RULEN.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm hover:border-[#0EA5A0]/30 transition-all duration-150">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl animate-hover">📄</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">DS_Lecture3_Notes_English.docx</h4>
                          <p className="text-xs text-slate-500 font-semibold md:mb-0 mb-1">Syllabus Chapters • 156 KB | Today</p>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerDownload("DS_Lecture3_Notes_English.docx", "CS301 Lecture 3 Notes", "Data Structures Fundamentals: Stack, Queue, traversal notes.")}
                        className="p-2.5 bg-[#0EA5A0] hover:bg-[#0EA5A0]/90 text-white rounded duration-100 cursor-pointer shadow-xs"
                        title="Download Notes File"
                      >
                        <Download size={15} />
                      </button>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm hover:border-[#0EA5A0]/30 transition-all duration-150">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl animate-hover">📋</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">CS301_Midterm_Exam_F2024.docx</h4>
                          <p className="text-xs text-slate-500 font-semibold md:mb-0 mb-1">Midterm Examination • 201 KB | Today</p>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerDownload("CS301_Midterm_Exam_F2024.docx", "CS301 Midterm Exam Paper", SIMULATED_MIDTERM_EXAM)}
                        className="p-2.5 bg-[#0EA5A0] hover:bg-[#0EA5A0]/90 text-white rounded duration-100 cursor-pointer shadow-xs"
                        title="Download Midterm File"
                      >
                        <Download size={15} />
                      </button>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm hover:border-[#0EA5A0]/30 transition-all duration-150">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl animate-hover">📋</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">CS301_Quiz_CLOAligned.docx</h4>
                          <p className="text-xs text-slate-500 font-semibold md:mb-0 mb-1">CLO 2 / CLO 3 Questions • 134 KB | Today</p>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerDownload("CS301_Quiz_CLOAligned.docx", "CS301 Quick Quiz Aligned", "CLO aligned mini evaluation quizzes.")}
                        className="p-2.5 bg-[#0EA5A0] hover:bg-[#0EA5A0]/90 text-white rounded duration-100 cursor-pointer shadow-xs"
                        title="Download Quiz File"
                      >
                        <Download size={15} />
                      </button>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm hover:border-[#0EA5A0]/30 transition-all duration-150">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl animate-hover">📋</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">CS301_Assignment2.docx</h4>
                          <p className="text-xs text-slate-500 font-semibold md:mb-0 mb-1">Lab Practical Assignment • 98 KB | Today</p>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerDownload("CS301_Assignment2.docx", "CS301 Lab Assignment 2", "Implement dynamic programming queue and tree balancing frameworks.")}
                        className="p-2.5 bg-[#0EA5A0] hover:bg-[#0EA5A0]/90 text-white rounded duration-100 cursor-pointer shadow-xs"
                        title="Download Lab File"
                      >
                        <Download size={15} />
                      </button>
                    </div>

                  </div>

                </div>
              )}

            </main>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline fallback for math error
function lsl() {
  return "medium";
}
