import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Phone, MapPin, Instagram, Mail } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contato")({
  component: Contato,
  head: () => ({
    meta: [
      { title: "Contato — AL Bio" },
      { name: "description", content: "Fale com Anna Lorena. Goiânia, Goiás. +55 (62) 98329-0822." },
    ],
  }),
});

function Contato() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-secondary font-heading font-semibold">Contato</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Vamos conversar</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Tire dúvidas sobre produtos, agende uma terapia capilar ou envie uma mensagem direta.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-5 bg-card border border-border rounded-2xl p-8"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Nome</span>
                <input required className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
                <input required type="email" className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              </label>
            </div>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Mensagem</span>
              <textarea required rows={5} className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none" />
            </label>
            <button className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-primary/90 transition shadow-md shadow-primary/20">
              {sent ? "Enviado — obrigada!" : "Enviar mensagem"}
            </button>
            <a
              href="https://wa.me/5562983290822"
              target="_blank"
              rel="noreferrer"
              className="mt-3 w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-xl font-heading font-semibold text-sm hover:opacity-90 transition"
            >
              Vamos conversar no WhatsApp?
            </a>
          </form>

          <aside className="space-y-6">
            <div className="bg-[color:var(--cream)] rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-sm">Atendimento direto</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3"><Phone className="size-4 text-secondary" /> +55 (62) 98329-0822</li>
                <li className="flex items-center gap-3"><Mail className="size-4 text-secondary" /> contato@albio.com.br</li>
                <li className="flex items-center gap-3"><MapPin className="size-4 text-secondary" /> Goiânia, Goiás — Brasil</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-sm">Redes sociais</h3>
              <div className="mt-4 space-y-3 text-sm">
                <a href="https://instagram.com/albiocosmeticos" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary">
                  <Instagram className="size-4 text-secondary" /> @albiocosmeticos
                </a>
                <a href="https://instagram.com/annalorenaterapeutacapilar" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary">
                  <Instagram className="size-4 text-secondary" /> @annalorenaterapeutacapilar
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border aspect-video">
              <iframe
                title="Mapa Goiânia"
                src="https://www.google.com/maps?q=Goi%C3%A2nia%2C+GO&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
