import { Link, useNavigate } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

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

      </div>
      <div className="mt-4">
        <Link to="/loja/$slug" params={{ slug: product.slug }}>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 font-display text-lg font-bold text-foreground">{product.name}</h3>
        </Link>
        <p className="mt-2 font-heading font-semibold text-sm">R$ {product.price},00</p>
        <div className="mt-3 flex items-center gap-2">
          <Link
            to="/loja/$slug"
            params={{ slug: product.slug }}
            className="flex-1 text-center text-xs uppercase tracking-wider font-heading font-semibold border border-input rounded-lg py-2 hover:border-secondary hover:text-secondary transition"
          >
            VER
          </Link>
          <button
            onClick={() => {
              addItem(product);
              setAdded(true);
              toast("Adicionado ao carrinho", {
                description: product.name,
                action: {
                  label: "Ver carrinho",
                  onClick: () => navigate({ to: "/carrinho" }),
                },
              });
              setTimeout(() => setAdded(false), 1200);
            }}
            className="flex-1 text-center text-xs uppercase tracking-wider font-heading font-semibold bg-primary text-primary-foreground rounded-lg py-2 hover:bg-primary/90 transition cursor-pointer flex items-center justify-center gap-1.5"
            aria-label="Adicionar ao carrinho"
          >
            <span className={`inline-flex items-center gap-1.5 transition-transform duration-300 ${added ? "scale-0 w-0 overflow-hidden" : "scale-100"}`}>
              <ShoppingBag className="size-3.5" /> Carrinho
            </span>
            <span className={`inline-flex items-center gap-1.5 absolute transition-transform duration-300 ${added ? "scale-100" : "scale-0"}`}>
              <Check className="size-4" /> Adicionado
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}