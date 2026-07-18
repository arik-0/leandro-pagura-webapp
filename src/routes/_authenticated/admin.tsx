import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Leandro Pagura" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Course = { id: string; slug: string; title: string; description: string | null; price_cents: number; is_published: boolean; sort_order: number; cover_url: string | null };
type Lesson = { id: string; course_id: string; title: string; description: string | null; sort_order: number; is_published: boolean; video_path: string | null; duration_seconds: number | null };

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast.error("Acceso restringido a administradores.");
      navigate({ to: "/" });
    }
  }, [loading, user, isAdmin, navigate]);

  const { data: courses } = useQuery({
    enabled: isAdmin,
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").order("sort_order");
      if (error) throw error;
      return data as Course[];
    },
  });

  const { data: lessons } = useQuery({
    enabled: !!selectedCourseId,
    queryKey: ["admin-lessons", selectedCourseId],
    queryFn: async () => {
      const { data, error } = await supabase.from("lessons").select("*").eq("course_id", selectedCourseId!).order("sort_order");
      if (error) throw error;
      return data as Lesson[];
    },
  });

  const reloadCourses = () => qc.invalidateQueries({ queryKey: ["admin-courses"] });
  const reloadLessons = () => qc.invalidateQueries({ queryKey: ["admin-lessons", selectedCourseId] });

  if (loading || !isAdmin) {
    return <div className="min-h-screen"><SiteHeader variant="app" /><div className="pt-32 container-x">Verificando permisos…</div></div>;
  }

  const selectedCourse = courses?.find((c) => c.id === selectedCourseId);

  return (
    <div className="min-h-screen">
      <SiteHeader variant="app" />
      <main className="pt-24 pb-16">
        <div className="container-x">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="mb-2">Panel administrativo</Badge>
              <h1 className="text-4xl">Cursos y lecciones</h1>
            </div>
            <CourseDialog onSaved={reloadCourses}>
              <Button><Plus className="mr-2 size-4" /> Nuevo curso</Button>
            </CourseDialog>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Courses list */}
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest text-muted-foreground px-2">Cursos</div>
              {(courses ?? []).map((c) => (
                <Card
                  key={c.id}
                  className={`p-4 cursor-pointer transition-colors ${selectedCourseId === c.id ? "border-primary/50 bg-primary/5" : "hover:bg-accent/20"}`}
                  onClick={() => setSelectedCourseId(c.id)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold truncate">{c.title}</div>
                      <div className="text-xs text-muted-foreground truncate">/{c.slug}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant={c.is_published ? "default" : "outline"} className="text-[10px]">
                        {c.is_published ? "Publicado" : "Borrador"}
                      </Badge>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
              {(courses ?? []).length === 0 && (
                <Card className="p-6 text-sm text-muted-foreground text-center">Sin cursos todavía.</Card>
              )}
            </div>

            {/* Course + lessons */}
            <div className="lg:col-span-2 space-y-4">
              {!selectedCourse ? (
                <Card className="p-10 text-center text-muted-foreground">
                  Seleccioná un curso para gestionarlo.
                </Card>
              ) : (
                <>
                  <Card className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl">{selectedCourse.title}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{selectedCourse.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <CourseDialog course={selectedCourse} onSaved={reloadCourses}>
                          <Button size="sm" variant="outline"><Pencil className="mr-2 size-4" /> Editar</Button>
                        </CourseDialog>
                        <Button size="sm" variant="destructive" onClick={async () => {
                          if (!confirm("¿Eliminar este curso y todas sus lecciones?")) return;
                          const { error } = await supabase.from("courses").delete().eq("id", selectedCourse.id);
                          if (error) return toast.error(error.message);
                          toast.success("Curso eliminado");
                          setSelectedCourseId(null);
                          reloadCourses();
                        }}>
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Lecciones</div>
                    <LessonDialog courseId={selectedCourse.id} nextOrder={(lessons?.length ?? 0) + 1} onSaved={reloadLessons}>
                      <Button size="sm"><Plus className="mr-2 size-4" /> Nueva lección</Button>
                    </LessonDialog>
                  </div>
                  <div className="space-y-2">
                    {(lessons ?? []).map((l, i) => (
                      <Card key={l.id} className="p-4 flex items-center gap-4">
                        <div className="font-display text-xl text-primary w-8">{String(i + 1).padStart(2, "0")}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{l.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{l.video_path ?? "Sin video"}</div>
                        </div>
                        <Badge variant={l.is_published ? "default" : "outline"} className="text-[10px]">
                          {l.is_published ? "Publicada" : "Borrador"}
                        </Badge>
                        <LessonDialog courseId={selectedCourse.id} nextOrder={l.sort_order} lesson={l} onSaved={reloadLessons}>
                          <Button size="icon" variant="ghost"><Pencil className="size-4" /></Button>
                        </LessonDialog>
                        <Button size="icon" variant="ghost" onClick={async () => {
                          if (!confirm("¿Eliminar esta lección?")) return;
                          const { error } = await supabase.from("lessons").delete().eq("id", l.id);
                          if (error) return toast.error(error.message);
                          toast.success("Lección eliminada");
                          reloadLessons();
                        }}>
                          <Trash2 className="size-4" />
                        </Button>
                      </Card>
                    ))}
                    {(lessons ?? []).length === 0 && (
                      <Card className="p-6 text-sm text-muted-foreground text-center">Sin lecciones todavía.</Card>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CourseDialog({ children, course, onSaved }: { children: React.ReactNode; course?: Course; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(course?.title ?? "");
  const [slug, setSlug] = useState(course?.slug ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [price, setPrice] = useState(course ? String(course.price_cents / 100) : "0");
  const [isPublished, setIsPublished] = useState(course?.is_published ?? false);
  const [coverUrl, setCoverUrl] = useState(course?.cover_url ?? "");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const save = async () => {
    setSaving(true);
    const payload = {
      title, slug: slug || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      description: description || null,
      price_cents: Math.round(parseFloat(price || "0") * 100),
      is_published: isPublished,
      cover_url: coverUrl || null,
    };
    const { error } = course
      ? await supabase.from("courses").update(payload).eq("id", course.id)
      : await supabase.from("courses").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(course ? "Curso actualizado" : "Curso creado");
    setOpen(false);
    onSaved();
  };

  const uploadCover = async (file: File) => {
    setUploading(true);
    const path = `${crypto.randomUUID()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("course-covers").upload(path, file, { upsert: true });
    if (upErr) { setUploading(false); return toast.error(upErr.message); }
    const { data } = supabase.storage.from("course-covers").getPublicUrl(path);
    setCoverUrl(data.publicUrl);
    setUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{course ? "Editar curso" : "Nuevo curso"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div><Label>Slug (URL)</Label><Input value={slug} placeholder="mi-curso" onChange={(e) => setSlug(e.target.value)} /></div>
          <div><Label>Descripción</Label><Textarea rows={4} value={description ?? ""} onChange={(e) => setDescription(e.target.value)} /></div>
          <div><Label>Precio (ARS, 0 = gratis)</Label><Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
          <div>
            <Label>Portada</Label>
            <div className="flex gap-2 items-center mt-1">
              <Input value={coverUrl} placeholder="https://…" onChange={(e) => setCoverUrl(e.target.value)} />
              <label className="cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} />
                <Button asChild variant="outline" size="icon"><span><Upload className="size-4" /></span></Button>
              </label>
            </div>
            {uploading && <p className="text-xs text-muted-foreground mt-1">Subiendo…</p>}
            {coverUrl && <img src={coverUrl} alt="" className="mt-2 rounded-md aspect-video object-cover w-full" />}
          </div>
          <div className="flex items-center justify-between">
            <Label>Publicado</Label>
            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={save} disabled={saving || !title}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LessonDialog({ children, courseId, nextOrder, lesson, onSaved }: { children: React.ReactNode; courseId: string; nextOrder: number; lesson?: Lesson; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(lesson?.title ?? "");
  const [description, setDescription] = useState(lesson?.description ?? "");
  const [videoPath, setVideoPath] = useState(lesson?.video_path ?? "");
  const [isPublished, setIsPublished] = useState(lesson?.is_published ?? false);
  const [duration, setDuration] = useState(lesson?.duration_seconds ? String(lesson.duration_seconds) : "");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(0);

  const uploadVideo = async (file: File) => {
    const path = `${courseId}/${crypto.randomUUID()}-${file.name}`;
    setUploading(1);
    const { error } = await supabase.storage.from("lesson-videos").upload(path, file, { upsert: true });
    setUploading(0);
    if (error) return toast.error(error.message);
    setVideoPath(path);
    toast.success("Video subido");
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      course_id: courseId, title,
      description: description || null,
      video_path: videoPath || null,
      duration_seconds: duration ? parseInt(duration, 10) : null,
      is_published: isPublished,
      sort_order: lesson?.sort_order ?? nextOrder,
    };
    const { error } = lesson
      ? await supabase.from("lessons").update(payload).eq("id", lesson.id)
      : await supabase.from("lessons").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(lesson ? "Lección actualizada" : "Lección creada");
    setOpen(false);
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{lesson ? "Editar lección" : "Nueva lección"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div><Label>Descripción</Label><Textarea rows={3} value={description ?? ""} onChange={(e) => setDescription(e.target.value)} /></div>
          <div>
            <Label>Video</Label>
            <div className="flex gap-2 items-center mt-1">
              <Input value={videoPath} placeholder="ruta/en/storage.mp4" onChange={(e) => setVideoPath(e.target.value)} />
              <label className="cursor-pointer">
                <input type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadVideo(e.target.files[0])} />
                <Button asChild variant="outline" size="icon"><span><Upload className="size-4" /></span></Button>
              </label>
            </div>
            {uploading > 0 && <p className="text-xs text-muted-foreground mt-1">Subiendo video…</p>}
          </div>
          <div><Label>Duración (segundos)</Label><Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} /></div>
          <div className="flex items-center justify-between">
            <Label>Publicada</Label>
            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={save} disabled={saving || !title}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
