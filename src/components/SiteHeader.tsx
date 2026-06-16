import { Link } from "@tanstack/react-router";
import { Github, Download, BookOpen } from "lucide-react";
import { GeoAgentsLogo } from "@/components/brand/GeoAgentsLogo";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <GeoAgentsLogo variant="compact" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/docs" className="transition-colors hover:text-foreground">
            Documentación
          </Link>
          <a href="/docs#proveedores-de-ia" className="transition-colors hover:text-foreground">
            Proveedores IA
          </a>
          <a href="/docs#canales" className="transition-colors hover:text-foreground">
            Canales
          </a>
          <a href="/docs#pendientes-y-roadmap" className="transition-colors hover:text-foreground">
            Roadmap
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/docs"
            className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            <BookOpen className="h-4 w-4" />
            <span>Docs</span>
          </Link>
          <ThemeSwitcher />
          <a
            href="/docs#instalacion-de-escritorio"
            className="hidden md:inline-flex"
          >
            <Button size="sm" className="flex items-center gap-1.5">
              <Download className="h-4 w-4" />
              Descargar
            </Button>
          </a>
          <a
            href="https://github.com/Naiker12"
            className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
