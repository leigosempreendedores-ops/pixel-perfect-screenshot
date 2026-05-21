import { Link, useNavigate } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { ShoppingBag, ArrowUp } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted group">
        <Link to="/loja/$slug" params={{ slug: product.slug }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.badges.map((b) => (
            <span key={b} className="text-[10px] uppercase tracking-widest bg-background/90 text-foreground/80 px-2 py-1 rounded-full">
              {b}
            </span>
          ))}
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <Link
            to="/loja/$slug"
            params={{ slug: product.slug }}
            className="size-12 flex flex-col items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-foreground/15 hover:border-secondary hover:text-secondary transition shrink-0"
          >
            <ArrowUp className="size-3" />
            <span className="font-heading font-semibold text-[9px] leading-none mt-0.5">VER</span>
          </Link>
          <button
            onClick={() => {
              addItem(product);
              toast("Adicionado ao carrinho", {
                description: product.name,
                action: {
                  label: "Ver carrinho",
                  onClick: () => navigate({ to: "/carrinho" }),
                },
              });
            }}
            className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition cursor-pointer shrink-0"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingBag className="size-4" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/loja/$slug" params={{ slug: product.slug }}>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 font-display text-lg font-bold text-foreground">{product.name}</h3>
        </Link>
        <p className="mt-2 font-heading font-semibold text-sm">R$ {product.price},00</p>
      </div>
    </div>
  );
}