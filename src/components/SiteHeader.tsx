import { Link } from "@tanstack/react-router";
import { Search, Github, BookOpen } from "lucide-react";
import { GeoAgentsLogo } from "@/components/brand/GeoAgentsLogo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <GeoAgentsLogo variant="compact" />
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <Link to="/docs" className="transition-colors hover:text-foreground">
            Documentación
          </Link>
          <a href="/docs#instalación-de-escritorio" className="transition-colors hover:text-foreground">
            Instalación
          </a>
          <a href="/docs#proveedores-de-ia" className="transition-colors hover:text-foreground">
            IA
          </a>
          <a href="/docs#canales" className="transition-colors hover:text-foreground">
            Canales
          </a>
          <a href="/docs#pendientes-y-roadmap" className="transition-colors hover:text-foreground">
            Roadmap
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary sm:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Buscar</span>
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
              Ctrl K
            </kbd>
          </button>
          <Link
            to="/docs"
            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden"
            aria-label="Documentación"
          >
            <BookOpen className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com/Naiker12"
            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
