import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/descuento1")({
  component: Descuento1,
  head: () => ({ meta: [{ title: "Espera — Descuento Especial (solo 5 minutos)" }] }),
});

// Checkout da oferta de downsell $9 (Hotmart).
const DOWNSELL_CHECKOUT_URL = "https://pay.hotmart.com/Y106848804V?off=ibl4jbvq&checkoutMode=10";
const PRICE = "$9";

function goCheckout() {
  if (typeof window === "undefined") return;
  try {
    (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("trackCustom", "Downsell1_Click");
  } catch {
    /* pixel opcional */
  }
  try {
    let stored = "";
    try { stored = sessionStorage.getItem("track_qs") || window.location.search; } catch { /* ignore */ }
    const incoming = new URLSearchParams(stored);
    const url = new URL(DOWNSELL_CHECKOUT_URL);
    for (const k of ["src", "sck", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = incoming.get(k);
      if (v) url.searchParams.set(k, v);
    }
    window.location.href = url.toString();
    return;
  } catch {
    /* fallback */
  }
  window.location.href = DOWNSELL_CHECKOUT_URL;
}

function reject() {
  if (typeof window === "undefined") return;
  window.location.href = "/gracias";
}

function GoldButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={goCheckout}
      className="group w-full rounded-xl p-4 text-center hover:scale-[1.02] active:scale-[0.98] transition-transform mil-cta mil-cta-shine mil-glow-gold-anim"
      style={{
        background: "linear-gradient(135deg, #ffe391 0%, #eab93f 45%, #c98a12 100%)",
        color: "#241900",
        border: "1px solid #f3d27a",
        boxShadow: "0 10px 34px -8px rgba(233,183,60,0.7)",
      }}
    >
      {children}
    </button>
  );
}

function Descuento1() {
  const [secs, setSecs] = useState(300); // 5 minutos
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* aviso rojo */}
      <div className="bg-destructive text-destructive-foreground text-center px-4 py-2.5 mil-stencil text-[11px] sm:text-xs font-bold tracking-wide leading-snug">
        ⚠️ ESPERA — NO CIERRES ESTA PÁGINA TODAVÍA
      </div>

      <section className="max-w-lg mx-auto px-4 py-7 space-y-8">
        {/* ===== HERO / CHANTAGEM ===== */}
        <div className="text-center space-y-4">
          <div className="mil-stencil text-5xl mil-in-pop">✋</div>
          <h1 className="mil-stencil text-2xl sm:text-3xl font-bold leading-tight">
            ESPERA, SOLDADO.<br />
            <span className="text-accent">No te rindas justo ahora.</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Sé exactamente lo que estás pensando: <span className="text-foreground font-bold">“yo puedo solo”</span>. Y está bien… pero déjame contarte algo.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            La mayoría de los que dijeron eso mismo, <span className="text-destructive font-bold">hoy siguen igual</span> — o peor. Entrenando a ciegas, repitiendo los mismos errores, sin nadie que les diga la verdad. Y un día se rinden, pensando que “no sirven para esto”.
          </p>
          <p className="mil-stencil text-lg font-bold text-accent">
            No voy a dejar que ese seas tú.
          </p>
        </div>

        {/* ===== COUNTDOWN ===== */}
        <div className="rounded-2xl border border-destructive/40 bg-destructive/[0.06] p-5 text-center space-y-3">
          <p className="text-sm text-foreground leading-relaxed">
            Por eso, <span className="text-accent font-bold">solo en esta página</span> y <span className="text-destructive font-bold">solo por los próximos 5 minutos</span>, te dejo tu Acompañamiento Militar completo por un precio que no verás en ningún otro lado:
          </p>
          <div className="mil-stencil text-[10px] text-muted-foreground uppercase tracking-widest">Este descuento desaparece en:</div>
          <div className="flex items-center justify-center gap-2">
            <span className="mil-stencil text-4xl font-bold text-destructive tabular-nums rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-1" style={{ textShadow: "0 0 22px rgba(239,68,68,0.5)" }}>{mm}</span>
            <span className="mil-stencil text-4xl font-bold text-destructive animate-pulse">:</span>
            <span className="mil-stencil text-4xl font-bold text-destructive tabular-nums rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-1" style={{ textShadow: "0 0 22px rgba(239,68,68,0.5)" }}>{ss}</span>
          </div>
          {secs === 0 && (
            <p className="mil-stencil text-[11px] font-bold text-destructive">⚠ El tiempo casi se acaba… asegúralo ya.</p>
          )}
        </div>

        {/* ===== VALUE STACK $9 ===== */}
        <div className="rounded-2xl border border-accent/50 bg-gradient-to-b from-primary/15 to-card p-5 space-y-4 shadow-lg shadow-accent/5">
          <h3 className="mil-stencil text-sm font-bold text-accent text-center tracking-wider">
            TE LLEVAS TODO ESTO
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center gap-3 text-sm border-b border-border/50 pb-2">
              <span className="text-foreground">Acompañamiento 1 a 1 con el Militar Garcia (24/7)</span>
              <span className="mil-stencil font-bold text-accent shrink-0">$97</span>
            </li>
            <li className="flex justify-between items-center gap-3 text-sm border-b border-border/50 pb-2">
              <span className="text-foreground">🏅 Grupo de Ranking + premios en dinero</span>
              <span className="mil-stencil font-bold text-accent shrink-0">$67</span>
            </li>
            <li className="flex justify-between items-center gap-3 text-sm border-b border-border/50 pb-2">
              <span className="text-foreground">🎁 Sorteos de equipamiento (cada mes)</span>
              <span className="mil-stencil font-bold text-accent shrink-0">$47</span>
            </li>
            <li className="flex justify-between items-center pt-1">
              <span className="mil-stencil font-bold text-base">VALOR TOTAL</span>
              <span className="mil-stencil font-bold text-2xl text-destructive line-through decoration-2">$211</span>
            </li>
          </ul>

          <p className="text-center text-sm text-foreground leading-relaxed">
            Hace un momento estaba a <span className="line-through text-muted-foreground">$12</span>. Ahora, solo aquí y solo por estos minutos:
          </p>

          <GoldButton>
            <div className="mil-stencil text-xs font-bold" style={{ color: "#3d2c00" }}>
              🎖️ ÚLTIMA OPORTUNIDAD — SOLO AHORA
            </div>
            <div className="mil-stencil text-base font-bold mt-1.5" style={{ color: "#2a1e00" }}>
              ACOMPAÑAMIENTO + 2 BONOS
            </div>
            <div className="mil-stencil font-extrabold leading-none mt-1" style={{ fontSize: "4.75rem", color: "#ffffff", textShadow: "0 3px 10px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.55)" }}>
              {PRICE}
            </div>
            <div className="text-xs mt-2" style={{ color: "#3d2c00" }}>
              Pago único · Se suma a tu compra · Acceso inmediato
            </div>
          </GoldButton>
        </div>

        {/* ===== CHANTAGEM FINAL ===== */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3 text-center">
          <p className="text-sm text-foreground leading-relaxed">
            Es menos que un almuerzo. Pero es <span className="text-accent font-bold">la diferencia entre lograrlo… o rendirte otra vez.</span>
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Cuando cierres esta página, este precio <span className="text-destructive font-bold">muere para siempre</span>. Y volverás a entrenar solo, adivinando, como hasta hoy. Esta puerta no se abre dos veces, soldado.
          </p>
        </div>

        {/* ===== GARANTIA ===== */}
        <div className="rounded-2xl border border-accent/40 bg-gradient-to-b from-accent/10 to-card p-5 text-center shadow-lg shadow-accent/5">
          <div className="flex justify-center mb-2">
            <div className="relative h-16 w-16 flex items-center justify-center mil-float-anim">
              <svg viewBox="0 0 24 24" className="h-16 w-16 text-accent" fill="none">
                <path d="M12 2l7 3v6c0 5-3.5 8.6-7 10-3.5-1.4-7-5-7-10V5l7-3z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              <div className="absolute flex flex-col items-center leading-none">
                <span className="mil-stencil text-lg font-extrabold text-accent">30</span>
                <span className="mil-stencil text-[7px] font-bold text-accent tracking-widest">DÍAS</span>
              </div>
            </div>
          </div>
          <h3 className="mil-stencil text-base font-bold text-accent">Garantía blindada de 30 días</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 max-w-sm mx-auto">
            Sigues teniendo 30 días de garantía. Si no te sirve, te devolvemos el <span className="text-accent font-bold">100%</span>. Cero riesgo — el riesgo es todo nuestro.
          </p>
        </div>

        {/* ===== CTA FINAL + DECLINE ===== */}
        <div className="space-y-3">
          <GoldButton>
            <div className="mil-stencil text-lg font-bold" style={{ color: "#1c1400" }}>
              SÍ, LO QUIERO POR {PRICE} ›
            </div>
          </GoldButton>
          <button onClick={reject} className="block w-full text-center text-[11px] text-muted-foreground/60 hover:text-muted-foreground underline underline-offset-2">
            No, prefiero rendirme y entrenar solo, sin corrección →
          </button>
        </div>
      </section>
    </main>
  );
}
