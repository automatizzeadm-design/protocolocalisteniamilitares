import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import homeTraining from "@/assets/home-training.jpg";
import beforeAfterAsset from "@/assets/before-after.png.asset.json";
import injuriesBody from "@/assets/injuries-body.jpg.asset.json";


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

const TOTAL = 41;

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
  | PlanStep;







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
    title: "¡Estás en el lugar correcto!",
    body: "Nuestro programa militar está diseñado para transformar tu cuerpo rápido, sin importar tu punto de partida. Vamos con todo.",
    cta: "Entendido",
    image: attentionPushup.url,
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
    kind: "info",
    key: "no-gym",
    title: "No necesitas gimnasio.",
    body: "Sin gimnasio. Sin saltos. Sin ejercicios en el suelo. Solo ejercicios con el peso del cuerpo — 15 minutos, hechos para tu sala de estar.",
    cta: "Continuar",
    image: homeTraining,
    progress: 17,
  },
  {
    kind: "multi",
    key: "equipment",
    title: "¿Qué equipo tienes a la mano?",
    progress: 18,
    options: [
      { value: "aucun", label: "Ninguno" },
      { value: "halteres", label: "Mancuernas" },
      { value: "barre", label: "Barra de dominadas" },
      { value: "elastiques", label: "Bandas elásticas" },
      { value: "salle", label: "Acceso a un gimnasio" },
    ],
  },
  {
    kind: "single",
    key: "location",
    title: "¿Dónde prefieres entrenar?",
    progress: 19,
    options: [
      { value: "maison", label: "En casa" },
      { value: "salle", label: "En el gimnasio" },
      { value: "exterieur", label: "Al aire libre" },
    ],
  },
  {
    kind: "single",
    key: "water",
    title: "¿Cuánta agua bebes al día?",
    progress: 20,
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
    progress: 21,
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
    progress: 22,
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
    progress: 23,
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
    progress: 24,
  },
  {
    kind: "single",
    key: "needs-structure",
    title: "¿En qué medida te reconoces en esta afirmación?",
    subtitle: "Necesito estructura o guía durante las sesiones de entrenamiento para mantenerme motivado.",
    progress: 25,
    options: [
      { value: "disagree", label: "En desacuerdo" },
      { value: "neutral", label: "Neutral" },
      { value: "agree", label: "De acuerdo" },
    ],
  },
  {
    kind: "dob",
    key: "dob",
    section: "Vamos a crear tu cuenta MadMuscles.",
    banner: "¡Tu plan de entrenamiento militar está listo!",
    stepLabel: "1/3",
    title: "¿Cuál es tu fecha de nacimiento?",
    progress: 26,
  },
  {
    kind: "acct-email",
    key: "acct-email",
    section: "Vamos a crear tu cuenta MadMuscles.",
    banner: "¡Tu plan de entrenamiento militar está listo!",
    stepLabel: "2/3",
    title: "Email",
    progress: 27,
  },
  {
    kind: "single",
    key: "frequency",
    title: "¿Cuántas veces a la semana quieres entrenar?",
    progress: 28,
    options: [
      { value: "2-3", label: "2 a 3 veces" },
      { value: "3-4", label: "3 a 4 veces" },
      { value: "5+", label: "5 veces o más" },
    ],
  },
  {
    kind: "single",
    key: "duration",
    title: "¿Cuánto tiempo por sesión?",
    progress: 29,
    options: [
      { value: "15", label: "15 minutos" },
      { value: "30", label: "30 minutos" },
      { value: "45", label: "45 minutos" },
      { value: "60+", label: "60 minutos o más" },
    ],
  },
  {
    kind: "single",
    key: "experience",
    title: "¿Cuál es tu nivel de experiencia?",
    progress: 30,
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
    progress: 31,
  },

  {
    kind: "weight",
    key: "weight",
    title: "¿Cuál es tu peso actual y cuál es tu peso ideal?",
    progress: 32,
  },

  {
    kind: "info",
    key: "motivation",
    title: "Objetivo realista y alcanzable",
    body: "Según tus respuestas, tu meta es totalmente alcanzable con nuestro plan militar personalizado.",
    cta: "Continuar",
    progress: 33,
  },
  {
    kind: "single",
    key: "event-date",
    title: "¿Cuándo quieres lograr tu objetivo?",
    progress: 34,
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
    progress: 35,
    options: [
      { value: "extreme", label: "Extremadamente motivado" },
      { value: "high", label: "Muy motivado" },
      { value: "medium", label: "Medianamente motivado" },
    ],
  },
  {
    kind: "input",
    key: "name",
    title: "¿Cómo te llamas?",
    subtitle: "Vamos a personalizar tu plan con tu nombre.",
    inputType: "text",
    placeholder: "Tu nombre",
    progress: 36,
  },
  {
    kind: "input",
    key: "email",
    title: "¿A dónde te enviamos tu plan personalizado?",
    subtitle: "Te mandamos tu plan por correo.",
    inputType: "email",
    placeholder: "tu@correo.com",
    progress: 37,
  },
  {
    kind: "info",
    key: "commitment",
    title: "¿Estás listo para comprometerte?",
    body: "El protocolo militar exige disciplina. Necesitamos tu compromiso antes de generar tu plan personalizado.",
    cta: "¡Sí! Me comprometo a cumplir el protocolo",
    progress: 38,
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
    progress: 39,
  },

  {
    kind: "plan",
    key: "plan",
    progress: 40,
  },

];


function Quiz() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [showSales, setShowSales] = useState(false);

  if (!started) {
    return <IntroView onPickAge={(age) => { setAnswers({ age }); setIndex(1); setStarted(true); }} />;
  }




  const step = STEPS[index];
  const pct = Math.round(((step?.progress ?? TOTAL) / TOTAL) * 100);

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
    return <SalesView answers={answers} onFinish={() => setDone(true)} />;
  }

  if (step.kind === "plan") {
    return <PlanView answers={answers} onFinish={() => setShowSales(true)} />;
  }


  return (
    <main className="min-h-screen bg-background text-foreground">

      <div className="bg-primary/20 border-b border-primary/40">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
          <span className="mil-stencil text-xs text-accent font-bold">
            ★ Military Fitness Program
          </span>
          <span className="mil-stencil text-[10px] text-muted-foreground">
            OP-641
          </span>
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
          <span className="mil-stencil text-xs text-accent tabular-nums">
            {step.progress}/{TOTAL}
          </span>
        </div>
      </header>

      <section className="max-w-md mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2">
          <div className="mil-stencil text-xs text-accent font-bold">
            Misión {String(step.progress + 1).padStart(2, "0")}
          </div>
          <h1 className="text-2xl font-bold leading-tight mil-stencil">
            {step.title}
          </h1>
          {"subtitle" in step && step.subtitle && (
            <p className="text-muted-foreground">{step.subtitle}</p>
          )}
          {step.kind === "info" && (
            <p className="text-muted-foreground">{step.body}</p>
          )}
        </div>

        {step.kind === "single" && (
          <div className="space-y-3">
            {step.options.map((o) => (
              <button
                key={o.value}
                onClick={() => pick(step.key, o.value)}
                className="group relative w-full text-left rounded-md border-2 border-border bg-card px-4 py-4 flex items-center justify-between hover:border-accent hover:bg-primary/20 transition-colors"
              >
                {o.badge && (
                  <span className="absolute -top-2 right-3 mil-stencil text-[10px] font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded">
                    {o.badge}
                  </span>
                )}
                <span className="flex-1">
                  <span className="block font-semibold">{o.label}</span>
                  {o.hint && (
                    <span className="block text-sm text-muted-foreground mt-1">
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
              <div className="space-y-2 flex-1 min-w-0">
                {step.options.map((o) => {
                  const selected =
                    ((answers[step.key] as string[]) ?? []).includes(o.value);
                  return (
                    <button
                      key={o.value}
                      onClick={() => toggle(step.key, o.value)}
                      className={`w-full text-left rounded-md border-2 px-3 py-3 flex items-center justify-between transition-colors ${
                        selected
                          ? "border-accent bg-primary/25 text-foreground"
                          : "border-border bg-card hover:border-accent"
                      }`}
                    >
                      <span className="font-semibold text-sm">{o.label}</span>
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
                className="w-full rounded-md border-2 border-border object-cover aspect-square"
              />
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
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.body}
            </p>
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
            current={(answers["weight"] as string) ?? ""}
            target={(answers["target-weight"] as string) ?? ""}
            onChangeCurrent={(v) => setAnswers((a) => ({ ...a, weight: v }))}
            onChangeTarget={(v) => setAnswers((a) => ({ ...a, "target-weight": v }))}
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


        {step.kind === "loading" && <LoadingStepView step={step} onDone={next} />}



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
  const [unit, setUnit] = useState<"cm" | "ftin">("cm");
  const [ft, setFt] = useState("");
  const [inch, setIn] = useState("");

  const cmFromFtIn = () => {
    const f = Number(ft) || 0;
    const i = Number(inch) || 0;
    return Math.round((f * 12 + i) * 2.54);
  };

  const commit = (cm: number) => {
    onChange(String(cm));
  };

  const valid =
    unit === "cm" ? Number(value) > 0 : (Number(ft) || 0) > 0;

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {(["ftin", "cm"] as const).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`mil-stencil text-sm py-2 rounded-md border-2 transition-colors ${
              unit === u
                ? "border-accent bg-primary/20 text-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            {u === "ftin" ? "pies, pulgadas" : "cm"}
          </button>
        ))}
      </div>

      {unit === "cm" ? (
        <div>
          <label className="mil-stencil text-xs text-muted-foreground">
            Estatura (cm)
          </label>
          <div className="relative mt-1">
            <Input
              type="number"
              inputMode="numeric"
              value={value}
              placeholder="175"
              onChange={(e) => onChange(e.target.value)}
              className="h-12 text-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter" && valid) onNext();
              }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              cm
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mil-stencil text-xs text-muted-foreground">
              Pies
            </label>
            <div className="relative mt-1">
              <Input
                type="number"
                inputMode="numeric"
                value={ft}
                placeholder="5"
                onChange={(e) => {
                  setFt(e.target.value);
                  commit(cmFromFtIn());
                }}
                className="h-12 text-lg"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                ft
              </span>
            </div>
          </div>
          <div>
            <label className="mil-stencil text-xs text-muted-foreground">
              Pulgadas
            </label>
            <div className="relative mt-1">
              <Input
                type="number"
                inputMode="numeric"
                value={inch}
                placeholder="9"
                onChange={(e) => {
                  setIn(e.target.value);
                  commit(cmFromFtIn());
                }}
                className="h-12 text-lg"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                in
              </span>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground leading-relaxed">
        Acepto que MadMuscles procese mis datos de salud para brindar servicios
        y mejorar mi experiencia de usuario.{" "}
        <a href="#" className="text-accent underline">
          Política de Privacidad
        </a>
        . Para retirar tu consentimiento, contáctanos en cualquier momento.
      </p>

      <Button
        className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
        size="lg"
        disabled={!valid}
        onClick={() => {
          if (unit === "ftin") commit(cmFromFtIn());
          onNext();
        }}
      >
        Continuar
      </Button>
    </>
  );
}

function WeightStepView({
  current,
  target,
  onChangeCurrent,
  onChangeTarget,
  onNext,
}: {
  current: string;
  target: string;
  onChangeCurrent: (v: string) => void;
  onChangeTarget: (v: string) => void;
  onNext: () => void;
}) {
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const suffix = unit === "kg" ? "kg" : "lb";
  const valid = Number(current) > 0 && Number(target) > 0;

  const field = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
  ) => (
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
    </div>
  );

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

      {field("Peso actual", current, onChangeCurrent, unit === "kg" ? "75" : "165")}
      {field("Peso objetivo", target, onChangeTarget, unit === "kg" ? "70" : "154")}

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

  return (
    <>
      <div className="rounded-md border-2 border-border bg-card p-5 space-y-5">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="hsl(var(--destructive))"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={targetOffset}
                transform="rotate(-90 80 80)"
                style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="mil-stencil text-3xl font-bold text-destructive">
                {score}%
              </div>
              <div className="mil-stencil text-[10px] text-muted-foreground">
                RIESGO
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {step.bars.map((b, i) => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mil-stencil">
                  <span
                    className={
                      b.label === step.highlight
                        ? "text-destructive font-bold"
                        : "text-muted-foreground"
                    }
                  >
                    {b.label}
                  </span>
                  <span
                    className={
                      b.label === step.highlight
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  >
                    {barValues[i]}%
                  </span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={
                      b.label === step.highlight
                        ? "h-full bg-destructive"
                        : "h-full bg-accent"
                    }
                    style={{
                      width: `${barValues[i]}%`,
                      transition: "width 1.2s ease-out",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="mil-stencil text-sm font-bold text-destructive">
            {step.highlight}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {step.body}
          </p>
        </div>

        <div className="rounded-md border-l-4 border-accent bg-primary/10 p-3">
          <div className="mil-stencil text-xs font-bold text-accent mb-1">
            ¡Mejora la calidad de tu sueño!
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
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




function LoadingStepView({
  step,
  onDone,
}: {
  step: LoadingStep;
  onDone: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const phrases = step.phrases ?? [];
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 4500;
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(onDone, 300);
      }
    }, 60);
    return () => clearInterval(id);
  }, [onDone]);

  useEffect(() => {
    if (phrases.length === 0) return;
    const id = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }, 900);
    return () => clearInterval(id);
  }, [phrases.length]);

  return (
    <div className="space-y-4">
      <Progress value={progress} />
      <p className="text-center text-sm text-muted-foreground tabular-nums mil-stencil">
        {Math.round(progress)}%
      </p>
      {phrases.length > 0 && (
        <div className="min-h-[3rem] flex items-center justify-center">
          <p
            key={phraseIdx}
            className="text-center text-sm text-foreground animate-fade-in"
          >
            {phrases[phraseIdx]}
          </p>
        </div>
      )}
    </div>
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
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-primary/20 border-b border-primary/40">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
          <span className="mil-stencil text-xs text-accent font-bold">
            ★ MadMuscles
          </span>
          <div className="flex items-center gap-3 text-[10px] mil-stencil text-muted-foreground">
            <span>Ayuda</span>
            <span>ES</span>
          </div>
        </div>
      </div>

      <section className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Before / After */}
        <div>
          <div className="mil-stencil text-xs text-accent font-bold mb-2">
            Tu objetivo, {name}
          </div>
          <div className="rounded-md border-2 border-border bg-card overflow-hidden">
            <div className="grid grid-cols-2 mil-stencil text-[10px] font-bold text-accent border-b border-border">
              <div className="px-2 py-1 border-r border-border">AHORA · 20-24%</div>
              <div className="px-2 py-1">OBJETIVO · 15-17%</div>
            </div>
            <img
              src={beforeAfterAsset.url}
              alt="Antes y después"
              loading="lazy"
              className="w-full object-contain bg-white"
            />
          </div>

          <p className="mt-3 text-[10px] text-muted-foreground leading-relaxed">
            *Los resultados son solo indicativos y no garantizados. Los
            resultados individuales pueden variar según dieta, ejercicio y
            metabolismo. Las imágenes son meramente motivacionales.
          </p>
        </div>

        {/* BMI */}
        <div className="rounded-md border-2 border-border bg-card p-4 space-y-3">
          <div className="mil-stencil text-xs text-accent font-bold">
            IMC actual
          </div>
          <div className="mil-stencil text-2xl font-bold">
            {bmi.toFixed(1)}
          </div>
          <div className="relative h-3 rounded-full overflow-hidden flex">
            {bmiZones.map((z) => (
              <div key={z.label} className={`${z.color} h-full`} style={{ width: `${z.w}%` }} />
            ))}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-background"
              style={{ left: `calc(${bmiTargetPos}% - 6px)` }}
            />
          </div>
          <div className="grid grid-cols-4 text-[9px] mil-stencil text-muted-foreground">
            {bmiZones.map((z) => (
              <span key={z.label}>{z.label}</span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            El índice de masa corporal (IMC) usa tu altura y peso para
            determinar si tu peso es saludable.
          </p>
        </div>

        {/* Recommended */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: "🍔", label: "Calorías diarias", value: "2 400", scale: "1000-5000 kcal" },
            { emoji: "💧", label: "Agua diaria", value: "3,1 L", scale: "recomendado" },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-md border-2 border-border bg-card p-3 space-y-1"
            >
              <div className="text-2xl">{c.emoji}</div>
              <div className="mil-stencil text-[10px] text-accent">
                RECOMENDADO
              </div>
              <div className="mil-stencil text-[11px] text-muted-foreground">
                {c.label}
              </div>
              <div className="mil-stencil text-lg font-bold">{c.value}</div>
              <div className="text-[10px] text-muted-foreground">{c.scale}</div>
            </div>
          ))}
        </div>

        {/* What you get */}
        <div className="space-y-3">
          <h2 className="mil-stencil text-lg font-bold">Qué recibes</h2>
          {[
            {
              t: "Plan de entrenamiento militar",
              d: "Personalizado para tu edad, tipo físico y nivel.",
            },
            {
              t: "Sesiones de 15 a 30 minutos por día",
              d: "Diseñadas para construir fuerza real.",
            },
            {
              t: "Paso a paso",
              d: "Un enfoque simple para lograr resultados en semanas.",
            },
          ].map((f) => (
            <div
              key={f.t}
              className="rounded-md border-2 border-border bg-card p-3"
            >
              <div className="mil-stencil text-sm font-bold">{f.t}</div>
              <div className="text-xs text-muted-foreground">{f.d}</div>
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

        {/* Bonus */}
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

        {/* Goals */}
        <div className="space-y-2">
          <h3 className="mil-stencil text-sm font-bold">
            Los objetivos de tu programa también son:
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {goals.map((g) => (
              <div
                key={g}
                className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm"
              >
                <span className="text-accent">▸</span> {g}
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
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

        {/* Complete plan */}
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

        <Button
          className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
          size="lg"
          onClick={onFinish}
        >
          Obtener mi plan
        </Button>
      </section>
    </main>
  );
}



function SalesView({
  answers,
  onFinish,
}: {
  answers: Answers;
  onFinish: () => void;
}) {
  const name = (answers.name as string) || "soldado";
  const [selected, setSelected] = useState<"1w" | "1m" | "3m">("1m");
  const [seconds, setSeconds] = useState(10 * 60);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const plans = [
    {
      id: "1w" as const,
      label: "PLAN 1 SEMANA DE PRUEBA",
      old: "R$ 29,99",
      now: "R$ 4,28",
      per: "R$ 0,61",
      badge: null,
      bonus: false,
    },
    {
      id: "1m" as const,
      label: "PLAN 1 MES",
      old: "R$ 239,99",
      now: "R$ 59,99",
      per: "R$ 2,00",
      badge: "El más popular",
      bonus: true,
    },
    {
      id: "3m" as const,
      label: "PLAN 3 MESES",
      old: "R$ 519,99",
      now: "R$ 109,99",
      per: "R$ 1,20",
      badge: null,
      bonus: true,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-primary/20 border-b border-primary/40">
        <div className="max-w-md mx-auto px-4 py-2 text-center">
          <span className="mil-stencil text-xs text-accent font-bold">
            ★ Oferta Especial Militar
          </span>
        </div>
      </div>

      <section className="max-w-md mx-auto px-4 py-6 space-y-6">
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

        <div className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-center">
          <div className="mil-stencil text-xs text-accent font-bold mb-1">
            ⏳ El descuento expira en
          </div>
          <div className="text-3xl font-bold text-accent tabular-nums">
            {mm}:{ss}
          </div>
        </div>

        <div className="space-y-3">
          {plans.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`w-full text-left rounded-lg border-2 p-4 transition ${
                  active
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card"
                }`}
              >
                {p.badge && (
                  <div className="mil-stencil text-[10px] bg-accent text-accent-foreground inline-block px-2 py-0.5 rounded mb-2 font-bold">
                    {p.badge}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mil-stencil font-bold text-sm">{p.label}</div>
                    <div className="text-xs text-muted-foreground">
                      <span className="line-through">{p.old}</span>{" "}
                      <span className="text-accent font-bold">{p.now}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{p.per}</div>
                    <div className="text-[10px] text-muted-foreground">por día</div>
                  </div>
                </div>
                {p.bonus && (
                  <div className="text-[11px] text-accent mt-2">
                    🎁 Programa imprimible 2026 incluido
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <Button
          className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
          size="lg"
          onClick={onFinish}
        >
          Continuar
        </Button>

        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Al continuar, aceptas que tu suscripción se renueve automáticamente al
          precio total al finalizar el período de introducción, a menos que la
          canceles en la configuración. Consulta nuestros términos y política de
          reembolso.
        </p>

        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <div className="mil-stencil font-bold text-sm text-accent">
            🛡️ Política de reembolso garantizado
          </div>
          <p className="text-xs text-muted-foreground">
            Creemos que nuestro plan puede funcionar para ti y verás resultados
            visibles en 4 semanas. Estamos dispuestos a reembolsar el 100%
            dentro de los 30 días posteriores a la compra si no obtienes
            resultados visibles y demuestras que seguiste el plan.
          </p>
        </div>

        <div className="text-center space-y-1 pt-4">
          <div className="text-xs text-muted-foreground">Hemos ayudado a más de</div>
          <div className="text-3xl font-bold mil-stencil text-accent">
            55.000 personas
          </div>
          <div className="text-xs text-muted-foreground">
            a esculpir el cuerpo de sus sueños
          </div>
        </div>
      </section>
    </main>
  );
}

import soldierIntro from "@/assets/soldier-intro.png.asset.json";

function IntroView({ onPickAge }: { onPickAge: (age: string) => void }) {
  const ages = ["18-29", "30-39", "40-49", "50+"];
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-primary/20 border-b border-primary/40">
        <div className="max-w-md mx-auto px-4 py-2 text-center">
          <span className="mil-stencil text-xs text-accent font-bold">
            ★ Military Fitness Program
          </span>
        </div>
      </div>

      <section className="max-w-md mx-auto px-4 pt-6 pb-10 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold mil-stencil text-accent leading-tight">
            Défi d'entraînement militaire avancé
          </h1>
          <p className="text-sm text-muted-foreground">
            Séances d'entraînement de 15 minutes. Sans salle de sport. Sans équipement.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-center mil-stencil text-xs font-bold text-accent tracking-widest">
            SÉLECTIONNEZ VOTRE ÂGE
          </div>
          {ages.map((a) => (
            <Button
              key={a}
              variant="outline"
              size="lg"
              onClick={() => onPickAge(a)}
              className="w-full mil-stencil justify-between border-2 border-border hover:border-accent hover:bg-accent/10"
            >
              <span className="font-bold">{a}</span>
              <span className="text-accent">›</span>
            </Button>
          ))}
        </div>

        <div className="flex justify-center">
          <img
            src={soldierIntro.url}
            alt="Soldado"
            className="w-full max-w-xs object-contain drop-shadow-2xl"
            loading="eager"
          />
        </div>

      </section>
    </main>
  );
}
