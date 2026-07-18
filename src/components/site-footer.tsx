export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container-x py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="font-display text-lg tracking-widest text-foreground">
          LEANDRO<span className="text-primary">·</span>PAGURA
        </div>
        <div>© {new Date().getFullYear()} — Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}
