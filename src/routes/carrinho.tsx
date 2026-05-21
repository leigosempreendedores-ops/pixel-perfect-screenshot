import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import type { CartItem } from "@/lib/cart-context";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCallback, useRef, memo, useId } from "react";

export const Route = createFileRoute("/carrinho")({
  component: Carrinho,
  head: () => ({
    meta: [
      { title: "Carrinho — AL Bio Cosméticos Naturais" },
      { name: "description", content: "Revise seu carrinho de compras." },
    ],
  }),
});

function Carrinho() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  const handleSubmit = useCallback((whatsappText: string) => {
    window.open(`https://wa.me/5562983290822?text=${whatsappText}`, "_blank", "noreferrer");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-4xl w-full px-6 py-12 flex-1">
        <Link to="/loja" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="size-4" /> Continuar comprando
        </Link>

        <h1 className="font-display text-4xl md:text-5xl mb-2">Carrinho</h1>
        {totalItems > 0 && (
          <p className="text-muted-foreground mb-8">{totalItems} {totalItems === 1 ? "item" : "itens"}</p>
        )}

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 text-center py-24">
            <ShoppingBag className="size-16 text-muted-foreground/30" />
            <p className="text-lg text-muted-foreground">Seu carrinho está vazio</p>
            <Link to="/loja" className="text-primary hover:underline">Ver produtos</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.slug} className="flex gap-4 bg-card border border-border rounded-2xl p-4">
                <div className="size-24 shrink-0 rounded-xl bg-muted overflow-hidden">
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.product.category}</p>
                    <h3 className="font-display text-lg font-bold">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">R$ {item.product.price},00</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                      className="size-8 rounded-full border border-input flex items-center justify-center hover:bg-accent transition cursor-pointer"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="text-sm w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                      className="size-8 rounded-full border border-input flex items-center justify-center hover:bg-accent transition cursor-pointer"
                    >
                      <Plus className="size-3.5" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.slug)}
                      className="ml-2 size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive transition cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading font-semibold">
                    R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            ))}

            <DeliveryForm items={items} totalPrice={totalPrice} clearCart={clearCart} onSend={handleSubmit} />
          </div>
        )}
      </section>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}

const DeliveryForm = memo(function DeliveryForm({
  items,
  totalPrice,
  clearCart,
  onSend,
}: {
  items: CartItem[];
  totalPrice: number;
  clearCart: () => void;
  onSend: (text: string) => void;
}) {
  const uid = useId();
  const nomeRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);
  const ruaRef = useRef<HTMLInputElement>(null);
  const numeroRef = useRef<HTMLInputElement>(null);
  const bairroRef = useRef<HTMLInputElement>(null);
  const cidadeRef = useRef<HTMLInputElement>(null);
  const complementoRef = useRef<HTMLInputElement>(null);
  const observacoesRef = useRef<HTMLTextAreaElement>(null);

  const buildWhatsappText = () => {
    const get = (ref: { current: HTMLInputElement | HTMLTextAreaElement | null }) =>
      ref.current?.value ?? "";

    const customerBlock = [
      get(nomeRef) && `Nome: ${get(nomeRef)}`,
      get(telefoneRef) && `Telefone: ${get(telefoneRef)}`,
      (get(ruaRef) || get(numeroRef)) && `Endereço: ${get(ruaRef)}${get(numeroRef) ? `, ${get(numeroRef)}` : ""}`,
      get(bairroRef) && `Bairro: ${get(bairroRef)}`,
      get(cidadeRef) && `Cidade: ${get(cidadeRef)}`,
      get(complementoRef) && `Complemento: ${get(complementoRef)}`,
      get(observacoesRef) && `Observações: ${get(observacoesRef)}`,
    ].filter(Boolean);

    const text = `Olá! Gostaria de finalizar o pedido:\n\n${items
      .map(
        (i) =>
          `• ${i.product.name} (${i.quantity}x) — R$ ${(i.product.price * i.quantity).toFixed(2).replace(".", ",")}`,
      )
      .join("\n")}\n\nTotal: R$ ${totalPrice.toFixed(2).replace(".", ",")}${customerBlock.length ? `\n\n--- Dados do Cliente ---\n${customerBlock.join("\n")}` : ""}`;

    return encodeURIComponent(text);
  };

  return (
    <div className="bg-card border border-border rounded-2xl mt-6">
      <div className="p-6 pb-0">
        <h2 className="font-heading font-semibold">Dados de entrega</h2>
        <p className="text-xs text-muted-foreground mt-1 mb-6">Preencha para incluirmos no pedido</p>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-nome`} className="text-xs font-medium text-muted-foreground">Nome completo</label>
              <input id={`${uid}-nome`} ref={nomeRef} defaultValue="" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-hidden focus:border-primary" />
            </div>
            <div>
              <label htmlFor={`${uid}-tel`} className="text-xs font-medium text-muted-foreground">Telefone / WhatsApp</label>
              <input id={`${uid}-tel`} ref={telefoneRef} defaultValue="" placeholder="(62) 99999-0000" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-hidden focus:border-primary" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_100px]">
            <div>
              <label htmlFor={`${uid}-rua`} className="text-xs font-medium text-muted-foreground">Rua</label>
              <input id={`${uid}-rua`} ref={ruaRef} defaultValue="" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-hidden focus:border-primary" />
            </div>
            <div>
              <label htmlFor={`${uid}-num`} className="text-xs font-medium text-muted-foreground">Número</label>
              <input id={`${uid}-num`} ref={numeroRef} defaultValue="" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-hidden focus:border-primary" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-bairro`} className="text-xs font-medium text-muted-foreground">Bairro</label>
              <input id={`${uid}-bairro`} ref={bairroRef} defaultValue="" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-hidden focus:border-primary" />
            </div>
            <div>
              <label htmlFor={`${uid}-cidade`} className="text-xs font-medium text-muted-foreground">Cidade</label>
              <input id={`${uid}-cidade`} ref={cidadeRef} defaultValue="" placeholder="Goiânia" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-hidden focus:border-primary" />
            </div>
          </div>
          <div>
            <label htmlFor={`${uid}-comp`} className="text-xs font-medium text-muted-foreground">Complemento</label>
            <input id={`${uid}-comp`} ref={complementoRef} defaultValue="" placeholder="Apto, bloco, referência..." className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-hidden focus:border-primary" />
          </div>
          <div>
            <label htmlFor={`${uid}-obs`} className="text-xs font-medium text-muted-foreground">Observações</label>
            <textarea id={`${uid}-obs`} ref={observacoesRef} defaultValue="" rows={3} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-hidden focus:border-primary resize-none" />
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-6" />
      <div className="p-6">
        <div className="flex justify-between text-lg">
          <span className="text-muted-foreground">Total</span>
          <span className="font-bold">R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
        </div>
        <button
          onClick={() => onSend(buildWhatsappText())}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-primary/90 shadow-md shadow-primary/20 cursor-pointer"
        >
          Finalizar pedido no WhatsApp
        </button>
        <button
          onClick={clearCart}
          className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground text-center cursor-pointer"
        >
          Limpar carrinho
        </button>
      </div>
    </div>
  );
});
