import { createFileRoute } from "@tanstack/react-router";
import logoMilitary from "@/assets/logo-military.png.asset.json";

export const Route = createFileRoute("/oferta1")({
  component: Oferta1,
  head: () => ({ meta: [{ title: "Oferta Exclusiva — Acompañamiento Militar Individual" }] }),
});

// Checkout da oferta de upsell (Hotmart).
const UPSELL_CHECKOUT_URL = "https://pay.hotmart.com/Y106848804V?off=1di73p7j&checkoutMode=10&bid=1784860063269";
const PRICE = "$12";
const ANCHOR = "$97";

function goUpsell() {
  if (typeof window === "undefined") return;
  try {
    (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("trackCustom", "Upsell1_Click");
  } catch {
    /* pixel opcional */
  }
  try {
    let stored = "";
    try { stored = sessionStorage.getItem("track_qs") || window.location.search; } catch { /* ignore */ }
    const incoming = new URLSearchParams(stored);
    const url = new URL(UPSELL_CHECKOUT_URL);
    for (const k of ["src", "sck", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = incoming.get(k);
      if (v) url.searchParams.set(k, v);
    }
    window.location.href = url.toString();
    return;
  } catch {
    /* fallback */
  }
  window.location.href = UPSELL_CHECKOUT_URL;
}

function decline() {
  if (typeof window === "undefined") return;
  window.location.href = "/gracias";
}

function GoldButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={goUpsell}
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

function Oferta1() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* logo */}
      <div className="relative bg-gradient-to-b from-primary/30 via-primary/10 to-transparent border-b border-accent/30">
        <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-center">
          <img src={logoMilitary.url} alt="Protocolo Calistenia Militar" className="h-11 object-contain" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      </div>

      <section className="max-w-lg mx-auto px-4 py-6 space-y-10">
        {/* ===== OFERTA PRINCIPAL ===== */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <span className="mil-in-pop inline-flex items-center gap-2 rounded-full border border-destructive/50 bg-destructive/15 px-4 py-1.5 mil-stencil text-[11px] font-bold text-destructive tracking-widest">
              ⚠ OFERTA ÚNICA — NO SE REPITE
            </span>
          </div>
          <h1 className="mil-stencil text-2xl sm:text-3xl font-bold leading-tight">
            ESPERA, SOLDADO.<br />
            <span className="text-accent">Tu transformación puede ir 3x más rápido.</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Ya aseguraste tu Protocolo. Pero déjame contarte lo que separa a los soldados que{" "}
            <span className="text-accent font-bold">logran resultados reales</span> de los que entrenan meses… haciéndolo todo mal:
          </p>
          <div className="mil-stencil text-lg font-bold text-accent">
            👁️ Un instructor que corrige tu técnica.
          </div>
        </div>

        {/* ===== DEMO: video + IA ===== */}
        <div className="rounded-2xl border border-accent/30 bg-card/70 p-5 space-y-4 shadow-lg shadow-accent/5">
          <div className="mil-stencil text-[11px] text-accent font-bold tracking-widest text-center">
            ASÍ FUNCIONA TU ACOMPAÑAMIENTO MILITAR CON IA
          </div>
          <div className="grid sm:grid-cols-2 gap-3 items-center">
            {/* "video" grabado */}
            <div className="relative rounded-xl overflow-hidden border border-border/60" style={{ background: "linear-gradient(135deg, oklch(0.34 0.05 140), oklch(0.2 0.03 150))" }}>
              <div className="aspect-[3/4] flex flex-col items-center justify-center gap-2">
                <span className="text-4xl">🎥</span>
                <span className="mil-stencil text-[10px] text-white/80 tracking-widest">GRABAS TUS FLEXIONES</span>
                <span className="absolute top-2 left-2 flex items-center gap-1 text-[9px] text-red-400 mil-stencil">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" /> REC
                </span>
              </div>
            </div>
            {/* respuesta IA */}
            <div className="rounded-xl border border-accent/40 bg-background/50 p-3 space-y-2">
              <div className="flex items-center gap-2 mil-stencil text-[11px] font-bold text-accent">
                🎖️ INSTRUCTOR IA
              </div>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-center gap-2 text-destructive"><span>✗</span> Brazos muy abiertos</li>
                <li className="flex items-center gap-2 text-destructive"><span>✗</span> Cadera baja</li>
                <li className="flex items-center gap-2 text-destructive"><span>✗</span> Ritmo lento</li>
                <li className="flex items-center gap-2 text-destructive"><span>✗</span> Amplitud pobre</li>
              </ul>
              <div className="rounded-lg bg-accent/10 border border-accent/30 p-2 text-[11px] text-foreground/90">
                → Corrige esto y cada flexión valdrá <span className="text-accent font-bold">el doble</span>.
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            En segundos, la IA analiza tu técnica como un <span className="text-accent font-bold">instructor a tu lado</span> — y te dice exactamente qué corregir para evolucionar más rápido y sin lesionarte.
          </p>
        </div>

        {/* ===== MALEFÍCIOS DE NÃO ADQUIRIR ===== */}
        <div className="space-y-3">
          <h2 className="mil-stencil text-lg font-bold text-center">
            Sin un ojo experto que te corrija, esto es lo que te espera:
          </h2>
          <div className="space-y-2">
            {[
              "Entrenar MESES haciendo los ejercicios mal — y no ver resultados.",
              "Lesiones por mala postura: hombros, muñecas y espalda.",
              "Estancarte y rendirte, pensando que “no sirves para esto”.",
              "Desperdiciar todo el potencial del Protocolo que acabas de comprar.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/[0.06] p-3">
                <span className="text-destructive text-lg leading-none shrink-0">✗</span>
                <span className="text-sm text-foreground/90">{t}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            La verdad militar: <span className="text-foreground font-bold">no es cuánto entrenas, es cómo entrenas.</span> Un solo error de técnica repetido mil veces = mil repeticiones desperdiciadas.
          </p>
        </div>

        {/* ===== ULTRA BENEFÍCIOS ===== */}
        <div className="space-y-3">
          <h2 className="mil-stencil text-lg font-bold text-center text-accent">
            Con tu Acompañamiento Militar Individual:
          </h2>
          <div className="space-y-2">
            {[
              { i: "🎯", t: "Técnica corregida al detalle", d: "Como tener un instructor a tu lado en cada entrenamiento." },
              { i: "⚡", t: "Resultados hasta 3x más rápidos", d: "Cada repetición perfecta suma. Dejas de perder tiempo." },
              { i: "🛡️", t: "Cero lesiones", d: "Proteges hombros, codos, muñecas y espalda desde el día 1." },
              { i: "📈", t: "Ajustes personalizados", d: "Feedback según TU cuerpo y TU evolución, no un plan genérico." },
              { i: "🕐", t: "Tu sargento en el bolsillo, 24/7", d: "Grabas y recibes tu análisis cuando quieras, al instante." },
            ].map((b) => (
              <div key={b.t} className="flex items-start gap-3 rounded-xl border border-accent/25 bg-gradient-to-br from-card to-secondary/20 p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/15 border border-accent/30 text-xl">{b.i}</span>
                <div className="min-w-0">
                  <div className="mil-stencil text-sm font-bold text-foreground">{b.t}</div>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== QUEBRA DE OBJEÇÃO ===== */}
        <div className="space-y-3">
          <h2 className="mil-stencil text-lg font-bold text-center">Sé lo que estás pensando…</h2>
          <div className="space-y-2">
            {[
              { q: "“No tengo tiempo para esto.”", a: "Grabas 10 segundos de tus flexiones. La IA responde al instante. Más rápido que mandar un audio." },
              { q: "“¿No me basta con el Protocolo?”", a: "El Protocolo te dice QUÉ hacer. Esto te asegura que lo hagas BIEN. Sin corrección, puedes entrenar meses en vano." },
              { q: "“¿No es muy caro?”", a: "Un entrenador personal cobra más de $100 al mes. Esto es una fracción, con un solo pago y para siempre." },
            ].map((o) => (
              <div key={o.q} className="rounded-xl border border-border/60 bg-card p-3">
                <div className="mil-stencil text-sm font-bold text-foreground">{o.q}</div>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{o.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== ANCORAGEM DE VALOR ===== */}
        <div className="rounded-2xl border border-accent/40 bg-gradient-to-b from-primary/15 to-card p-5 space-y-3 shadow-lg shadow-accent/5">
          <h3 className="mil-stencil text-sm font-bold text-accent text-center tracking-wider">
            LO QUE COSTARÍA TENER ESTO POR FUERA
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-foreground">Entrenador personal presencial</span>
              <span className="mil-stencil font-bold text-destructive line-through">$120/mes</span>
            </li>
            <li className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-foreground">App de coaching con seguimiento</span>
              <span className="mil-stencil font-bold text-destructive line-through">$40/mes</span>
            </li>
            <li className="flex justify-between items-center pt-1">
              <span className="mil-stencil font-bold text-base text-accent">Acompañamiento Militar IA</span>
              <span className="mil-stencil font-bold text-accent">Pago único</span>
            </li>
          </ul>
        </div>

        {/* ===== VALOR + CTA ===== */}
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Hoy, solo por asegurar tu Protocolo, lo agregas por una fracción:
          </p>
          <GoldButton>
            <div className="mil-stencil text-xs font-bold" style={{ color: "#3d2c00" }}>
              🎖️ AGREGAR A MI PEDIDO — SOLO AHORA
            </div>
            <div className="mil-stencil text-base font-bold mt-1.5" style={{ color: "#2a1e00" }}>
              ACOMPAÑAMIENTO MILITAR
            </div>
            <div className="mil-stencil text-xl font-bold leading-none line-through decoration-2 mt-0.5" style={{ color: "#b91c1c" }}>
              {ANCHOR}
            </div>
            <div className="mil-stencil font-extrabold leading-none mt-1" style={{ fontSize: "4.5rem", color: "#ffffff", textShadow: "0 3px 10px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.55)" }}>
              {PRICE}
            </div>
            <div className="text-xs mt-2" style={{ color: "#3d2c00" }}>
              Pago único · Se suma a tu compra · Acceso inmediato
            </div>
          </GoldButton>
          <button onClick={decline} className="text-[11px] text-muted-foreground/70 hover:text-muted-foreground underline underline-offset-2">
            No, gracias. Prefiero arriesgarme y entrenar sin corrección →
          </button>
        </div>

        {/* ===== GARANTIA ===== */}
        <div className="rounded-2xl border border-accent/40 bg-gradient-to-b from-accent/10 to-card p-5 text-center shadow-lg shadow-accent/5">
          <div className="flex justify-center mb-3">
            <div className="relative h-20 w-20 flex items-center justify-center mil-float-anim">
              <svg viewBox="0 0 24 24" className="h-20 w-20 text-accent" fill="none">
                <path d="M12 2l7 3v6c0 5-3.5 8.6-7 10-3.5-1.4-7-5-7-10V5l7-3z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              <div className="absolute flex flex-col items-center leading-none">
                <span className="mil-stencil text-2xl font-extrabold text-accent">30</span>
                <span className="mil-stencil text-[8px] font-bold text-accent tracking-widest">DÍAS</span>
              </div>
            </div>
          </div>
          <h3 className="mil-stencil text-lg font-bold text-accent">Garantía blindada de 30 días</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mt-2 max-w-sm mx-auto">
            Prueba tu acompañamiento sin ningún riesgo. Si no sientes que tu técnica mejora, te devolvemos el <span className="text-accent font-bold">100% de tu dinero</span>. El riesgo es todo nuestro.
          </p>
        </div>

        {/* ===== FAQ ===== */}
        <div className="space-y-2">
          <h2 className="mil-stencil text-lg font-bold text-center mb-1">Preguntas frecuentes</h2>
          {[
            { q: "¿Cómo envío mi video?", a: "Grabas tus flexiones con el celular (10-15 seg) y lo subes desde tu área de miembros. La IA lo analiza al instante." },
            { q: "¿Sirve para otros ejercicios además de flexiones?", a: "Sí. Puedes enviar cualquier ejercicio del Protocolo y recibir la corrección de tu técnica." },
            { q: "¿Necesito conocimientos técnicos?", a: "Cero. Solo grabas y recibes un análisis claro, en lenguaje simple, con lo que debes corregir." },
            { q: "¿Cuántos videos puedo enviar?", a: "Los que necesites durante tu protocolo. Tu instructor con IA está disponible 24/7." },
            { q: "¿Y si no me convence?", a: "Tienes 30 días de garantía. Si no te sirve, te devolvemos cada centavo. Sin preguntas." },
          ].map((it) => (
            <details key={it.q} className="group rounded-xl border border-border/60 bg-card overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none mil-stencil text-sm font-bold text-foreground hover:text-accent transition-colors">
                <span>{it.q}</span>
                <span className="text-accent shrink-0 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="px-4 pb-4 -mt-1 text-xs text-muted-foreground leading-relaxed">{it.a}</p>
            </details>
          ))}
        </div>

        {/* CTA final */}
        <div className="space-y-3">
          <GoldButton>
            <div className="mil-stencil text-lg font-bold" style={{ color: "#1c1400" }}>
              SÍ, QUIERO MI ACOMPAÑAMIENTO — {PRICE} ›
            </div>
          </GoldButton>
          <button onClick={decline} className="block w-full text-center text-[11px] text-muted-foreground/70 hover:text-muted-foreground underline underline-offset-2">
            No, gracias. Continuar sin el acompañamiento →
          </button>
        </div>
      </section>
    </main>
  );
}
