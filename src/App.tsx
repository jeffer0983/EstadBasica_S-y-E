import React, { useState, useEffect } from "react";
import { 
  TreePine, 
  BookOpen, 
  Award, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  Compass, 
  MapPin, 
  Flame, 
  Check, 
  ArrowRight,
  BookOpenCheck,
  CheckCircle,
  Lightbulb,
  ArrowLeft,
  Target,
  User,
  Send,
  Play,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SITUACIONES_PUTUMAYO } from "./data";
import { BANCO_PRUEBA_25 } from "./testQuestions";
import { Situation } from "./types";
import PruebaComponent from "./components/PruebaComponent";

export default function App() {
  // --- STATE ---
  const [questions, setQuestions] = useState<Situation[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({}); // maps questionIdx to chosenOptionIdx
  const [isTheoreticalGuideOpen, setIsTheoreticalGuideOpen] = useState<boolean>(true);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [stats, setStats] = useState({ correct: 0, total: 4 });

  // --- NEW TEST/PRUEBA STATE ---
  const [activeTab, setActiveTab] = useState<"practica" | "prueba">("practica");
  const [hasCompletedSituaciones, setHasCompletedSituaciones] = useState<boolean>(() => {
    return localStorage.getItem("completed_situaciones") === "true";
  });

  const [studentName, setStudentName] = useState<string>("");
  const [studentIE, setStudentIE] = useState<string>("");
  const [pruebaStarted, setPruebaStarted] = useState<boolean>(false);
  const [pruebaFinished, setPruebaFinished] = useState<boolean>(false);
  const [pruebaQuestions, setPruebaQuestions] = useState<Situation[]>([]);
  const [pruebaCurrentIdx, setPruebaCurrentIdx] = useState<number>(0);
  const [pruebaAnswers, setPruebaAnswers] = useState<{ [key: number]: number }>({});
  const [googleScriptUrl, setGoogleScriptUrl] = useState<string>(() => {
    return localStorage.getItem("google_script_url") || "";
  });
  const [isSubmittingPrueba, setIsSubmittingPrueba] = useState<boolean>(false);
  const [hasSubmittedPrueba, setHasSubmittedPrueba] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>("");

  // --- SELECTION & SHUFFLE LOGIC ---
  const initializeQuiz = () => {
    // Fisher-Yates Shuffle
    const shuffled = [...SITUACIONES_PUTUMAYO];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Select exactly 4
    setQuestions(shuffled.slice(0, 4));
    setCurrentIdx(0);
    setUserAnswers({});
    setQuizFinished(false);
  };

  useEffect(() => {
    initializeQuiz();
  }, []);

  const handleOptionSelect = (optionIdx: number) => {
    if (userAnswers[currentIdx] !== undefined) return; // Locked once answered
    setUserAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < 3) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correcta) {
          correctCount++;
        }
      });
      setStats({ correct: correctCount, total: 4 });
      setQuizFinished(true);
      setHasCompletedSituaciones(true);
      localStorage.setItem("completed_situaciones", "true");
    }
  };

  // --- NEW TEST/PRUEBA FUNCTIONS ---
  const startPrueba = () => {
    const shuffled = [...BANCO_PRUEBA_25];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPruebaQuestions(shuffled.slice(0, 5));
    setPruebaCurrentIdx(0);
    setPruebaAnswers({});
    setPruebaFinished(false);
    setPruebaStarted(true);
    setHasSubmittedPrueba(false);
    setSubmitStatus(null);
    setSubmitErrorMessage("");
  };

  const handlePruebaOptionSelect = (optionIdx: number) => {
    setPruebaAnswers(prev => ({
      ...prev,
      [pruebaCurrentIdx]: optionIdx
    }));
  };

  const handlePruebaNext = () => {
    if (pruebaCurrentIdx < 4) {
      setPruebaCurrentIdx(prev => prev + 1);
    } else {
      setPruebaFinished(true);
    }
  };

  const handlePruebaPrev = () => {
    if (pruebaCurrentIdx > 0) {
      setPruebaCurrentIdx(prev => prev - 1);
    }
  };

  const getPruebaScore = () => {
    let score = 0;
    pruebaQuestions.forEach((q, idx) => {
      if (pruebaAnswers[idx] === q.correcta) {
        score++;
      }
    });
    return score;
  };

  const submitPruebaResults = async () => {
    if (hasSubmittedPrueba || isSubmittingPrueba) return;

    setIsSubmittingPrueba(true);
    setSubmitStatus(null);
    setSubmitErrorMessage("");

    const score = getPruebaScore();
    const percent = Math.round((score / 5) * 100);
    
    // Format date and time safely
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}:${seconds}`;

    const payload = {
      name: studentName,
      ie: studentIE,
      score: score,
      Porcent: percent,
      date: dateStr,
      time: timeStr
    };

    try {
      localStorage.setItem("google_script_url", googleScriptUrl);
      
      // Post using standard fetch with no-cors so we avoid CORS preflight blocks
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      setSubmitStatus("success");
      setHasSubmittedPrueba(true);
    } catch (error: any) {
      console.error("Error submitting to Google Sheets:", error);
      setSubmitStatus("error");
      setSubmitErrorMessage(error?.message || "Error de red.");
      setHasSubmittedPrueba(true);
    } finally {
      setIsSubmittingPrueba(false);
    }
  };

  const getScoreMessage = (score: number) => {
    if (score === 4) return {
      title: "¡Excelente, Guardián de la Sabiduría!",
      desc: "Has dominado perfectamente los conceptos de Espacio Muestral (S) y Sucesos (E) aplicados al territorio del Putumayo. ¡Eres un orgullo para la UNAD!",
      bg: "bg-emerald-50 text-[#065f46] border-emerald-200",
      icon: Flame
    };
    if (score === 3) return {
      title: "¡Muy buen trabajo, Explorador!",
      desc: "Demuestras un gran entendimiento matemático y un excelente conocimiento de nuestra biodiversidad regional. ¡Sigue así con el proyecto PIC ET!",
      bg: "bg-teal-50 text-teal-900 border-teal-200",
      icon: Sparkles
    };
    if (score === 2) return {
      title: "¡Vas por buen camino!",
      desc: "Tienes claras las bases del azar y el espacio muestral. Te invitamos a revisar la retroalimentación de los casos fallados para seguir reforzando.",
      bg: "bg-amber-50 text-amber-900 border-amber-200",
      icon: Compass
    };
    return {
      title: "Sigue practicando, ¡la Amazonía te inspira!",
      desc: "La probabilidad y el azar requieren práctica. Lee detenidamente la guía teórica ampliada de combinaciones y vuelve a intentarlo con nuevos casos del territorio.",
      bg: "bg-orange-50 text-orange-950 border-orange-200",
      icon: GraduationCap
    };
  };

  const activeQuestion = questions[currentIdx];

  return (
    <div className="min-h-screen bg-[#468f9a] text-[#1a2e26] font-sans py-6 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      
      <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col gap-6">
        
        {/* UNAD BENTO HEADER */}
        <header className="w-full animate-fade-in" id="main-header">
          <div className="bg-[#002447] text-white rounded-[16px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-8">
              {/* UNAD EMBLEM LOGO (LEFT SIDE) */}
              <div className="shrink-0 bg-white rounded-xl shadow-inner w-[94px] h-[75px] flex items-center justify-center border border-slate-200">
                <img 
                  src="https://thumano.unad.edu.co/SIIGTHUM_vp/imagenes/logo.png" 
                  alt="Logo UNAD Acreditada" 
                  className="w-[80px] h-[65px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* HEADER TEXTS (RIGHT SIDE) */}
              <div className="flex-grow text-center md:text-left">
                {/* Universidad Nacional Abierta y a Distancia (UNAD) */}
                <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold font-sans tracking-wide text-white leading-tight">
                  Universidad Nacional Abierta y a Distancia (UNAD)
                </h1>
                
                {/* PIC ET */}
                <p className="text-white text-xs sm:text-sm md:text-base font-semibold mt-1">
                  PIC ET
                </p>

                {/* UDR Valle del Guamuez */}
                <p className="text-[#b0c8db] text-xs sm:text-sm md:text-base font-semibold mt-0.5">
                  UDR Valle del Guamuez
                </p>
                
                {/* ESTADÍSTICA: EJEMPLOS REGIONALES */}
                <p className="text-[#ffc000] text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase mt-2">
                  ESTADÍSTICA: EJEMPLOS REGIONALES
                </p>
              </div>
            </div>
            
            {/* Golden bottom strip from the reference image */}
            <div className="h-1.5 bg-[#f2b705] w-full"></div>
          </div>
        </header>

        {/* RECURSO DIDÁCTICO - OBJETIVO DE APRENDIZAJE */}
        <section aria-labelledby="objective-title" id="resource-objective" className="animate-fade-in w-full">
          <div className="bg-white rounded-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-emerald-100 p-5 flex flex-col md:flex-row items-start gap-4">
            <div className="p-3 bg-emerald-50 text-[#0d9488] rounded-xl shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 id="objective-title" className="font-bold text-[#1a2e26] font-display text-xs sm:text-sm uppercase tracking-wider text-[#065f46]">
                Objetivo
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Este recurso interactivo está diseñado especialmente para que los estudiantes comprendan de forma práctica y aplicada los conceptos fundamentales de la estadística: la <strong className="text-[#065f46]">Muestra</strong> (representación del grupo de estudio), los <strong className="text-[#065f46]">Sucesos</strong> y los <strong className="text-[#065f46]">Eventos probabilísticos</strong>. A través del análisis de situaciones reales de producción y desarrollo regional en el Putumayo, ejercitarás el cálculo de combinaciones y la estimación matemática en contextos reales del territorio.
              </p>
            </div>
          </div>
        </section>

        {/* TABS DE APRENDIZAJE Y EVALUACIÓN */}
        <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-[24px] p-5 shadow-sm border border-slate-100" id="tabs-container">
          <div className="text-center sm:text-left">
            <h3 className="font-extrabold text-[#1a2e26] text-xs sm:text-sm font-display uppercase tracking-wider text-[#065f46]">
              Ruta del Estudiante
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
              Completa las 4 situaciones de la práctica para habilitar la prueba oficial de 5 preguntas.
            </p>
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={() => setActiveTab("practica")}
              className={`flex-grow sm:flex-none px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "practica"
                  ? "bg-[#002447] text-white shadow-lg shadow-slate-200"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              1. Práctica Regional ({Object.keys(userAnswers).length}/4)
            </button>
            <button
              disabled={!hasCompletedSituaciones}
              onClick={() => {
                if (hasCompletedSituaciones) {
                  setActiveTab("prueba");
                }
              }}
              className={`flex-grow sm:flex-none px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                !hasCompletedSituaciones
                  ? "bg-slate-300 text-slate-500 border border-slate-400/40 cursor-not-allowed opacity-90" // Gray fill for disabled
                  : activeTab === "prueba"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 cursor-pointer" // Green fill when enabled and active
                    : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 cursor-pointer" // Soft green fill when enabled and inactive
              }`}
            >
              <Award className="w-4 h-4" />
              2. Prueba de Competencia
            </button>
          </div>
        </div>

        {activeTab === "practica" ? (
          <>
            {/* COLLAPSIBLE THEORETICAL GUIDE (BENTO STYLE) */}
            <section aria-labelledby="guide-title" id="theoretical-guide">
          <div className="bg-white rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-emerald-100/40 overflow-hidden">
            <button
              onClick={() => setIsTheoreticalGuideOpen(!isTheoreticalGuideOpen)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#f0f7f4]/40 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <BookOpenCheck className="w-5 h-5 text-[#0d9488]" />
                <h2 id="guide-title" className="font-bold text-[#1a2e26] font-display text-sm sm:text-base">
                  Guía Didáctica: ¿Qué es el Espacio Muestral (S), los Sucesos (E) y las Combinaciones?
                </h2>
              </div>
              <div className="p-1 rounded-lg bg-[#f0f7f4] text-[#0d9488]">
                {isTheoreticalGuideOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            <AnimatePresence>
              {isTheoreticalGuideOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-emerald-50 text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4">
                    <p className="text-slate-700">
                      En el Putumayo, desde la cosecha de pimienta en Orito hasta el avistamiento de aves en Chaluayaco, el azar forma parte de nuestra vida productiva, cultural y natural. En las matemáticas aplicadas y en especial en estadística, para analizar sobre posibilidades de que algo ocurra es necesario conocer muy bien los siguientes conceptos:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                      
                      {/* EXPERIMENTO ALEATORIO */}
                      <div className="p-4 bg-[#f0f7f4] rounded-2xl border border-emerald-100/30 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-[#065f46] mb-1.5 font-display text-xs uppercase tracking-wider">
                            1. Experimento Aleatorio
                          </h3>
                          <p className="text-xs text-slate-600">
                            Es una acción o proceso cuyo resultado no se puede predecir con absoluta certeza, aunque se conozcan todos los resultados posibles de antemano.
                          </p>
                        </div>
                        <div className="mt-3 space-y-1">
                          <p className="text-[11px] text-[#0d9488] font-semibold italic">
                            Ej 1: Lanzar un dado común de 6 caras.
                          </p>
                          <p className="text-[11px] text-[#0d9488] font-semibold italic">
                            Ej 2: Inspeccionar un fruto de chontaduro al azar para determinar su madurez.
                          </p>
                        </div>
                      </div>

                      {/* ESPACIO MUESTRAL */}
                      <div className="p-4 bg-[#f0f7f4] rounded-2xl border border-emerald-100/30 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-[#065f46] mb-1.5 font-display text-xs uppercase tracking-wider">
                            2. Espacio Muestral (S)
                          </h3>
                          <p className="text-xs text-slate-600">
                            Es el conjunto universal de <strong>todos</strong> los posibles resultados de un experimento aleatorio. No se puede omitir ningún resultado factible.
                          </p>
                        </div>
                        <div className="mt-3 space-y-1 font-mono text-[11px] text-[#0d9488] font-semibold">
                          <p>Ej 1: S = {"{1, 2, 3, 4, 5, 6}"}</p>
                          <p>Ej 2: S = {"{Verde, Pintón, Maduro}"}</p>
                        </div>
                      </div>

                      {/* SUCESO O EVENTO */}
                      <div className="p-4 bg-[#f0f7f4] rounded-2xl border border-emerald-100/30 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-[#065f46] mb-1.5 font-display text-xs uppercase tracking-wider">
                            3. Suceso o Evento (E)
                          </h3>
                          <p className="text-xs text-slate-600">
                            Es un subconjunto del espacio muestral (S). Representa el conjunto de resultados específicos que nos interesa estudiar y evaluar en una situación.
                          </p>
                        </div>
                        <div className="mt-3 space-y-1 font-mono text-[11px] text-[#0d9488] font-semibold">
                          <p>Ej 1: E = {"{2, 4, 6}"} (número par)</p>
                          <p>Ej 2: E = {"{Maduro}"} (fruto listo)</p>
                        </div>
                      </div>

                      {/* COMBINACIONES SIMPLES */}
                      <div className="p-4 bg-[#f0f7f4] rounded-2xl border border-emerald-100/30 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-[#065f46] mb-1.5 font-display text-xs uppercase tracking-wider bg-teal-600/10 text-teal-800 px-1 py-0.5 rounded">
                            4. Combinaciones Simples
                          </h3>
                          <p className="text-xs text-slate-600">
                            Es el conteo de subgrupos de tamaño <em>k</em> elegidos de un conjunto de <em>n</em> elementos, donde <strong>no importa el orden</strong> y <strong>no hay repetición</strong>.
                          </p>
                        </div>
                        <p className="text-[11px] text-[#0d9488] font-semibold mt-3 font-mono">
                          Ej: Elegir 2 de 3 colores {"{Negro, Blanco, Rojo}"} da C(3,2) = 3 combinaciones: {"{NB, NR, BR}"}.
                        </p>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* BENTO GRID CONTENT SECTION */}
        {!quizFinished ? (
          activeQuestion && (
            <div className="flex flex-col gap-6" id="bento-main">
              
              {/* HORIZONTAL COMPACT PROGRESS BAR */}
              <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-emerald-100/40 w-full" id="horizontal-progress">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xs uppercase tracking-wider text-[#065f46] font-bold font-display">
                      Monitoreo de Casos en el Putumayo
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Selecciona cualquiera de las 4 situaciones regionales activas para responder
                    </p>
                  </div>
                  
                  {/* COMPACT HORIZONTAL GRID */}
                  <div className="grid grid-cols-4 gap-2 w-full sm:w-auto shrink-0 max-w-md">
                    {[0, 1, 2, 3].map((idx) => {
                      const isCompleted = userAnswers[idx] !== undefined;
                      const isActive = idx === currentIdx;
                      
                      let stepBg = "bg-slate-50 text-slate-500 border-slate-200";
                      let numBg = "bg-slate-200 text-slate-500";
                      
                      if (isActive) {
                        stepBg = "bg-emerald-50 text-emerald-950 border-[#0d9488]";
                        numBg = "bg-[#0d9488] text-white";
                      } else if (isCompleted) {
                        stepBg = "bg-teal-50/70 text-teal-900 border-teal-200";
                        numBg = "bg-[#065f46] text-white";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => setCurrentIdx(idx)}
                          className={`py-2 px-1.5 sm:px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${stepBg} ${
                            isActive ? "scale-[1.03] shadow-sm font-bold ring-2 ring-[#0d9488]/20" : "hover:bg-slate-100 cursor-pointer"
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${numBg}`}>
                            {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                          </span>
                          <span className="hidden md:inline text-[11px] font-bold font-display truncate max-w-[70px]">
                            {questions[idx]?.municipio || "Caso"}
                          </span>
                          <span className="inline md:hidden text-[10px] font-bold">
                            C{idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* TWO-COLUMN QUIZ CONTENT LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                
                {/* ACTIVE QUESTION PANEL (Left - 3/4 Width) */}
                <div className="lg:col-span-3 bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05)] border border-emerald-100/40 flex flex-col gap-6" id="bento-question">
                  
                  {/* Topic tags and header info */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#0d9488] text-white px-3 py-1 rounded-full uppercase tracking-wider">
                        <MapPin className="w-3 h-3" />
                        {activeQuestion.municipio}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#f0f7f4] text-[#065f46] px-3 py-1 rounded-full uppercase tracking-wider">
                        {activeQuestion.tema}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-bold font-mono">
                      Caso {currentIdx + 1} de 4
                    </span>
                  </div>

                  {/* Rich Contextual description - Styled with elegant serif display font */}
                  <div className="p-5 bg-[#f0f7f4]/40 rounded-2xl border border-emerald-50">
                    <span className="text-[10px] font-bold text-[#0d9488] uppercase tracking-wider block mb-1.5">
                      Contexto Regional:
                    </span>
                    <p className="font-serif text-[#1a2e26] leading-relaxed text-base sm:text-lg italic">
                      "{activeQuestion.contexto}"
                    </p>
                  </div>

                  {/* Question statement */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Pregunta de Análisis:
                    </span>
                    <p className="text-[#1a2e26] font-extrabold text-base sm:text-lg leading-snug">
                      {activeQuestion.pregunta}
                    </p>
                  </div>

                  {/* OPTIONS GRID (Bento Style 2x2) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeQuestion.opciones.map((option, idx) => {
                      const isSelected = userAnswers[currentIdx] === idx;
                      const isCorrectAnswer = idx === activeQuestion.correcta;
                      const hasAnswered = userAnswers[currentIdx] !== undefined;
                      
                      let optionStyle = "border-transparent bg-[#f0f7f4] hover:bg-white hover:border-[#0d9488]";
                      let labelStyle = "text-[#065f46]";
                      let contentStyle = "text-slate-800";

                      if (hasAnswered) {
                        if (isCorrectAnswer) {
                          optionStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-950 shadow-sm shadow-emerald-100";
                          labelStyle = "text-emerald-700";
                          contentStyle = "text-emerald-900 font-bold";
                        } else if (isSelected) {
                          optionStyle = "border-rose-300 bg-rose-50/60 text-rose-950";
                          labelStyle = "text-rose-700";
                          contentStyle = "text-rose-900";
                        } else {
                          optionStyle = "border-transparent bg-slate-50/40 opacity-60 text-slate-500";
                          labelStyle = "text-slate-400";
                          contentStyle = "text-slate-400";
                        }
                      } else if (isSelected) {
                        optionStyle = "border-[#0d9488] bg-emerald-50";
                        labelStyle = "text-[#065f46]";
                      }

                      const letters = ["A", "B", "C", "D"];

                      return (
                        <button
                          key={idx}
                          disabled={hasAnswered}
                          onClick={() => handleOptionSelect(idx)}
                          className={`text-left p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 w-full ${optionStyle} ${
                            !hasAnswered ? "cursor-pointer active:scale-[0.99]" : "cursor-default"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className={`text-xs font-bold uppercase tracking-wider ${labelStyle}`}>
                              Opción {letters[idx]}
                            </span>
                            {hasAnswered && isCorrectAnswer && (
                              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                                ✓
                              </span>
                            )}
                            {hasAnswered && isSelected && !isCorrectAnswer && (
                              <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
                                ✗
                              </span>
                            )}
                          </div>
                          <div className={`font-mono text-xs leading-relaxed break-all ${contentStyle}`}>
                            {(() => {
                              const parts = option.split(/,\s*(?=[Ee]\s*=)/);
                              if (parts.length > 1) {
                                return (
                                  <span className="block space-y-1">
                                    <span className="block">{parts[0]}</span>
                                    <span className="block font-semibold text-[#0d9488]">{parts[1]}</span>
                                  </span>
                                );
                              }
                              return option;
                            })()}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* BENTO IMMEDIATE FEEDBACK PANEL */}
                  <AnimatePresence>
                    {userAnswers[currentIdx] !== undefined && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className={`p-5 rounded-2xl border-l-4 ${
                          userAnswers[currentIdx] === activeQuestion.correcta
                            ? "bg-[#f0f7f4] border-[#065f46] text-[#1a2e26]"
                            : "bg-rose-50/50 border-rose-500 text-slate-800"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {userAnswers[currentIdx] === activeQuestion.correcta ? (
                            <CheckCircle className="w-5 h-5 text-[#065f46] shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h4 className="font-bold text-sm text-[#1a2e26] font-display uppercase tracking-wider">
                              {userAnswers[currentIdx] === activeQuestion.correcta 
                                ? "¡Respuesta Correcta!" 
                                : "Análisis del Caso"}
                            </h4>
                            <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                              {activeQuestion.retroalimentacion}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* NAVIGATION BAR (Inside Bento card) */}
                  <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <button
                      disabled={currentIdx === 0}
                      onClick={() => setCurrentIdx(prev => prev - 1)}
                      className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                        currentIdx === 0
                          ? "text-slate-300 cursor-not-allowed"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                      }`}
                    >
                      Anterior
                    </button>

                    <button
                      disabled={userAnswers[currentIdx] === undefined}
                      onClick={handleNext}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                        userAnswers[currentIdx] === undefined
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-[#065f46] text-white hover:bg-[#0d9488] shadow-md shadow-emerald-100 cursor-pointer active:scale-95"
                      }`}
                    >
                      {currentIdx < 3 ? "Siguiente" : "Finalizar y Ver Resultados"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* SIDE SUPPORT PANEL (Right - 1/4 Width) */}
                <div className="flex flex-col gap-4">
                  
                  {/* TIP DOCENTE (Matches Bento layout style) */}
                  <div className="bg-white rounded-[24px] p-6 border border-emerald-100/40 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] space-y-3 relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-[#065f46]/5">
                      <Lightbulb className="w-16 h-16" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#065f46]">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      Apoyo Pedagógico
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600">
                      El espacio muestral <strong className="text-[#065f46] font-mono">S</strong> siempre abarca todos los resultados posibles del experimento, mientras que el suceso <strong className="text-[#065f46] font-mono">E</strong> contiene sólo aquellos que cumplen con la condición de análisis planteada. ¡Estudia con atención!
                    </p>
                  </div>

                  {/* SHUFFLE ACTION */}
                  <div className="bg-[#065f46] text-white p-6 rounded-[24px] space-y-3 relative overflow-hidden shadow-md">
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-emerald-800 rounded-full opacity-35"></div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-300 font-display">
                      Explorador de Casos
                    </h4>
                    <p className="text-[11px] text-emerald-100 leading-relaxed">
                      El sistema cuenta con un banco aleatorio de 30 casos productivos reales del Putumayo.
                    </p>
                    <button
                      onClick={initializeQuiz}
                      className="w-full py-2.5 px-4 bg-yellow-400 hover:bg-yellow-500 text-xs font-bold text-slate-900 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                      Barajar Nuevos Casos
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )
        ) : (
          /* BENTO SCORES AND DETAILED REVIEW */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="results-container"
          >
            {/* SCORE HERO CARD */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05)] border border-emerald-100/40 text-center relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-44 h-44 bg-[#f0f7f4] rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-teal-50 rounded-full blur-2xl"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-[#065f46] animate-pulse" />
                </div>
                
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/50 px-3 py-1 rounded-full uppercase tracking-wider">
                  Evaluación Finalizada • PIC ET
                </span>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2e26] mt-3 font-display">
                  Tu Calificación: {stats.correct} / {stats.total}
                </h2>
                
                <div className="text-slate-400 font-mono text-xs mt-1">
                  ({Math.round((stats.correct / stats.total) * 100)}% de aciertos)
                </div>

                {/* Teacher's customized feedback block */}
                <div className={`mt-6 p-5 rounded-2xl border max-w-xl mx-auto ${getScoreMessage(stats.correct).bg}`}>
                  <div className="flex items-start gap-3 text-left">
                    {React.createElement(getScoreMessage(stats.correct).icon, { className: "w-5 h-5 shrink-0 mt-0.5 text-[#065f46]" })}
                    <div>
                      <h4 className="font-bold text-sm font-display text-[#1a2e26] uppercase tracking-wider">
                        {getScoreMessage(stats.correct).title}
                      </h4>
                      <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-95 text-[#1a2e26]">
                        {getScoreMessage(stats.correct).desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={initializeQuiz}
                    className="px-6 py-3 bg-[#065f46] hover:bg-[#0d9488] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md shadow-emerald-100 flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Intentar con otros 4 casos
                  </button>
                  <button
                    onClick={() => {
                      initializeQuiz();
                      setIsTheoreticalGuideOpen(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpenCheck className="w-4 h-4" />
                    Repasar Guía Teórica
                  </button>
                </div>
              </div>
            </div>

            {/* REVIEWS LIST */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-[#1a2e26] font-display px-1 uppercase tracking-wider text-slate-400">
                Revisión Detallada de los Casos Evaluados
              </h3>

              {questions.map((q, idx) => {
                const isCorrect = userAnswers[idx] === q.correcta;
                return (
                  <div key={idx} className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100/70 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-[#f0f7f4] text-[#065f46] font-bold text-xs flex items-center justify-center font-display">
                          {idx + 1}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                          {q.municipio} — {q.tema}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                            <Check className="w-3.5 h-3.5" /> CORRECTA
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full">
                            <XCircle className="w-3.5 h-3.5" /> INCORRECTA
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <p className="font-serif text-slate-500 text-xs sm:text-sm italic">
                        "{q.contexto}"
                      </p>
                      <p className="text-[#1a2e26] font-bold text-sm">
                        {q.pregunta}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                      <div className="p-3.5 rounded-xl bg-[#f0f7f4] border border-emerald-100/50">
                        <div className="text-[10px] font-bold text-[#065f46] uppercase tracking-wider mb-1">
                          Respuesta Correcta:
                        </div>
                        <div className="font-mono text-xs text-[#1a2e26]">
                          {q.opciones[q.correcta]}
                        </div>
                      </div>

                      <div className={`p-3.5 rounded-xl border ${isCorrect ? 'bg-[#f0f7f4] border-emerald-100/50' : 'bg-rose-50/50 border-rose-100'}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isCorrect ? 'text-[#065f46]' : 'text-rose-800'}`}>
                          Tu Respuesta:
                        </div>
                        <div className="font-mono text-xs text-[#1a2e26]">
                          {q.opciones[userAnswers[idx]]}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed border border-slate-100/80">
                      <strong className="text-[#1a2e26]">Análisis:</strong> {q.retroalimentacion}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
          </>
        ) : (
          <PruebaComponent onBackToPractica={() => setActiveTab("practica")} />
        )}

      </div>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto w-full mt-10 border-t border-slate-200/60 pt-6 text-center sm:text-left text-xs text-slate-400" id="main-footer">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-display font-bold text-[#1a2e26] opacity-75">
              Universidad Nacional Abierta y a Distancia (UNAD) &copy; 2026
            </p>
            <p className="mt-0.5 opacity-80">
              Proyecto PIC ET • Estadística regional muestral en el Putumayo • Grado 10°
            </p>
          </div>
          <div className="flex gap-4 font-semibold text-slate-500">
            <span>Matemáticas Grado 10°</span>
            <span>•</span>
            <span>Recurso UNAD v2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
