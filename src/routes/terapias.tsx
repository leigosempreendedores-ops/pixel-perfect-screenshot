import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Sparkles, HeartPulse, Leaf, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/terapias")({
  component: Terapias,
  head: () => ({
    meta: [
      { title: "Terapias Capilares — AL Bio" },
      { name: "description", content: "Terapias capilares personalizadas com Anna Lorena em Goiânia." },
    ],
  }),
});

const terapias = [
  {
    icon: HeartPulse,
    title: "Avaliação capilar inicial",
    text: "Análise completa do couro cabeludo, fios e rotina. Plano personalizado de cuidados.",
    duration: "60 min",
  },
  {
    icon: Leaf,
    title: "Terapia fitoterápica",
    text: "Aplicação de ativos botânicos para reequilíbrio, oleosidade ou queda capilar.",
    duration: "90 min",
  },
  {
    icon: Sparkles,
    title: "Ritual de reconstrução",
    text: "Hidratação, nutrição e selagem em camadas — para cabelos quimicamente fragilizados.",
    duration: "120 min",
  },
];

function Terapias() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[color:var(--cream)] border-b border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-secondary font-heading font-semibold">Terapias Capilares</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-balance">
            Protocolos terapêuticos para seus fios
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
            Atendimentos individuais conduzidos por Anna Lorena em Goiânia — Goiás.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-8 md:grid-cols-3">
        {terapias.map((t) => (
          <article key={t.title} className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <span className="size-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <t.icon className="size-5 text-secondary" strokeWidth={1.5} />
            </span>
            <h2 className="mt-6 font-display text-2xl">{t.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.text}</p>
            <p className="mt-6 text-xs uppercase tracking-widest text-[color:var(--gold)]">{t.duration}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl bg-foreground text-background px-8 md:px-16 py-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-balance max-w-2xl mx-auto">
            Pronto para começar seu protocolo?
          </h2>
          <p className="mt-4 text-background/70 max-w-lg mx-auto">
            Agende sua avaliação inicial diretamente pelo WhatsApp.
          </p>
          <a
            href="https://wa.me/5562983290822"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-[color:var(--gold)] text-foreground px-8 py-3.5 rounded-xl font-heading font-semibold text-sm hover:opacity-90 transition"
          >
            Fale comigo pelo WhatsApp <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
