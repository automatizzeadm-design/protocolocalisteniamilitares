import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import homeTraining from "@/assets/home-training.jpg";


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

const TOTAL = 32;

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

type Step =
  | SingleStep
  | MultiStep
  | InfoStep
  | InputStep
  | LoadingStep
  | CompareStep
  | HeightStep
  | WeightStep;



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
    key: "frequency",
    title: "¿Cuántas veces a la semana quieres entrenar?",
    progress: 20,
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
    progress: 21,
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
    progress: 22,
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
    progress: 23,
  },

  {
    kind: "weight",
    key: "weight",
    title: "¿Cuál es tu peso actual y cuál es tu peso ideal?",
    progress: 24,
  },

  {
    kind: "info",
    key: "motivation",
    title: "Objetivo realista y alcanzable",
    body: "Según tus respuestas, tu meta es totalmente alcanzable con nuestro plan militar personalizado.",
    cta: "Continuar",
    progress: 25,
  },
  {
    kind: "single",
    key: "event-date",
    title: "¿Cuándo quieres lograr tu objetivo?",
    progress: 26,
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
    progress: 27,
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
    progress: 28,
  },
  {
    kind: "input",
    key: "email",
    title: "¿A dónde te enviamos tu plan personalizado?",
    subtitle: "Te mandamos tu plan por correo.",
    inputType: "email",
    placeholder: "tu@correo.com",
    progress: 29,
  },
  {
    kind: "loading",
    key: "analyzing",
    title: "Analizando tus respuestas...",
    subtitle: "Estamos armando tu plan militar personalizado.",
    progress: 30,
  },
  {
    kind: "info",
    key: "plan-ready",
    title: "¡Tu plan está listo!",
    body: "Con base en tus respuestas, armamos un plan de entrenamiento militar hecho a la medida de tu cuerpo y tus metas.",
    cta: "Ver mi plan",
    progress: 31,
  },
];


function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

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
            <div className="space-y-3">
              {step.options.map((o) => {
                const selected =
                  ((answers[step.key] as string[]) ?? []).includes(o.value);
                return (
                  <button
                    key={o.value}
                    onClick={() => toggle(step.key, o.value)}
                    className={`w-full text-left rounded-md border-2 px-4 py-4 flex items-center justify-between transition-colors ${
                      selected
                        ? "border-accent bg-primary/25 text-foreground"
                        : "border-border bg-card hover:border-accent"
                    }`}
                  >
                    <span className="font-semibold">{o.label}</span>
                    <span
                      className={`text-accent ${selected ? "" : "opacity-40"}`}
                    >
                      {selected ? "✓" : "▢"}
                    </span>
                  </button>
                );
              })}
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

        {step.kind === "loading" && <LoadingStepView onDone={next} />}


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



function LoadingStepView({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const duration = 3000;
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(onDone, 250);
      }
    }, 60);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className="space-y-3">
      <Progress value={progress} />
      <p className="text-center text-sm text-muted-foreground tabular-nums">
        {Math.round(progress)}%
      </p>
    </div>
  );
}
