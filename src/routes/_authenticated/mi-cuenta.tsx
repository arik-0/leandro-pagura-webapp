import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PlayCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/mi-cuenta")({
  head: () => ({ meta: [{ title: "Mi cuenta — Leandro Pagura" }, { name: "robots", content: "noindex" }] }),
  component: MiCuenta,
});

function MiCuenta() {
  const { user } = useAuth();
  const { data: enrollments, isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["enrollments", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("id, created_at, course:courses(id, slug, title, description, cover_url)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <SiteHeader variant="app" />
      <main className="pt-24 pb-16">
        <div className="container-x">
          <h1 className="text-4xl md:text-5xl">Mi cuenta</h1>
          <p className="text-muted-foreground mt-2">{user?.email}</p>

          <h2 className="text-2xl mt-12 mb-6">Mis cursos</h2>
          {isLoading && <p className="text-muted-foreground">Cargando…</p>}
          {!isLoading && (enrollments ?? []).length === 0 && (
            <Card className="p-10 text-center">
              <p className="text-muted-foreground">Todavía no estás inscripto a ningún curso.</p>
              <Button asChild className="mt-4"><Link to="/cursos">Explorar cursos</Link></Button>
            </Card>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(enrollments ?? []).map((e) => e.course && (
              <Link key={e.id} to="/cursos/$slug" params={{ slug: e.course.slug }}>
                <Card className="overflow-hidden h-full hover:border-primary/40 transition-all hover:-translate-y-1">
                  <div className="aspect-video bg-muted">
                    {e.course.cover_url ? (
                      <img src={e.course.cover_url} alt={e.course.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-primary/40"><PlayCircle className="size-16" /></div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">{e.course.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{e.course.description}</p>
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
