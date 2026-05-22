import { createFileRoute, Link } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin-context";
import { Package, ShoppingCart, BadgeDollarSign, Layers } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { products, orders } = useAdmin();

  const totalProdutos = products.length;
  const categorias = new Set(products.map((p) => p.category)).size;
  const totalPedidos = orders.length;
  const faturamento = orders.reduce((s, o) => s + o.total, 0);

  const cards = [
    { label: "Produtos", value: totalProdutos, icon: Package, color: "text-primary" },
    { label: "Categorias", value: categorias, icon: Layers, color: "text-secondary" },
    { label: "Pedidos", value: totalPedidos, icon: ShoppingCart, color: "text-gold" },
    { label: "Faturamento", value: `R$ ${faturamento.toFixed(0)}`, icon: BadgeDollarSign, color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl">Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1">Visão geral da loja</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <c.icon className={`size-8 ${c.color}`} strokeWidth={1.5} />
              <div>
                <p className="text-2xl font-bold">{c.value}</p>
                <p className="text-xs text-muted-foreground">{c.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-heading font-semibold">Produtos recentes</h2>
          <ul className="mt-4 space-y-2">
            {products.slice(0, 5).map((p) => (
              <li key={p.slug} className="flex justify-between text-sm">
                <span>{p.name}</span>
                <span className="text-muted-foreground">R$ {p.price},00</span>
              </li>
            ))}
          </ul>
          <Link to="/admin/produtos" className="mt-4 inline-block text-xs text-primary hover:underline">
            Ver todos os produtos →
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-heading font-semibold">Últimos pedidos</h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Nenhum pedido registrado ainda.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex justify-between text-sm">
                  <span>{o.customer || "Anônimo"}</span>
                  <span className="text-muted-foreground">R$ {o.total.toFixed(2).replace(".", ",")}</span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/admin/pedidos" className="mt-4 inline-block text-xs text-primary hover:underline">
            Ver todos os pedidos →
          </Link>
        </div>
      </div>
    </div>
  );
}
