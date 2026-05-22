import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin-context";
import { useState } from "react";

export const Route = createFileRoute("/admin/produtos_/novo")({
  component: ProdutoForm,
});

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const categorias = ["Sabonetes Artesanais", "Shampoos Sólidos", "Condicionadores", "Óleos Terapêuticos", "Tônicos Capilares"];

function ProdutoForm() {
  const { addProduct } = useAdmin();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categorias[0]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [badgesText, setBadgesText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    const slug = slugify(name);
    const badges = badgesText.split(",").map((b) => b.trim()).filter(Boolean);
    addProduct({
      slug,
      name,
      category,
      price: Number(price),
      description,
      image: "",
      badges,
    });
    navigate({ to: "/admin/produtos" });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading font-bold text-2xl">Novo produto</h1>
      <p className="text-sm text-muted-foreground mt-1">Preencha os dados do novo produto</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 bg-card border border-border rounded-xl p-6">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-heading font-semibold">Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" />
          <p className="mt-1 text-xs text-muted-foreground">Slug: {slugify(name) || "..."}</p>
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
            Salvar produto
          </button>
          <button type="button" onClick={() => navigate({ to: "/admin/produtos" })} className="px-6 py-3 rounded-xl font-heading font-semibold text-sm border border-input hover:bg-accent transition cursor-pointer">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
