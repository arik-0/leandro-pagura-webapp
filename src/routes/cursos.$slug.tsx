import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PlayCircle, Lock, CheckCircle2, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/cursos/$slug")({
  head: () => ({ meta: [{ title: "Curso — Leandro Pagura" }] }),
  component: CourseDetail,
});

function formatPrice(cents: number) {
  return cents === 0 ? "Gratis" : `$${(cents / 100).toLocaleString("es-AR")}`;
}

function CourseDetail() {
  const { slug } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  const { data: lessons } = useQuery({
    enabled: !!course,
    queryKey: ["lessons", course?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("id, title, description, duration_seconds, sort_order, is_published")
        .eq("course_id", course!.id)
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const { data: enrollment, refetch: refetchEnrollment } = useQuery({
    enabled: !!user && !!course,
    queryKey: ["enrollment", course?.id, user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("id")
        .eq("course_id", course!.id)
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  const enroll = async () => {
    if (!user) return navigate({ to: "/auth", search: { redirect: `/cursos/${slug}` } });
    if (!course) return;
    setEnrolling(true);
    const { error } = await supabase.from("enrollments").insert({ course_id: course.id, user_id: user.id });
    setEnrolling(false);
    if (error) return toast.error(error.message);
    toast.success("¡Te inscribiste al curso!");
    refetchEnrollment();
  };

  if (isLoading || !course) {
    return (
      <div className="min-h-screen">
        <SiteHeader variant="app" />
        <div className="pt-32 container-x">Cargando…</div>
      </div>
    );
  }

  const isEnrolled = !!enrollment;
  const isFree = course.price_cents === 0;

  return (
    <div className="min-h-screen">
      <SiteHeader variant="app" />
      <main className="pt-24 pb-16">
        <div className="container-x">
          <Link to="/cursos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="size-4" /> Volver a cursos
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {course.cover_url && (
                <div className="aspect-video overflow-hidden rounded-xl border border-border">
                  <img src={course.cover_url} alt={course.title} className="h-full w-full object-cover" />
                </div>
              )}
              <div>
                <Badge className="mb-3">Curso</Badge>
                <h1 className="text-4xl md:text-5xl">{course.title}</h1>
                {course.description && (
                  <p className="text-lg text-muted-foreground mt-4 whitespace-pre-line">{course.description}</p>
                )}
              </div>

              <div>
                <h2 className="text-2xl mb-4">Contenido del curso</h2>
                <div className="space-y-2">
                  {(lessons ?? []).map((l, i) => (
                    <Card key={l.id} className="p-4 flex items-center gap-4">
                      <div className="font-display text-2xl text-primary w-8">{String(i + 1).padStart(2, "0")}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{l.title}</div>
                        {l.description && <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{l.description}</div>}
                      </div>
                      {isEnrolled ? (
                        <Button asChild size="sm" variant="ghost">
                          <Link to="/cursos/$slug/$leccion" params={{ slug, leccion: l.id }}>
                            <PlayCircle className="size-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Lock className="size-4 text-muted-foreground" />
                      )}
                    </Card>
                  ))}
                  {(lessons ?? []).length === 0 && (
                    <p className="text-sm text-muted-foreground">Este curso todavía no tiene lecciones publicadas.</p>
                  )}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="font-display text-4xl text-primary">{formatPrice(course.price_cents)}</div>
                <div className="mt-6 space-y-3">
                  {isEnrolled ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <CheckCircle2 className="size-4" /> Ya estás inscripto
                      </div>
                      {lessons && lessons.length > 0 && (
                        <Button asChild className="w-full">
                          <Link to="/cursos/$slug/$leccion" params={{ slug, leccion: lessons[0].id }}>
                            Continuar curso
                          </Link>
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button className="w-full" onClick={enroll} disabled={enrolling}>
                      {enrolling ? "Inscribiendo…" : isFree ? "Inscribirme gratis" : "Inscribirme"}
                    </Button>
                  )}
                </div>
                <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground space-y-2">
                  <div>{lessons?.length ?? 0} lecciones</div>
                  <div>Acceso ilimitado</div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
