import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import anna from "@/assets/anna.jpg";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
  head: () => ({
    meta: [
      { title: "Sobre Anna Lorena — AL Bio" },
      { name: "description", content: "Conheça a história de Anna Lorena, especialista em terapias naturais e bem-estar capilar." },
    ],
  }),
});

function Sobre() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-16 lg:grid-cols-[1fr_1.2fr] items-start">
        <div className="lg:sticky lg:top-28">
          <img src={anna} alt="Anna Lorena" width={1024} height={1280} className="rounded-2xl object-cover aspect-[4/5] w-full" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-secondary font-heading font-semibold">Sobre</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Anna Lorena</h1>
          <p className="mt-2 font-display italic text-xl text-secondary">Terapeuta capilar & herborista</p>

          <div className="mt-10 space-y-6 text-foreground/85 leading-relaxed">
            <p>
              Anna Lorena dedica sua trajetória ao encontro entre fitoterapia, dermocosmética
              natural e práticas integrativas. A AL Bio nasceu da bancada do consultório —
              da necessidade de oferecer fórmulas vivas, feitas com intenção, para cada tipo de fio.
            </p>
            <p>
              Especialista em bem-estar capilar, Anna acredita que cabelo saudável é resultado
              de couro cabeludo equilibrado, alimentação consciente e ritual diário. Cada produto
              da linha é desenvolvido a partir dessa escuta — testado, refinado e feito à mão em Goiânia.
            </p>
            <blockquote className="font-display italic text-2xl text-foreground border-l-2 border-secondary pl-6 my-10">
              "Eu não vendo cosméticos. Eu compartilho rituais."
            </blockquote>
            <p>
              Mais do que uma marca, a AL Bio é um convite para uma relação mais lenta, mais
              honesta e mais natural com o próprio corpo.
            </p>
          </div>

          <Link
            to="/terapias"
            className="mt-12 inline-flex bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-primary/90 transition"
          >
            Conheça as terapias
          </Link>
        </div>
      </section>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
