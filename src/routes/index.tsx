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
  {
    kind: "single",
    key: "best-shape",
    title: "Quand étiez-vous dans votre meilleure forme ?",
    progress: 7,
    options: [
      { value: "1y", label: "Il y a moins d'un an" },
      { value: "1-3y", label: "Il y a 1 à 3 ans" },
      { value: "3y+", label: "Il y a plus de 3 ans" },
      { value: "never", label: "Jamais" },
    ],
  },
  {
    kind: "single",
    key: "sleep",
    title: "Combien d'heures dormez-vous par nuit ?",
    progress: 8,
    options: [
      { value: "<5", label: "Moins de 5 h" },
      { value: "5-6", label: "5 à 6 h" },
      { value: "7-8", label: "7 à 8 h" },
      { value: "8+", label: "Plus de 8 h" },
    ],
  },
  {
    kind: "single",
    key: "water",
    title: "Combien d'eau buvez-vous par jour ?",
    progress: 9,
    options: [
      { value: "<0.5", label: "Moins de 0,5 L" },
      { value: "0.5-1", label: "0,5 à 1 L" },
      { value: "1-2", label: "1 à 2 L" },
      { value: "2+", label: "Plus de 2 L" },
    ],
  },
  {
    kind: "single",
    key: "energy",
    title: "Comment évaluez-vous votre niveau d'énergie ?",
    progress: 10,
    options: [
      { value: "low", label: "Faible" },
      { value: "mid", label: "Moyen" },
      { value: "high", label: "Élevé" },
    ],
  },
  {
    kind: "multi",
    key: "injuries",
    title: "Avez-vous des blessures ou douleurs ?",
    subtitle: "Sélectionnez tout ce qui s'applique",
    progress: 11,
    options: [
      { value: "dos", label: "Dos" },
      { value: "genoux", label: "Genoux" },
      { value: "epaules", label: "Épaules" },
      { value: "poignets", label: "Poignets" },
      { value: "aucune", label: "Aucune" },
    ],
  },
  {
    kind: "single",
    key: "work-activity",
    title: "Quel est votre niveau d'activité au travail ?",
    progress: 12,
    options: [
      { value: "sedentaire", label: "Sédentaire (bureau)" },
      { value: "actif", label: "Debout / actif" },
      { value: "physique", label: "Travail physique" },
    ],
  },
  {
    kind: "single",
    key: "walking",
    title: "Combien marchez-vous chaque jour ?",
    progress: 13,
    options: [
      { value: "<30", label: "Moins de 30 min" },
      { value: "30-60", label: "30 à 60 min" },
      { value: "60+", label: "Plus d'1 heure" },
    ],
  },
  {
    kind: "single",
    key: "diet",
    title: "Quel type d'alimentation suivez-vous ?",
    progress: 14,
    options: [
      { value: "classique", label: "Classique" },
      { value: "vegetarien", label: "Végétarien" },
      { value: "vegan", label: "Vegan" },
      { value: "keto", label: "Keto / faible en glucides" },
    ],
  },
  {
    kind: "multi",
    key: "foods",
    title: "Quels aliments préférez-vous ?",
    subtitle: "Sélectionnez tout ce qui s'applique",
    progress: 15,
    options: [
      { value: "viande", label: "Viande" },
      { value: "poisson", label: "Poisson" },
      { value: "oeufs", label: "Œufs" },
      { value: "legumes", label: "Légumes" },
      { value: "fruits", label: "Fruits" },
      { value: "cereales", label: "Céréales" },
    ],
  },
  {
    kind: "multi",
    key: "habits",
    title: "Quelles mauvaises habitudes voulez-vous corriger ?",
    subtitle: "Sélectionnez tout ce qui s'applique",
    progress: 16,
    options: [
      { value: "sucre", label: "Trop de sucre" },
      { value: "grignotage", label: "Grignotage" },
      { value: "alcool", label: "Alcool" },
      { value: "fastfood", label: "Fast-food" },
      { value: "aucune", label: "Aucune" },
    ],
  },
  {
    kind: "multi",
    key: "equipment",
    title: "Quel équipement avez-vous à disposition ?",
    progress: 17,
    options: [
      { value: "aucun", label: "Aucun" },
      { value: "halteres", label: "Haltères" },
      { value: "barre", label: "Barre de traction" },
      { value: "elastiques", label: "Bandes élastiques" },
      { value: "salle", label: "Accès à une salle" },
    ],
  },
  {
    kind: "single",
    key: "location",
    title: "Où préférez-vous vous entraîner ?",
    progress: 18,
    options: [
      { value: "maison", label: "À la maison" },
      { value: "salle", label: "En salle" },
      { value: "exterieur", label: "En extérieur" },
    ],
  },
  {
    kind: "single",
    key: "frequency",
    title: "Combien de fois par semaine voulez-vous vous entraîner ?",
    progress: 19,
    options: [
      { value: "2-3", label: "2 à 3 fois" },
      { value: "3-4", label: "3 à 4 fois" },
      { value: "5+", label: "5 fois ou plus" },
    ],
  },
  {
    kind: "single",
    key: "duration",
    title: "Combien de temps par séance ?",
    progress: 20,
    options: [
      { value: "15", label: "15 minutes" },
      { value: "30", label: "30 minutes" },
      { value: "45", label: "45 minutes" },
      { value: "60+", label: "60 minutes ou plus" },
    ],
  },
  {
    kind: "single",
    key: "experience",
    title: "Quel est votre niveau d'expérience ?",
    progress: 21,
    options: [
      { value: "debutant", label: "Débutant" },
      { value: "intermediaire", label: "Intermédiaire" },
      { value: "avance", label: "Avancé" },
    ],
  },
  {
    kind: "input",
    key: "height",
    title: "Quelle est votre taille ?",
    inputType: "number",
    placeholder: "175",
    suffix: "cm",
    progress: 22,
  },
  {
    kind: "input",
    key: "weight",
    title: "Quel est votre poids actuel ?",
    inputType: "number",
    placeholder: "75",
    suffix: "kg",
    progress: 23,
  },
  {
    kind: "input",
    key: "target-weight",
    title: "Quel est votre poids cible ?",
    inputType: "number",
    placeholder: "70",
    suffix: "kg",
    progress: 24,
  },
  {
    kind: "info",
    key: "motivation",
    title: "Objectif réaliste et atteignable",
    body: "Selon vos réponses, votre objectif est parfaitement atteignable avec notre plan militaire personnalisé.",
    cta: "Continuer",
    progress: 25,
  },
  {
    kind: "single",
    key: "event-date",
    title: "Quand voulez-vous atteindre votre objectif ?",
    progress: 26,
    options: [
      { value: "1m", label: "Dans 1 mois" },
      { value: "3m", label: "Dans 3 mois" },
      { value: "6m", label: "Dans 6 mois" },
      { value: "flex", label: "Sans échéance précise" },
    ],
  },
  {
    kind: "single",
    key: "motivation-level",
    title: "À quel point êtes-vous motivé ?",
    progress: 27,
    options: [
      { value: "extreme", label: "Extrêmement motivé" },
      { value: "high", label: "Très motivé" },
      { value: "medium", label: "Moyennement motivé" },
    ],
  },
  {
    kind: "input",
    key: "name",
    title: "Comment vous appelez-vous ?",
    subtitle: "Nous personnaliserons votre plan avec votre prénom.",
    inputType: "text",
    placeholder: "Votre prénom",
    progress: 28,
  },
  {
    kind: "input",
    key: "email",
    title: "Où envoyer votre plan personnalisé ?",
    subtitle: "Nous vous enverrons votre plan par email.",
    inputType: "email",
    placeholder: "votre@email.com",
    progress: 29,
  },
  {
    kind: "loading",
    key: "analyzing",
    title: "Analyse de vos réponses...",
    subtitle: "Nous préparons votre plan militaire personnalisé.",
    progress: 30,
  },
  {
    kind: "info",
    key: "plan-ready",
    title: "Votre plan est prêt !",
    body: "Sur la base de vos réponses, nous avons créé un plan d'entraînement militaire adapté à votre corps et à vos objectifs.",
    cta: "Voir mon plan",
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
            Merci{answers.name ? `, ${answers.name}` : ""} !
          </h1>
          <p className="text-muted-foreground">
            Votre plan militaire personnalisé est prêt.
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
      <Button className="w-full" size="lg" disabled={!valid} onClick={onNext}>
        Continuer
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
