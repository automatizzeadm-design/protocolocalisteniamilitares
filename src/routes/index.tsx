import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

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
  options: { value: string; label: string; hint?: string }[];
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

type Step = SingleStep | MultiStep | InfoStep | InputStep | LoadingStep;

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
    kind: "single",
    key: "sleep",
    title: "¿Cuántas horas duermes por noche?",
    progress: 8,
    options: [
      { value: "<5", label: "Menos de 5 h" },
      { value: "5-6", label: "5 a 6 h" },
      { value: "7-8", label: "7 a 8 h" },
      { value: "8+", label: "Más de 8 h" },
    ],
  },
  {
    kind: "single",
    key: "water",
    title: "¿Cuánta agua tomas al día?",
    progress: 9,
    options: [
      { value: "<0.5", label: "Menos de 0,5 L" },
      { value: "0.5-1", label: "0,5 a 1 L" },
      { value: "1-2", label: "1 a 2 L" },
      { value: "2+", label: "Más de 2 L" },
    ],
  },
  {
    kind: "single",
    key: "energy",
    title: "¿Cómo calificas tu nivel de energía?",
    progress: 10,
    options: [
      { value: "low", label: "Bajo" },
      { value: "mid", label: "Medio" },
      { value: "high", label: "Alto" },
    ],
  },
  {
    kind: "multi",
    key: "injuries",
    title: "¿Tienes lesiones o dolores?",
    subtitle: "Selecciona todo lo que aplique",
    progress: 11,
    options: [
      { value: "dos", label: "Espalda" },
      { value: "genoux", label: "Rodillas" },
      { value: "epaules", label: "Hombros" },
      { value: "poignets", label: "Muñecas" },
      { value: "aucune", label: "Ninguna" },
    ],
  },
  {
    kind: "single",
    key: "work-activity",
    title: "¿Qué tan activo eres en el trabajo?",
    progress: 12,
    options: [
      { value: "sedentaire", label: "Sedentario (oficina)" },
      { value: "actif", label: "De pie / activo" },
      { value: "physique", label: "Trabajo físico" },
    ],
  },
  {
    kind: "single",
    key: "walking",
    title: "¿Cuánto caminas cada día?",
    progress: 13,
    options: [
      { value: "<30", label: "Menos de 30 min" },
      { value: "30-60", label: "30 a 60 min" },
      { value: "60+", label: "Más de 1 hora" },
    ],
  },
  {
    kind: "single",
    key: "diet",
    title: "¿Qué tipo de alimentación llevas?",
    progress: 14,
    options: [
      { value: "classique", label: "Clásica" },
      { value: "vegetarien", label: "Vegetariana" },
      { value: "vegan", label: "Vegana" },
      { value: "keto", label: "Keto / baja en carbohidratos" },
    ],
  },
  {
    kind: "multi",
    key: "foods",
    title: "¿Qué alimentos prefieres?",
    subtitle: "Selecciona todo lo que aplique",
    progress: 15,
    options: [
      { value: "viande", label: "Carne" },
      { value: "poisson", label: "Pescado" },
      { value: "oeufs", label: "Huevos" },
      { value: "legumes", label: "Verduras" },
      { value: "fruits", label: "Frutas" },
      { value: "cereales", label: "Cereales" },
    ],
  },
  {
    kind: "multi",
    key: "habits",
    title: "¿Qué malos hábitos quieres cortar?",
    subtitle: "Selecciona todo lo que aplique",
    progress: 16,
    options: [
      { value: "sucre", label: "Demasiada azúcar" },
      { value: "grignotage", label: "Picar entre comidas" },
      { value: "alcool", label: "Alcohol" },
      { value: "fastfood", label: "Comida rápida" },
      { value: "aucune", label: "Ninguno" },
    ],
  },
  {
    kind: "multi",
    key: "equipment",
    title: "¿Qué equipo tienes a la mano?",
    progress: 17,
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
    progress: 18,
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
    progress: 19,
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
    progress: 20,
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
    progress: 21,
    options: [
      { value: "debutant", label: "Principiante" },
      { value: "intermediaire", label: "Intermedio" },
      { value: "avance", label: "Avanzado" },
    ],
  },
  {
    kind: "input",
    key: "height",
    title: "¿Cuánto mides?",
    inputType: "number",
    placeholder: "175",
    suffix: "cm",
    progress: 22,
  },
  {
    kind: "input",
    key: "weight",
    title: "¿Cuánto pesas actualmente?",
    inputType: "number",
    placeholder: "75",
    suffix: "kg",
    progress: 23,
  },
  {
    kind: "input",
    key: "target-weight",
    title: "¿Cuál es tu peso ideal?",
    inputType: "number",
    placeholder: "70",
    suffix: "kg",
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
          <h1 className="text-2xl font-bold">
            ¡Gracias{answers.name ? `, ${answers.name}` : ""}!
          </h1>
          <p className="text-muted-foreground">
            Tu plan militar personalizado ya está listo.
          </p>
          <pre className="text-left text-xs bg-muted p-4 rounded-md overflow-auto">
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
                className="group w-full text-left rounded-md border-2 border-border bg-card px-4 py-4 flex items-center justify-between hover:border-accent hover:bg-primary/20 transition-colors"
              >
                <span className="font-semibold">{o.label}</span>
                <span className="text-accent opacity-60 group-hover:opacity-100">
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
          <Button
            className="w-full mil-stencil bg-accent text-accent-foreground hover:bg-accent/90"
            size="lg"
            onClick={next}
          >
            {step.cta}
          </Button>
        )}


        {step.kind === "input" && (
          <InputStepView step={step} value={(answers[step.key] as string) ?? ""}
            onChange={(v) => setAnswers((a) => ({ ...a, [step.key]: v }))}
            onNext={next} />
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
