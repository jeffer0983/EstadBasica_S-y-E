import React, { useState } from "react";
import { 
  Award, 
  GraduationCap, 
  User, 
  Send, 
  Play, 
  Database, 
  Check, 
  ChevronDown, 
  Lightbulb, 
  ArrowRight,
  BookOpen
} from "lucide-react";
import { motion } from "motion/react";
import { BANCO_PRUEBA_25 } from "../testQuestions";
import { Situation } from "../types";

interface PruebaComponentProps {
  onBackToPractica: () => void;
}

export default function PruebaComponent({ onBackToPractica }: PruebaComponentProps) {
  // --- STATE ---
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem("last_student_name") || "";
  });
  const [studentIE, setStudentIE] = useState<string>(() => {
    return localStorage.getItem("last_student_ie") || "";
  });
  const [pruebaStarted, setPruebaStarted] = useState<boolean>(false);
  const [pruebaFinished, setPruebaFinished] = useState<boolean>(() => {
    return localStorage.getItem("prueba_completada") === "true";
  });
  const [pruebaQuestions, setPruebaQuestions] = useState<Situation[]>([]);
  const [pruebaCurrentIdx, setPruebaCurrentIdx] = useState<number>(0);
  const [pruebaAnswers, setPruebaAnswers] = useState<{ [key: number]: number }>({});
  const [googleScriptUrl] = useState<string>(
    "https://script.google.com/macros/s/AKfycbzRaE5VFxIOQtfi6DJ11z2l2LYG3n-_qJVBOufSzHiKhjhdx-lY-JNFjqTkw5fBOgWN3A/exec"
  );
  const [isSubmittingPrueba, setIsSubmittingPrueba] = useState<boolean>(false);
  const [hasSubmittedPrueba, setHasSubmittedPrueba] = useState<boolean>(() => {
    return localStorage.getItem("prueba_completada") === "true";
  });
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(() => {
    return localStorage.getItem("prueba_completada") === "true" ? "success" : null;
  });
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>("");
  const [pruebaCompletada, setPruebaCompletada] = useState<boolean>(() => {
    return localStorage.getItem("prueba_completada") === "true";
  });

  // --- ACTIONS ---
  const startPrueba = () => {
    if (pruebaCompletada) return; // Prevent start if already completed
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

  const handlePruebaNext = async () => {
    if (pruebaCurrentIdx < 4) {
      setPruebaCurrentIdx(prev => prev + 1);
    } else {
      // Calculate score and percent
      const score = getPruebaScore();
      const percent = Math.round((score / 5) * 100);

      // Save to localStorage immediately to lock the attempt
      localStorage.setItem("prueba_completada", "true");
      localStorage.setItem("last_score", score.toString());
      localStorage.setItem("last_percent", percent.toString());
      localStorage.setItem("last_student_name", studentName);
      localStorage.setItem("last_student_ie", studentIE);

      setPruebaCompletada(true);
      setPruebaFinished(true);
      setHasSubmittedPrueba(true);
      setSubmitStatus("success");

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
        setIsSubmittingPrueba(true);
        // Post using standard fetch with no-cors so we avoid CORS preflight blocks
        await fetch(googleScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        console.log("Resultados enviados automáticamente a Google Sheets.");
      } catch (error: any) {
        console.error("Error submitting to Google Sheets:", error);
      } finally {
        setIsSubmittingPrueba(false);
      }
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

  // --- RENDER ---
  return (
    <div className="w-full space-y-6" id="prueba-tab-content">
      {pruebaCompletada ? (
        /* PRUEBA FINISHED / SUMMARY SCREEN */
        <div className="space-y-6">
          {/* Score Hero Card */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-md border border-emerald-100/40 text-center relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-44 h-44 bg-[#f0f7f4] rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-teal-50 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-[#065f46]" />
              </div>

              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/50 px-3 py-1 rounded-full uppercase tracking-wider">
                Evaluación Finalizada con Éxito
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a2e26] font-display">
                Puntaje Final: {localStorage.getItem("last_score") || getPruebaScore()} / 5 aciertos
              </h2>

              <div className="text-[#065f46] font-extrabold text-lg">
                Rendimiento: {localStorage.getItem("last_percent") || Math.round((getPruebaScore() / 5) * 100)}%
              </div>

              <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-800 font-medium text-center w-full">
                ¡Tu respuesta ha sido registrada y enviada automáticamente a tu docente en Google Sheets!
              </div>

              {/* Certificate Style Box */}
              <div className="p-5 bg-amber-50/55 border border-amber-200 rounded-2xl text-left w-full space-y-2">
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                  Certificación de Participación
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Se certifica que el estudiante <strong className="text-slate-900">{localStorage.getItem("last_student_name") || studentName}</strong>, de la institución educativa <strong className="text-slate-900">{localStorage.getItem("last_student_ie") || studentIE}</strong>, ha completado oficialmente la prueba de conocimientos de estadística descriptiva regional (PIC ET - UNAD).
                </p>
              </div>

              {/* Redo test buttons */}
              <div className="pt-6 border-t border-slate-100 w-full flex justify-center">
                <button
                  onClick={onBackToPractica}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center shadow-md"
                >
                  Volver a la Práctica Regional
                </button>
              </div>

            </div>
          </div>
        </div>
      ) : !pruebaStarted ? (
        /* PRE-TEST REGISTRATION FORM */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-6 sm:p-8 shadow-md border border-emerald-100/40 max-w-2xl mx-auto space-y-6 text-left"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-[#065f46] rounded-full flex items-center justify-center mx-auto">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a2e26] font-display uppercase tracking-wider">
              Evaluación Oficial de Competencias
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
              Demuestra tu comprensión de Espacio Muestral, Sucesos y Combinaciones. Esta prueba consta de <strong className="text-emerald-700 font-extrabold">5 preguntas oficiales aleatorias</strong>. Al finalizar se mostrará únicamente tu puntaje y porcentaje de aciertos.
            </p>
          </div>

          <div className="space-y-4">
            {/* FULL NAME INPUT */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-600 animate-pulse" />
                Nombre Completo
              </label>
              <input
                type="text"
                placeholder="Ej. Juan Carlos Pérez"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-sm font-sans"
              />
            </div>

            {/* EDUCATIONAL INSTITUTION SELECTION (MULTIPLE CHOICE) */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Institución Educativa
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  "I.E.R. José Asunción Silva",
                  "E.R. El Cairo",
                  "I.E. Libertad – Diurna",
                  "I.E. Libertad – Nocturna",
                  "I.E. Valle de Guamuez"
                ].map((ieOption) => {
                  const isSelected = studentIE === ieOption;
                  return (
                    <button
                      key={ieOption}
                      type="button"
                      onClick={() => setStudentIE(ieOption)}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between group ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold"
                          : "bg-slate-50/50 border-slate-100 hover:bg-slate-50 hover:border-slate-300 text-slate-700 cursor-pointer"
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{ieOption}</span>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-slate-300 group-hover:border-slate-400"
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* START BUTTON */}
          <button
            disabled={studentName.trim().length < 3 || !studentIE}
            onClick={startPrueba}
            className={`w-full py-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
              studentName.trim().length < 3 || !studentIE
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100/40 cursor-pointer active:scale-95"
            }`}
          >
            <Play className="w-4 h-4" />
            Iniciar Evaluación Oficial
          </button>
        </motion.div>
      ) : !pruebaFinished ? (
        /* PRUEBA / TEST QUESTIONS VIEW */
        pruebaQuestions[pruebaCurrentIdx] && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start text-left">
            {/* Left panel - 3/4 Width (Question and options) */}
            <div className="lg:col-span-3 bg-white rounded-[32px] p-6 sm:p-8 shadow-md border border-emerald-100/40 flex flex-col gap-6">
              {/* Header showing current progress */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Evaluación Oficial
                  </span>
                  <h3 className="font-extrabold text-[#1a2e26] text-sm font-display mt-2">
                    {pruebaQuestions[pruebaCurrentIdx].municipio} — {pruebaQuestions[pruebaCurrentIdx].tema}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-bold font-mono">
                  Pregunta {pruebaCurrentIdx + 1} de 5
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${((pruebaCurrentIdx + 1) / 5) * 100}%` }}
                ></div>
              </div>

              {/* Context description */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Contexto del Caso:
                </span>
                <p className="font-serif text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  "{pruebaQuestions[pruebaCurrentIdx].contexto}"
                </p>
              </div>

              {/* Question text */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#065f46] uppercase tracking-wider block">
                  Problema a resolver:
                </span>
                <h4 className="font-bold text-sm sm:text-base text-[#1a2e26] leading-snug">
                  {pruebaQuestions[pruebaCurrentIdx].pregunta}
                </h4>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-3">
                {pruebaQuestions[pruebaCurrentIdx].opciones.map((option, idx) => {
                  const isSelected = pruebaAnswers[pruebaCurrentIdx] === idx;
                  const letters = ["A", "B", "C", "D"];
                  return (
                    <button
                      key={idx}
                      onClick={() => handlePruebaOptionSelect(idx)}
                      className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col gap-1 w-full cursor-pointer ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-sm"
                          : "border-slate-100 bg-slate-50/30 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`}>
                        Opción {letters[idx]}
                      </span>
                      <div className="font-mono text-xs leading-relaxed mt-1">
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

              {/* Navigation bar inside bento */}
              <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                <button
                  disabled={pruebaCurrentIdx === 0}
                  onClick={handlePruebaPrev}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    pruebaCurrentIdx === 0
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-100 cursor-pointer"
                  }`}
                >
                  Anterior
                </button>

                <button
                  disabled={pruebaAnswers[pruebaCurrentIdx] === undefined}
                  onClick={handlePruebaNext}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                    pruebaAnswers[pruebaCurrentIdx] === undefined
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-[#065f46] text-white hover:bg-[#0d9488] shadow-md shadow-emerald-100 cursor-pointer active:scale-95"
                  }`}
                >
                  {pruebaCurrentIdx < 4 ? "Siguiente" : "Finalizar Prueba"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right side - 1/4 Width (Instructions) */}
            <div className="bg-white rounded-[24px] p-6 border border-emerald-100/40 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Indicación de Examen
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Durante la prueba oficial, las respuestas correctas y los análisis de retroalimentación no se mostrarán inmediatamente. Tómate el tiempo para leer cada enunciado con detenimiento.
              </p>
              <div className="border-t border-slate-50 pt-3 space-y-2 text-xs">
                <p className="text-slate-500 leading-relaxed">
                  <strong>Estudiante:</strong> <span className="text-[#1a2e26] block truncate font-mono">{studentName}</span>
                </p>
                <p className="text-slate-500 leading-relaxed">
                  <strong>Colegio:</strong> <span className="text-[#1a2e26] block font-mono">{studentIE}</span>
                </p>
              </div>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}
