import { Link } from "@tanstack/react-router";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { CartSheet } from "@/components/CartSheet";

const links = [
  { to: "/", label: "Home" },
  { to: "/loja", label: "Loja" },
  { to: "/sobre", label: "Sobre Anna Lorena" },
  { to: "/terapias", label: "Terapias Capilares" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handler = () => setCartOpen(true);
    window.addEventListener("open-cart", handler);
    return () => window.removeEventListener("open-cart", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="font-display text-2xl tracking-tight">
          AL <span className="text-secondary italic">Bio</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-foreground/80 hover:text-primary transition cursor-pointer"
          >
            <ShoppingBag className="size-5" />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      {open && (
        <nav className="lg:hidden border-t border-border/60 bg-background">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-foreground/80 py-1"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { setCartOpen(true); setOpen(false); }}
              className="flex items-center gap-2 text-foreground/80 py-1 cursor-pointer"
            >
              <ShoppingBag className="size-4" /> Carrinho
              {totalItems > 0 && <span className="text-xs text-primary">({totalItems})</span>}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
