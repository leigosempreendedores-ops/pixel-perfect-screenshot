import { createFileRoute, Link } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin-context";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/produtos")({
  component: ProdutosList,
});

function ProdutosList() {
  const { products, deleteProduct } = useAdmin();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl">Produtos</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} produtos cadastrados</p>
        </div>
        <Link
          to="/admin/produtos/novo"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-heading font-semibold text-sm hover:bg-primary/90 transition"
        >
          <Plus className="size-4" /> Novo produto
        </Link>
      </div>

      <div className="mt-8 bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-4 font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">Produto</th>
              <th className="text-left p-4 font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Categoria</th>
              <th className="text-left p-4 font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">Preço</th>
              <th className="text-right p-4 font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.slug} className="border-b border-border last:border-0 hover:bg-muted/20">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-muted-foreground hidden sm:table-cell">{p.category}</td>
                <td className="p-4">R$ {p.price},00</td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-1">
                    <Link
                      to="/admin/produtos/$slug"
                      params={{ slug: p.slug }}
                      className="p-2 text-muted-foreground hover:text-primary transition"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <button
                      onClick={() => { if (confirm(`Excluir "${p.name}"?`)) deleteProduct(p.slug); }}
                      className="p-2 text-muted-foreground hover:text-destructive transition cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
