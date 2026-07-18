import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowLeft, PlayCircle, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/cursos/$slug/$leccion")({
  head: () => ({ meta: [{ title: "Lección — Leandro Pagura" }, { name: "robots", content: "noindex" }] }),
  component: LessonPlayer,
});

function LessonPlayer() {
  const { slug, leccion } = Route.useParams();
  const { user } = useAuth();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  const { data: course } = useQuery({
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
    queryKey: ["lessons", course?.id, "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("id, title, duration_seconds, sort_order, video_path")
        .eq("course_id", course!.id)
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const { data: progress, refetch: refetchProgress } = useQuery({
    enabled: !!user && !!course,
    queryKey: ["progress", course?.id, user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data;
    },
  });

  const current = lessons?.find((l) => l.id === leccion);

  useEffect(() => {
    if (!current?.video_path) { setVideoUrl(null); return; }
    setVideoUrl(null);
    setUrlError(null);
    supabase.storage.from("lesson-videos").createSignedUrl(current.video_path, 3600)
      .then(({ data, error }) => {
        if (error) setUrlError(error.message);
        else setVideoUrl(data.signedUrl);
      });
  }, [current?.video_path]);

  const completedIds = new Set((progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id));

  const markComplete = async () => {
    if (!user || !current) return;
    const { error } = await supabase.from("lesson_progress").upsert({
      user_id: user.id,
      lesson_id: current.id,
      completed: true,
    }, { onConflict: "user_id,lesson_id" });
    if (error) return;
    refetchProgress();
  };

  if (!course || !lessons) {
    return (
      <div className="min-h-screen">
        <SiteHeader variant="app" />
        <div className="pt-32 container-x">Cargando…</div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen">
        <SiteHeader variant="app" />
        <div className="pt-32 container-x">Lección no encontrada.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader variant="app" />
      <main className="pt-24 pb-16">
        <div className="container-x">
          <Link to="/cursos/$slug" params={{ slug }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="size-4" /> Volver al curso
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="aspect-video bg-black rounded-xl overflow-hidden border border-border flex items-center justify-center">
                {videoUrl ? (
                  <video src={videoUrl} controls className="w-full h-full" />
                ) : urlError ? (
                  <div className="text-sm text-destructive p-6 text-center">No se pudo cargar el video: {urlError}</div>
                ) : current.video_path ? (
                  <div className="text-muted-foreground">Cargando video…</div>
                ) : (
                  <div className="text-muted-foreground text-center p-6">
                    <PlayCircle className="mx-auto size-12 mb-2 text-primary/50" />
                    Video pendiente de subida
                  </div>
                )}
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl">{current.title}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{course.title}</p>
                </div>
                <Button onClick={markComplete} variant={completedIds.has(current.id) ? "outline" : "default"}>
                  <CheckCircle2 className="mr-2 size-4" />
                  {completedIds.has(current.id) ? "Completada" : "Marcar completada"}
                </Button>
              </div>
            </div>

            <aside>
              <Card className="p-4 sticky top-24">
                <div className="font-semibold mb-3 px-2">Lecciones</div>
                <div className="space-y-1">
                  {lessons.map((l, i) => (
                    <Link
                      key={l.id}
                      to="/cursos/$slug/$leccion"
                      params={{ slug, leccion: l.id }}
                      className={`flex items-center gap-3 p-3 rounded-md text-sm transition-colors ${
                        l.id === current.id ? "bg-primary/10 text-primary" : "hover:bg-accent/30"
                      }`}
                    >
                      <span className="font-display text-xl w-6">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1 truncate">{l.title}</span>
                      {completedIds.has(l.id) && <CheckCircle2 className="size-4 text-primary" />}
                    </Link>
                  ))}
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
