import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Instagram,
  Youtube,
  Music2,
  Mail,
  ArrowRight,
  PlayCircle,
  Ticket,
  Zap,
  Cpu,
  Guitar,
  Speaker,
  Disc,
  GraduationCap,
  Sparkles,
  Layers,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/ui/fade-in";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GallerySection } from "@/components/gallery-section";
import { useShows } from "@/lib/site-data";

const heroImg = "/f3004a62-a83f-4ae8-b5ce-8ddb57b56c0c-copied-media~2.jpg";
const bioImg = "/bio-nueva.jpg";
const setupImg = "/9c113a46-b0e2-488e-b11d-08095a698ca1-copied-media~2.jpg";
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
              <a href="#media">
                Ver Galería <ArrowRight className="ml-2 size-4" />
              </a>
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
              Trayectoria, identidad y constante búsqueda sonora
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
                sofisticación armónica, la improvisación y una fuerte impronta rítmica. El proyecto
                propone una mirada contemporánea sobre el jazz fusión, construida a partir del
                diálogo entre los músicos y de una permanente exploración sonora.
              </p>
              <p>
                Su actividad artística se complementa con una amplia labor docente. Dicta clases,
                clínicas y masterclasses de bajo eléctrico, acompañando la formación de músicos de
                distintos niveles y compartiendo herramientas desarrolladas a lo largo de su
                experiencia profesional.
              </p>
              <p>
                Actualmente es{" "}
                <span className="text-primary font-semibold italic">
                  endorser de Magma Strings y Swan Basses
                </span>{" "}
                y se encuentra trabajando en un nuevo álbum de estudio junto a destacados músicos
                nacionales e internacionales. En paralelo, continúa desarrollando un proyecto
                artístico con proyección internacional, orientado a escenarios, ciclos y festivales
                de <span className="text-foreground font-semibold italic">Europa y América</span>.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3. MÚSICA */}
      <section id="musica" className="py-24 bg-accent/10">
        <FadeIn className="container-x">
          <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold">— MÚSICA</div>
          <h2 className="text-5xl md:text-6xl font-display mb-10">Escuchá el material</h2>
          <Card className="p-6 md:p-10 bg-card/60 backdrop-blur border-border/80 transition-all duration-300 hover:shadow-2xl hover:border-primary/40">
            <p className="text-muted-foreground max-w-2xl mb-8 text-base">
              Grabaciones, composiciones originales, singles y colaboraciones directamente desde
              Spotify.
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
              <Button variant="outline" asChild>
                <a
                  href="https://open.spotify.com/artist/0Mfv0jLx7lR1vpip9uQJcs"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Music2 className="mr-2 size-4 text-primary" /> Abrir en Spotify
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.youtube.com/@leandropagura" target="_blank" rel="noreferrer">
                  <Youtube className="mr-2 size-4 text-red-500" /> Canal de YouTube
                </a>
              </Button>
            </div>
          </Card>
        </FadeIn>
      </section>

      {/* 4. PROYECTOS */}
      <section id="proyectos" className="py-24">
        <FadeIn className="container-x">
          <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold">
            — PROYECTOS ACTUALES
          </div>
          <h2 className="text-5xl md:text-6xl font-display mb-10">Leandro Pagura Cuarteto</h2>
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
                  Ensamble Principal
                </Badge>
                <h3 className="text-3xl font-display mb-3">Jazz Fusión & Funk Contemporáneo</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Un colectivo musical de primer nivel liderado por Leandro, explorando la dinámica
                  del jazz fusión, la improvisación colectiva y el groove sólido. Con un repertorio
                  de composiciones originales que empujan los límites estéticos y sonoros de la
                  escena musical actual.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="w-fit">
                    <a href="#musica">
                      <PlayCircle className="mr-2 size-4" /> Escuchar material
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-fit">
                    <a href="#media">Ver sesiones en vivo</a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
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

      {/* 6. CURSOS (FORMACIÓN DOCENTE & MASTERCLASSES) */}
      <section id="cursos" className="py-24">
        <FadeIn className="container-x">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10">
                Docencia & Formación
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display leading-none">
                Clases & <span className="text-primary">Masterclasses</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                Con más de dos décadas de trayectoria docente y como músico sesionista, Leandro
                Pagura dicta clases individuales, clínicas y masterclasses de bajo eléctrico
                orientadas al perfeccionamiento de músicos de distintos niveles.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                El enfoque pedagógico combina el dominio de la técnica, la precisión rítmica, la
                búsqueda de un timbre personal, la improvisación consciente y el desarrollo del
                groove en contextos de jazz, funk, rock y música contemporánea.
              </p>
              <div className="pt-2">
                <Button asChild size="lg">
                  <a href="#contacto">
                    <Mail className="mr-2 size-4" /> Consultar por Clases y Clínicas
                  </a>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Guitar,
                  title: "Técnica de Bajo Eléctrico",
                  desc: "Pulsación, digitación, slap, muting, control dinámico y resistencia.",
                },
                {
                  icon: Zap,
                  title: "Groove & Time Keeping",
                  desc: "Desarrollo rítmico, subdivisión métrica, métricas irregulares y articulación.",
                },
                {
                  icon: Music2,
                  title: "Armonía & Improvisación",
                  desc: "Escalas complejas, modos, sustituciones armónicas y lenguaje solista.",
                },
                {
                  icon: GraduationCap,
                  title: "Masterclasses & Clínicas",
                  desc: "Módulos formativos y workshops para instituciones, escuelas y festivales.",
                },
              ].map((it) => (
                <Card
                  key={it.title}
                  className="p-6 bg-card/60 backdrop-blur border-border/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/50"
                >
                  <it.icon className="size-8 text-primary mb-3" />
                  <h3 className="font-semibold text-base mb-1.5">{it.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{it.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 7. MEDIA (GALERÍA INTERACTIVA CON FOTOS Y VIDEOS) */}
      <GallerySection />

      {/* 8. SETUP (EQUIPAMIENTO OFICIAL CON SWAN BASSES Y MAGMA STRINGS) */}
      <section id="setup" className="py-24 bg-accent/10">
        <FadeIn className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/80 shadow-2xl">
            <img
              src={setupImg}
              alt="Setup y bajos de Leandro Pagura"
              loading="lazy"
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </div>
          <div>
            <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold">
              — SETUP & ENDORSEMENTS
            </div>
            <h2 className="text-5xl md:text-6xl font-display mb-8">Equipamiento</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Guitar className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-lg flex items-center gap-2">
                    Swan Custom Basses
                    <Badge variant="outline" className="text-[10px] border-primary/40 text-primary">
                      Endorser Oficial
                    </Badge>
                  </div>
                  <div className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    Bajos SWAN Custom Basses — Modelo Alpha Classic "Red Fury" signature by Leandro
                    Pagura, e instrumentos pasivos de alta luthería estilo Precision Bass
                    optimizados para respuesta dinámica.
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <Disc className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-lg flex items-center gap-2">
                    Magma Strings
                    <Badge variant="outline" className="text-[10px] border-primary/40 text-primary">
                      Endorser Oficial
                    </Badge>
                  </div>
                  <div className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    Cuerdas Magma Strings — Calibres y aleaciones seleccionadas para obtener máximo
                    sustain, definición armónica impecable y calidez tímbrica en vivo y en estudio.
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <Cpu className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-lg">Procesamiento & Preamps</div>
                  <div className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    Helix Quad Cortex para emulaciones de amplificadores vintage y modernos,
                    modulaciones, compresores analógicos y ruteo directo balanceado a consola.
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <Speaker className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-lg">Amplificación</div>
                  <div className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    Sistemas Full Range Flat Response (FRFR) y cabezales Clase D de alta potencia y
                    máxima fidelidad acústica.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </FadeIn>
      </section>

      {/* 9. CONTACTO */}
      <section id="contacto" className="py-24">
        <FadeIn className="container-x text-center max-w-3xl mx-auto">
          <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold">— CONTACTO</div>
          <h2 className="text-5xl md:text-6xl font-display mb-6 text-balance">
            ¿Listo para llevar tu groove al siguiente nivel
            <br />o coordinar una sesión?
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
