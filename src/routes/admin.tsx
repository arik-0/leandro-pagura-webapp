import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Video,
  Image as ImageIcon,
  Calendar,
  Ticket,
  ExternalLink,
  ShieldCheck,
  Lock,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  LogOut,
  Eye,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useGallery,
  useShows,
  useAdminSession,
  saveGalleryItem,
  deleteGalleryItem,
  resetGalleryToDefault,
  saveShowItem,
  deleteShowItem,
  extractYouTubeId,
  getYouTubeThumbnail,
  GalleryItem,
  ShowItem,
} from "@/lib/site-data";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel de Administración — Leandro Pagura" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { isAdmin: isSupabaseAdmin } = useAuth();
  const { isAdmin: isSessionAdmin, setAdminLogin } = useAdminSession();
  const isAdmin = isSupabaseAdmin || isSessionAdmin;

  const galleryItems = useGallery();
  const shows = useShows();

  // Login form state
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Gallery Dialog state
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [itemType, setItemType] = useState<"image" | "video">("video");
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [itemCategory, setItemCategory] = useState("En vivo");
  const [itemThumbnail, setItemThumbnail] = useState("");

  // Shows Dialog state
  const [showDialogOpen, setShowDialogOpen] = useState(false);
  const [editingShow, setEditingShow] = useState<ShowItem | null>(null);
  const [showDate, setShowDate] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [showVenue, setShowVenue] = useState("");
  const [showTicketUrl, setShowTicketUrl] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept master password "admin" or "leandro2026" or "admin123"
    const validKeys = ["admin", "leandro2026", "admin123", "pagura2026"];
    if (validKeys.includes(password.trim().toLowerCase())) {
      setAdminLogin(true);
      toast.success("¡Bienvenido al panel de administración!");
      setPassword("");
      setLoginError("");
    } else {
      setLoginError("Contraseña incorrecta. (Clave: admin o leandro2026)");
      toast.error("Contraseña incorrecta.");
    }
  };

  const handleLogout = () => {
    setAdminLogin(false);
    toast.info("Sesión cerrada.");
  };

  // Open Gallery dialog for new or edit
  const openGalleryModal = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item);
      setItemType(item.type);
      setItemTitle(item.title);
      setItemDescription(item.description || "");
      setItemUrl(item.url);
      setItemCategory(item.category);
      setItemThumbnail(item.thumbnail || "");
    } else {
      setEditingItem(null);
      setItemType("video");
      setItemTitle("");
      setItemDescription("");
      setItemUrl("");
      setItemCategory("En vivo");
      setItemThumbnail("");
    }
    setGalleryDialogOpen(true);
  };

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecciona un archivo de imagen válido.");
      return;
    }

    // Limit to 5MB for browser storage
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no debe superar los 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target?.result as string;
      setItemUrl(dataUrl);
      setItemThumbnail(dataUrl);
      if (!itemTitle) {
        setItemTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
      toast.success("Imagen cargada con éxito.");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !itemUrl.trim()) {
      toast.error("Por favor completa el título y el enlace/archivo.");
      return;
    }

    let thumbnail = itemThumbnail;
    if (itemType === "video") {
      const ytId = extractYouTubeId(itemUrl);
      if (!ytId) {
        toast.error("Enlace de YouTube no válido. Asegúrate de que sea un video de YouTube.");
        return;
      }
      thumbnail = getYouTubeThumbnail(ytId);
    }

    saveGalleryItem({
      id: editingItem ? editingItem.id : undefined,
      type: itemType,
      title: itemTitle.trim(),
      description: itemDescription.trim() || undefined,
      url: itemUrl.trim(),
      category: itemCategory.trim() || "General",
      thumbnail,
      order: editingItem ? editingItem.order : 0,
    });

    toast.success(editingItem ? "Elemento actualizado" : "Elemento agregado a la galería");
    setGalleryDialogOpen(false);
  };

  const handleDeleteGallery = (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar "${title}" de la galería?`)) {
      deleteGalleryItem(id);
      toast.success("Elemento eliminado de la galería.");
    }
  };

  // Shows handling
  const openShowModal = (show?: ShowItem) => {
    if (show) {
      setEditingShow(show);
      setShowDate(show.date);
      setShowTitle(show.title);
      setShowVenue(show.venue);
      setShowTicketUrl(show.ticketUrl || "");
    } else {
      setEditingShow(null);
      setShowDate("");
      setShowTitle("");
      setShowVenue("");
      setShowTicketUrl("");
    }
    setShowDialogOpen(true);
  };

  const handleSaveShow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showDate.trim() || !showTitle.trim() || !showVenue.trim()) {
      toast.error("Por favor completa la fecha, título y sala/lugar.");
      return;
    }

    saveShowItem({
      id: editingShow ? editingShow.id : undefined,
      date: showDate.trim(),
      title: showTitle.trim(),
      venue: showVenue.trim(),
      ticketUrl: showTicketUrl.trim() || undefined,
      order: editingShow ? editingShow.order : 0,
    });

    toast.success(editingShow ? "Show actualizado" : "Nuevo show agregado a la agenda");
    setShowDialogOpen(false);
  };

  const handleDeleteShow = (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar el show "${title}"?`)) {
      deleteShowItem(id);
      toast.success("Show eliminado de la agenda.");
    }
  };

  // IF NOT LOGGED IN AS ADMIN, SHOW LOGIN FORM
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-2">
              <ShieldCheck className="size-8" />
            </div>
            <h1 className="text-3xl font-display tracking-wide">Acceso Administrativo</h1>
            <p className="text-sm text-muted-foreground">
              Ingresa la clave de administración para gestionar la galería y agenda.
            </p>
          </div>

          <Card className="p-6 border-border/80 bg-card/60 backdrop-blur-xl shadow-xl">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-pass">Contraseña de Administrador</Label>
                <div className="relative">
                  <Input
                    id="admin-pass"
                    type="password"
                    placeholder="Introduce contraseña..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    autoFocus
                  />
                  <Lock className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
                </div>
                {loginError && <p className="text-xs text-destructive mt-1">{loginError}</p>}
                <p className="text-[11px] text-muted-foreground">
                  Pista de acceso:{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-primary">admin</code> o{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-primary">leandro2026</code>
                </p>
              </div>

              <Button type="submit" className="w-full">
                Ingresar al Panel
              </Button>
            </form>
          </Card>

          <div className="text-center">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="size-4 mr-2" /> Volver al sitio web
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Admin Topbar */}
      <header className="border-b border-border/80 bg-card/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="container-x h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10">
              Admin
            </Badge>
            <span className="font-display text-lg tracking-wider">
              LEANDRO PAGURA{" "}
              <span className="text-muted-foreground text-sm font-sans">· Panel de Control</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Eye className="size-4 mr-1.5" /> Ver Sitio Web
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="size-4 mr-1.5" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container-x py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-display tracking-wide">Gestión de Contenidos</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Administrá los videos, fotos y fechas de shows que se publican en el sitio oficial.
            </p>
          </div>
        </div>

        <Tabs defaultValue="galeria" className="space-y-6">
          <TabsList className="bg-card/80 border border-border">
            <TabsTrigger value="galeria" className="flex items-center gap-2">
              <ImageIcon className="size-4" /> Galería ({galleryItems.length})
            </TabsTrigger>
            <TabsTrigger value="agenda" className="flex items-center gap-2">
              <Calendar className="size-4" /> Agenda de Shows ({shows.length})
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: GALERIA */}
          <TabsContent value="galeria" className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-card/40 p-4 rounded-xl border border-border">
              <div>
                <h3 className="font-semibold text-lg">Elementos de Galería</h3>
                <p className="text-xs text-muted-foreground">
                  Podés agregar videos de YouTube o fotos subiendo un archivo o enlazando una URL.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => resetGalleryToDefault()}
                  title="Restablecer galería inicial con los 4 videos y fotos originales"
                >
                  <RotateCcw className="size-3.5 mr-1.5" /> Valores Iniciales
                </Button>
                <Button size="sm" onClick={() => openGalleryModal()}>
                  <Plus className="size-4 mr-1.5" /> Cargar a Galería
                </Button>
              </div>
            </div>

            {/* Gallery Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryItems.map((item) => {
                const isVideo = item.type === "video";
                const ytId = isVideo ? extractYouTubeId(item.url) : null;
                const displayImg = isVideo
                  ? item.thumbnail ||
                    (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "")
                  : item.url;

                return (
                  <Card
                    key={item.id}
                    className="overflow-hidden border-border/80 bg-card/60 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[4/3] bg-muted/40 overflow-hidden">
                        <img
                          src={displayImg}
                          alt={item.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 flex gap-1.5">
                          <Badge
                            variant={isVideo ? "destructive" : "default"}
                            className="text-[10px]"
                          >
                            {isVideo ? "Video" : "Foto"}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            {item.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4
                          className="font-semibold text-sm line-clamp-2 leading-tight"
                          title={item.title}
                        >
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <p className="text-[11px] text-muted-foreground truncate font-mono bg-background/50 p-1 rounded">
                          {item.url}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-border/40 mt-3 flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openGalleryModal(item)}
                        className="text-xs h-8"
                      >
                        <Pencil className="size-3.5 mr-1" /> Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteGallery(item.id, item.title)}
                        className="text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="size-3.5 mr-1" /> Borrar
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* TAB 2: AGENDA / SHOWS */}
          <TabsContent value="agenda" className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-card/40 p-4 rounded-xl border border-border">
              <div>
                <h3 className="font-semibold text-lg">Agenda de Shows Oficiales</h3>
                <p className="text-xs text-muted-foreground">
                  Gestioná los conciertos reales confirmados y sus links oficiales de compra de
                  tickets.
                </p>
              </div>
              <Button size="sm" onClick={() => openShowModal()}>
                <Plus className="size-4 mr-1.5" /> Nuevo Show
              </Button>
            </div>

            <div className="space-y-3">
              {shows.map((show) => (
                <Card
                  key={show.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 border-border"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-28 text-center p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="text-xs text-primary font-bold uppercase tracking-wider">
                        Fecha
                      </div>
                      <div className="font-display text-xl text-foreground mt-0.5">{show.date}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{show.title}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Calendar className="size-3.5 text-primary" /> {show.venue}
                      </p>
                      {show.ticketUrl && (
                        <p className="text-xs text-primary flex items-center gap-1 mt-1 font-mono">
                          <Ticket className="size-3" /> Ticket: {show.ticketUrl}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <Button variant="outline" size="sm" onClick={() => openShowModal(show)}>
                      <Pencil className="size-3.5 mr-1.5" /> Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteShow(show.id, show.title)}
                    >
                      <Trash2 className="size-3.5 mr-1.5" /> Eliminar
                    </Button>
                  </div>
                </Card>
              ))}

              {shows.length === 0 && (
                <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
                  No hay shows programados actualmente.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* MODAL: CARGAR / EDITAR GALERIA */}
      <Dialog open={galleryDialogOpen} onOpenChange={setGalleryDialogOpen}>
        <DialogContent className="max-w-lg bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {editingItem ? "Editar Elemento de Galería" : "Cargar Elemento a la Galería"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveGalleryItem} className="space-y-4 py-2">
            {/* Type selector */}
            <div className="space-y-1.5">
              <Label>Tipo de Elemento</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={itemType === "video" ? "default" : "outline"}
                  onClick={() => setItemType("video")}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Video className="size-4" /> Video (YouTube)
                </Button>
                <Button
                  type="button"
                  variant={itemType === "image" ? "default" : "outline"}
                  onClick={() => setItemType("image")}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ImageIcon className="size-4" /> Fotografía
                </Button>
              </div>
            </div>

            {/* Video Input */}
            {itemType === "video" ? (
              <div className="space-y-2">
                <Label htmlFor="yt-url">Enlace del Video de YouTube</Label>
                <Input
                  id="yt-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={itemUrl}
                  onChange={(e) => {
                    setItemUrl(e.target.value);
                    const id = extractYouTubeId(e.target.value);
                    if (id) {
                      setItemThumbnail(getYouTubeThumbnail(id));
                    }
                  }}
                  required
                />
                <p className="text-[11px] text-muted-foreground">
                  Se detectará automáticamente la miniatura y reproductor de YouTube.
                </p>
                {extractYouTubeId(itemUrl) && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-border/80 mt-2">
                    <img
                      src={getYouTubeThumbnail(extractYouTubeId(itemUrl)!)}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs text-white">
                      Vista previa de miniatura detectada
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Image Input: File upload or URL */
              <div className="space-y-3">
                <Label>Subir Imagen o Ingresar Enlace</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors">
                  <Input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <div className="p-2.5 rounded-full bg-primary/10 text-primary">
                      <Upload className="size-5" />
                    </div>
                    <span className="text-sm font-medium">
                      Hacé clic para subir una imagen desde tu equipo
                    </span>
                    <span className="text-xs text-muted-foreground">PNG, JPG, WebP hasta 5MB</span>
                  </Label>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="img-url" className="text-xs">
                    O enlace web directo de la imagen
                  </Label>
                  <Input
                    id="img-url"
                    placeholder="https://... o /foto.jpg"
                    value={itemUrl}
                    onChange={(e) => {
                      setItemUrl(e.target.value);
                      setItemThumbnail(e.target.value);
                    }}
                  />
                </div>

                {itemUrl && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-border/80 mt-2">
                    <img src={itemUrl} alt="Vista previa" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            )}

            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="item-title">Título del Elemento</Label>
              <Input
                id="item-title"
                placeholder="Ej: Leandro Pagura Cuarteto - Jet Lag in Hulum"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="item-cat">Categoría / Etiqueta</Label>
              <Input
                id="item-cat"
                placeholder="Ej: En vivo, Estudio, Cuarteto, Masterclass"
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="item-desc">Descripción (Opcional)</Label>
              <Textarea
                id="item-desc"
                placeholder="Breve reseña sobre este video o fotografía..."
                rows={3}
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" onClick={() => setGalleryDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{editingItem ? "Guardar Cambios" : "Agregar a Galería"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL: NUEVO / EDITAR SHOW */}
      <Dialog open={showDialogOpen} onOpenChange={setShowDialogOpen}>
        <DialogContent className="max-w-md bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {editingShow ? "Editar Show de Agenda" : "Agregar Show a la Agenda"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveShow} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="show-date">Fecha</Label>
              <Input
                id="show-date"
                placeholder="Ej: 28 SEP 2026"
                value={showDate}
                onChange={(e) => setShowDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="show-title">Título del Evento / Concierto</Label>
              <Input
                id="show-title"
                placeholder="Ej: Leandro Pagura Cuarteto en Vivo"
                value={showTitle}
                onChange={(e) => setShowTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="show-venue">Lugar / Sala y Ciudad</Label>
              <Input
                id="show-venue"
                placeholder="Ej: Complejo Cultural Atlas, Rosario"
                value={showVenue}
                onChange={(e) => setShowVenue(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="show-ticket">Link Oficial de Compra de Ticket</Label>
              <Input
                id="show-ticket"
                placeholder="https://complejoculturalatlas.com.ar o link de entradas"
                value={showTicketUrl}
                onChange={(e) => setShowTicketUrl(e.target.value)}
              />
              <p className="text-[11px] text-muted-foreground">
                El botón "Tickets" en la web llevará directamente a este enlace.
              </p>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{editingShow ? "Guardar Cambios" : "Guardar Show"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
