import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PlayCircle, Lock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/cursos/")({
  head: () => ({
    meta: [
      { title: "Cursos — Leandro Pagura" },
      { name: "description", content: "Plataforma de cursos de Leandro Pagura: masterclasses, técnica, escalas y rutinas de práctica para bajo eléctrico." },
      { property: "og:title", content: "Cursos — Leandro Pagura" },
      { property: "og:description", content: "Masterclasses, técnica, escalas y rutinas de práctica para bajo." },
    ],
  }),
  component: CursosIndex,
});

function formatPrice(cents: number) {
  if (cents === 0) return "Gratis";
  return `$${(cents / 100).toLocaleString("es-AR")}`;
}

function CursosIndex() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <SiteHeader variant="app" />
      <main className="pt-24 pb-16">
        <div className="container-x">
          <Badge className="mb-4">Plataforma</Badge>
          <h1 className="text-5xl md:text-6xl">Cursos</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Masterclasses, desarrollo de técnica, estudio de escalas complejas y rutinas de práctica.
          </p>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6 h-64 animate-pulse bg-card/40" />
            ))}
            {!isLoading && (courses ?? []).length === 0 && (
              <Card className="p-10 md:col-span-2 lg:col-span-3 text-center">
                <Lock className="mx-auto size-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold">Muy pronto</h3>
                <p className="text-muted-foreground mt-2">
                  Estamos preparando los primeros cursos. Volvé pronto o creá tu cuenta para
                  ser el primero en enterarte.
                </p>
                <Button asChild className="mt-6"><Link to="/auth">Crear cuenta</Link></Button>
              </Card>
            )}
            {(courses ?? []).map((c) => (
              <Link
                key={c.id}
                to="/cursos/$slug"
                params={{ slug: c.slug }}
                className="group"
              >
                <Card className="overflow-hidden bg-card/60 backdrop-blur border-border h-full flex flex-col transition-all group-hover:border-primary/40 group-hover:-translate-y-1">
                  <div className="aspect-video bg-muted overflow-hidden relative">
                    {c.cover_url ? (
                      <img src={c.cover_url} alt={c.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-primary/40">
                        <PlayCircle className="size-16" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">
                      {c.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-display text-2xl text-primary">{formatPrice(c.price_cents)}</span>
                      <span className="text-xs text-muted-foreground">Ver curso →</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
