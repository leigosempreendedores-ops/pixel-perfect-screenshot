import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin-context";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/produtos_/$slug")({
  component: ProdutoEdit,
});

const categorias = ["Sabonetes Artesanais", "Shampoos Sólidos", "Condicionadores", "Óleos Terapêuticos", "Tônicos Capilares"];

function ProdutoEdit() {
  const { slug } = useParams({ from: "/admin/produtos/$slug" });
  const { products, updateProduct } = useAdmin();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(categorias[0]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [badgesText, setBadgesText] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(String(product.price));
      setDescription(product.description);
      setBadgesText(product.badges.join(", "));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Produto não encontrado.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    const badges = badgesText.split(",").map((b) => b.trim()).filter(Boolean);
    updateProduct(slug, {
      slug,
      name,
      category,
      price: Number(price),
      description,
      image: product.image,
      badges,
    });
    navigate({ to: "/admin/produtos" });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading font-bold text-2xl">Editar produto</h1>
      <p className="text-sm text-muted-foreground mt-1">{slug}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 bg-card border border-border rounded-xl p-6">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-heading font-semibold">Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-heading font-semibold">Categoria</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary">
            {categorias.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-heading font-semibold">Preço (R$)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min={0} step={1} className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-heading font-semibold">Descrição</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none" />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-heading font-semibold">Badges (separados por vírgula)</label>
          <input value={badgesText} onChange={(e) => setBadgesText(e.target.value)} placeholder="Vegano, Artesanal, Natural" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-heading font-semibold text-sm hover:bg-primary/90 transition cursor-pointer">
            Salvar alterações
          </button>
          <button type="button" onClick={() => navigate({ to: "/admin/produtos" })} className="px-6 py-3 rounded-xl font-heading font-semibold text-sm border border-input hover:bg-accent transition cursor-pointer">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
