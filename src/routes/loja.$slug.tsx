import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/loja/$slug")({
  loader: ({ params }) => {
    const p = products.find((p) => p.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center px-6 py-24 text-center">
        <div>
          <h1 className="font-display text-3xl">Produto não encontrado</h1>
          <Link to="/loja" className="mt-4 inline-block text-primary hover:underline">Voltar para a loja</Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <p>{error.message}</p>
        <button onClick={reset} className="mt-4 text-primary underline">Tentar novamente</button>
      </div>
    </div>
  ),
});

function ProductPage() {
  const product = Route.useLoaderData();
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const { addItem, openCartSheet } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Link to="/loja" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Voltar à loja
        </Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
            <img src={product.image} alt={product.name} width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-secondary font-heading font-semibold">{product.category}</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-heading font-semibold">R$ {product.price},00</p>
            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            <ul className="mt-6 space-y-2">
              {product.badges.map((b: string) => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <Check className="size-4 text-secondary" /> {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  addItem(product);
                  toast("Adicionado ao carrinho", {
                    description: product.name,
                    action: {
                      label: "Ver carrinho",
                      onClick: () => openCartSheet(),
                    },
                  });
                }}
                className="bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-primary/90 transition shadow-md shadow-primary/20 cursor-pointer"
              >
                Adicionar ao carrinho
              </button>
              <a
                href={`https://wa.me/5562983290822?text=${encodeURIComponent(`Olá! Quero comprar o ${product.name} (R$ ${product.price},00)`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-foreground/15 hover:border-secondary px-7 py-3.5 rounded-xl font-heading font-semibold text-sm transition"
              >
                Comprar agora
              </a>
            </div>

            <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Modo de uso:</strong> aplique sobre os fios úmidos, massageie suavemente e deixe agir por alguns minutos.</p>
              <p><strong className="text-foreground">Ingredientes:</strong> ativos botânicos prensados a frio, óleos essenciais terapêuticos.</p>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-display text-3xl mb-8">Você também pode gostar</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
