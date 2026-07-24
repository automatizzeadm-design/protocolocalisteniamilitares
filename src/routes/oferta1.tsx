import { createFileRoute } from "@tanstack/react-router";
import notaAsset from "@/assets/NOTA_7.810.png.asset.json";
import homeWorkoutDemoAsset from "@/assets/home-workout-demo.png.asset.json";
import bonusRanking from "@/assets/bonus-ranking-militar.png.asset.json";
import bonusSorteos from "@/assets/bonus-sorteos-equipamiento.png.asset.json";

export const Route = createFileRoute("/oferta1")({
  component: Oferta1,
  head: () => ({ meta: [{ title: "Oferta Exclusiva — Acompañamiento Militar Individual" }] }),
});

// Checkout da oferta de upsell (Hotmart).
const UPSELL_CHECKOUT_URL = "https://pay.hotmart.com/Y106848804V?off=1di73p7j&checkoutMode=10&bid=1784860063269";
const PRICE = "$12";

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

function Sep({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent/40" />
      <span className="mil-tag whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent/40" />
    </div>
  );
}

function Oferta1() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* aviso rojo */}
      <div className="bg-destructive text-destructive-foreground text-center px-4 py-2.5 mil-stencil text-[11px] sm:text-xs font-bold tracking-wide leading-snug">
        ⚠️ TU COMPRA AÚN NO ESTÁ COMPLETA — LEE ESTE AVISO ANTES DE CONTINUAR
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
          <div className="mil-stencil text-lg font-bold text-green-500 underline underline-offset-4 decoration-green-500">
            👁️ El Militar Garcia corrige tu técnica, en persona.
          </div>
        </div>

        {/* ===== DEMO: video + WhatsApp ===== */}
        <div className="rounded-2xl border border-accent/30 bg-card/70 p-5 space-y-4 shadow-lg shadow-accent/5">
          <div className="mil-stencil text-[11px] text-accent font-bold tracking-widest text-center">
            ASÍ FUNCIONA TU ACOMPAÑAMIENTO MILITAR POR WHATSAPP
          </div>
          <div className="grid sm:grid-cols-2 gap-3 items-start">
            {/* video grabado */}
            <div className="relative rounded-xl overflow-hidden border border-border/60 bg-black">
              <img
                src={homeWorkoutDemoAsset.url}
                alt="Demo de entrenamiento militar enviado por WhatsApp"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute top-2 left-2 flex items-center gap-1 text-[9px] text-red-400 mil-stencil bg-black/40 px-1.5 py-0.5 rounded">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" /> REC
              </span>
              <span className="absolute bottom-3 left-0 right-0 text-center mil-stencil text-[10px] text-white/90 tracking-widest px-2">
                VIDEOS · FOTOS · DUDAS<br />POR WHATSAPP
              </span>
            </div>
            {/* evaluación + respuesta del profesor */}
            <div className="space-y-3">
              <img
                src={notaAsset.url}
                alt="Militar Garcia evaluando tu técnica: NOTA 7.8/10 — Tenemos que mejorar algunos aspectos"
                className="w-full rounded-xl border border-accent/30 bg-card/50 object-contain shadow-lg shadow-accent/5"
                loading="lazy"
              />
              <div className="rounded-xl border border-accent/40 bg-background/50 p-3 space-y-2">
                <div className="flex items-center gap-2 mil-stencil text-[11px] font-bold text-accent">
                  🎖️ MILITAR GARCIA · WHATSAPP
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
          </div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Envías <span className="text-foreground font-bold">videos, fotos, dudas o mensajes</span> por WhatsApp — <span className="text-accent font-bold">a cualquier hora, las 24 horas</span> — y el propio <span className="text-accent font-bold">Militar Garcia, profesor de educación física, te acompaña 1 a 1</span>: corrige tu técnica, resuelve tus dudas y te dice exactamente qué mejorar para evolucionar más rápido y sin lesionarte.
          </p>
          <div className="flex justify-center">
            <span className="mil-tag">📲 24 horas al día · cualquier hora</span>
          </div>
        </div>

        {/* ===== AUTORIDADE: MILITAR GARCIA ===== */}
        <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-card/60 p-4">
          <div className="h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br from-accent/30 to-primary/20 border border-accent/40 flex items-center justify-center text-2xl">🎖️</div>
          <div className="min-w-0">
            <div className="mil-stencil text-sm font-bold text-foreground">Militar Garcia</div>
            <div className="text-[11px] text-muted-foreground leading-snug">
              Profesor de educación física y tu instructor personal. Él revisa, corrige y rankea a cada soldado — uno por uno.
            </div>
          </div>
        </div>

        <Sep label="El problema" />
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

        <Sep label="La solución" />
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
              { i: "🕐", t: "Tu sargento en tu WhatsApp, 24/7", d: "Envía videos, fotos, dudas o mensajes — 1 a 1, a cualquier hora del día. Nunca entrenas solo." },
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

        <Sep label="Bonos incluidos" />
        {/* ===== BÔNUS ===== */}
        <div className="space-y-3">
          <h2 className="mil-stencil text-lg font-bold text-center text-accent">🎁 Y ADEMÁS, TOTALMENTE GRATIS:</h2>

          {/* Bono 1: Ranking */}
          <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-card to-secondary/20 p-4 space-y-3 shadow-lg shadow-accent/5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏅</span>
              <div className="mil-stencil text-sm font-bold text-accent">BONO 1 · GRUPO DE RANKING MILITAR</div>
            </div>
            <div className="relative flex justify-center py-1">
              <div aria-hidden className="absolute inset-x-8 bottom-1 h-8 rounded-[50%] bg-accent/25 blur-2xl" />
              <img
                src={bonusRanking.url}
                alt="Grupo de Ranking Militar"
                loading="lazy"
                className="relative w-full max-w-[320px] object-contain mil-sway-anim drop-shadow-[0_8px_28px_rgba(255,255,255,0.22)]"
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Entras a un grupo exclusivo donde compites con otros soldados. Cumples tus misiones, sumas puntos y <span className="text-accent font-bold">subes de patente</span>:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Recluta", "Cabo", "Sargento", "Teniente", "Capitán", "Comandante"].map((p, i) => (
                <span key={p} className="mil-stencil text-[9px] font-bold px-2 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent">
                  {i + 1}. {p}
                </span>
              ))}
            </div>
            <div className="rounded-lg bg-accent/10 border border-accent/30 p-3 text-xs text-foreground/90 leading-relaxed">
              💰 <span className="font-bold text-accent">Al final de cada mes, los puestos 1°, 2° y 3° del ranking ganan PREMIOS EN DINERO.</span> Entrena, compite y gana de verdad.
            </div>
          </div>

          {/* Bono 2: Sorteos */}
          <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-card to-secondary/20 p-4 space-y-3 shadow-lg shadow-accent/5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <div className="mil-stencil text-sm font-bold text-accent">BONO 2 · SORTEOS DE EQUIPAMIENTO</div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-accent font-bold">Todos los meses sorteamos equipos de entrenamiento</span> entre los miembros del acompañamiento. ¿No tienes equipo todavía? Aquí lo puedes ganar — gratis.
            </p>
          </div>
        </div>

        {/* ===== QUEBRA DE OBJEÇÃO ===== */}
        <div className="space-y-3">
          <h2 className="mil-stencil text-lg font-bold text-center">Sé lo que estás pensando…</h2>
          <div className="space-y-2">
            {[
              { q: "“No tengo tiempo para esto.”", a: "Grabas 10 segundos de tus flexiones y las mandas por WhatsApp. Recibes tu corrección personalizada. Más simple que mandar un audio." },
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

        <Sep label="Tu inversión de hoy" />
        {/* ===== VALUE STACK + PREÇO ===== */}
        <div className="rounded-2xl border border-accent/50 bg-gradient-to-b from-primary/15 to-card p-5 space-y-4 shadow-lg shadow-accent/5">
          <h3 className="mil-stencil text-sm font-bold text-accent text-center tracking-wider">
            TODO LO QUE RECIBES HOY
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center gap-3 text-sm border-b border-border/50 pb-2">
              <span className="text-foreground">Acompañamiento 1 a 1 con el Militar Garcia</span>
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

          <p className="text-center text-sm text-foreground">
            Pero hoy, solo por asegurar tu Protocolo, lo agregas todo por:
          </p>

          <GoldButton>
            <div className="mil-stencil text-xs font-bold" style={{ color: "#3d2c00" }}>
              🎖️ AGREGAR A MI PEDIDO — SOLO AHORA
            </div>
            <div className="mil-stencil text-base font-bold mt-1.5" style={{ color: "#2a1e00" }}>
              ACOMPAÑAMIENTO + 2 BONOS
            </div>
            <div className="mil-stencil font-extrabold leading-none mt-1" style={{ fontSize: "4.5rem", color: "#ffffff", textShadow: "0 3px 10px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.55)" }}>
              {PRICE}
            </div>
            <div className="text-xs mt-2" style={{ color: "#3d2c00" }}>
              Pago único · Se suma a tu compra · Acceso inmediato
            </div>
          </GoldButton>
          <button onClick={decline} className="block w-full text-center text-[11px] text-muted-foreground/70 hover:text-muted-foreground underline underline-offset-2">
            No, gracias. Prefiero arriesgarme y entrenar sin corrección →
          </button>
        </div>

        <Sep label="Garantía" />
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

        <Sep label="Dudas frecuentes" />
        {/* ===== FAQ ===== */}
        <div className="space-y-2">
          <h2 className="mil-stencil text-lg font-bold text-center mb-1">Preguntas frecuentes</h2>
          {[
            { q: "¿Quién corrige mis videos?", a: "El propio Militar Garcia, profesor de educación física. Él analiza tu técnica, te corrige y te rankea — en persona, no es un robot." },
            { q: "¿Cómo envío mi video?", a: "Grabas tus flexiones con el celular (10-15 seg) y lo envías por WhatsApp. El Militar Garcia te responde con tu corrección personalizada, directo en tu chat." },
            { q: "¿Solo puedo enviar videos?", a: "No. Envías videos, fotos, dudas y mensajes — lo que necesites. El Militar Garcia te responde 1 a 1, a cualquier hora del día." },
            { q: "¿Sirve para otros ejercicios además de flexiones?", a: "Sí. Puedes enviar cualquier ejercicio del Protocolo por WhatsApp y recibir la corrección de tu técnica." },
            { q: "¿A qué hora puedo escribir?", a: "Cuando quieras, 24 horas al día. Mandas tu duda o tu video a cualquier hora y recibes tu respuesta personalizada." },
            { q: "¿Necesito conocimientos técnicos?", a: "Cero. Solo grabas o escribes, envías por WhatsApp y recibes un análisis claro, en lenguaje simple, con lo que debes corregir." },
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
