import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#cursos", label: "Cursos" },
  { href: "#bio", label: "Bio" },
  { href: "#musica", label: "Música" },
  { href: "#media", label: "Media" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#setup", label: "Setup" },
  { href: "#shows", label: "Shows" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteHeader({ variant = "landing" }: { variant?: "landing" | "app" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const signOut = async () => { await supabase.auth.signOut(); window.location.href = "/"; };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled || variant === "app"
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-widest text-primary">
          LEANDRO<span className="text-foreground">·</span>PAGURA
        </Link>

        {variant === "landing" && (
          <nav className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
        )}

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/cursos">Plataforma</Link>
          </Button>
          {user ? (
            <>
              {isAdmin && (
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin">Admin</Link>
                </Button>
              )}
              <Button asChild size="sm">
                <Link to="/mi-cuenta">Mi cuenta</Link>
              </Button>
              <Button onClick={signOut} variant="ghost" size="sm">Salir</Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Ingresar</Link>
            </Button>
          )}
        </div>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container-x py-4 flex flex-col gap-3">
            {variant === "landing" && NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground py-1">
                {n.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button asChild variant="outline" size="sm"><Link to="/cursos">Plataforma de Cursos</Link></Button>
              {user ? (
                <>
                  {isAdmin && <Button asChild variant="outline" size="sm"><Link to="/admin">Admin</Link></Button>}
                  <Button asChild size="sm"><Link to="/mi-cuenta">Mi cuenta</Link></Button>
                  <Button onClick={signOut} variant="ghost" size="sm">Salir</Button>
                </>
              ) : (
                <Button asChild size="sm"><Link to="/auth">Ingresar</Link></Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
