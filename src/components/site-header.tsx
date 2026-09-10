import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useAdminSession } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";

// Exactly as requested: Inicio | Bio | Música | Proyectos | Shows | Cursos | Media | Setup | Contacto
const NAV = [
  { href: "#home", label: "Inicio" },
  { href: "#bio", label: "Bio" },
  { href: "#musica", label: "Música" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#shows", label: "Shows" },
  { href: "#cursos", label: "Cursos" },
  { href: "/media", label: "Media", isPage: true },
  { href: "#setup", label: "Setup" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteHeader({ variant = "landing" }: { variant?: "landing" | "app" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAdmin: isSupabaseAdmin } = useAuth();
  const { isAdmin: isSessionAdmin, setAdminLogin } = useAdminSession();
  const isAdmin = isSupabaseAdmin || isSessionAdmin;

  const routerState = useRouterState();
  const isHome = routerState?.location?.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    setAdminLogin(false);
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    window.location.href = "/";
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || variant === "app"
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl tracking-widest text-primary hover:opacity-90 transition-opacity"
        >
          LEANDRO<span className="text-foreground">·</span>PAGURA
        </Link>

        <nav className="hidden xl:flex items-center gap-6 text-sm text-muted-foreground font-medium">
          {NAV.map((n) => {
            if (n.isPage) {
              return (
                <Link
                  key={n.href}
                  to={n.href}
                  className="hover:text-foreground transition-colors hover:text-primary"
                >
                  {n.label}
                </Link>
              );
            }
            const targetHref = isHome ? n.href : `/${n.href}`;
            return (
              <a
                key={n.href}
                href={targetHref}
                className="hover:text-foreground transition-colors hover:text-primary"
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isAdmin ? (
            <>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-primary/40 text-primary"
              >
                <Link to="/admin">
                  <Shield className="size-3.5 mr-1" /> Panel Admin
                </Link>
              </Button>
              <Button onClick={handleSignOut} variant="ghost" size="sm">
                Salir
              </Button>
            </>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/admin">
                <Shield className="size-3.5 mr-1" /> Admin
              </Link>
            </Button>
          )}
        </div>

        <button
          className="xl:hidden text-foreground p-2 rounded-lg hover:bg-muted/40 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-background/95 backdrop-blur-2xl">
          <div className="container-x py-5 flex flex-col gap-2">
            {NAV.map((n) => {
              if (n.isPage) {
                return (
                  <Link
                    key={n.href}
                    to={n.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-muted-foreground hover:text-primary py-1.5 transition-colors"
                  >
                    {n.label}
                  </Link>
                );
              }
              const targetHref = isHome ? n.href : `/${n.href}`;
              return (
                <a
                  key={n.href}
                  href={targetHref}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-primary py-1.5 transition-colors"
                >
                  {n.label}
                </a>
              );
            })}
            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-border">
              {isAdmin ? (
                <>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/admin" onClick={() => setOpen(false)}>
                      <Shield className="size-3.5 mr-1" /> Panel Admin
                    </Link>
                  </Button>
                  <Button onClick={handleSignOut} variant="ghost" size="sm" className="w-full">
                    Salir
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground"
                >
                  <Link to="/admin" onClick={() => setOpen(false)}>
                    <Shield className="size-3.5 mr-1" /> Admin
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
