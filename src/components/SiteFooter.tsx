import { Link } from "@tanstack/react-router";
import { Instagram, Phone, MapPin } from "lucide-react";
import logoSrc from "@/assets/logo.jpg";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-foreground text-background/90">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logoSrc} alt="AL Bio" className="h-12 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-sm text-background/70 leading-relaxed">
            Cosméticos naturais artesanais e terapias capilares com Anna Lorena.
            Cuidado verdadeiro, da raiz à ponta.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-[color:var(--gold)]">
            Navegação
          </h4>
          <ul className="mt-4 space-y-2 text-background/80 text-sm">
            <li><Link to="/loja">Loja</Link></li>
            <li><Link to="/sobre">Sobre Anna Lorena</Link></li>
            <li><Link to="/terapias">Terapias Capilares</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-[color:var(--gold)]">
            Contato
          </h4>
          <ul className="mt-4 space-y-3 text-background/80 text-sm">
            <li className="flex items-center gap-2"><Phone className="size-4" /> +55 (62) 98329-0822</li>
            <li className="flex items-center gap-2"><MapPin className="size-4" /> Goiânia, Goiás — Brasil</li>
            <li className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com/albiocosmeticos" target="_blank" rel="noreferrer" className="hover:text-[color:var(--gold)]">
                <Instagram className="size-5" />
              </a>
              <a href="https://instagram.com/annalorenaterapeutacapilar" target="_blank" rel="noreferrer" className="hover:text-[color:var(--gold)]">
                <Instagram className="size-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-background/60 flex justify-between">
          <span>© {new Date().getFullYear()} AL Bio Cosméticos Naturais</span>
          <span>Feito à mão, com a natureza.</span>
        </div>
      </div>
    </footer>
  );
}
