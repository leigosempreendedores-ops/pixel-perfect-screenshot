import { createFileRoute } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin-context";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/pedidos")({
  component: PedidosList,
});

function PedidosList() {
  const { orders, deleteOrder } = useAdmin();

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl">Pedidos</h1>
      <p className="text-sm text-muted-foreground mt-1">{orders.length} pedidos registrados</p>

      {orders.length === 0 ? (
        <div className="mt-8 text-center py-16 text-muted-foreground">
          <p>Nenhum pedido registrado ainda.</p>
          <p className="text-xs mt-2">Os pedidos são registrados manualmente pelo painel.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-heading font-semibold text-sm">
                    {o.customer || "Anônimo"}
                    {o.phone && <span className="text-muted-foreground font-normal"> — {o.phone}</span>}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{new Date(o.date).toLocaleString("pt-BR")}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold">R$ {o.total.toFixed(2).replace(".", ",")}</span>
                  <button
                    onClick={() => { if (confirm("Excluir pedido?")) deleteOrder(o.id); }}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {o.items.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
