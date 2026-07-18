import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Youtube, Music2, Mail, ArrowRight, PlayCircle, Ticket, Zap, Cpu, Guitar, Speaker } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const heroImg = "/f3004a62-a83f-4ae8-b5ce-8ddb57b56c0c-copied-media~2.jpg";
const bioImg = "/leandro-prensa.jpg";
const setupImg = "/9c113a46-b0e2-488e-b11d-08095a698ca1-copied-media~2.jpg";
const quartetImg = "/71f23e85-f3c4-426b-af51-99fbc5ae9ccf-copied-media~2.jpg";
const studioImg = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80";
const liveImg = "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1200&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leandro Pagura — Bajista, sesionista y educador" },
      { name: "description", content: "Bajista, sesionista y educador. Groove y solidez en la escena nacional e internacional. Shows, proyectos y plataforma de cursos." },
      { property: "og:title", content: "Leandro Pagura — Bajista, sesionista y educador" },
      { property: "og:description", content: "Bajista, sesionista y educador. Groove y solidez en la escena nacional e internacional." },
    ],
  }),
  component: Landing,
});

const shows = [
  { date: "15 AGO 2026", title: 'Presentación "Mi Primera Mitad"', venue: "Sala Lavardén, Rosario" },
  { date: "28 SEP 2026", title: "Leandro Pagura Cuarteto", venue: "Complejo Cultural Atlas, Rosario" },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader variant="landing" />

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="En vivo" width={1920} height={1280} className="h-full w-full object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="container-x relative z-10">
          <Badge variant="outline" className="mb-6 border-primary/40 text-primary bg-primary/5">Sitio Oficial</Badge>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none text-balance uppercase">
            Leandro<br />
            <span className="text-primary">Pagura</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground text-balance">
            Bajista · Compositor · Educador
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/cursos">Explorar cursos <ArrowRight className="ml-2 size-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><a href="#shows">Próximos shows</a></Button>
          </div>
        </div>
      </section>

      {/* CURSOS TEASER */}
      <section id="cursos" className="py-24 bg-gradient-to-b from-transparent to-accent/20">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Próximamente</Badge>
              <h2 className="text-5xl md:text-6xl">Plataforma de Cursos</h2>
              <p className="mt-6 text-lg text-muted-foreground text-balance">
                Un espacio exclusivo para acceder a masterclasses, desarrollo de técnica,
                estudio de escalas complejas y rutinas de práctica — donde sea que estés.
              </p>
              <div className="mt-8 flex gap-3">
                <Button asChild size="lg"><Link to="/cursos">Entrar a la plataforma</Link></Button>
                <Button asChild size="lg" variant="ghost"><Link to="/auth">Crear cuenta</Link></Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: PlayCircle, title: "Masterclasses" },
                { icon: Zap, title: "Técnica avanzada" },
                { icon: Music2, title: "Escalas complejas" },
                { icon: Guitar, title: "Rutinas de práctica" },
              ].map((it) => (
                <Card key={it.title} className="p-6 bg-card/60 backdrop-blur border-border">
                  <it.icon className="size-8 text-primary mb-3" />
                  <div className="font-semibold">{it.title}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BIO */}
      <section id="bio" className="py-24">
        <div className="container-x grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
              <img src={bioImg} alt="Retrato de Leandro Pagura" loading="lazy" width={1200} height={1500} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs tracking-[0.3em] text-primary mb-3">— BIOGRAFÍA</div>
            <h2 className="text-5xl md:text-6xl mb-6">Dos décadas de<br />groove y sesión.</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Leandro Pagura es un bajista, compositor y docente argentino con más de dos décadas de
                trayectoria. Especializado en jazz fusión, funk, rock y música contemporánea, ha desarrollado
                una sólida carrera como intérprete, sesionista y educador, combinando una fuerte identidad musical
                con una amplia experiencia tanto en el escenario como en la enseñanza.
              </p>
              <p>
                Como líder del Leandro Pagura Quartet, desarrolla un repertorio original donde conviven la
                improvisación, la sofisticación armónica y el groove. Paralelamente, dicta clases y masterclasses de
                bajo eléctrico, compartiendo su experiencia con músicos de distintos niveles.
              </p>
              <p>
                Actualmente es endorser de Magma Strings y Swan Basses, y se encuentra trabajando en su
                primer álbum de estudio junto a reconocidos músicos internacionales, consolidando un proyecto
                con proyección hacia escenarios y festivales de Europa y América.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MUSICA */}
      <section id="musica" className="py-24 bg-accent/10">
        <div className="container-x">
          <div className="text-xs tracking-[0.3em] text-primary mb-3">— MÚSICA</div>
          <h2 className="text-5xl md:text-6xl mb-10">Escuchá el material</h2>
          <Card className="p-6 md:p-10 bg-card/60 backdrop-blur border-border">
            <p className="text-muted-foreground max-w-2xl mb-8">
              Grabaciones, singles y colaboraciones directamente desde Spotify.
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
              <Button variant="outline" asChild><a href="https://open.spotify.com/artist/0Mfv0jLx7lR1vpip9uQJcs" target="_blank" rel="noreferrer"><Music2 className="mr-2 size-4" /> Abrir en Spotify</a></Button>
              <Button variant="outline"><Youtube className="mr-2 size-4" /> YouTube</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* MEDIA */}
      <section id="media" className="py-24">
        <div className="container-x">
          <div className="text-xs tracking-[0.3em] text-primary mb-3">— MEDIA</div>
          <h2 className="text-5xl md:text-6xl mb-10">Momentos</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { src: liveImg, title: "En vivo" },
              { src: studioImg, title: "Grabación en estudio" },
              { src: quartetImg, title: "Leandro Pagura Cuarteto" },
            ].map((m) => (
              <div key={m.title} className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
                <img src={m.src} alt={m.title} loading="lazy" width={1200} height={1500} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 font-display text-2xl">{m.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="py-24 bg-accent/10">
        <div className="container-x">
          <div className="text-xs tracking-[0.3em] text-primary mb-3">— PROYECTOS ACTUALES</div>
          <h2 className="text-5xl md:text-6xl mb-10">Leandro Pagura Cuarteto</h2>
          <Card className="overflow-hidden bg-card/60 backdrop-blur border-border">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <img src={quartetImg} alt="Leandro Pagura Cuarteto" loading="lazy" width={1600} height={1000} className="h-full w-full object-cover" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-4 border-primary/40 text-primary">Ensamble Principal</Badge>
                <h3 className="text-3xl mb-2">Cuarteto Jazz / Funk</h3>
                <p className="text-muted-foreground mb-6">
                  Un colectivo musical liderado por Leandro, explorando la fusión dinámica del jazz
                  eléctrico y el funk. Composiciones intrincadas e improvisaciones espontáneas que
                  empujan los límites musicales de la escena contemporánea.
                </p>
                <Button className="w-fit"><PlayCircle className="mr-2 size-4" /> Escuchar material</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SETUP */}
      <section id="setup" className="py-24">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
            <img src={setupImg} alt="Setup de Leandro Pagura" loading="lazy" width={1920} height={1080} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-xs tracking-[0.3em] text-primary mb-3">— SETUP</div>
            <h2 className="text-5xl md:text-6xl mb-8">Equipos</h2>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <Cpu className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Procesamiento</div>
                  <div className="text-muted-foreground text-sm">Helix Quad Cortex — emulaciones, modulaciones y ruteo directo.</div>
                </div>
              </li>
              <li className="flex gap-4">
                <Guitar className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Instrumentos</div>
                  <div className="text-muted-foreground text-sm">Bajos pasivos estilo Precision Bass · SWAN Custom Basses — Alpha Classic "Red Fury" signature by Leandro Pagura.</div>
                </div>
              </li>
              <li className="flex gap-4">
                <Speaker className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Amplificación</div>
                  <div className="text-muted-foreground text-sm">Sistemas Full Range (FRFR) · equipos Clase D modernos.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SHOWS */}
      <section id="shows" className="py-24 bg-accent/10">
        <div className="container-x">
          <div className="text-xs tracking-[0.3em] text-primary mb-3">— PRÓXIMOS SHOWS</div>
          <h2 className="text-5xl md:text-6xl mb-10">Agenda</h2>
          <div className="space-y-4">
            {shows.map((s) => (
              <Card key={s.title + s.date} className="p-6 md:p-8 bg-card/60 backdrop-blur border-border flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-40 shrink-0">
                  <div className="font-display text-3xl text-primary">{s.date}</div>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-semibold">{s.title}</div>
                  <div className="text-muted-foreground text-sm mt-1">{s.venue}</div>
                </div>
                <Button variant="outline" className="w-fit"><Ticket className="mr-2 size-4" /> Tickets</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24">
        <div className="container-x text-center">
          <div className="text-xs tracking-[0.3em] text-primary mb-3">— CONTACTO</div>
          <h2 className="text-5xl md:text-6xl mb-6 text-balance">¿Listo para mejorar tu groove<br />o agendar una sesión?</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Button asChild size="lg"><a href="mailto:contacto@leandropagura.com"><Mail className="mr-2 size-4" /> contacto@leandropagura.com</a></Button>
            <Button asChild size="lg" variant="outline"><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram className="mr-2 size-4" /> Instagram</a></Button>
            <Button asChild size="lg" variant="outline"><a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><Youtube className="mr-2 size-4" /> YouTube</a></Button>
            <Button asChild size="lg" variant="outline"><a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"><Music2 className="mr-2 size-4" /> Spotify</a></Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
