import { useCart } from "@/lib/cart-context";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CartSheet() {
  const { items, totalItems, totalPrice, sheetOpen, closeCartSheet, removeItem, updateQuantity, clearCart } = useCart();

  const whatsappText =
    items.length > 0
      ? encodeURIComponent(
          `Olá! Gostaria de finalizar o pedido:\n\n${items
            .map(
              (i) =>
                `• ${i.product.name} (${i.quantity}x) — R$ ${(i.product.price * i.quantity).toFixed(2).replace(".", ",")}`,
            )
            .join("\n")}\n\nTotal: R$ ${totalPrice.toFixed(2).replace(".", ",")}`,
        )
      : "";

  return (
    <Sheet open={sheetOpen} onOpenChange={(v) => { if (!v) closeCartSheet(); }}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="size-4" />
            Carrinho {totalItems > 0 && `(${totalItems})`}
          </SheetTitle>
          <SheetDescription className="sr-only">Itens do carrinho de compras</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
            <ShoppingBag className="size-12 text-muted-foreground/40" />
            <p className="text-muted-foreground">Seu carrinho está vazio</p>
            <Link
              to="/loja"
              onClick={() => closeCartSheet()}
              className="text-sm text-primary hover:underline"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.product.slug} className="flex gap-4">
                    <div className="size-20 shrink-0 rounded-lg bg-muted overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        R$ {item.product.price},00
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                          className="size-7 rounded-full border border-input flex items-center justify-center hover:bg-accent transition cursor-pointer"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-sm w-6 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                          className="size-7 rounded-full border border-input flex items-center justify-center hover:bg-accent transition cursor-pointer"
                        >
                          <Plus className="size-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.slug)}
                          className="ml-auto size-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive transition cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold">R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
              </div>
              <a
                href={`https://wa.me/5562983290822?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-primary/90 transition shadow-md shadow-primary/20"
                onClick={() => closeCartSheet()}
              >
                Finalizar pedido no WhatsApp
              </a>
              <button
                onClick={clearCart}
                className="w-full text-xs text-muted-foreground hover:text-foreground text-center cursor-pointer"
              >
                Limpar carrinho
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
