import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useState } from "react";

export const Route = createFileRoute("/loja")({
  component: Loja,
  head: () => ({
    meta: [
      { title: "Loja — AL Bio Cosméticos Naturais" },
      { name: "description", content: "Shampoos sólidos, óleos terapêuticos, máscaras e tônicos capilares artesanais." },
    ],
  }),
});

const categorias = ["Todos", "Shampoos Sólidos", "Condicionadores", "Óleos Terapêuticos", "Tônicos Capilares"];

function Loja() {
  const [cat, setCat] = useState("Todos");
  const list = cat === "Todos" ? products : products.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <header className="border-b border-border/60 bg-[color:var(--cream)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-secondary font-heading font-semibold">Loja</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Rituais para seus cabelos</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Produzidos em pequenos lotes, com ingredientes botânicos selecionados.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside>
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Categoria</h2>
          <ul className="space-y-2">
            {categorias.map((c) => (
              <li key={c}>
                <button
                  onClick={() => setCat(c)}
                  className={`text-left text-sm hover:text-primary transition ${
                    cat === c ? "text-primary font-semibold" : "text-foreground/70"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
