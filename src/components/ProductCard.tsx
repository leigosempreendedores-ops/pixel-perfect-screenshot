import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <div className="group">
      <Link to="/loja/$slug" params={{ slug: product.slug }}>
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
      </Link>
      <div className="mt-4">
        <Link to="/loja/$slug" params={{ slug: product.slug }}>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 font-display text-lg font-bold text-foreground">{product.name}</h3>
        </Link>
        <p className="mt-2 font-heading font-semibold text-sm">R$ {product.price},00</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <Link
            to="/loja/$slug"
            params={{ slug: product.slug }}
            className="flex-1 text-center border border-foreground/15 hover:border-secondary px-3 py-2 rounded-lg font-heading font-semibold text-xs transition"
          >
            Ver Produto
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
            className="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded-lg font-heading font-semibold text-xs hover:bg-primary/90 transition cursor-pointer"
          >
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );
}