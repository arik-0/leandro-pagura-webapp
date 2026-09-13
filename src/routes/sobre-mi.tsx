import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowLeft,
  Music2,
  Disc,
  Guitar,
  GraduationCap,
  Sparkles,
  Mail,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/sobre-mi")({
  head: () => ({
    meta: [
      { title: "Sobre Mí — Leandro Pagura | Bajista, Compositor y Educador" },
      {
        name: "description",
        content:
          "Biografía oficial y trayectoria de Leandro Pagura: más de dos décadas de carrera en el jazz fusión, funk contemporáneo, ensamble LP Cuarteto, proyecto EY y docencia.",
      },
      { property: "og:title", content: "Sobre Mí — Leandro Pagura" },
      {
        property: "og:description",
        content:
          "Bajista, compositor y educador argentino. Conoce su recorrido artístico, equipamiento signature y proyectos.",
      },
    ],
  }),
  component: SobreMiPage,
});

function SobreMiPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-primary-foreground">
      <SiteHeader variant="app" />

      <main className="pt-24 pb-20 flex-1">
        {/* Breadcrumb Header */}
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
                Sobre Mí
              </Badge>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-display tracking-tight text-foreground">
                Leandro <span className="text-primary">Pagura</span>
              </h1>
              <p className="mt-4 text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                Bajista · Compositor · Educador · Músico de Sesión
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Extended Biography Grid */}
        <section className="container-x mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Photos & Key Credentials */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/80 shadow-2xl bg-card">
                <img
                  src="/bio-nueva.jpg"
                  alt="Leandro Pagura con bajo eléctrico"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge variant="secondary" className="backdrop-blur bg-background/80 text-xs">
                    Fotografía Oficial
                  </Badge>
                </div>
              </div>

              {/* Highlights Card */}
              <Card className="p-6 bg-card/60 backdrop-blur border-border/80 space-y-4">
                <h3 className="font-display text-2xl text-primary">Datos Clave</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2.5">
                    <Sparkles className="size-4 text-primary shrink-0" />
                    <span>Más de 20 años de trayectoria musical profesional</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Disc className="size-4 text-primary shrink-0" />
                    <span>Líder y compositor en <strong>Leandro Pagura Cuarteto</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Music2 className="size-4 text-primary shrink-0" />
                    <span>Miembro fundador de <strong>EY (Every Year)</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Guitar className="size-4 text-primary shrink-0" />
                    <span>Endorser Oficial: <strong>SWAN Basses & Magma Strings</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <GraduationCap className="size-4 text-primary shrink-0" />
                    <span>Docente particular, clínico y tallerista internacional</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-border flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link to="/media">
                      Ver Fotos y Videos en Galería <ArrowRight className="size-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Second Photo: Live / Quartet */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/80 shadow-md">
                <img
                  src="/71f23e85-f3c4-426b-af51-99fbc5ae9ccf-copied-media~2.jpg"
                  alt="Leandro Pagura Cuarteto en Vivo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-3 text-xs text-muted-foreground/90 bg-background/70 px-2 py-0.5 rounded backdrop-blur">
                  Leandro Pagura Cuarteto
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Biography */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="text-xs tracking-[0.3em] text-primary mb-2 font-semibold">
                  — TRAYECTORIA & IDENTIDAD
                </div>
                <h2 className="text-3xl md:text-4xl font-display text-foreground leading-snug">
                  Dos Décadas de Búsqueda Sonora, Groove y Creatividad
                </h2>
              </div>

              <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  <strong>Leandro Pagura</strong> es bajista, compositor y docente argentino, con
                  más de dos décadas de trayectoria vinculada al jazz fusión, el funk, el rock y la
                  música contemporánea. A lo largo de su carrera ha desarrollado una identidad musical
                  propia, combinando el lenguaje de la improvisación, la búsqueda sonora y el groove
                  con una extensa experiencia como intérprete, sesionista y educador.
                </p>

                <p>
                  Su sonido se caracteriza por una sólida precisión rítmica, un ataque dinámico y una
                  gran expresividad melódica en el bajo eléctrico, fusionando influencias del jazz
                  eléctrico clásico y moderno con el pulso orgánico del funk y las métricas complejas.
                </p>
              </div>

              {/* Section: LP Cuarteto */}
              <div className="p-6 rounded-2xl bg-card/40 border border-border/70 space-y-3">
                <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 text-xs">
                  Ensamble Principal
                </Badge>
                <h3 className="text-2xl font-display text-foreground">Leandro Pagura Cuarteto</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Como líder del <em>Leandro Pagura Cuarteto</em>, presenta un repertorio de
                  composiciones originales en el que confluyen la sofisticación armónica, la
                  improvisación y una fuerte impronta rítmica. El proyecto propone una mirada
                  contemporánea sobre el jazz fusión, construida a partir del diálogo permanente entre
                  los músicos y de una constante exploración tímbrica en vivo y en estudio.
                </p>
              </div>

              {/* Section: Proyecto EY (Every Year) */}
              <div className="p-6 rounded-2xl bg-card/40 border border-border/70 space-y-3">
                <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 text-xs">
                  Fusión Instrumental
                </Badge>
                <h3 className="text-2xl font-display text-foreground">Proyecto EY (Every Year)</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Junto a destacados colegas instrumentistas —Santiago Pagura (guitarra), Matías
                  Galasso (teclados) y Ezequiel Ghilardi (batería)— conforma el proyecto <strong>EY</strong>,
                  un espacio de composición de vanguardia enfocado en métricas irregulares, cambios
                  armónicos audaces y una interacción de alto voltaje eléctrico que ha dejado piezas
                  como <em>"3,3"</em> y <em>"Shuffle"</em>.
                </p>
              </div>

              {/* Section: Docencia & Masterclasses */}
              <div className="space-y-3">
                <div className="text-xs tracking-[0.3em] text-primary font-semibold">
                  — FORMACIÓN & PEDAGOGÍA
                </div>
                <h3 className="text-2xl font-display text-foreground">
                  Labor Educativa & Clínicas de Bajo
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Su actividad artística se complementa con una intensa labor docente. Dicta clases
                  particulares, clínicas y masterclasses de bajo eléctrico, acompañando la formación
                  de músicos de distintos niveles y compartiendo herramientas técnicas y conceptuales
                  desarrolladas a lo largo de su experiencia profesional: subdivisión rítmica,
                  pulsación, técnica de mano derecha e izquierda, armonía aplicada e improvisación
                  consciente.
                </p>
              </div>

              {/* Section: Endorsements y Proyección */}
              <div className="space-y-3">
                <div className="text-xs tracking-[0.3em] text-primary font-semibold">
                  — EQUIPAMIENTO & PROYECCIÓN
                </div>
                <h3 className="text-2xl font-display text-foreground">
                  Endorsements Oficiales y Nuevo Álbum
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Actualmente es endorser oficial de <strong>SWAN Custom Basses</strong> (con su
                  modelo signature Alpha Classic <em>"Red Fury"</em>) y de <strong>Magma Strings</strong>.
                  Actualmente se encuentra trabajando en la grabación de su próximo álbum de estudio
                  junto a destacados músicos de la escena local e internacional, consolidando un
                  proyecto con proyección a festivales y salas de concierto en América y Europa.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-border flex flex-wrap gap-4">
                <Button asChild size="lg" className="shadow-lg">
                  <a href="/#contacto">
                    <Mail className="size-4 mr-2" /> Contactar para Clases o Contrataciones
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/media">
                    Explorar Galería Multimedia <ArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
