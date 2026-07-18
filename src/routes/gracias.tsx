import { createFileRoute } from "@tanstack/react-router";
import logoMilitary from "@/assets/logo-military.png.asset.json";

export const Route = createFileRoute("/gracias")({
  component: Gracias,
  head: () => ({ meta: [{ title: "¡Bienvenido al Protocolo! — Calistenia Militar" }] }),
});

const CONTACT_EMAIL = "andreyurifurtado@gmail.com";

function Gracias() {
  return (
    <main className="min-h-screen bg-background text-foreground mil-scanline overflow-hidden">
      {/* logo */}
      <div className="relative bg-gradient-to-b from-primary/30 via-primary/10 to-transparent border-b border-accent/30">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-center">
          <img src={logoMilitary.url} alt="Protocolo Calistenia Militar" className="h-14 object-contain" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      </div>

      <section className="max-w-lg mx-auto px-4 py-8 space-y-6 text-center">
        {/* selo confirmado */}
        <div className="flex justify-center">
          <span className="mil-in-pop inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-4 py-1.5 mil-stencil text-[11px] font-bold text-accent tracking-widest shadow-lg shadow-accent/10">
            ✓ COMPRA CONFIRMADA
          </span>
        </div>

        {/* escudo */}
        <div className="flex justify-center">
          <div className="relative h-24 w-24 flex items-center justify-center mil-float-anim">
            <svg viewBox="0 0 24 24" className="h-24 w-24 text-accent" fill="none">
              <path d="M12 2l7 3v6c0 5-3.5 8.6-7 10-3.5-1.4-7-5-7-10V5l7-3z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M8.5 12.2l2.4 2.4 4.6-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h1 className="mil-stencil text-3xl sm:text-4xl font-bold text-accent leading-tight mil-in">
          ¡Bienvenido a la tropa, soldado!
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
          Tu compra fue confirmada con éxito. En este momento, nuestra app está{" "}
          <span className="text-accent font-bold">generando tu Protocolo Militar 100% personalizado</span>, calculado a partir de <span className="text-accent font-bold">tus propias respuestas</span> del cuestionario — tu nivel, tu objetivo y tu ritmo.
        </p>

        {/* barra "generando" */}
        <div className="rounded-2xl border border-accent/30 bg-card/60 p-5 space-y-3 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mil-stencil text-[11px] font-bold text-accent tracking-widest">
            <span className="mil-spinner inline-block h-4 w-4 rounded-full border-2 border-accent border-t-transparent" />
            GENERANDO TU PROTOCOLO PERSONALIZADO...
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full mil-progress-bar rounded-full" style={{ width: "82%" }} />
          </div>
        </div>

        {/* último passo: email + whatsapp */}
        <div className="rounded-2xl border border-accent/40 bg-gradient-to-b from-primary/15 to-card p-6 space-y-4 text-left shadow-lg shadow-accent/5">
          <div className="mil-stencil text-sm font-bold text-accent tracking-wide text-center">
            🎖️ ÚLTIMO PASO PARA RECIBIR TU ACCESO
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Para entregarte tu protocolo y tus bonos en cuanto estén listos, escríbenos con tu{" "}
            <span className="text-accent font-bold">número de WhatsApp</span>. Así te enviamos el acceso directo y personalizado.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Quiero%20mi%20acceso%20al%20Protocolo%20Militar&body=Hola!%20Acabo%20de%20comprar%20el%20Protocolo%20Militar.%20Mi%20WhatsApp%20es%3A%20`}
            className="group flex items-center justify-center gap-3 w-full rounded-xl bg-accent text-accent-foreground p-4 mil-stencil font-bold tracking-wide hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-accent/25"
          >
            ✉️ Escribir a nuestro equipo
          </a>
          <div className="text-center text-xs text-muted-foreground">
            o envía un correo a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent font-bold underline underline-offset-2 break-all">
              {CONTACT_EMAIL}
            </a>{" "}
            con tu número de WhatsApp
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground/80 max-w-sm mx-auto leading-relaxed">
          Guarda este correo. En breve recibirás el acceso a tu área de miembros con todo tu contenido. ¡Prepárate para la misión! 💪
        </p>
      </section>
    </main>
  );
}
