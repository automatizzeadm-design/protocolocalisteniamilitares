import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import logoMilitary from "@/assets/logo-military.png.asset.json";

export const Route = createFileRoute("/acceso")({
  component: Acceso,
  head: () => ({ meta: [{ title: "Acceso — Protocolo Calistenia Militar" }] }),
});

function Acceso() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const enter = () => {
    if (!valid) {
      setError(true);
      return;
    }
    try {
      localStorage.setItem("member_email", email.trim().toLowerCase());
    } catch {
      /* ignore */
    }
    window.location.href = "/miembros";
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 mil-scanline overflow-hidden">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-center">
          <img src={logoMilitary.url} alt="Protocolo Calistenia Militar" className="h-20 object-contain drop-shadow-[0_1px_12px_rgba(255,255,255,0.35)]" />
        </div>

        <div className="text-center space-y-1.5">
          <h1 className="mil-stencil text-2xl font-bold text-accent tracking-wide">ACCESO A LA TROPA</h1>
          <p className="text-xs text-muted-foreground">Ingresa el email que usaste en tu compra.</p>
        </div>

        <div className="rounded-2xl border border-accent/30 bg-card/70 p-5 space-y-3 shadow-lg shadow-accent/5">
          <label className="mil-stencil text-[11px] font-bold text-accent tracking-widest block">EMAIL</label>
          <Input
            type="email"
            inputMode="email"
            value={email}
            placeholder="tu@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") enter();
            }}
            className={`h-12 text-base ${error ? "border-destructive" : "border-accent/50"}`}
          />
          {error && <p className="text-xs text-destructive">Ingresa un email válido.</p>}
          <button
            onClick={enter}
            disabled={!valid}
            className={`w-full rounded-xl p-3.5 mil-stencil font-bold tracking-wide transition-all ${
              valid
                ? "mil-cta mil-cta-shine mil-glow-anim bg-accent text-accent-foreground hover:bg-accent/90"
                : "bg-secondary text-muted-foreground/70 opacity-60"
            }`}
          >
            ENTRAR AL PROTOCOLO ›
          </button>
        </div>

        <p className="text-center text-[11px] text-muted-foreground/80">
          ¿Problemas para entrar? Escríbenos a{" "}
          <a href="mailto:andreyurifurtado@gmail.com" className="text-accent underline underline-offset-2">
            andreyurifurtado@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
