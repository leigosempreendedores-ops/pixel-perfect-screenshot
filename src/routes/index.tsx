import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Leaf, Droplet, Flower2, Sparkles, ArrowRight, Quote } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import anna from "@/assets/anna.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const testimonials = [
  { name: "Mariana S.", text: "Meus cachos voltaram a respirar. Hidratação que se sente na primeira aplicação.", role: "Cliente desde 2023" },
  { name: "Lívia R.", text: "Anna é uma terapeuta atenta e generosa. A terapia capilar mudou minha relação com o cabelo.", role: "Goiânia, GO" },
  { name: "Carolina M.", text: "Produtos com cheiro de horta — naturais de verdade. Recomendo de olhos fechados.", role: "Cliente fiel" },
];

const valores = [
  { icon: Leaf, title: "Ingredientes botânicos", text: "Ervas, óleos vegetais e manteigas selecionadas com critério." },
  { icon: Droplet, title: "Feito à mão", text: "Pequenos lotes, controle artesanal, energia presente em cada frasco." },
  { icon: Flower2, title: "Vegano & cruelty-free", text: "Fórmulas que respeitam o seu cabelo e os animais." },
  { icon: Sparkles, title: "Resultado terapêutico", text: "Cuidado que vai da raiz à essência — cabelo e bem-estar." },
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-secondary font-heading font-semibold">
              AL Bio — Por Anna Lorena
            </p>
            <h1 className="mt-5 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance">
              Cuidado <em className="italic font-normal text-secondary">natural</em> para seus cabelos.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              Cosméticos artesanais e terapias capilares conduzidas por Anna Lorena,
              especialista em bem-estar capilar em Goiânia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/loja"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-primary/90 transition shadow-md shadow-primary/20"
              >
                Ver produtos <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/terapias"
                className="inline-flex items-center gap-2 border border-foreground/15 hover:border-secondary hover:text-secondary px-7 py-3.5 rounded-xl font-heading font-semibold text-sm transition"
              >
                Agendar consulta
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
              <span>· Vegano</span>
              <span>· Artesanal</span>
              <span>· Goiânia, GO</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-[2rem] -z-10 blur-2xl" />
            <video
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="rounded-2xl shadow-2xl shadow-foreground/10 object-cover aspect-[4/3] w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-xl max-w-[220px] hidden md:block">
              <p className="font-display italic text-sm leading-snug">
                "A natureza tem a fórmula. Eu só traduzo."
              </p>
              <p className="text-xs text-muted-foreground mt-2">— Anna Lorena</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="border-y border-border/60 bg-[color:var(--cream)]">
        <div className="mx-auto max-w-7xl px-6 py-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {valores.map((v) => (
            <div key={v.title} className="flex gap-4">
              <span className="size-11 shrink-0 rounded-full bg-secondary/20 text-secondary-foreground flex items-center justify-center">
                <v.icon className="size-5 text-secondary" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-heading text-sm font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-secondary font-heading font-semibold">Mais procurados</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Rituais em destaque</h2>
          </div>
          <Link to="/loja" className="hidden sm:inline text-sm text-primary hover:underline">
            Ver toda a loja →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* SOBRE */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-24 grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={anna}
              alt="Anna Lorena, terapeuta capilar"
              loading="lazy"
              width={1024}
              height={1280}
              className="rounded-2xl object-cover aspect-[4/5] w-full max-w-md"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] font-heading font-semibold">
              Sobre Anna Lorena
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance">
              Terapia capilar que começa pela escuta.
            </h2>
            <p className="mt-6 text-background/80 leading-relaxed text-lg">
              Especialista em terapias naturais e bem-estar capilar, Anna Lorena criou a AL Bio
              para unir conhecimento ancestral, fitoterapia e prática clínica em produtos e
              rituais únicos. Cada fórmula nasce do consultório.
            </p>
            <Link
              to="/sobre"
              className="mt-8 inline-flex items-center gap-2 text-[color:var(--gold)] hover:underline"
            >
              Conheça a história <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-secondary font-heading font-semibold text-center">
          Quem usa, sente
        </p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl text-center">Histórias de cuidado</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-card border border-border rounded-2xl p-7 hover:shadow-lg transition-shadow">
              <Quote className="size-6 text-secondary" />
              <blockquote className="mt-4 font-display italic text-lg leading-relaxed text-foreground/90">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-heading font-semibold">{t.name}</span>
                <span className="block text-xs text-muted-foreground mt-1">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA TERAPIAS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-br from-secondary/30 via-[color:var(--cream)] to-primary/20 px-8 md:px-16 py-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-balance max-w-2xl mx-auto">
            Um cabelo saudável começa em consulta.
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-muted-foreground">
            Agende uma terapia capilar personalizada em Goiânia e descubra o protocolo certo para seus fios.
          </p>
          <a
            href="https://wa.me/5562983290822"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-primary/90 transition shadow-md shadow-primary/20"
          >
            Agendar pelo WhatsApp <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
