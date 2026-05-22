import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin-context";
import { useState } from "react";

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
});

function AdminLogin() {
  const { authed, login } = useAdmin();
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  if (authed) {
    navigate({ to: "/admin/dashboard", replace: true });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-xl">
        <h1 className="font-heading font-bold text-xl text-center">Admin AL Bio</h1>
        <p className="text-sm text-muted-foreground text-center mt-1">Insira a senha para acessar</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (login(pass)) {
              navigate({ to: "/admin/dashboard", replace: true });
            } else {
              setError(true);
              setPass("");
            }
          }}
          className="mt-6 space-y-4"
        >
          <input
            type="password"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setError(false); }}
            placeholder="Senha"
            autoFocus
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary"
          />
          {error && <p className="text-xs text-destructive">Senha incorreta</p>}
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-heading font-semibold text-sm hover:bg-primary/90 transition cursor-pointer">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
