import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/loja/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.badges.map((b) => (
            <span key={b} className="text-[10px] uppercase tracking-widest bg-background/90 text-foreground/80 px-2 py-1 rounded-full">
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 font-display text-lg font-bold text-foreground">{product.name}</h3>
        </div>
        <div className="text-right shrink-0">
          <p className="font-heading font-semibold">R$ {product.price},00</p>
          <p className="text-xs text-primary mt-1 group-hover:underline">Ver produto →</p>
        </div>
      </div>
    </Link>
  );
}
