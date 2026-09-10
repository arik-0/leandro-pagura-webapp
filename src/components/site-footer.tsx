import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24 bg-card/20">
      <div className="container-x py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="font-display text-lg tracking-widest text-foreground">
          LEANDRO<span className="text-primary">·</span>PAGURA
        </div>
        <div className="flex items-center gap-4">
          <div>© {new Date().getFullYear()} — Todos los derechos reservados.</div>
          <Link
            to="/admin"
            className="text-xs text-muted-foreground/60 hover:text-primary transition-colors flex items-center gap-1"
          >
            <Shield className="size-3" /> Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
