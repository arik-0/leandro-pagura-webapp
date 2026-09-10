import { useState } from "react";
import { Play, Image as ImageIcon, Video, X, ExternalLink, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGallery, GalleryItem, extractYouTubeId } from "@/lib/site-data";

export function GallerySection() {
  const items = useGallery();
  const [filter, setFilter] = useState<"all" | "video" | "image">("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <section id="media" className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

      <FadeIn className="container-x relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold flex items-center gap-2">
              <span>— GALERÍA</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display tracking-wide">
              Fotos <span className="text-primary">&</span> Videos
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl text-balance">
              Registro audiovisual de presentaciones en vivo, sesiones de estudio, ensambles y
              momentos destacados.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 bg-card/60 p-1.5 rounded-xl border border-border/80 backdrop-blur self-start md:self-auto">
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "ghost"}
              onClick={() => setFilter("all")}
              className="text-xs transition-all"
            >
              Todos ({items.length})
            </Button>
            <Button
              size="sm"
              variant={filter === "video" ? "default" : "ghost"}
              onClick={() => setFilter("video")}
              className="text-xs flex items-center gap-1.5 transition-all"
            >
              <Video className="size-3.5" /> Videos (
              {items.filter((i) => i.type === "video").length})
            </Button>
            <Button
              size="sm"
              variant={filter === "image" ? "default" : "ghost"}
              onClick={() => setFilter("image")}
              className="text-xs flex items-center gap-1.5 transition-all"
            >
              <ImageIcon className="size-3.5" /> Fotos (
              {items.filter((i) => i.type === "image").length})
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 bg-card/40 cursor-pointer shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-1.5"
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
                        ? "bg-red-950/70 border-red-500/40 text-red-300"
                        : "bg-primary/20 border-primary/30 text-primary"
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
                      className="bg-background/70 backdrop-blur text-[10px] text-muted-foreground border-border/50"
                    >
                      {item.category}
                    </Badge>
                  )}
                </div>

                {/* Center Play Button for Videos */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-14 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-115 group-hover:bg-primary">
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
          <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-2xl">
            No se encontraron elementos en esta categoría.
          </div>
        )}
      </FadeIn>

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
    </section>
  );
}
