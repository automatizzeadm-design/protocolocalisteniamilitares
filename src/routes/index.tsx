import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  component: Quiz,
  head: () => ({
    meta: [
      { title: "Quiz Militaire — Votre plan personnalisé" },
      {
        name: "description",
        content:
          "Répondez à quelques questions pour obtenir votre plan d'entraînement militaire personnalisé.",
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

type Step = SingleStep | MultiStep | InfoStep;

const STEPS: Step[] = [
  {
    kind: "single",
    key: "age",
    title: "Améliorez votre corps avec un plan d'entraînement militaire",
    subtitle: "Choisissez votre tranche d'âge",
    progress: 0,
    options: [
      { value: "18-29", label: "Âge : 18-29" },
      { value: "30-39", label: "Âge : 30-39" },
      { value: "40-49", label: "Âge : 40-49" },
      { value: "50+", label: "Âge : 50+" },
    ],
  },
  {
    kind: "single",
    key: "bodytype",
    title: "Choisissez votre type de corps",
    progress: 1,
    options: [
      { value: "mince", label: "Mince" },
      { value: "moyen", label: "Moyen" },
      { value: "gros", label: "Gros" },
      { value: "lourd", label: "Lourd" },
    ],
  },
  {
    kind: "single",
    key: "goal",
    title: "Quel est votre objectif principal ?",
    progress: 2,
    options: [
      { value: "perdre", label: "Perdre du poids" },
      { value: "muscle", label: "Gagner du muscle" },
      { value: "forme", label: "Rester en forme" },
      { value: "force", label: "Améliorer ma force" },
    ],
  },
  {
    kind: "single",
    key: "target",
    title: "Quel corps souhaitez-vous obtenir ?",
    progress: 3,
    options: [
      { value: "fit", label: "Fit" },
      { value: "fort", label: "Fort" },
      { value: "athletique", label: "Athlétique" },
    ],
  },
  {
    kind: "multi",
    key: "problems",
    title: "Quels sont vos défis ?",
    subtitle: "Sélectionnez tout ce qui s'applique",
    progress: 4,
    options: [
      { value: "ventre", label: "Ventre" },
      { value: "poitrine", label: "Poitrine" },
      { value: "bras", label: "Bras" },
      { value: "jambes", label: "Jambes" },
      { value: "dos", label: "Dos" },
      { value: "aucun", label: "Aucun de ces éléments" },
    ],
  },
  {
    kind: "single",
    key: "military",
    title: "Connaissez-vous l'entraînement militaire ?",
    progress: 5,
    options: [
      { value: "oui", label: "Oui, très bien" },
      { value: "peu", label: "J'en ai entendu parler" },
      { value: "non", label: "Non, pas du tout" },
    ],
  },
  {
    kind: "info",
    key: "attention",
    title: "Vous êtes au bon endroit !",
    body: "Notre programme militaire est conçu pour transformer votre corps rapidement, quel que soit votre point de départ. Continuons.",
    cta: "J'ai compris",
    progress: 6,
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
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">Merci !</h1>
          <p className="text-muted-foreground">
            Vos réponses ont été enregistrées. (Suite du quiz à venir — 25 étapes restantes.)
          </p>
          <pre className="text-left text-xs bg-muted p-4 rounded-md overflow-auto">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          {index > 0 && (
            <button
              onClick={back}
              className="text-sm text-muted-foreground hover:text-foreground"
              aria-label="Retour"
            >
              ←
            </button>
          )}
          <div className="flex-1">
            <Progress value={pct} />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            {step.progress}/{TOTAL}
          </span>
        </div>
      </header>

      <section className="max-w-md mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold leading-tight">{step.title}</h1>
          {"subtitle" in step && step.subtitle && (
            <p className="text-muted-foreground">{step.subtitle}</p>
          )}
          {step.kind === "info" && <p className="text-muted-foreground">{step.body}</p>}
        </div>

        {step.kind === "single" && (
          <div className="space-y-3">
            {step.options.map((o) => (
              <button
                key={o.value}
                onClick={() => pick(step.key, o.value)}
                className="w-full text-left rounded-lg border border-border bg-card px-4 py-4 hover:border-primary hover:bg-accent transition-colors"
              >
                <span className="font-medium">{o.label}</span>
                {o.hint && (
                  <span className="block text-sm text-muted-foreground mt-1">{o.hint}</span>
                )}
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
                    className={`w-full text-left rounded-lg border px-4 py-4 transition-colors ${
                      selected
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary"
                    }`}
                  >
                    <span className="font-medium">{o.label}</span>
                  </button>
                );
              })}
            </div>
            <Button
              className="w-full"
              size="lg"
              disabled={!((answers[step.key] as string[]) ?? []).length}
              onClick={next}
            >
              Continuer
            </Button>
          </>
        )}

        {step.kind === "info" && (
          <Button className="w-full" size="lg" onClick={next}>
            {step.cta}
          </Button>
        )}
      </section>
    </main>
  );
}
