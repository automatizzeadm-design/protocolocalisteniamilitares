import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoMilitary from "@/assets/logo-military.png.asset.json";

export const Route = createFileRoute("/miembros")({
  component: Miembros,
  head: () => ({ meta: [{ title: "Área de Miembros — Protocolo Calistenia Militar" }] }),
});

type Item = { label: string; title: string; desc: string; variant: "day" | "bonus" | "fund"; dur: string };

const WEEK1: Item[] = [
  { label: "DÍA 1", title: "Evaluación & Fundamentos", desc: "Mide tu punto de partida y aprende la base del método militar.", variant: "day", dur: "18 min" },
  { label: "DÍA 2", title: "Empuje de Combate", desc: "Pecho, hombros y tríceps con flexiones tácticas.", variant: "day", dur: "15 min" },
  { label: "DÍA 3", title: "Core de Acero", desc: "Abdomen y zona media a prueba de balas.", variant: "day", dur: "14 min" },
  { label: "DÍA 4", title: "Tren Inferior Táctico", desc: "Piernas y glúteos sin equipo.", variant: "day", dur: "16 min" },
  { label: "DÍA 5", title: "Resistencia Militar", desc: "Circuito de acondicionamiento de élite.", variant: "day", dur: "20 min" },
  { label: "DÍA 6", title: "Movilidad del Soldado", desc: "Flexibilidad y control articular.", variant: "day", dur: "12 min" },
  { label: "DÍA 7", title: "Descanso Activo", desc: "Recuperación inteligente para volver más fuerte.", variant: "day", dur: "10 min" },
];
const WEEK2: Item[] = [
  { label: "DÍA 8", title: "Fuerza Explosiva", desc: "Potencia y velocidad de reacción.", variant: "day", dur: "17 min" },
  { label: "DÍA 9", title: "Pecho Blindado", desc: "Volumen y densidad en el pecho.", variant: "day", dur: "15 min" },
  { label: "DÍA 10", title: "Espalda de Titán", desc: "Dorsales y postura de guerrero.", variant: "day", dur: "16 min" },
  { label: "DÍA 11", title: "Piernas de Hierro", desc: "Fuerza real desde la base.", variant: "day", dur: "18 min" },
  { label: "DÍA 12", title: "Abdomen Comando", desc: "Definición y control del core.", variant: "day", dur: "14 min" },
  { label: "DÍA 13", title: "HIIT Militar", desc: "Quema máxima en mínimo tiempo.", variant: "day", dur: "20 min" },
  { label: "DÍA 14", title: "Recuperación Táctica", desc: "Regenera y prepara la semana final.", variant: "day", dur: "11 min" },
];
const WEEK3: Item[] = [
  { label: "DÍA 15", title: "Máxima Potencia", desc: "Sube el nivel de intensidad.", variant: "day", dur: "19 min" },
  { label: "DÍA 16", title: "Circuito Guerrero", desc: "Cuerpo completo sin descanso.", variant: "day", dur: "22 min" },
  { label: "DÍA 17", title: "Desafío de Flexiones", desc: "Rompe tu récord personal.", variant: "day", dur: "15 min" },
  { label: "DÍA 18", title: "Core Extremo", desc: "El abdomen definitivo.", variant: "day", dur: "16 min" },
  { label: "DÍA 19", title: "Full Body Militar", desc: "Todo el cuerpo en modo élite.", variant: "day", dur: "21 min" },
  { label: "DÍA 20", title: "Test Final", desc: "Mide cuánto has evolucionado.", variant: "day", dur: "18 min" },
  { label: "DÍA 21", title: "Graduación", desc: "Completa tu misión de 21 días. ¡Eres un soldado!", variant: "day", dur: "12 min" },
];
const BONOS: Item[] = [
  { label: "BONO", title: "Nutrición Militar Desclasificada", desc: "Cómo comer para ganar músculo y energía como un soldado de élite.", variant: "bonus", dur: "Guía + vídeos" },
  { label: "BONO", title: "Mapa de Misión 2026", desc: "Tu agenda día por día hasta alcanzar tu objetivo.", variant: "bonus", dur: "Agenda" },
  { label: "BONO", title: "Test de Metabolismo (TMB)", desc: "Descubre tu metabolismo real y tus números exactos.", variant: "bonus", dur: "Test online" },
];
const FUND: Item[] = [
  { label: "TÉCNICA", title: "La Flexión Perfecta", desc: "Domina la base de todo el protocolo.", variant: "fund", dur: "8 min" },
  { label: "TÉCNICA", title: "Respiración de Combate", desc: "Más resistencia y control bajo esfuerzo.", variant: "fund", dur: "6 min" },
  { label: "TÉCNICA", title: "Calentamiento Táctico", desc: "Prepara el cuerpo y evita lesiones.", variant: "fund", dur: "7 min" },
  { label: "TÉCNICA", title: "Prevención de Lesiones", desc: "Cuida articulaciones y espalda.", variant: "fund", dur: "9 min" },
];

const THUMB: Record<Item["variant"], string> = {
  day: "linear-gradient(135deg, oklch(0.36 0.06 140), oklch(0.2 0.03 150))",
  bonus: "linear-gradient(135deg, #e6b13a, #8a5e12)",
  fund: "linear-gradient(135deg, oklch(0.34 0.03 150), oklch(0.22 0.02 150))",
};

function Card({ item, onClick }: { item: Item; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative shrink-0 snap-start w-44 sm:w-52 rounded-lg overflow-hidden border border-border/60 hover:border-accent/70 transition-all hover:scale-[1.04] hover:z-10 text-left"
    >
      <div className="relative aspect-video flex items-center justify-center" style={{ background: THUMB[item.variant] }}>
        <span className="absolute top-1.5 left-2 mil-stencil text-[9px] font-bold tracking-widest text-white/90">{item.label}</span>
        <span className="absolute top-1.5 right-2 text-[9px] rounded bg-black/40 px-1.5 py-0.5 text-white/90 font-body">{item.dur}</span>
        <span className="text-3xl opacity-90">{item.variant === "bonus" ? "🎁" : item.variant === "fund" ? "🎯" : "🎖️"}</span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <span className="h-11 w-11 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">▶</span>
        </div>
      </div>
      <div className="p-2 bg-card">
        <p className="mil-stencil text-[11px] font-bold text-foreground leading-tight truncate">{item.title}</p>
      </div>
    </button>
  );
}

function Row({ title, items, onPick }: { title: string; items: Item[]; onPick: (i: Item) => void }) {
  return (
    <section className="space-y-2">
      <h2 className="mil-stencil text-sm font-bold text-foreground px-4 sm:px-6 tracking-wide">{title}</h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-thin snap-x px-4 sm:px-6 pb-2">
        {items.map((it) => (
          <Card key={it.title} item={it} onClick={() => onPick(it)} />
        ))}
      </div>
    </section>
  );
}

function Miembros() {
  const [email, setEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState<Item | null>(null);

  useEffect(() => {
    let e: string | null = null;
    try {
      e = localStorage.getItem("member_email");
    } catch {
      /* ignore */
    }
    if (!e) {
      window.location.replace("/acceso");
      return;
    }
    setEmail(e);
    setChecked(true);
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("member_email");
    } catch {
      /* ignore */
    }
    window.location.href = "/acceso";
  };

  if (!checked) return <div className="min-h-screen bg-background" />;

  return (
    <main className="min-h-screen bg-background text-foreground pb-16">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
          <img src={logoMilitary.url} alt="Protocolo Militar" className="h-9 object-contain" />
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:block text-[11px] text-muted-foreground font-body truncate max-w-[180px]">{email}</span>
            <div className="h-8 w-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-sm">
              {(email?.[0] || "S").toUpperCase()}
            </div>
            <button onClick={logout} className="mil-stencil text-[10px] font-bold text-muted-foreground hover:text-accent tracking-widest">
              SALIR
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, oklch(0.3 0.06 140) 0%, oklch(0.19 0.01 150) 60%)" }} />
        <div className="absolute inset-0 mil-scanline pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="max-w-xl space-y-4">
            <span className="mil-tag">Protocolo activo</span>
            <h1 className="mil-stencil text-3xl sm:text-5xl font-bold text-foreground leading-none">
              PROTOCOLO MILITAR<br />
              <span className="text-accent">21 DÍAS</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
              Tu transformación empieza aquí, soldado. Sin gimnasio, sin excusas — solo el método de élite, día a día, adaptado a ti.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setActive(WEEK1[0])}
                className="flex items-center gap-2 rounded-xl bg-accent text-accent-foreground px-6 py-3 mil-stencil font-bold tracking-wide hover:bg-accent/90 hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-lg shadow-accent/25"
              >
                ▶ Empezar misión
              </button>
              <div className="rounded-xl border border-border/60 bg-card/60 px-4 py-2">
                <div className="mil-stencil text-[9px] text-muted-foreground tracking-widest">TU PROGRESO</div>
                <div className="mt-1 h-1.5 w-32 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: "5%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rows */}
      <div className="max-w-6xl mx-auto py-6 space-y-7">
        <Row title="Continúa tu misión" items={[WEEK1[0], WEEK1[1], BONOS[0], WEEK1[4]]} onPick={setActive} />
        <Row title="Protocolo Militar — Semana 1" items={WEEK1} onPick={setActive} />
        <Row title="Protocolo Militar — Semana 2" items={WEEK2} onPick={setActive} />
        <Row title="Protocolo Militar — Semana 3" items={WEEK3} onPick={setActive} />
        <Row title="🎁 Tus Bonos Exclusivos" items={BONOS} onPick={setActive} />
        <Row title="Fundamentos & Técnica" items={FUND} onPick={setActive} />
      </div>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 mil-fadein" onClick={() => setActive(null)}>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-accent/40 bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video flex flex-col items-center justify-center gap-2" style={{ background: THUMB[active.variant] }}>
              <button onClick={() => setActive(null)} className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center">✕</button>
              <span className="h-14 w-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl shadow-lg">▶</span>
              <span className="mil-stencil text-[10px] font-bold text-white/90 tracking-widest">EN PREPARACIÓN</span>
            </div>
            <div className="p-5 space-y-2">
              <div className="mil-stencil text-[10px] text-accent font-bold tracking-widest">{active.label} · {active.dur}</div>
              <h3 className="mil-stencil text-lg font-bold text-foreground">{active.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{active.desc}</p>
              <div className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-xs text-muted-foreground leading-relaxed mt-2">
                🎖️ Estamos finalizando este contenido. Te avisaremos por <span className="text-accent font-bold">WhatsApp</span> en cuanto esté disponible. ¡Prepárate, soldado!
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
