import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { useAdmin, AdminProvider } from "@/lib/admin-context";
import { LayoutDashboard, Package, ShoppingCart, Lock, LogOut, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({
    meta: [{ title: "Admin — AL Bio" }],
  }),
});

function AdminLayout() {
  return (
    <AdminProvider>
      <AdminLayoutInner />
    </AdminProvider>
  );
}

const nav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/produtos", label: "Produtos", icon: Package },
  { to: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
];

function AdminLayoutInner() {
  const { authed, logout } = useAdmin();
  const path = useLocation().pathname;

  if (!authed && path !== "/admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center space-y-4">
          <Lock className="size-12 mx-auto text-muted-foreground/40" />
          <p className="text-muted-foreground">Faça login para acessar o painel</p>
          <Link to="/admin" className="text-primary hover:underline text-sm">Ir para o login</Link>
        </div>
      </div>
    );
  }

  if (!authed) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      <aside className="w-64 shrink-0 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
            <ArrowLeft className="size-3" /> Voltar ao site
          </Link>
          <h1 className="mt-3 font-heading font-bold text-lg">AL Bio Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => {
            const active = path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  active
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition w-full cursor-pointer"
          >
            <LogOut className="size-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Mobile nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex">
        {nav.map((item) => {
          const active = path.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] uppercase tracking-wider transition ${
                active ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
        <button onClick={logout} className="flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] uppercase tracking-wider text-muted-foreground cursor-pointer">
          <LogOut className="size-4" /> Sair
        </button>
      </nav>

      <main className="flex-1 p-6 lg:p-10 pb-24 lg:pb-10">
        <Outlet />
      </main>
    </div>
  );
}
