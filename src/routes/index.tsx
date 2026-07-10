import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import homeTraining from "@/assets/home-training.jpg";
import beforeAfterAsset from "@/assets/before-after.png.asset.json";
import injuriesBody from "@/assets/injuries-body.jpg.asset.json";
import attentionPushup from "@/assets/attention-pushup.jpg.asset.json";
import transformationFeedback from "@/assets/transformation-feedback.jpg.asset.json";
import militaryTransformation from "@/assets/military-transformation.png.asset.json";
import logoMilitary from "@/assets/logo-military.png.asset.json";
import testimonial1 from "@/assets/testimonial-1.png.asset.json";
import testimonial2 from "@/assets/testimonial-2.png.asset.json";



import programPreview from "@/assets/program-preview.jpg";
import calendar2026 from "@/assets/calendar-2026.jpg";



export const Route = createFileRoute("/")({
  component: Quiz,
  head: () => ({
    meta: [
      { title: "Quiz Militar — Tu plan personalizado" },
      {
        name: "description",
        content:
          "Responde unas preguntas y llévate tu plan de entrenamiento militar personalizado.",
      },
    ],
  }),
});

type Answers = Record<string, string | string[]>;

const TOTAL = 34;

type SingleStep = {
  kind: "single";
  key: string;
  title: string;
  subtitle?: string;
  options: { value: string; label: string; hint?: string; badge?: string }[];
  progress: number; // 0..TOTAL
};

type MultiStep = {
  kind: "multi";
  key: string;
  title: string;
  subtitle?: string;
  options: { value: string; label: string }[];
  progress: number;
};

type InfoStep = {
  kind: "info";
  key: string;
  title: string;
  body: string;
  cta: string;
  image?: string;
  progress: number;
};


type InputStep = {
  kind: "input";
  key: string;
  title: string;
  subtitle?: string;
  inputType: "number" | "text" | "email";
  placeholder?: string;
  suffix?: string;
  progress: number;
};

type LoadingStep = {
  kind: "loading";
  key: string;
  title: string;
  subtitle?: string;
  phrases?: string[];
  progress: number;
};


type CompareStep = {
  kind: "compare";
  key: string;
  title: string;
  left: { title: string; emoji: string; items: string[] };
  right: { title: string; emoji: string; items: string[] };
  body: string;
  cta: string;
  progress: number;
};

type HeightStep = {
  kind: "height";
  key: string;
  title: string;
  progress: number;
};

type WeightStep = {
  kind: "weight";
  key: string;
  title: string;
  mode: "current" | "target";
  progress: number;
};

type GraphStep = {
  kind: "graph";
  key: string;
  title: string;
  score: number;
  highlight: string;
  bars: { label: string; value: number }[];
  body: string;
  callout: string;
  cta: string;
  progress: number;
};

type DobStep = {
  kind: "dob";
  key: string;
  section: string;
  banner: string;
  stepLabel: string;
  title: string;
  progress: number;
};

type AcctEmailStep = {
  kind: "acct-email";
  key: string;
  section: string;
  banner: string;
  stepLabel: string;
  title: string;
  progress: number;
};

type PlanStep = {
  kind: "plan";
  key: string;
  progress: number;
};

type VideoStep = {
  kind: "video";
  key: string;
  title: string;
  subtitle?: string;
  videoId: string;
  paddingPct: number; // e.g. 152.04 for 9:16-ish
  cta: string;
  progress: number;
};

type Step =
  | SingleStep
  | MultiStep
  | InfoStep
  | InputStep
  | LoadingStep
  | CompareStep
  | HeightStep
  | WeightStep
  | GraphStep
  | DobStep
  | AcctEmailStep
  | PlanStep
  | VideoStep;







const STEPS: Step[] = [
  {
    kind: "single",
    key: "age",
    title: "Transforma tu cuerpo con un plan de entrenamiento militar",
    subtitle: "Elige tu rango de edad",
    progress: 0,
    options: [
      { value: "18-29", label: "Edad: 18-29" },
      { value: "30-39", label: "Edad: 30-39" },
      { value: "40-49", label: "Edad: 40-49" },
      { value: "50+", label: "Edad: 50+" },
    ],
  },
  {
    kind: "single",
    key: "bodytype",
    title: "Elige tu tipo de cuerpo",
    progress: 1,
    options: [
      { value: "mince", label: "Delgado" },
      { value: "moyen", label: "Promedio" },
      { value: "gros", label: "Con panza" },
      { value: "lourd", label: "Pesado" },
    ],
  },
  {
    kind: "single",
    key: "goal",
    title: "¿Cuál es tu objetivo principal?",
    progress: 2,
    options: [
      { value: "perdre", label: "Bajar de peso" },
      { value: "muscle", label: "Ganar músculo" },
      { value: "forme", label: "Mantenerme en forma" },
      { value: "force", label: "Aumentar mi fuerza" },
    ],
  },
  {
    kind: "single",
    key: "target",
    title: "¿Qué cuerpo quieres lograr?",
    progress: 3,
    options: [
      { value: "fit", label: "Fit" },
      { value: "fort", label: "Fuerte" },
      { value: "athletique", label: "Atlético" },
    ],
  },
  {
    kind: "multi",
    key: "problems",
    title: "¿Cuáles son tus desafíos?",
    subtitle: "Selecciona todo lo que aplique",
    progress: 4,
    options: [
      { value: "ventre", label: "Panza" },
      { value: "poitrine", label: "Pecho" },
      { value: "bras", label: "Brazos" },
      { value: "jambes", label: "Piernas" },
      { value: "dos", label: "Espalda" },
      { value: "aucun", label: "Ninguno" },
    ],
  },
  {
    kind: "single",
    key: "military",
    title: "¿Conoces el entrenamiento militar?",
    progress: 5,
    options: [
      { value: "oui", label: "Sí, muy bien" },
      { value: "peu", label: "He oído hablar" },
      { value: "non", label: "No, para nada" },
    ],
  },
  {
    kind: "info",
    key: "attention",
    title: "Más de 7.000 hombres ya desbloquearon el físico de sus sueños",
    body: "Esta es la prueba viva: el Protocolo Militar transformó a miles de hombres comunes en versiones más fuertes, magras y disciplinadas de sí mismos. Sin gimnasio, sin excusas — solo el método probado que las fuerzas de élite usan hace décadas. El próximo eres tú.",
    cta: "Quiero mi transformación",
    image: transformationFeedback.url,
    progress: 6,
  },

  {
    kind: "single",
    key: "best-shape",
    title: "¿Cuándo estuviste en tu mejor forma?",
    progress: 7,
    options: [
      { value: "1y", label: "Hace menos de un año" },
      { value: "1-3y", label: "Hace 1 a 3 años" },
      { value: "3y+", label: "Hace más de 3 años" },
      { value: "never", label: "Nunca" },
    ],
  },
  {
    kind: "multi",
    key: "blockers",
    title: "¿Qué te impidió lograr el cuerpo de tus sueños en los últimos años?",
    subtitle: "Selecciona todo lo que aplique",
    progress: 8,
    options: [
      { value: "trabajo", label: "Presión en el trabajo" },
      { value: "familia", label: "Una vida familiar agitada" },
      { value: "metabolismo", label: "Metabolismo lento por la edad" },
      { value: "dinero", label: "Problemas económicos" },
      { value: "estres", label: "Otros eventos estresantes" },
      { value: "lesion", label: "Lesión o enfermedad" },
      { value: "ninguno", label: "Ninguno" },
    ],
  },
  {
    kind: "single",
    key: "pushups",
    title: "¿Cuántas flexiones puedes hacer en una ronda?",
    progress: 9,
    options: [
      { value: "<10", label: "Menos de 10 💪" },
      { value: "10-20", label: "10 - 20 💪💪" },
      { value: "21-30", label: "21 - 30 💪💪💪" },
      { value: "30+", label: "Más de 30 😤" },
    ],
  },
  {
    kind: "single",
    key: "pullups",
    title: "¿Cuántas dominadas puedes hacer en una ronda?",
    progress: 10,
    options: [
      { value: "0", label: "No puedo hacer ninguna dominada" },
      { value: "<5", label: "Menos de 5 🔥" },
      { value: "5-10", label: "5 - 10 🔥🔥" },
      { value: "10+", label: "Más de 10 🔥🔥🔥" },
    ],
  },
  {
    kind: "single",
    key: "fitness-level",
    title: "¿Cuál es tu nivel de condición física?",
    progress: 11,
    options: [
      {
        value: "novato",
        label: "Novato",
        hint: "Puedo caminar como ejercicio cardio, pero correr se me hace difícil.",
      },
      {
        value: "intermedio",
        label: "Intermedio",
        hint: "Intento hacer ejercicio una vez por semana, pero todavía no es regular.",
      },
      {
        value: "confirmado",
        label: "Confirmado",
        hint: "Claro que sí. Estoy en muy buena forma, pero quiero subir un nivel.",
      },
    ],
  },
  {
    kind: "multi",
    key: "injuries",
    title: "¿Tienes alguna lesión?",
    subtitle:
      "Ajustaremos el plan para proteger esas partes del cuerpo de daños adicionales.",
    progress: 12,
    options: [
      { value: "articulaciones", label: "Articulaciones" },
      { value: "rodillas", label: "Rodillas" },
      { value: "cervical", label: "Cervical" },
      { value: "lumbar", label: "Lumbar" },
      { value: "ninguna", label: "Ninguna" },
      { value: "prefiero-no-decir", label: "Prefiero no comentar" },
    ],
  },
  {
    kind: "compare",
    key: "real-strength",
    title: "La verdadera fuerza: más allá de la estética.",
    progress: 13,
    left: {
      title: "Entrenamiento en el gym",
      emoji: "🏋",
      items: ["Estética", "Máquinas", "Tamaño muscular"],
    },
    right: {
      title: "Entrenamiento militar",
      emoji: "🚀",
      items: ["Funcionalidad", "Peso corporal", "Fuerza muscular"],
    },
    body: "El entrenamiento militar prioriza la fuerza práctica y real. Nuestro programa se basa en ejercicios intensos y compuestos, diseñados para crear un cuerpo poderoso y funcional — no solo cierta apariencia.",
    cta: "Continuar",
  },
  {
    kind: "single",
    key: "training-frequency",
    title: "¿Con qué frecuencia estás dispuesto a entrenar?",
    progress: 14,
    options: [
      { value: "1-2", label: "1 a 2 veces por semana 💪" },
      { value: "3-4", label: "De 3 a 4 veces por semana 💪⚡️" },
      { value: "casi-diario", label: "Casi todos los días 🏆" },
      { value: "no-seguro", label: "Todavía no estoy seguro" },
    ],
  },
  {
    kind: "single",
    key: "workout-time",
    title: "¿Cuánto tiempo estás dispuesto a dedicar a un entrenamiento?",
    progress: 15,
    options: [
      { value: "5-10", label: "5 a 10 minutos por día" },
      { value: "15", label: "Hasta 15 minutos", badge: "Recomendado 👍" },
      { value: "20+", label: "Más de 20 minutos por día" },
      { value: "auto", label: "Deja que MadMuscles decida" },
    ],
  },
  {
    kind: "single",
    key: "best-time",
    title: "¿Cuál es el mejor momento para iniciar un programa de entrenamiento?",
    progress: 16,
    options: [
      { value: "cualquiera", label: "Sin preferencia particular" },
      { value: "manana", label: "Mañana / Antes del trabajo" },
      { value: "tarde", label: "Por la tarde" },
      { value: "noche", label: "Por la noche" },
    ],
  },


  {
    kind: "single",
    key: "water",
    title: "¿Cuánta agua bebes al día?",
    progress: 17,
    options: [
      { value: "coffee", label: "Solo un café o un té ☕️" },
      { value: "<2", label: "Menos de 2 vasos 💧", hint: "hasta 0,5 l / 17 oz" },
      { value: "2-6", label: "2 a 6 vasos 💧💧", hint: "0,5-1,5 l / 17-50 oz" },
      { value: "7-10", label: "7 a 10 vasos 💧💧💧", hint: "1,5-2,5 l / 50-85 oz" },
      { value: "10+", label: "Más de 10 vasos 🐳", hint: "más de 2,5 l / 85 oz" },
    ],
  },
  {
    kind: "single",
    key: "daily-life",
    title: "¿Cómo describirías un día típico tuyo?",
    progress: 18,
    options: [
      { value: "sitting", label: "Paso la mayor parte del día sentado" },
      { value: "traveling", label: "Viajo de vez en cuando" },
      { value: "standing", label: "Paso todo el día de pie" },
    ],
  },
  {
    kind: "single",
    key: "energy",
    title: "¿Cuál es tu nivel medio de energía a lo largo del día?",
    progress: 19,
    options: [
      { value: "exhausted", label: "Me siento agotado la mayor parte del tiempo 😓" },
      { value: "varies", label: "Mi nivel de energía varía a lo largo del día 📊" },
      { value: "energetic", label: "Suelo estar muy enérgico y activo 💥" },
    ],
  },
  {
    kind: "single",
    key: "sleep",
    title: "¿Cuántas horas sueles dormir?",
    progress: 20,
    options: [
      { value: "<5", label: "Menos de 5 horas 🙄" },
      { value: "5-6", label: "5-6 horas 🥱" },
      { value: "7-8", label: "7-8 horas 🌜" },
      { value: "8+", label: "Más de 8 horas 😴" },
    ],
  },
  {
    kind: "graph",
    key: "sleep-analysis",
    title: "Tu diagnóstico",
    score: 72,
    highlight: "Sueño",
    bars: [
      { label: "Sueño", value: 28 },
      { label: "Energía", value: 55 },
      { label: "Metabolismo", value: 68 },
    ],
    body: "Dormir bien es esencial para tu salud física. Una buena noche de sueño mejora el metabolismo, controla el apetito y aporta más energía.",
    callout: "Los estudios muestran que hacer al menos 30 minutos de ejercicio moderado puede mejorar la calidad del sueño esa misma noche.",
    cta: "Continuar",
    progress: 21,
  },
  {
    kind: "video",
    key: "feedback-video",
    title: "Escucha esta prueba antes de continuar",
    subtitle: "Un testimonio real de quien ya siguió el protocolo. Toca para activar el sonido.",
    videoId: "1207588540",
    paddingPct: 152.04,
    cta: "Continuar",
    progress: 22,
  },
  {
    kind: "single",
    key: "needs-structure",
    title: "¿En qué medida te reconoces en esta afirmación?",
    subtitle: "Necesito estructura o guía durante las sesiones de entrenamiento para mantenerme motivado.",
    progress: 23,
    options: [
      { value: "disagree", label: "En desacuerdo" },
      { value: "neutral", label: "Neutral" },
      { value: "agree", label: "De acuerdo" },
    ],
  },
  {
    kind: "single",
    key: "experience",
    title: "¿Cuál es tu nivel de experiencia?",
    progress: 24,
    options: [
      { value: "debutant", label: "Principiante" },
      { value: "intermediaire", label: "Intermedio" },
      { value: "avance", label: "Avanzado" },
    ],
  },
  {
    kind: "height",
    key: "height",
    title: "¿Cuánto mides?",
    progress: 25,
  },

  {
    kind: "weight",
    key: "weight",
    title: "¿Cuál es tu peso actual?",
    mode: "current",
    progress: 26,
  },
  {
    kind: "weight",
    key: "target-weight",
    title: "¿Cuál es tu peso objetivo?",
    mode: "target",
    progress: 27,
  },

  {
    kind: "info",
    key: "motivation",
    title: "Objetivo realista y alcanzable",
    body: "Según tus respuestas, tu meta es totalmente alcanzable con nuestro plan militar personalizado.",
    cta: "Continuar",
    progress: 27,
  },
  {
    kind: "video",
    key: "andre-testimonial",
    title: "André, 26 años — resultados con los entrenamientos ocultos de los militares",
    subtitle: "Otro caso real. Toca para activar el sonido.",
    videoId: "1207949697",
    paddingPct: 75,
    cta: "Continuar",
    progress: 27,
  },
  {
    kind: "single",
    key: "event-date",
    title: "¿Cuándo quieres lograr tu objetivo?",
    progress: 28,
    options: [
      { value: "1m", label: "En 1 mes" },
      { value: "3m", label: "En 3 meses" },
      { value: "6m", label: "En 6 meses" },
      { value: "flex", label: "Sin fecha fija" },
    ],
  },
  {
    kind: "single",
    key: "motivation-level",
    title: "¿Qué tan motivado estás?",
    progress: 29,
    options: [
      { value: "extreme", label: "Extremadamente motivado" },
      { value: "high", label: "Muy motivado" },
      { value: "medium", label: "Medianamente motivado" },
    ],
  },
  {
    kind: "info",
    key: "commitment",
    title: "¿Estás listo para comprometerte?",
    body: "El protocolo militar exige disciplina. Necesitamos tu compromiso antes de generar tu plan personalizado.",
    cta: "¡Sí! Me comprometo a cumplir el protocolo",
    progress: 30,
  },
  {
    kind: "loading",
    key: "analyzing",
    title: "Calculando tus respuestas...",
    subtitle: "Estamos armando tu plan militar personalizado.",
    phrases: [
      "🎯 Ajustando tu nivel de intensidad",
      "🏋️ Seleccionando ejercicios óptimos",
      "🔥 Calibrando cardio y fuerza",
      "🧠 Adaptando a tu estilo de vida",
      "🚀 Casi listo...",
    ],
    progress: 31,
  },

  {
    kind: "acct-email",
    key: "acct-email",
    section: "Vamos criar sua conta Protocolo Calistenia Militar",
    banner: "¡Tu plan de entrenamiento militar está listo!",
    stepLabel: "1/1",
    title: "Email",
    progress: 32,
  },
  {
    kind: "plan",
    key: "plan",
    progress: 33,
  },

];


function Quiz() {
  const [vslDone, setVslDone] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [showSales, setShowSales] = useState(false);

  if (!vslDone) {
    return <VSLView onContinue={(name) => { setLeadName(name); setVslDone(true); }} />;
  }

  if (!started) {
    return <IntroView initialName={leadName} onStart={(age, name) => { setAnswers({ age, name }); setIndex(1); setStarted(true); }} />;
  }





  const step = STEPS[index];
  const rawPct = (step?.progress ?? TOTAL) / TOTAL;
  // Ease-out: avança rápido no início e desacelera no fim
  const pct = Math.round(Math.pow(rawPct, 0.45) * 100);

  const next = () => {
    if (index + 1 >= STEPS.length) setDone(true);
    else setIndex(index + 1);
  };

  const back = () => setIndex(Math.max(0, index - 1));

  const pick = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setTimeout(next, 150);
  };

  const toggle = (key: string, value: string) => {
    setAnswers((a) => {
      const cur = (a[key] as string[]) ?? [];
      return {
        ...a,
        [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value],
      };
    });
  };

  if (done) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="mil-stencil text-xs text-accent font-bold">
            ★ Misión Completada
          </div>
          <h1 className="text-3xl font-bold mil-stencil text-accent">
            ¡Bien hecho{answers.name ? `, ${answers.name}` : ", soldado"}!
          </h1>
          <p className="text-muted-foreground">
            Tu plan militar personalizado ya está listo.
          </p>
          <pre className="text-left text-xs bg-card border border-border p-4 rounded-md overflow-auto">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  if (showSales) {
    return <SalesView answers={answers} onFinish={() => setDone(true)} onBack={() => setShowSales(false)} />;
  }

  if (step.kind === "plan") {
    return <PlanView answers={answers} onFinish={() => setShowSales(true)} />;
  }

  if (step.kind === "loading") {
    return <RecruitmentLoadingView step={step} onDone={next} />;
  }



  return (
    <main className="min-h-screen bg-background text-foreground">
      {index > 0 && (
        <button
          onClick={back}
          aria-label="Volver"
          className="fixed top-1/2 left-2 -translate-y-1/2 z-50 h-10 w-10 rounded-full bg-primary/80 hover:bg-primary text-primary-foreground border-2 border-accent flex items-center justify-center shadow-lg"
        >
          ←
        </button>
      )}
      <button
        onClick={next}
        aria-label="Siguiente"
        className="fixed top-1/2 right-2 -translate-y-1/2 z-50 h-10 w-10 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground border-2 border-primary flex items-center justify-center shadow-lg"
      >
        →
      </button>


      <div className="bg-primary/20 border-b border-primary/40">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-center">
          <img src={logoMilitary.url} alt="Protocolo Calistenia Militar" className="h-20 object-contain" />
        </div>
      </div>

      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          {index > 0 && (
            <button
              onClick={back}
              className="text-sm text-muted-foreground hover:text-accent"
              aria-label="Volver"
            >
              ←
            </button>
          )}
          <div className="flex-1">
            <Progress value={pct} className="bg-secondary" />
          </div>
        </div>
      </header>

      <section className="max-w-md mx-auto px-4 py-3 sm:py-6 space-y-3 sm:space-y-4">
        <div className="space-y-1.5">
          <h1 className="text-lg sm:text-2xl font-bold leading-tight mil-stencil">
            {step.title}
          </h1>
          {"subtitle" in step && step.subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground">{step.subtitle}</p>
          )}
          {step.kind === "info" && (
            <p className="text-xs sm:text-sm text-muted-foreground">{step.body}</p>
          )}
        </div>


        {step.kind === "single" && (
          <div className="space-y-2">
            {step.options.map((o) => (
              <button
                key={o.value}
                onClick={() => pick(step.key, o.value)}
                className="group relative w-full text-left rounded-md border-2 border-border bg-card px-3 py-2.5 sm:py-3 flex items-center justify-between hover:border-accent hover:bg-primary/20 transition-colors"
              >
                {o.badge && (
                  <span className="absolute -top-2 right-3 mil-stencil text-[10px] font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded">
                    {o.badge}
                  </span>
                )}
                <span className="flex-1">
                  <span className="block font-semibold text-sm sm:text-base">{o.label}</span>
                  {o.hint && (
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {o.hint}
                    </span>
                  )}
                </span>
                <span className="text-accent opacity-60 group-hover:opacity-100 ml-3">
                  ▸
                </span>
              </button>
            ))}
          </div>
        )}


        {step.kind === "multi" && (
          <>
            <div className={step.key === "injuries" ? "flex gap-3 items-start" : ""}>
              <div className="space-y-1.5 flex-1 min-w-0">
                {step.options.map((o) => {
                  const selected =
                    ((answers[step.key] as string[]) ?? []).includes(o.value);
                  return (
                    <button
                      key={o.value}
                      onClick={() => toggle(step.key, o.value)}
                      className={`w-full text-left rounded-md border-2 px-3 py-1.5 sm:py-2 flex items-center justify-between transition-colors ${
                        selected
                          ? "border-accent bg-primary/25 text-foreground"
                          : "border-border bg-card hover:border-accent"
                      }`}
                    >
                      <span className="font-semibold text-xs sm:text-sm">{o.label}</span>
                      <span
                        className={`text-accent ${selected ? "" : "opacity-40"}`}
                      >
                        {selected ? "✓" : "▢"}
                      </span>
                    </button>

                  );
                })}
              </div>
              {step.key === "injuries" && (
                <img
                  src={injuriesBody.url}
                  alt="Zonas de lesión"
                  className="w-28 sm:w-36 shrink-0 object-contain self-center drop-shadow-xl"
                  loading="lazy"
                />
              )}
            </div>

            <Button
              className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
              disabled={!((answers[step.key] as string[]) ?? []).length}
              onClick={next}
            >
              Continuar
            </Button>
          </>
        )}

        {step.kind === "info" && (
          <>
            {step.image && (
              <img
                src={step.image}
                alt=""
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full h-56 sm:h-72 rounded-md border-2 border-border object-cover"
              />
            )}
            {step.key === "motivation" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <img
                    src={testimonial1.url}
                    alt="Transformación real"
                    loading="lazy"
                    className="w-full h-40 sm:h-56 rounded-md border-2 border-accent object-cover"
                  />
                  <img
                    src={testimonial2.url}
                    alt="Transformación real"
                    loading="lazy"
                    className="w-full h-40 sm:h-56 rounded-md border-2 border-accent object-cover"
                  />
                </div>
                <div className="rounded-md border-2 border-border bg-card/60 p-3 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-accent text-lg">
                    ★★★★★
                    <span className="text-foreground text-sm font-bold ml-1">4.9/5</span>
                  </div>
                  <p className="mil-stencil text-xs sm:text-sm font-bold text-foreground">
                    +1.000 HOMBRES CAMBIARON DE VIDA EN LOS ÚLTIMOS MESES
                  </p>
                </div>
              </div>
            )}
            <Button
              className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
              onClick={next}
            >
              {step.cta}
            </Button>
          </>
        )}


        {step.kind === "compare" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              {[step.left, step.right].map((col, i) => (
                <div
                  key={i}
                  className={`rounded-md border-2 p-4 space-y-3 ${
                    i === 0
                      ? "border-border bg-card/60"
                      : "border-accent bg-primary/20"
                  }`}
                >
                  <div className="text-3xl">{col.emoji}</div>
                  <div className="mil-stencil text-sm font-bold">
                    {col.title}
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {col.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="text-accent">▸</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-xs leading-snug">
              {step.body}
            </p>

            <figure className="space-y-1 rounded-md border-2 border-accent/60 bg-primary/10 p-1.5">
              <img
                src={militaryTransformation.url}
                alt="Transformación real con el protocolo militar"
                className="w-full h-40 sm:h-56 rounded-sm object-cover"
                loading="lazy"
              />
              <figcaption className="mil-stencil text-[9px] leading-tight text-foreground/90">
                El entrenamiento militar forja un cuerpo funcional y poderoso.
              </figcaption>
            </figure>

            <Button
              className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
              onClick={next}
            >
              {step.cta}
            </Button>
          </>
        )}




        {step.kind === "input" && (
          <InputStepView step={step} value={(answers[step.key] as string) ?? ""}
            onChange={(v) => setAnswers((a) => ({ ...a, [step.key]: v }))}
            onNext={next} />
        )}

        {step.kind === "height" && (
          <HeightStepView
            value={(answers[step.key] as string) ?? ""}
            onChange={(v) => setAnswers((a) => ({ ...a, [step.key]: v }))}
            onNext={next}
          />
        )}

        {step.kind === "weight" && (
          <WeightStepView
            mode={step.mode}
            value={(answers[step.key] as string) ?? ""}
            reference={(answers["weight"] as string) ?? ""}
            onChange={(v) => setAnswers((a) => ({ ...a, [step.key]: v }))}
            onNext={next}
          />
        )}

        {step.kind === "graph" && <GraphStepView step={step} onNext={next} />}

        {step.kind === "dob" && (
          <DobStepView
            step={step}
            value={(answers[step.key] as string) ?? ""}
            onChange={(v) => setAnswers((a) => ({ ...a, [step.key]: v }))}
            onNext={next}
          />
        )}

        {step.kind === "acct-email" && (
          <AcctEmailStepView
            step={step}
            value={(answers[step.key] as string) ?? ""}
            onChange={(v) => setAnswers((a) => ({ ...a, [step.key]: v }))}
            onNext={next}
          />
        )}

        {step.kind === "video" && (
          <VideoStepView step={step} onNext={next} />
        )}

        {/* loading step is handled by early return above */}



      </section>
    </main>
  );
}

function InputStepView({
  step,
  value,
  onChange,
  onNext,
}: {
  step: InputStep;
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  const valid =
    step.inputType === "email"
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      : step.inputType === "number"
        ? Number(value) > 0
        : value.trim().length > 0;

  return (
    <>
      <div className="relative">
        <Input
          type={step.inputType}
          value={value}
          placeholder={step.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 text-lg"
          onKeyDown={(e) => {
            if (e.key === "Enter" && valid) onNext();
          }}
        />
        {step.suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            {step.suffix}
          </span>
        )}
      </div>
      <Button
        className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
        size="lg"
        disabled={!valid}
        onClick={onNext}
      >
        Continuar
      </Button>
    </>
  );
}

function HeightStepView({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  const MIN = 140;
  const MAX = 210;
  const current = Math.min(MAX, Math.max(MIN, Number(value) || 174));

  useEffect(() => {
    if (!value) onChange("174");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const cm = Math.round(MIN + pct * (MAX - MIN));
    onChange(String(cm));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  const pct = ((current - MIN) / (MAX - MIN)) * 100;
  const ticks = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);

  return (
    <>
      <div className="text-center py-4">
        <div className="inline-flex items-baseline gap-2">
          <span
            className="mil-stencil font-black text-white leading-none"
            style={{ fontSize: "5rem", textShadow: "0 0 30px rgba(74,222,128,0.35)" }}
          >
            {current}
          </span>
          <span className="mil-stencil text-accent text-2xl font-bold italic">CM</span>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative h-24 rounded-xl bg-card border-2 border-border overflow-hidden touch-none select-none cursor-grab active:cursor-grabbing"
      >
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-1">
          {ticks.map((t) => {
            const isMajor = t % 10 === 0;
            const isMid = t % 5 === 0;
            return (
              <div
                key={t}
                className="flex-1 flex flex-col items-center justify-center"
                style={{ height: 60 }}
              >
                <div
                  className="bg-muted-foreground/60"
                  style={{
                    width: 2,
                    height: isMajor ? 34 : isMid ? 22 : 12,
                    opacity: isMajor ? 0.9 : isMid ? 0.6 : 0.35,
                  }}
                />
                {isMajor && (
                  <span className="mt-1 text-[10px] text-muted-foreground">{t}</span>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute top-0 bottom-0"
          style={{ left: `calc(${pct}% - 1px)` }}
        >
          <div className="absolute inset-y-0 w-0.5 bg-accent shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "8px solid hsl(var(--accent))" }}
          />
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "8px solid hsl(var(--accent))" }}
          />
        </div>
      </div>

      <p className="text-center mil-stencil text-[11px] tracking-widest text-muted-foreground">
        ARRASTE PARA AJUSTAR
      </p>

      <Button
        className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_30px_rgba(74,222,128,0.4)]"
        size="lg"
        onClick={onNext}
      >
        Continuar →
      </Button>
    </>
  );
}


function WeightStepView({
  mode,
  value,
  reference,
  onChange,
  onNext,
}: {
  mode: "current" | "target";
  value: string;
  reference: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const suffix = unit === "kg" ? "kg" : "lb";
  const num = Number(value);
  const valid = num > 0;

  // Body silhouette scaling based on weight vs "average" 75kg / 165lb
  const baseline = unit === "kg" ? 75 : 165;
  const shown = valid ? num : baseline;
  const ratio = Math.max(0.7, Math.min(1.5, shown / baseline));
  const buff = mode === "target"; // versão musculosa (ombros largos, cintura seca)
  const torsoW = (buff ? 70 : 54) * (buff ? Math.pow(ratio, 0.85) : ratio);
  const bellyW = (buff ? 46 : 60) * Math.pow(ratio, buff ? 1.1 : 1.7);
  const hipW = (buff ? 58 : 56) * Math.pow(ratio, 1.2);
  const armW = (buff ? 22 : 14) * Math.pow(ratio, 0.9);
  const thighW = (buff ? 28 : 22) * Math.pow(ratio, 1.1);

  const label = mode === "current" ? "Peso actual" : "Peso objetivo";
  const placeholder = mode === "current"
    ? (unit === "kg" ? "75" : "165")
    : (unit === "kg" ? "70" : "154");

  // military palette
  const skin = "#c9a27a";
  const uniform = "#4b5320"; // olive drab
  const uniformDark = "#3a4118";
  const vest = "#2f3617";
  const boot = "#1c1c14";
  const helmet = "#3d4a1e";
  const accent = "hsl(var(--accent))";

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {(["lb", "kg"] as const).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`mil-stencil text-sm py-2 rounded-md border-2 transition-colors ${
              unit === u
                ? "border-accent bg-primary/20 text-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            {u === "lb" ? "Libras" : "kg"}
          </button>
        ))}
      </div>

      <div className="flex justify-center py-2">
        <svg viewBox="0 0 180 260" width="150" height="220" className="drop-shadow-lg">
          <defs>
            <linearGradient id="uniGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={uniform} />
              <stop offset="100%" stopColor={uniformDark} />
            </linearGradient>
            <pattern id="camo" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill={uniform} />
              <circle cx="5" cy="6" r="4" fill={uniformDark} opacity="0.7" />
              <circle cx="15" cy="14" r="5" fill="#5b6a24" opacity="0.6" />
              <circle cx="12" cy="4" r="2" fill="#2a2f10" opacity="0.7" />
            </pattern>
          </defs>

          {/* helmet back strap shadow */}
          <ellipse cx="90" cy="34" rx="20" ry="6" fill="#000" opacity="0.25" />
          {/* head */}
          <ellipse cx="90" cy="34" rx="13" ry="15" fill={skin} />
          {/* jaw shadow */}
          <path d="M78 38 Q90 48 102 38 L102 42 Q90 52 78 42 Z" fill="#a8845e" />
          {/* helmet */}
          <path d="M74 28 Q90 10 106 28 L108 34 Q90 30 72 34 Z" fill={helmet} />
          <rect x="72" y="32" width="36" height="4" rx="2" fill={uniformDark} />
          {/* helmet star */}
          <polygon points="90,18 92,24 98,24 93,28 95,34 90,30 85,34 87,28 82,24 88,24" fill={accent} />

          {/* neck */}
          <rect x="84" y="46" width="12" height="8" fill={skin} />

          {/* torso - camo shirt */}
          <path
            d={`M ${90 - torsoW / 2} 54
                Q 90 58 ${90 + torsoW / 2} 54
                L ${90 + bellyW / 2} 130
                Q 90 148 ${90 - bellyW / 2} 130 Z`}
            fill="url(#camo)"
            stroke={uniformDark}
            strokeWidth="1.5"
            style={{ transition: "d 0.3s ease" }}
          />

          {/* tactical vest */}
          <path
            d={`M ${90 - torsoW / 2 + 4} 58
                L ${90 + torsoW / 2 - 4} 58
                L ${90 + bellyW / 2 - 6} 118
                L ${90 - bellyW / 2 + 6} 118 Z`}
            fill={vest}
            opacity="0.85"
            style={{ transition: "d 0.3s ease" }}
          />
          {/* vest pouches */}
          <rect x={90 - 18} y="78" width="14" height="14" rx="2" fill={uniformDark} />
          <rect x={90 + 4} y="78" width="14" height="14" rx="2" fill={uniformDark} />
          {/* dog tag */}
          <line x1="86" y1="54" x2="90" y2="72" stroke="#c0c0c0" strokeWidth="0.8" />
          <line x1="94" y1="54" x2="90" y2="72" stroke="#c0c0c0" strokeWidth="0.8" />
          <rect x="87" y="72" width="6" height="8" rx="1" fill="#d4d4aa" />

          {/* hips - belt */}
          <path
            d={`M ${90 - bellyW / 2} 128
                L ${90 + bellyW / 2} 128
                L ${90 + hipW / 2} 148
                L ${90 - hipW / 2} 148 Z`}
            fill="url(#uniGrad)"
          />
          <rect x={90 - hipW / 2} y="130" width={hipW} height="6" fill={boot} />
          <rect x="87" y="130" width="6" height="6" fill={accent} />

          {/* arms */}
          <rect x={90 - torsoW / 2 - armW} y="56" width={armW} height="56" rx={armW / 2} fill="url(#camo)" />
          <rect x={90 + torsoW / 2} y="56" width={armW} height="56" rx={armW / 2} fill="url(#camo)" />
          {/* forearms / gloves */}
          <rect x={90 - torsoW / 2 - armW} y="108" width={armW} height="20" rx={armW / 2} fill={skin} />
          <rect x={90 + torsoW / 2} y="108" width={armW} height="20" rx={armW / 2} fill={skin} />
          {buff && (
            <>
              {/* pecs */}
              <path d={`M ${90 - torsoW / 2 + 6} 66 Q 90 78 ${90 + torsoW / 2 - 6} 66 L 90 88 Z`} fill="#000" opacity="0.25" />
              {/* biceps highlight */}
              <ellipse cx={90 - torsoW / 2 - armW / 2} cy="76" rx={armW / 2} ry="12" fill="#000" opacity="0.2" />
              <ellipse cx={90 + torsoW / 2 + armW / 2} cy="76" rx={armW / 2} ry="12" fill="#000" opacity="0.2" />
            </>
          )}

          {/* cargo pants legs */}
          <rect x={90 - hipW / 2 + 2} y="148" width={thighW} height="70" rx="4" fill="url(#uniGrad)" />
          <rect x={90 + hipW / 2 - thighW - 2} y="148" width={thighW} height="70" rx="4" fill="url(#uniGrad)" />
          {/* knee patches */}
          <rect x={90 - hipW / 2 + 4} y="182" width={thighW - 4} height="8" fill={uniformDark} opacity="0.8" />
          <rect x={90 + hipW / 2 - thighW} y="182" width={thighW - 4} height="8" fill={uniformDark} opacity="0.8" />

          {/* boots */}
          <rect x={90 - hipW / 2} y="216" width={thighW + 4} height="14" rx="3" fill={boot} />
          <rect x={90 + hipW / 2 - thighW - 4} y="216" width={thighW + 4} height="14" rx="3" fill={boot} />
          <rect x={90 - hipW / 2} y="226" width={thighW + 4} height="4" fill="#000" />
          <rect x={90 + hipW / 2 - thighW - 4} y="226" width={thighW + 4} height="4" fill="#000" />
        </svg>
      </div>


      <div>
        <label className="mil-stencil text-xs text-muted-foreground">
          {label} ({suffix})
        </label>
        <div className="relative mt-1">
          <Input
            type="number"
            inputMode="numeric"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 text-lg"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            {suffix}
          </span>
        </div>
        {mode === "target" && reference && (
          <p className="mt-2 text-xs text-muted-foreground">
            Peso actual: {reference} {suffix}
          </p>
        )}
      </div>

      <Button
        className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
        size="lg"
        disabled={!valid}
        onClick={onNext}
      >
        Continuar
      </Button>
    </>
  );
}

function parseDob(dateStr: string): Date | null {
  const m = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const d = +m[1], mo = +m[2], y = +m[3];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCDate() !== d || dt.getUTCMonth() !== mo - 1) return null;
  const now = new Date();
  const age = (now.getTime() - dt.getTime()) / (365.25 * 24 * 3600 * 1000);
  if (age < 13 || age > 100) return null;
  return dt;
}

function formatDobInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  const p1 = digits.slice(0, 2);
  const p2 = digits.slice(2, 4);
  const p3 = digits.slice(4, 8);
  return [p1, p2, p3].filter(Boolean).join("/");
}

function DobStepView({
  step,
  value,
  onChange,
  onNext,
}: {
  step: DobStep;
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  const [touched, setTouched] = useState(false);
  const valid = parseDob(value) !== null;
  const showError = touched && value.length === 10 && !valid;

  return (
    <>
      <div className="rounded-md border-2 border-accent bg-primary/10 p-4 space-y-1">
        <div className="mil-stencil text-xs text-accent font-bold">
          ★ {step.banner}
        </div>
        <div className="text-sm text-foreground">{step.section}</div>
        <div className="mil-stencil text-[10px] text-muted-foreground">
          Paso {step.stepLabel}
        </div>
      </div>

      <div>
        <Input
          inputMode="numeric"
          value={value}
          placeholder="DD/MM/AAAA"
          onChange={(e) => {
            onChange(formatDobInput(e.target.value));
            setTouched(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && valid) onNext();
          }}
          className={`h-12 text-lg ${showError ? "border-destructive" : ""}`}
        />
        {showError && (
          <p className="mt-2 text-xs text-destructive">
            Ingresa una fecha de nacimiento válida.
          </p>
        )}
      </div>

      <Button
        className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
        size="lg"
        disabled={!valid}
        onClick={onNext}
      >
        Continuar
      </Button>
    </>
  );
}

function AcctEmailStepView({
  step,
  value,
  onChange,
  onNext,
}: {
  step: AcctEmailStep;
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  const [touched, setTouched] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const showError = touched && !valid;

  return (
    <>
      <div className="rounded-md border-2 border-accent bg-primary/10 p-4 space-y-1">
        <div className="mil-stencil text-xs text-accent font-bold">
          ★ {step.banner}
        </div>
        <div className="text-sm text-foreground">{step.section}</div>
        <div className="mil-stencil text-[10px] text-muted-foreground">
          Paso {step.stepLabel}
        </div>
      </div>

      <div>
        <label className="mil-stencil text-xs text-muted-foreground">
          Email
        </label>
        <Input
          type="email"
          inputMode="email"
          value={value}
          placeholder="nombre@ejemplo.com"
          onChange={(e) => {
            onChange(e.target.value);
            setTouched(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && valid) onNext();
          }}
          className={`h-12 text-lg mt-1 ${showError ? "border-destructive" : ""}`}
        />
        {showError && (
          <p className="mt-2 text-xs text-destructive">
            Ingresa tu dirección de email.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Respetamos tu privacidad y nos tomamos muy en serio tu protección — sin
        spam.
      </p>

      <Button
        className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
        size="lg"
        disabled={!valid}
        onClick={onNext}
      >
        Continuar
      </Button>
    </>
  );
}





function GraphStepView({
  step,
  onNext,
}: {
  step: GraphStep;
  onNext: () => void;
}) {
  const [score, setScore] = useState(0);
  const [barValues, setBarValues] = useState<number[]>(step.bars.map(() => 0));
  const radius = 70;
  const circ = 2 * Math.PI * radius;
  const targetOffset = circ - (score / 100) * circ;

  useEffect(() => {
    const t1 = setTimeout(() => setScore(step.score), 60);
    const t2 = setTimeout(
      () => setBarValues(step.bars.map((b) => b.value)),
      200,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [step]);

  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = 100;
  const rInner = 72;

  const total = step.bars.reduce((s, b) => s + b.value, 0) || 1;
  const gapDeg = 4;
  const totalGap = gapDeg * step.bars.length;
  const availDeg = 360 - totalGap;

  const polar = (angleDeg: number, r: number) => {
    const a = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const arcPath = (startDeg: number, endDeg: number) => {
    const [x1, y1] = polar(startDeg, rOuter);
    const [x2, y2] = polar(endDeg, rOuter);
    const [x3, y3] = polar(endDeg, rInner);
    const [x4, y4] = polar(startDeg, rInner);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${large} 0 ${x4} ${y4} Z`;
  };

  let cursor = 0;
  const segments = step.bars.map((b, i) => {
    const share = b.value / total;
    const sweep = availDeg * share;
    const start = cursor;
    const end = cursor + sweep;
    cursor = end + gapDeg;
    const isHi = b.label === step.highlight;
    const animated = (barValues[i] / (b.value || 1)) * sweep;
    return {
      label: b.label,
      value: b.value,
      isHi,
      full: arcPath(start, end),
      anim: arcPath(start, start + Math.max(0.001, animated)),
    };
  });

  return (
    <>
      <div className="rounded-md border-2 border-border bg-card p-3 space-y-3">
        <div className="flex flex-col items-center gap-3">
          <div className="relative shrink-0">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <defs>
                <radialGradient id="dg-center" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                  <stop offset="70%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="dg-hi" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <linearGradient id="dg-lo" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a3e635" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <filter id="dg-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle cx={cx} cy={cy} r={rInner - 4} fill="url(#dg-center)" />

              {segments.map((s, i) => (
                <g key={i}>
                  <path d={s.full} fill="hsl(var(--border))" opacity="0.25" />
                  <path
                    d={s.anim}
                    fill={s.isHi ? "url(#dg-hi)" : "url(#dg-lo)"}
                    filter={s.isHi ? "url(#dg-glow)" : undefined}
                    style={{ transition: "d 900ms ease-out" }}
                  />
                </g>
              ))}

              {[...Array(60)].map((_, i) => {
                const a = (i * 6 - 90) * (Math.PI / 180);
                const r1 = rInner - 10;
                const r2 = rInner - (i % 5 === 0 ? 16 : 13);
                return (
                  <line
                    key={i}
                    x1={cx + r1 * Math.cos(a)}
                    y1={cy + r1 * Math.sin(a)}
                    x2={cx + r2 * Math.cos(a)}
                    y2={cy + r2 * Math.sin(a)}
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={i % 5 === 0 ? 0.5 : 0.2}
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div
                className="mil-stencil text-4xl font-bold text-destructive"
                style={{ textShadow: "0 0 24px rgba(239,68,68,0.55)" }}
              >
                {score}%
              </div>
              <div className="mil-stencil text-[10px] tracking-[0.3em] text-muted-foreground mt-1">
                RIESGO
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-2">
            {step.bars.map((b, i) => {
              const isHi = b.label === step.highlight;
              return (
                <div
                  key={b.label}
                  className={
                    "rounded-md border p-2 text-center " +
                    (isHi
                      ? "border-destructive/60 bg-destructive/10"
                      : "border-border bg-background/40")
                  }
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{
                        background: isHi ? "#ef4444" : "#22c55e",
                        boxShadow: isHi
                          ? "0 0 8px rgba(239,68,68,0.8)"
                          : "0 0 8px rgba(34,197,94,0.6)",
                      }}
                    />
                    <span
                      className={
                        "mil-stencil text-[10px] " +
                        (isHi ? "text-destructive font-bold" : "text-muted-foreground")
                      }
                    >
                      {b.label}
                    </span>
                  </div>
                  <div
                    className={
                      "mil-stencil text-lg font-bold mt-1 " +
                      (isHi ? "text-destructive" : "text-foreground")
                    }
                  >
                    {barValues[i]}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-1">
          <div className="mil-stencil text-xs font-bold text-destructive">
            {step.highlight}
          </div>
          <p className="text-xs text-muted-foreground leading-snug">
            {step.body}
          </p>
        </div>

        <div className="rounded-md border-l-4 border-accent bg-primary/10 p-2">
          <div className="mil-stencil text-[11px] font-bold text-accent mb-0.5">
            ¡Mejora la calidad de tu sueño!
          </div>
          <p className="text-[11px] text-muted-foreground leading-snug">
            {step.callout}
          </p>
        </div>

      </div>


      <Button
        className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
        size="lg"
        onClick={onNext}
      >
        {step.cta}
      </Button>
    </>
  );
}




function RecruitmentLoadingView({
  step,
  onDone,
}: {
  step: LoadingStep;
  onDone: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const duration = 5200;

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(onDone, 500);
      }
    }, 60);
    return () => clearInterval(id);
  }, [onDone]);

  const rawPhrases = step.phrases && step.phrases.length >= 4
    ? step.phrases
    : [
        "Analizando perfil táctico",
        "Generando protocolo militar",
        "Preparando tu misión de 21 días",
        "Finalizando tu reclutamiento",
      ];
  const cleanPhrase = (s: string) => s.replace(/^[^\p{L}\p{N}]+/u, "").trim();

  // Divide 4 fases sobre 100%
  const stages = rawPhrases.slice(0, 4).map((label, i) => ({
    label: cleanPhrase(label).toUpperCase(),
    start: i * 25,
    end: (i + 1) * 25,
  }));

  const currentIdx = stages.findIndex(
    (s) => progress >= s.start && progress < s.end,
  );
  const activeIdx = currentIdx === -1 ? stages.length - 1 : currentIdx;

  const icons = ["◈", "◉", "▣", "◆"];

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
      {/* fundo com grade sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-accent/30 bg-card/70 backdrop-blur-sm p-6 sm:p-8 shadow-[0_0_60px_-15px_rgba(74,222,128,0.25)]">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="mil-stencil text-[10px] font-bold tracking-widest text-accent">
              PROTOCOLO · 2026
            </span>
          </div>
        </div>

        {/* Título */}
        <h1 className="mil-stencil text-2xl sm:text-3xl font-bold text-center tracking-wide">
          PROCESANDO RECLUTAMIENTO
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Verificando compatibilidad operativa...
        </p>

        {/* Barra de status */}
        <div className="mt-6">
          <div className="flex items-center justify-between mil-stencil text-[10px] tracking-widest text-muted-foreground">
            <span>ESTADO: ANALIZANDO</span>
            <span className="text-accent tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent/70 to-accent transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(74,222,128,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Etapas */}
        <ul className="mt-6 space-y-2.5">
          {stages.map((s, i) => {
            const done = progress >= s.end;
            const active = i === activeIdx && !done;
            const pending = !done && !active;
            return (
              <li
                key={s.label}
                className={`rounded-xl border px-4 py-3 flex items-center gap-3 transition-all ${
                  active
                    ? "border-accent/70 bg-accent/10 shadow-[0_0_18px_-8px_rgba(74,222,128,0.7)]"
                    : done
                      ? "border-accent/40 bg-accent/5"
                      : "border-border/60 bg-card/40 opacity-60"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-md border text-sm ${
                    done
                      ? "border-accent/60 bg-accent/20 text-accent"
                      : active
                        ? "border-accent bg-accent/15 text-accent animate-pulse"
                        : "border-border/60 text-muted-foreground"
                  }`}
                  aria-hidden
                >
                  {done ? "✓" : icons[i]}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className={`mil-stencil text-[12px] sm:text-sm font-bold tracking-wide ${
                      pending ? "text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {s.label}
                  </div>
                  {active && (
                    <div className="mt-0.5 text-[10px] text-accent/80 font-mono animate-pulse">
                      &gt; Ejecutando secuencia<span className="tracking-[0.3em]">...</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Rodapé */}
        <div className="mt-6 pt-4 border-t border-border/60 text-center mil-stencil text-[10px] tracking-widest text-muted-foreground">
          SISTEMA SEGURO <span className="text-accent/70">//</span> ACCESO LIMITADO
        </div>
      </div>
    </main>
  );
}


function PlanView({
  answers,
  onFinish,
}: {
  answers: Answers;
  onFinish: () => void;
}) {
  const name = (answers["name"] as string) || "Soldado";
  const currentKg = Number(answers["weight"]) || 82;
  const targetKg = Number(answers["target-weight"]) || 72;
  const heightCm = Number(answers["height"]) || 178;
  const bmi = currentKg / Math.pow(heightCm / 100, 2);
  const bmiTargetPos = Math.min(
    100,
    Math.max(0, ((bmi - 15) / (35 - 15)) * 100),
  );

  const goals = [
    "Reducir el estrés",
    "Sentirte más saludable",
    "Autodisciplina",
    "Formar un hábito físico",
    "Mejorar el sueño",
  ];

  const bmiZones = [
    { label: "Bajo peso", color: "bg-accent/40", w: 25 },
    { label: "Normal", color: "bg-accent", w: 25 },
    { label: "Sobrepeso", color: "bg-destructive/60", w: 25 },
    { label: "Obeso", color: "bg-destructive", w: 25 },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <button
        onClick={onFinish}
        aria-label="Continuar a la oferta"
        className="fixed top-3 right-3 z-50 h-10 w-10 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground border-2 border-primary flex items-center justify-center shadow-lg animate-pulse"
      >
        →
      </button>
      <div className="bg-primary/20 border-b border-primary/40">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
          <img src={logoMilitary.url} alt="Protocolo Calistenia Militar" className="h-12 object-contain" />
          <div className="flex items-center gap-3 text-[10px] mil-stencil text-muted-foreground">
            <span>Ayuda</span>
            <span>ES</span>
          </div>
        </div>
      </div>


      <section className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Headline + VSL */}
        <Reveal>
          <div className="space-y-3">
            <div className="text-center space-y-1">
              <h1 className="mil-stencil text-xl font-bold text-accent leading-tight">
                Seu protocolo personalizado está pronto
              </h1>
              <p className="text-xs text-muted-foreground">
                Assista ao vídeo antes de utilizá-lo
              </p>
            </div>
            <SalesVSL />
          </div>
        </Reveal>

        {/* Weight projection chart */}
        <Reveal delay={60}>
          <div>
            <div className="mil-stencil text-xs text-accent font-bold mb-2">
              Tu objetivo, {name}
            </div>
            <WeightProjectionChart currentKg={currentKg} targetKg={targetKg} />
          </div>
        </Reveal>


        {/* Recommended */}
        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: "🍔", label: "Calorías diarias", value: "2 400", scale: "1000-5000 kcal" },
              { emoji: "💧", label: "Agua diaria", value: "3,1 L", scale: "recomendado" },
            ].map((c) => (
              <div
                key={c.label}
                className="relative rounded-md border-2 border-border bg-card p-3 space-y-1 overflow-hidden"
              >
                <div className="text-2xl">{c.emoji}</div>
                <div className="mil-stencil text-[10px] text-accent">
                  RECOMENDADO
                </div>
                <div className="mil-stencil text-[11px] text-muted-foreground">
                  {c.label}
                </div>
                <div className="mil-stencil text-lg font-bold blur-md select-none">{c.value}</div>
                <div className="text-[10px] text-muted-foreground blur-sm select-none">{c.scale}</div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-background/70 border-2 border-accent rounded-full h-10 w-10 flex items-center justify-center text-accent text-lg">
                    🔒
                  </div>
                </div>
              </div>

            ))}
          </div>
        </Reveal>

        {/* What you get */}
        <Reveal delay={80}>
          <div className="space-y-3">
            <h2 className="mil-stencil text-lg font-bold">¿Qué recibirás?</h2>
            <div className="rounded-md border-2 border-accent bg-card p-3">
              <div className="mil-stencil text-sm font-bold text-accent">
                Acceso a la App "Protocolo Militar"
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Todo personalizado según tu situación y las respuestas del quiz.
              </div>
            </div>
            {[
              "Videoclases exclusivas",
              "Protocolo de entrenamiento completo",
              "Plataforma estilo Netflix",
              "3 bonos gratuitos",
            ].map((t) => (
              <div
                key={t}
                className="flex items-center gap-2 rounded-md border-2 border-border bg-card p-3"
              >
                <span className="text-accent text-lg">✅</span>
                <span className="mil-stencil text-sm font-bold">{t}</span>
              </div>
            ))}
            <img
              src={programPreview}
              alt="Vista previa del programa"
              width={1024}
              height={768}
              loading="lazy"
              className="w-full rounded-md border-2 border-border"
            />
          </div>
        </Reveal>


        {/* Bonus */}
        <Reveal delay={80}>
          <div className="rounded-md border-2 border-accent bg-primary/10 p-3 space-y-2">
            <div className="mil-stencil text-xs text-accent font-bold">
              🎁 BONUS IMPRIMIBLE
            </div>
            <div className="mil-stencil text-sm font-bold">
              Mapa imprimible para 2026
            </div>
            <img
              src={calendar2026}
              alt="Calendario 2026"
              width={1024}
              height={768}
              loading="lazy"
              className="w-full rounded-md border border-border"
            />
          </div>
        </Reveal>

        {/* Goals */}
        <Reveal delay={80}>
          <div className="space-y-2">
            <h3 className="mil-stencil text-sm font-bold">
              Los objetivos de tu programa también son:
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {goals.map((g, i) => (
                <Reveal key={g} delay={i * 60}>
                  <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm">
                    <span className="text-accent">▸</span> {g}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Social proof */}
        <Reveal delay={80}>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border-2 border-border bg-card p-3 text-center">
              <div className="mil-stencil text-xl font-bold text-accent">
                4M+
              </div>
              <div className="text-[10px] text-muted-foreground leading-tight">
                comenzaron su journey fitness con nosotros
              </div>
            </div>
            <div className="rounded-md border-2 border-border bg-card p-3 text-center">
              <div className="mil-stencil text-xl font-bold text-accent">
                4,4 / 5
              </div>
              <div className="text-[10px] text-muted-foreground leading-tight">
                +200 000 reseñas 5★ (App Store & Play, jun 2026)
              </div>
            </div>
          </div>
        </Reveal>

        {/* Complete plan */}
        <Reveal delay={80}>
          <div className="rounded-md border-2 border-border bg-card p-4 space-y-2">
            <h3 className="mil-stencil text-sm font-bold">
              Plan de entrenamiento completo
            </h3>
            {[
              "Desarrolla el hábito y las técnicas correctas de ejercicio.",
              "Elimina el exceso de grasa y mejora la intensidad de tus entrenamientos.",
              "Alcanza tu objetivo y cambia tu vida para siempre.",
            ].map((l) => (
              <div key={l} className="flex gap-2 text-sm">
                <span className="text-accent">☑️</span>
                <span className="text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Button
            className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
            size="lg"
            onClick={onFinish}
          >
            Obtener mi plan
          </Button>
        </Reveal>
      </section>
    </main>
  );
}



function BuyerNotifications() {
  const buyers = [
    "Carlos M.", "Miguel Á.", "Diego R.", "Andrés P.", "Sebastián L.",
    "Rodrigo V.", "Mateo G.", "Javier O.", "Luis Fernando", "Emiliano C.",
    "Santiago H.", "Alejandro T.", "Iván S.", "Bruno N.", "Cristian D.",
    "Nicolás F.", "Julián A.", "Rafael E.", "Gabriel Q.", "Tomás B.",
  ];
  const cities = ["CDMX", "Bogotá", "Lima", "Buenos Aires", "Santiago", "Guadalajara", "Medellín", "Quito", "Monterrey", "Rosario"];
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mins, setMins] = useState(2);

  useEffect(() => {
    let alive = true;
    const cycle = () => {
      if (!alive) return;
      setI((v) => (v + 1) % buyers.length);
      setMins(1 + Math.floor(Math.random() * 8));
      setVisible(true);
      setTimeout(() => alive && setVisible(false), 5000);
    };
    const first = setTimeout(cycle, 1500);
    const iv = setInterval(cycle, 9000);
    return () => { alive = false; clearTimeout(first); clearInterval(iv); };
  }, []);

  const buyer = buyers[i];
  const city = cities[i % cities.length];

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-[280px] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 rounded-lg border border-accent/40 bg-card/95 backdrop-blur shadow-lg shadow-black/40 p-3">
        <div className="h-9 w-9 shrink-0 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent">
          ✓
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs text-foreground">
            <span className="font-bold">{buyer}</span>{" "}
            <span className="text-muted-foreground">de {city}</span>
          </div>
          <div className="text-[11px] text-muted-foreground truncate">
            Acaba de reclamar su protocolo
          </div>
          <div className="mil-stencil text-[10px] text-accent mt-0.5">
            hace {mins}m
          </div>
        </div>
      </div>
    </div>
  );
}

function SalesVSL() {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: Player } = await import("@vimeo/player");
      if (cancelled || !iframeRef.current) return;
      playerRef.current = new Player(iframeRef.current);
      try {
        await playerRef.current.ready();
        await playerRef.current.setLoop(true);
        await playerRef.current.play();
        playerRef.current.on("ended", async () => {
          try { await playerRef.current.setCurrentTime(0); await playerRef.current.play(); } catch {}
        });
        playerRef.current.on("play", () => setPlaying(true));
        playerRef.current.on("pause", () => setPlaying(false));
      } catch {}
    })();
    return () => { cancelled = true; try { playerRef.current?.destroy(); } catch {} };
  }, []);

  const unmute = async () => {
    setMuted(false);
    try {
      const p = playerRef.current;
      if (!p) return;
      await p.setMuted(false);
      await p.setVolume(1);
      await p.play();
    } catch (e) { console.error(e); }
  };

  const toggle = async () => {
    try {
      const p = playerRef.current;
      if (!p) return;
      if (playing) { await p.pause(); } else { await p.play(); }
    } catch {}
  };

  return (
    <div className="rounded-xl overflow-hidden border-2 border-accent/40 shadow-lg shadow-accent/10">
      <div style={{ padding: "76.49% 0 0 0", position: "relative" }}>
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1208611953?badge=0&autopause=0&autoplay=1&muted=1&playsinline=1&title=0&byline=0&portrait=0&controls=0&loop=1"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          title="Oferta Especial Militar"
        />
        {muted ? (
          <button
            type="button"
            onClick={unmute}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 text-white cursor-pointer"
            style={{ position: "absolute", inset: 0 }}
          >
            <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-2xl">🔊</div>
            <div className="mil-stencil font-bold text-sm sm:text-base">TOCA PARA ACTIVAR EL SONIDO</div>
          </button>
        ) : (
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pausar" : "Reproducir"}
            className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center text-lg"
          >
            {playing ? "⏸" : "▶"}
          </button>
        )}
      </div>
    </div>
  );
}

function SalesView({
  answers,
  onFinish,
  onBack,
}: {
  answers: Answers;
  onFinish: () => void;
  onBack: () => void;
}) {
  const name = (answers.name as string) || "soldado";
  const [seconds, setSeconds] = useState(10 * 60);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BuyerNotifications />
      <button
        onClick={onBack}
        aria-label="Volver"
        className="fixed top-3 left-3 z-50 h-10 w-10 rounded-full bg-primary/80 hover:bg-primary text-primary-foreground border-2 border-accent flex items-center justify-center shadow-lg"
      >
        ←
      </button>
      <div className="bg-primary/20 border-b border-primary/40">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-center">
          <img src={logoMilitary.url} alt="Protocolo Calistenia Militar" className="h-12 object-contain" />
        </div>
      </div>


      <section className="max-w-md mx-auto px-4 py-6 space-y-6">


        <Reveal>
          <div className="text-center space-y-2">
            <div className="text-5xl">🎉</div>
            <h1 className="text-2xl font-bold mil-stencil text-accent">
              ¡Felicidades!
            </h1>
            <p className="text-sm text-muted-foreground">
              Has ganado el mayor descuento adicional
            </p>
            <p className="text-base font-semibold mt-3">
              {name}, obtén tu plan de entrenamiento militar
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="text-center space-y-1 pt-2">
            <div className="text-xs text-muted-foreground">Hemos ayudado a más de</div>
            <div className="text-3xl font-bold mil-stencil text-accent">
              55.000 personas
            </div>
            <div className="text-xs text-muted-foreground">
              a esculpir el cuerpo de sus sueños
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-center">
            <div className="mil-stencil text-xs text-accent font-bold mb-1">
              ⏳ El descuento expira en
            </div>
            <div className="text-3xl font-bold text-accent tabular-nums">
              {mm}:{ss}
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-xl border-2 border-accent bg-accent/10 p-5 text-center space-y-3">
            <div className="mil-stencil text-[10px] bg-accent text-accent-foreground inline-block px-2 py-0.5 rounded font-bold">
              OFERTA ÚNICA
            </div>
            <div className="mil-stencil font-bold text-lg">
              PROTOCOLO CALISTENIA MILITAR
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-sm text-muted-foreground line-through">
                $47
              </span>
              <span className="text-5xl font-extrabold text-accent mil-stencil">
                $7
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Pago único · Acceso vitalicio
            </div>
            <ul className="text-left text-sm space-y-2 pt-2">
              <li className="flex gap-2"><span className="text-accent">✓</span> Plan de entrenamiento militar personalizado</li>
              <li className="flex gap-2"><span className="text-accent">✓</span> Sesiones de 15 a 30 minutos por día</li>
              <li className="flex gap-2"><span className="text-accent">✓</span> Bonus: mapa imprimible para 2026</li>
              <li className="flex gap-2"><span className="text-accent">✓</span> Soporte y actualizaciones</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Button
            className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
            size="lg"
            onClick={onFinish}
          >
            QUIERO MI PLAN POR $7
          </Button>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-lg border-2 border-accent/60 bg-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🛡️</div>
              <div className="mil-stencil font-bold text-sm text-accent">
                GARANTÍA DE 7 DÍAS
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Si en 7 días no estás 100% satisfecho con tu Protocolo Calistenia
              Militar, te devolvemos cada centavo. Sin preguntas, sin trámites.
              Todo el riesgo es nuestro.
            </p>
            <div className="text-[10px] mil-stencil text-accent">
              REEMBOLSO GARANTIZADO · COMPRA 100% SEGURA
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[10px] text-muted-foreground leading-relaxed text-center">
            Pago único de $7. Sin renovaciones automáticas. Consulta nuestros
            términos y política de reembolso.
          </p>
        </Reveal>
      </section>
    </main>
  );
}

function VideoStepView({ step, onNext }: { step: VideoStep; onNext: () => void }) {
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: Player } = await import("@vimeo/player");
      if (cancelled || !iframeRef.current) return;
      playerRef.current = new Player(iframeRef.current);
      try {
        await playerRef.current.ready();
        await playerRef.current.play();
      } catch {}
    })();
    return () => { cancelled = true; try { playerRef.current?.destroy(); } catch {} };
  }, []);

  const unmute = async () => {
    setMuted(false);
    try {
      const p = playerRef.current;
      if (!p) return;
      await p.setMuted(false);
      await p.setVolume(1);
      await p.setCurrentTime(0);
      await p.play();
      setPaused(false);
    } catch (e) { console.error(e); }
  };

  const togglePause = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const p = playerRef.current;
    if (!p) return;
    try {
      if (paused) { await p.play(); setPaused(false); }
      else { await p.pause(); setPaused(true); }
    } catch {}
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl overflow-hidden border-2 border-accent/40 shadow-lg shadow-accent/10 bg-black">
        <div className="relative w-full aspect-video max-h-[80vh]">
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${step.videoId}?badge=0&autopause=0&autoplay=1&muted=1&playsinline=1&title=0&byline=0&portrait=0&controls=0&loop=0`}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            title="Testimonio"
          />

          {muted ? (
            <button
              type="button"
              onClick={unmute}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 text-white cursor-pointer"
              style={{ position: "absolute", inset: 0 }}
            >
              <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-2xl">🔊</div>
              <div className="mil-stencil font-bold text-sm sm:text-base">TU VÍDEO YA COMENZÓ</div>
              <div className="text-xs sm:text-sm opacity-90">Toca para activar el sonido</div>
            </button>
          ) : (
            <button
              type="button"
              onClick={togglePause}
              aria-label={paused ? "Reproducir" : "Pausar"}
              className="absolute bottom-3 right-3 h-11 w-11 rounded-full bg-black/70 hover:bg-black/85 text-white flex items-center justify-center text-lg backdrop-blur"
            >
              {paused ? "▶" : "❚❚"}
            </button>
          )}
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
        size="lg"
      >
        {step.cta}
      </Button>
    </div>
  );
}

import soldierIntro from "@/assets/soldier-intro.png.asset.json";

function VSLView({ onContinue }: { onContinue: (name: string) => void }) {
  const [name, setName] = useState("");
  const [muted, setMuted] = useState(true);
  const trimmed = name.trim();
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: Player } = await import("@vimeo/player");
      if (cancelled || !iframeRef.current) return;
      playerRef.current = new Player(iframeRef.current);
      try { await playerRef.current.ready(); await playerRef.current.setLoop(true); await playerRef.current.play(); } catch {}
    })();
    return () => { cancelled = true; try { playerRef.current?.destroy(); } catch {} };
  }, []);

  const unmute = async () => {
    setMuted(false);
    try {
      const p = playerRef.current;
      if (!p) return;
      await p.setMuted(false);
      await p.setVolume(1);
      await p.setCurrentTime(0);
      await p.play();
    } catch (e) { console.error(e); }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-primary/20 border-b border-primary/40">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-center">
          <img src={logoMilitary.url} alt="Protocolo Calistenia Militar" className="h-20 object-contain" />
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 pt-6 pb-10 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold mil-stencil text-accent leading-tight">
            ASSISTA ANTES DE COMEÇAR
          </h1>
          <p className="text-sm text-muted-foreground">
            Veja este vídeo rápido e depois responda para liberar seu protocolo.
          </p>
        </div>

        <div className="rounded-xl overflow-hidden border-2 border-accent/40 shadow-lg shadow-accent/10">
          <div style={{ padding: "76.49% 0 0 0", position: "relative" }}>
            <iframe
              ref={iframeRef}
              id="vsl-iframe"
              src="https://player.vimeo.com/video/1207588194?badge=0&autopause=0&autoplay=1&muted=1&playsinline=1&title=0&byline=0&portrait=0&controls=0&loop=1"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              title="Protocolo Calistenia Militar"
            />

            {muted && (
              <button
                type="button"
                onClick={unmute}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 text-white cursor-pointer"
                style={{ position: "absolute", inset: 0 }}
              >
                <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-2xl">🔊</div>
                <div className="mil-stencil font-bold text-sm sm:text-base">SEU VÍDEO JÁ COMEÇOU</div>
                <div className="text-xs sm:text-sm opacity-90">Clique para ativar o som</div>
              </button>
            )}
          </div>
        </div>




        <div className="space-y-3 max-w-sm mx-auto">
          <label className="mil-stencil text-[11px] font-bold text-accent tracking-widest block text-center">
            COMO PODEMOS TE CHAMAR?
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="text-center"
          />
          <Button
            disabled={!trimmed}
            onClick={() => onContinue(trimmed)}
            className="w-full mil-stencil font-bold py-6 disabled:opacity-50"
          >
            CONTINUAR ›
          </Button>
          {!trimmed && (
            <p className="text-[11px] text-muted-foreground text-center">
              Digite seu nome para continuar
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

function IntroView({ onStart, initialName = "" }: { onStart: (age: string, name: string) => void; initialName?: string }) {
  const ages = ["18-29", "30-39", "40-49", "50+"];


  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-primary/20 border-b border-primary/40">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-center">
          <img src={logoMilitary.url} alt="Protocolo Calistenia Militar" className="h-20 object-contain" />
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 pt-6 pb-10 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold mil-stencil text-accent leading-tight">
            Défi d'entraînement militaire avancé
          </h1>
          <p className="text-sm text-muted-foreground">
            Séances d'entraînement de 15 minutes. Sans salle de sport. Sans équipement.
          </p>
        </div>

        <div className="space-y-2 max-w-sm mx-auto">
          <div className="text-center mil-stencil text-[10px] font-bold text-accent tracking-widest">
            SÉLECTIONNEZ VOTRE ÂGE
          </div>
          {ages.map((a) => (
            <Button
              key={a}
              variant="outline"
              onClick={() => onStart(a, initialName)}
              className="w-full mil-stencil justify-between border-2 border-border hover:border-accent hover:bg-accent/10 px-4 py-6"
            >
              <span className="font-bold">{a}</span>
              <span className="text-accent">›</span>
            </Button>
          ))}
        </div>


      </section>
    </main>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function WeightProjectionChart({
  currentKg,
  targetKg,
}: {
  currentKg: number;
  targetKg: number;
}) {
  const weeks = 12;
  const isLoss = targetKg <= currentKg;
  const points = Array.from({ length: weeks + 1 }, (_, i) => {
    const t = i / weeks;
    const eased = 1 - Math.pow(1 - t, 2.2);
    const kg = currentKg + (targetKg - currentKg) * eased;
    return { i, kg };
  });

  const W = 320;
  const H = 200;
  const padL = 36;
  const padR = 16;
  const padT = 22;
  const padB = 28;
  const minKg = Math.min(currentKg, targetKg) - 2;
  const maxKg = Math.max(currentKg, targetKg) + 2;
  const xAt = (i: number) => padL + (i / weeks) * (W - padL - padR);
  const yAt = (kg: number) =>
    padT + (1 - (kg - minKg) / (maxKg - minKg)) * (H - padT - padB);

  const line = points
    .map((p, idx) => `${idx === 0 ? "M" : "L"} ${xAt(p.i).toFixed(1)} ${yAt(p.kg).toFixed(1)}`)
    .join(" ");
  const area =
    `M ${xAt(0)} ${H - padB} ` +
    points.map((p) => `L ${xAt(p.i).toFixed(1)} ${yAt(p.kg).toFixed(1)}`).join(" ") +
    ` L ${xAt(weeks)} ${H - padB} Z`;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => {
    const kg = minKg + ((maxKg - minKg) * i) / yTicks;
    return kg;
  });

  const diff = Math.abs(currentKg - targetKg).toFixed(1);

  // Animate line draw
  const pathRef = useRef<SVGPathElement | null>(null);
  const [len, setLen] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const RED = "#ef4444";
  const GREEN = "#22c55e";

  return (
    <div
      ref={wrapRef}
      className="rounded-xl border-2 border-accent/40 bg-card overflow-hidden shadow-lg shadow-accent/10"
    >
      <div className="grid grid-cols-3 mil-stencil text-[10px] font-bold border-b border-border">
        <div className="px-2 py-2 border-r border-border">
          <div className="text-muted-foreground">AHORA</div>
          <div className="text-sm" style={{ color: RED }}>{currentKg} kg</div>
        </div>
        <div className="px-2 py-2 border-r border-border text-center">
          <div className="text-muted-foreground">{isLoss ? "PERDERÁS" : "GANARÁS"}</div>
          <div className="text-accent text-sm">{diff} kg</div>
        </div>
        <div className="px-2 py-2 text-right">
          <div className="text-muted-foreground">OBJETIVO</div>
          <div className="text-sm" style={{ color: GREEN }}>{targetKg} kg</div>
        </div>
      </div>

      <div className="p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label="Proyección de peso"
        >
          <defs>
            <linearGradient id="wpLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={RED} />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor={GREEN} />
            </linearGradient>
            <linearGradient id="wpArea" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={RED} stopOpacity="0.55" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor={GREEN} stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="wpAreaFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <mask id="wpAreaMask">
              <rect x="0" y="0" width={W} height={H} fill="url(#wpAreaFade)" />
            </mask>
            <filter id="wpGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* grid */}
          {ticks.map((kg, i) => (
            <g key={i}>
              <line
                x1={padL}
                x2={W - padR}
                y1={yAt(kg)}
                y2={yAt(kg)}
                stroke="oklch(0.35 0.02 140)"
                strokeDasharray="2 4"
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x={padL - 6}
                y={yAt(kg) + 3}
                textAnchor="end"
                fill="oklch(0.72 0.03 120)"
                style={{ font: "600 9px ui-monospace, monospace" }}
              >
                {kg.toFixed(0)}
              </text>
            </g>
          ))}

          {/* area */}
          <g mask="url(#wpAreaMask)">
            <path
              d={area}
              fill="url(#wpArea)"
              style={{
                opacity: drawn ? 1 : 0,
                transition: "opacity 900ms ease-out 400ms",
              }}
            />
          </g>

          {/* animated line */}
          <path
            ref={pathRef}
            d={line}
            fill="none"
            stroke="url(#wpLine)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#wpGlow)"
            style={{
              strokeDasharray: len,
              strokeDashoffset: drawn ? 0 : len,
              transition: "stroke-dashoffset 1600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* markers */}
          <circle
            cx={xAt(0)}
            cy={yAt(currentKg)}
            r="6"
            fill={RED}
            stroke="#fff"
            strokeWidth="2"
            style={{
              opacity: drawn ? 1 : 0,
              transition: "opacity 400ms ease-out 200ms",
            }}
          />
          <circle
            cx={xAt(weeks)}
            cy={yAt(targetKg)}
            r="7"
            fill={GREEN}
            stroke="#fff"
            strokeWidth="2"
            filter="url(#wpGlow)"
            style={{
              opacity: drawn ? 1 : 0,
              transition: "opacity 500ms ease-out 1500ms",
            }}
          />

          {/* x labels */}
          {[0, 4, 8, 12].map((w) => (
            <text
              key={w}
              x={xAt(w)}
              y={H - 8}
              textAnchor="middle"
              fill="oklch(0.72 0.03 120)"
              style={{ font: "600 9px ui-monospace, monospace" }}
            >
              {w === 0 ? "HOY" : `S${w}`}
            </text>
          ))}
        </svg>

        <div className="mt-3 flex items-center justify-between text-[10px] mil-stencil">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: RED }} />
            <span className="text-muted-foreground">Peso actual</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: GREEN }} />
            <span className="text-muted-foreground">Peso ideal</span>
          </span>
        </div>

        <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
          Proyección estimada con el Protocolo Militar en{" "}
          <span className="text-accent font-bold">12 semanas</span>, calculada a
          partir de tus respuestas.
        </p>
      </div>
    </div>
  );
}

