import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Play,
  Image as ImageIcon,
  Video,
  ExternalLink,
  Search,
  Filter,
  ArrowLeft,
  Shield,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGallery, useAdminSession, extractYouTubeId, GalleryItem } from "@/lib/site-data";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Galería de Fotos y Videos — Leandro Pagura" },
      {
        name: "description",
        content:
          "Galería oficial de Leandro Pagura: videos en vivo, grabaciones de estudio de jazz fusión y funk, y fotografías oficiales.",
      },
      { property: "og:title", content: "Galería de Fotos y Videos — Leandro Pagura" },
      {
        property: "og:description",
        content: "Sesiones en vivo, material audiovisual de cuarteto y grabaciones en estudio.",
      },
    ],
  }),
  component: MediaPage,
});

function MediaPage() {
  const items = useGallery();
  const { isAdmin: isSupabaseAdmin } = useAuth();
  const { isAdmin: isSessionAdmin } = useAdminSession();
  const isAdmin = isSupabaseAdmin || isSessionAdmin;

  const [filter, setFilter] = useState<"all" | "video" | "image">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Extract unique categories
  const categories = ["all", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];

  // Filtering
  const filteredItems = items.filter((item) => {
    // Type filter
    if (filter !== "all" && item.type !== filter) return false;
    // Category filter
    if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchCat = item.category?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }
    return true;
  });

  const totalVideos = items.filter((i) => i.type === "video").length;
  const totalPhotos = items.filter((i) => i.type === "image").length;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-primary-foreground">
      <SiteHeader variant="app" />

      <main className="pt-24 pb-20 flex-1">
        {/* Page Hero Header */}
        <section className="relative py-12 md:py-16 overflow-hidden border-b border-border/60 bg-gradient-to-b from-card/40 via-background to-background">
          <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-primary/10 blur-[130px] pointer-events-none rounded-full" />

          <FadeIn className="container-x relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-foreground pl-0"
              >
                <Link to="/">
                  <ArrowLeft className="size-4 mr-1.5" /> Volver al Inicio
                </Link>
              </Button>
              <span className="text-muted-foreground/40">/</span>
              <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5">
                Galería Oficial
              </Badge>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h1 className="text-5xl md:text-7xl font-display tracking-tight text-foreground">
                  Galería <span className="text-primary">Audiovisual</span>
                </h1>
                <p className="mt-3 text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed text-balance">
                  Explorá las sesiones en vivo de jazz fusión, tomas en estudio, fotografías de
                  prensa y composiciones originales de Leandro Pagura.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card/60 px-3.5 py-2 rounded-xl border border-border">
                  <span className="font-semibold text-foreground">{totalVideos}</span> Videos
                  <span className="text-border">·</span>
                  <span className="font-semibold text-foreground">{totalPhotos}</span> Fotografías
                </div>

                {isAdmin && (
                  <Button asChild size="sm" className="shadow-md">
                    <Link to="/admin">
                      <Shield className="size-3.5 mr-1.5" /> Cargar Nuevo
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-card/60 p-2.5 rounded-2xl border border-border/80 backdrop-blur">
              {/* Type toggle */}
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant={filter === "all" ? "default" : "ghost"}
                  onClick={() => setFilter("all")}
                  className="text-xs"
                >
                  Todos ({items.length})
                </Button>
                <Button
                  size="sm"
                  variant={filter === "video" ? "default" : "ghost"}
                  onClick={() => setFilter("video")}
                  className="text-xs flex items-center gap-1.5"
                >
                  <Video className="size-3.5" /> Videos ({totalVideos})
                </Button>
                <Button
                  size="sm"
                  variant={filter === "image" ? "default" : "ghost"}
                  onClick={() => setFilter("image")}
                  className="text-xs flex items-center gap-1.5"
                >
                  <ImageIcon className="size-3.5" /> Fotos ({totalPhotos})
                </Button>
              </div>

              {/* Search input */}
              <div className="relative md:w-72">
                <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título o tema..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-xs bg-background/60 border-border/70"
                />
              </div>
            </div>

            {/* Subcategories pills */}
            {categories.length > 2 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1 mr-1">
                  <Filter className="size-3 text-primary" /> Categorías:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground border-primary font-medium"
                        : "bg-card/40 border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                    }`}
                  >
                    {cat === "all" ? "Todas" : cat}
                  </button>
                ))}
              </div>
            )}
          </FadeIn>
        </section>

        {/* Gallery Grid */}
        <section className="container-x mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isVideo = item.type === "video";
              const ytId = isVideo ? extractYouTubeId(item.url) : null;
              const displayImg = isVideo
                ? item.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "")
                : item.url;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 bg-card/40 cursor-pointer shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-1.5"
                >
                  <img
                    src={displayImg}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`backdrop-blur text-[11px] font-medium ${
                        isVideo
                          ? "bg-red-950/80 border-red-500/40 text-red-300"
                          : "bg-primary/20 border-primary/40 text-primary"
                      }`}
                    >
                      {isVideo ? (
                        <span className="flex items-center gap-1">
                          <Play className="size-2.5 fill-current" /> Video
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <ImageIcon className="size-2.5" /> Foto
                        </span>
                      )}
                    </Badge>

                    {item.category && (
                      <Badge
                        variant="secondary"
                        className="bg-background/80 backdrop-blur text-[10px] text-muted-foreground border-border/60"
                      >
                        {item.category}
                      </Badge>
                    )}
                  </div>

                  {/* Center Play Button for Videos */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-14 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-115 group-hover:bg-primary">
                        <Play className="size-6 ml-0.5 fill-current" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <h3 className="font-semibold text-base leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1 opacity-80 group-hover:opacity-100">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-2xl space-y-3">
              <p className="text-lg">No se encontraron elementos con los filtros seleccionados.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilter("all");
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* Lightbox / Video Modal */}
      {activeItem && (
        <Dialog open={!!activeItem} onOpenChange={(open) => !open && setActiveItem(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 border-border backdrop-blur-2xl">
            <DialogHeader className="sr-only">
              <DialogTitle>{activeItem.title}</DialogTitle>
              <DialogDescription>{activeItem.description || activeItem.title}</DialogDescription>
            </DialogHeader>

            <div>
              {activeItem.type === "video" ? (
                <div className="relative aspect-video w-full bg-black">
                  {extractYouTubeId(activeItem.url) ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(activeItem.url)}?autoplay=1&rel=0`}
                      title={activeItem.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Video no disponible
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative max-h-[75vh] flex items-center justify-center bg-black/60 overflow-hidden">
                  <img
                    src={activeItem.url}
                    alt={activeItem.title}
                    className="max-h-[75vh] w-auto max-w-full object-contain"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {activeItem.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {activeItem.type === "video" ? "YouTube Video" : "Fotografía"}
                    </Badge>
                  </div>
                  {activeItem.type === "video" && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={activeItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center gap-1.5"
                      >
                        <ExternalLink className="size-3.5" /> Abrir en YouTube
                      </a>
                    </Button>
                  )}
                </div>

                <h4 className="text-2xl font-display tracking-wide mt-3 text-foreground">
                  {activeItem.title}
                </h4>

                {activeItem.description && (
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {activeItem.description}
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <SiteFooter />
    </div>
  );
}
