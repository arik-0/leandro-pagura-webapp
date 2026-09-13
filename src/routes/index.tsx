import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Instagram,
  Youtube,
  Music2,
  Mail,
  ArrowRight,
  Play,
  PlayCircle,
  Ticket,
  Disc,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/ui/fade-in";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useShows } from "@/lib/site-data";

const heroImg = "/f3004a62-a83f-4ae8-b5ce-8ddb57b56c0c-copied-media~2.jpg";
const bioImg = "/bio-nueva.jpg";
const quartetImg = "/71f23e85-f3c4-426b-af51-99fbc5ae9ccf-copied-media~2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leandro Pagura — Bajista, compositor y educador" },
      {
        name: "description",
        content:
          "Bajista, compositor y docente argentino. Endorser de Magma Strings y Swan Basses. Con más de dos décadas de trayectoria en jazz fusión, funk y música contemporánea.",
      },
      { property: "og:title", content: "Leandro Pagura — Bajista, compositor y educador" },
      {
        property: "og:description",
        content:
          "Bajista, compositor y docente argentino. Jazz fusión, funk y música contemporánea.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const shows = useShows();

  return (
    <div className="min-h-screen selection:bg-primary selection:text-primary-foreground">
      <SiteHeader variant="landing" />

      {/* 1. HERO (INICIO) */}
      <section id="home" className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Leandro Pagura en vivo"
            width={1920}
            height={1280}
            className="h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <FadeIn className="container-x relative z-10">
          <Badge
            variant="outline"
            className="mb-6 border-primary/40 text-primary bg-primary/10 tracking-widest text-xs uppercase"
          >
            Sitio Oficial
          </Badge>
          <h1 className="font-display text-7xl md:text-9xl leading-none text-balance tracking-tight">
            LEANDRO
            <br />
            <span className="text-primary">PAGURA</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl text-muted-foreground text-balance">
            Bajista · Compositor · Educador
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/media">
                Ver Galería <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#shows">Próximos shows</a>
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* 2. BIO */}
      <section id="bio" className="py-24 relative overflow-hidden">
        <FadeIn className="container-x grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/80 shadow-2xl">
              <img
                src={bioImg}
                alt="Retrato de Leandro Pagura"
                loading="lazy"
                width={1200}
                height={1500}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>
          <div className="md:col-span-3 space-y-6">
            <div className="text-xs tracking-[0.3em] text-primary font-semibold">— BIOGRAFÍA</div>
            <h2 className="text-4xl md:text-5xl font-display leading-tight text-foreground">
              Biografía
            </h2>
            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Leandro Pagura es bajista, compositor y docente argentino, con más de dos décadas de
                trayectoria vinculada al jazz fusión, el funk, el rock y la música contemporánea. A
                lo largo de su carrera ha desarrollado una identidad musical propia, combinando el
                lenguaje de la improvisación, la búsqueda sonora y el groove con una extensa
                experiencia como intérprete, sesionista y educador.
              </p>
              <p>
                Como líder del{" "}
                <span className="text-foreground font-semibold italic">Leandro Pagura Quartet</span>
                , presenta un repertorio de composiciones originales en el que confluyen la
                sofisticación armónica, la improvisación y una fuerte impronta rítmica.
              </p>
              <p>
                Actualmente es{" "}
                <span className="text-primary font-semibold italic">
                  endorser de Magma Strings y Swan Basses
                </span>{" "}
                y se encuentra trabajando en un nuevo álbum de estudio junto a destacados músicos
                nacionales e internacionales con proyección hacia festivales de Europa y América.
              </p>
            </div>
            <div className="pt-2">
              <Button asChild size="lg" className="shadow-md">
                <Link to="/sobre-mi">
                  Conocé más sobre mí <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3. MÚSICA */}
      <section id="musica" className="py-24 bg-accent/10">
        <FadeIn className="container-x">
          <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold">— MÚSICA</div>
          <h2 className="text-5xl md:text-6xl font-display mb-10">Música</h2>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <Card className="lg:col-span-7 p-6 md:p-8 bg-card/60 backdrop-blur border-border/80 transition-all duration-300 hover:shadow-2xl hover:border-primary/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display text-foreground">Catálogo en Spotify</h3>
                <Badge variant="outline" className="text-xs border-green-500/40 text-green-400">
                  Spotify Oficial
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Grabaciones, singles y producciones discográficas oficiales disponibles en todas las
                plataformas.
              </p>
              <div className="w-full">
                <iframe
                  data-testid="embed-iframe"
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/artist/0Mfv0jLx7lR1vpip9uQJcs?utm_source=generator&si=26ed970075e94fe4"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://open.spotify.com/artist/0Mfv0jLx7lR1vpip9uQJcs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Music2 className="mr-2 size-4 text-green-500" /> Abrir en Spotify
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.youtube.com/@leandropagura" target="_blank" rel="noreferrer">
                    <Youtube className="mr-2 size-4 text-red-500" /> Canal de YouTube
                  </a>
                </Button>
              </div>
            </Card>

            <div className="lg:col-span-5 space-y-4">
              <Card className="p-6 md:p-8 bg-card/60 backdrop-blur border-border/80 transition-all hover:border-primary/40">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className="border-primary/40 text-primary bg-primary/5 text-xs"
                  >
                    EY (Every Year)
                  </Badge>
                  <span className="text-xs text-muted-foreground">Fusión & Groove</span>
                </div>
                <h3 className="text-2xl font-display text-foreground mb-2">EY — Repertorio & Temas</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Composiciones y registros en vivo de EY Cuarteto integrando bajo eléctrico, guitarra, teclados y batería en métricas avanzadas y potente sonido.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/60 border border-border">
                    <div>
                      <div className="font-semibold text-sm">EY — 3,3</div>
                      <div className="text-xs text-muted-foreground">En vivo Auditorio Kraft</div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href="https://www.youtube.com/watch?v=hLCUGWqtJjk"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Play className="size-3 mr-1 fill-current" /> Ver
                      </a>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/60 border border-border">
                    <div>
                      <div className="font-semibold text-sm">EY — Shuffle</div>
                      <div className="text-xs text-muted-foreground">Composición original & solo</div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href="https://www.youtube.com/watch?v=hLCUGWqtJjk"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Play className="size-3 mr-1 fill-current" /> Ver
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full text-primary hover:text-primary justify-center"
                  >
                    <Link to="/media">
                      Ver toda la música en Galería <ArrowRight className="size-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 4. PROYECTOS */}
      <section id="proyectos" className="py-24">
        <FadeIn className="container-x">
          <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold">
            — PROYECTOS
          </div>
          <h2 className="text-5xl md:text-6xl font-display mb-10">Proyectos</h2>

          <div className="space-y-8">
            {/* Proyecto 1: Leandro Pagura Cuarteto */}
            <Card className="overflow-hidden bg-card/60 backdrop-blur border-border/80 transition-all duration-500 hover:shadow-2xl hover:border-primary/40 group">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img
                    src={quartetImg}
                    alt="Leandro Pagura Cuarteto"
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <Badge
                    variant="outline"
                    className="w-fit mb-4 border-primary/40 text-primary bg-primary/10"
                  >
                    LP Quartet · Ensamble Principal
                  </Badge>
                  <h3 className="text-3xl font-display mb-3">Leandro Pagura Cuarteto</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Un colectivo musical de primer nivel liderado por Leandro Pagura, explorando la
                    dinámica del jazz fusión, la improvisación colectiva y el groove sólido. Con un
                    repertorio de composiciones originales donde convergen sofisticación armónica,
                    espontaneidad y una contundente presencia rítmica.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="w-fit shadow-md">
                      <a
                        href="https://www.youtube.com/watch?v=jZKTvZNJuPo"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PlayCircle className="mr-2 size-4" /> Ver Live Session (Grabado en YT)
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="w-fit">
                      <Link to="/media">Ver en Galería</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Proyecto 2: EY (Every Year Cuarteto) */}
            <Card className="overflow-hidden bg-card/60 backdrop-blur border-border/80 transition-all duration-500 hover:shadow-2xl hover:border-primary/40 group">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center order-2 md:order-1">
                  <Badge
                    variant="outline"
                    className="w-fit mb-4 border-primary/40 text-primary bg-primary/10"
                  >
                    Fusión Instrumental & Rock
                  </Badge>
                  <h3 className="text-3xl font-display mb-3">EY (Every Year Cuarteto)</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Integrado por Santiago Pagura (guitarra), Leandro Pagura (bajo), Matías Galasso
                    (teclados) y Ezequiel Ghilardi (batería). Una propuesta enérgica y virtuosa que
                    combina la fuerza del rock y la flexibilidad armónica del jazz fusión.
                  </p>
                  <p className="text-xs text-muted-foreground mb-6">
                    Grabaciones en vivo en Auditorio Kraft: composiciones originales como "3,3",
                    "Shuffle" y sesiones de alta intensidad tímbrica.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline" className="w-fit">
                      <a
                        href="https://www.youtube.com/watch?v=hLCUGWqtJjk"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Play className="mr-2 size-4 fill-current" /> Ver "3,3" en vivo (Kraft)
                      </a>
                    </Button>
                    <Button asChild variant="ghost" className="w-fit">
                      <Link to="/media">Escuchar en Galería</Link>
                    </Button>
                  </div>
                </div>
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden order-1 md:order-2">
                  <img
                    src="https://img.youtube.com/vi/hLCUGWqtJjk/hqdefault.jpg"
                    alt="EY Cuarteto"
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </Card>
          </div>
        </FadeIn>
      </section>

      {/* 5. SHOWS (AGENDA CON EVENTOS REALES Y LINK DIRECTO AL TICKET) */}
      <section id="shows" className="py-24 bg-accent/10">
        <FadeIn className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold">
                — PRÓXIMOS SHOWS
              </div>
              <h2 className="text-5xl md:text-6xl font-display">Agenda en Vivo</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Fechas confirmadas en ciclos, salas y festivales. Acceso directo a compra de entradas
              oficiales.
            </p>
          </div>

          <div className="space-y-4">
            {shows.map((s) => (
              <Card
                key={s.id || s.title + s.date}
                className="p-6 md:p-8 bg-card/60 backdrop-blur border-border/80 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-primary/50"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-44 shrink-0">
                    <div className="font-display text-3xl md:text-4xl text-primary tracking-wide">
                      {s.date}
                    </div>
                    <Badge
                      variant="outline"
                      className="mt-1 text-[10px] text-muted-foreground border-border"
                    >
                      Confirmado
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-display tracking-wide text-foreground">
                      {s.title}
                    </div>
                    <div className="text-muted-foreground text-sm mt-1 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-primary" /> {s.venue}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {s.ticketUrl ? (
                    <Button asChild size="lg" className="w-full md:w-auto shadow-md">
                      <a href={s.ticketUrl} target="_blank" rel="noopener noreferrer">
                        <Ticket className="mr-2 size-4" /> Comprar Ticket
                      </a>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
                      <a href="#contacto">
                        <Mail className="mr-2 size-4" /> Consultar
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}

            {shows.length === 0 && (
              <Card className="p-12 text-center text-muted-foreground border-dashed">
                Nuevas fechas de gira y presentaciones serán anunciadas próximamente.
              </Card>
            )}
          </div>
        </FadeIn>
      </section>

      {/* 6. MEDIA (PREVIEW DESTACADO Y ACCESO A PÁGINA SEPARADA /media) */}
      <section id="media" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
        <FadeIn className="container-x relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold">
                — GALERÍA
              </div>
              <h2 className="text-5xl md:text-6xl font-display">Momentos & Sesiones</h2>
              <p className="mt-3 text-muted-foreground max-w-xl text-base">
                Música de EY y solista, grabaciones de cuarteto en vivo y fotografías oficiales.
              </p>
            </div>
            <Button asChild size="lg" className="self-start md:self-auto shadow-lg">
              <Link to="/media">
                Ver Galería Completa <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/media"
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 bg-card/40 shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-1.5"
            >
              <img
                src="https://img.youtube.com/vi/jZKTvZNJuPo/hqdefault.jpg"
                alt="Jet Lag in Hulum"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-3 left-3">
                <Badge
                  variant="outline"
                  className="bg-red-950/80 border-red-500/40 text-red-300 text-[11px]"
                >
                  <Play className="size-2.5 mr-1 fill-current" /> Video En Vivo
                </Badge>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="size-5 ml-0.5 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4">
                <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                  Leandro Pagura Cuarteto - Jet Lag in Hulum
                </h3>
              </div>
            </Link>

            <Link
              to="/media"
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 bg-card/40 shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-1.5"
            >
              <img
                src="/71f23e85-f3c4-426b-af51-99fbc5ae9ccf-copied-media~2.jpg"
                alt="Leandro Pagura Cuarteto"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-3 left-3">
                <Badge
                  variant="outline"
                  className="bg-primary/20 border-primary/40 text-primary text-[11px]"
                >
                  <Disc className="size-2.5 mr-1" /> Cuarteto
                </Badge>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4">
                <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                  Leandro Pagura Cuarteto Oficial
                </h3>
              </div>
            </Link>

            <Link
              to="/media"
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 bg-card/40 shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-1.5"
            >
              <img
                src="https://img.youtube.com/vi/hLCUGWqtJjk/hqdefault.jpg"
                alt="EY - 3,3"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-3 left-3">
                <Badge
                  variant="outline"
                  className="bg-red-950/80 border-red-500/40 text-red-300 text-[11px]"
                >
                  <Play className="size-2.5 mr-1 fill-current" /> Video
                </Badge>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="size-5 ml-0.5 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4">
                <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                  EY - 3,3 (Leandro Pagura)
                </h3>
              </div>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* 7. CONTACTO */}
      <section id="contacto" className="py-16 md:py-20 bg-accent/10">
        <FadeIn className="container-x text-center max-w-3xl mx-auto">
          <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold">— CONTACTO</div>
          <h2 className="text-5xl md:text-6xl font-display mb-4 text-balance">
            Contacto
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8 text-balance">
            Para contrataciones artísticas, clínicas, masterclasses o clases particulares, podés
            ponerte en contacto directo.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="shadow-lg">
              <a href="mailto:contacto@leandropagura.com">
                <Mail className="mr-2 size-4" /> contacto@leandropagura.com
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 size-4 text-primary" /> Instagram
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://youtube.com/@leandropagura"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="mr-2 size-4 text-red-500" /> YouTube
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://open.spotify.com/artist/0Mfv0jLx7lR1vpip9uQJcs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Music2 className="mr-2 size-4 text-green-500" /> Spotify
              </a>
            </Button>
          </div>
        </FadeIn>
      </section>

      <SiteFooter />
    </div>
  );
}
