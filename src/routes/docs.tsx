import { createFileRoute } from "@tanstack/react-router";
import { type ComponentType, useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { AnimatedTerminal } from "@/components/AnimatedTerminal";
import { PageNavigation } from "@/components/docs/PageNavigation";
import {
  Introduction,
  QuickStart,
  DesktopInstall,
  CliSection,
  AIProvidersSection,
  ChannelsSection,
  AppExperienceSection,
  MainModulesSection,
  ProjectStatusSection,
  RoadmapSection,
  PythonSidecarSection,
} from "@/components/docs/sections";
import {
  ListTree,
  ChevronRight,
  Sparkles,
  Rocket,
  Compass,
  Layers,
  MonitorDown,
  TerminalSquare,
  Server,
  Boxes,
  Code2,
  Brain,
  GitBranch,
  ClipboardList,
  FolderTree,
  Search,
  Book,
  Bot,
  Send,
} from "lucide-react";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Rocket,
  Compass,
  Layers,
  MonitorDown,
  TerminalSquare,
  Server,
  Boxes,
  Code2,
  Brain,
  GitBranch,
  ClipboardList,
  FolderTree,
  Bot,
  Send,
};

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "GeoNexus — Documentación técnica" },
      {
        name: "description",
        content:
          "Documentación técnica completa de GeoNexus: instalación de escritorio, CLI, comandos Tauri, API frontend, hooks, arquitectura y roadmap de la plataforma GIS con IA.",
      },
      { property: "og:title", content: "GeoNexus — Documentación técnica" },
      {
        property: "og:description",
        content: "Plataforma GIS profesional con IA. Instalación, CLI y referencia de 56+ comandos Tauri.",
      },
    ],
  }),
  component: DocsPage,
});

const NAV: NavGroup[] = [
  {
    label: "Primeros pasos",
    items: [
      { text: "Introducción", slug: "introducción", icon: "Compass" },
      { text: "Quick Start", slug: "quick-start", icon: "Rocket" },
    ],
  },
  {
    label: "Instalación",
    items: [
      { text: "Instalación de escritorio", slug: "instalación-de-escritorio", icon: "MonitorDown" },
      { text: "CLI — geonexus", slug: "cli--geonexus", icon: "TerminalSquare" },
    ],
  },
  {
    label: "Inteligencia artificial",
    items: [{ text: "Proveedores de IA", slug: "proveedores-de-ia", icon: "Bot" }],
  },
  {
    label: "Canales",
    items: [{ text: "Telegram", slug: "canales", icon: "Send" }],
  },
  {
    label: "Plataforma",
    items: [
      { text: "Experiencia y aplicación", slug: "experiencia-y-aplicación", icon: "Code2" },
      { text: "Módulos principales", slug: "módulos-principales", icon: "Boxes" },
      { text: "Python Sidecar", slug: "python-sidecar", icon: "Brain" },
    ],
  },
  {
    label: "Proyecto",
    items: [
      { text: "Estado del proyecto", slug: "estado-del-proyecto", icon: "GitBranch" },
      { text: "Pendientes y Roadmap", slug: "pendientes-y-roadmap", icon: "ClipboardList" },
    ],
  },
];

function DocsPage() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState<Record<string, boolean>>(
    () => Object.fromEntries(NAV.map((g) => [g.label, true]))
  );

  const toggle = (label: string) =>
    setOpen((o) => ({ ...o, [label]: !o[label] }));

  // Flatten all nav items for previous/next navigation
  const allNavItems = useMemo(() => {
    const items = [];
    for (const group of NAV) {
      for (const item of group.items) {
        items.push({ ...item, group: group.label });
      }
    }
    return items;
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const tocRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<{ top: number; height: number }>({ top: 0, height: 0 });

  useEffect(() => {
    if (!active || !tocRef.current) return;
    const el = tocRef.current.querySelector<HTMLElement>(`a[data-slug="${CSS.escape(active)}"]`);
    if (el) setThumb({ top: el.offsetTop, height: el.offsetHeight });
  }, [active]);

  // Find current index and compute prev/next
  const currentIndex = useMemo(() => 
    allNavItems.findIndex((item) => item.slug === active)
  , [allNavItems, active]);

  const previous = currentIndex > 0 ? {
    title: allNavItems[currentIndex - 1].text,
    href: `#${allNavItems[currentIndex - 1].slug}`,
  } : undefined;

  const next = currentIndex < allNavItems.length - 1 ? {
    title: allNavItems[currentIndex + 1].text,
    href: `#${allNavItems[currentIndex + 1].slug}`,
  } : undefined;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto flex max-w-[1400px] gap-8 px-4">
        {/* Left sidebar — collapsible groups */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto py-6 pr-3 lg:block">
          {/* Brand */}
          <div className="mb-3 flex items-center gap-2 px-1 text-sm font-semibold tracking-tight">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-orange-500 text-[10px] font-bold text-primary-foreground">
              G
            </span>
            GeoNexus
          </div>

          {/* Search */}
          <button className="mb-3 flex w-full items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary">
            <Search className="h-3.5 w-3.5" />
            <span>Buscar</span>
            <kbd className="ml-auto rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
              Ctrl K
            </kbd>
          </button>

          {/* Section selector */}
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium">
            <Book className="h-4 w-4 text-primary" />
            Plataforma
            <ChevronRight className="ml-auto h-3.5 w-3.5 rotate-90 text-muted-foreground" />
          </div>

          <nav>
            {NAV.map((group) => {
              const isOpen = open[group.label];
              return (
                <div key={group.label} className="mb-4">
                  <button
                    onClick={() => toggle(group.label)}
                    className="mb-1 flex w-full items-center gap-1.5 px-2 text-xs font-semibold uppercase tracking-wider text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {group.label}
                    <ChevronRight
                      className={`ml-auto h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <ul className="overflow-hidden">
                      {group.items.map((item) => {
                        const Icon = item.icon ? ICONS[item.icon] : null;
                        const isActive = active === item.slug;
                        return (
                          <li key={item.slug}>
                            <a
                              href={`#${item.slug}`}
                              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                                isActive
                                  ? "bg-gradient-to-r from-primary/20 to-primary/[0.06] font-medium text-primary ring-1 ring-inset ring-primary/30"
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              }`}
                            >
                              {Icon && (
                                <Icon
                                  className={`h-4 w-4 shrink-0 ${
                                    isActive ? "text-primary" : "text-muted-foreground/70"
                                  }`}
                                />
                              )}
                              {item.text}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 py-10">
          <article className="mx-auto max-w-3xl">
            {/* AI terminal hero */}
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Instala y arranca en segundos
              </div>
              <AnimatedTerminal />
            </div>

            <div className="animate-in fade-in duration-700 space-y-12">
              <Introduction />
              <QuickStart />
              <DesktopInstall />
              <CliSection />
              <AIProvidersSection />
              <ChannelsSection />
              <AppExperienceSection />
              <MainModulesSection />
              <PythonSidecarSection />
              <ProjectStatusSection />
              <RoadmapSection />
            </div>

            <PageNavigation previous={previous} next={next} />
          </article>
        </main>

        {/* Right TOC — fumadocs style with moving indicator */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 xl:block">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ListTree className="h-3.5 w-3.5" />
            En esta página
          </p>
          <div className="relative" ref={tocRef}>
            {/* track */}
            <div className="absolute left-0 top-0 h-full w-px bg-border" />
            {/* moving thumb */}
            <div
              className="absolute left-0 w-px rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ top: thumb.top, height: thumb.height, opacity: thumb.height ? 1 : 0 }}
            />
            <ul className="space-y-0.5">
              {allNavItems.map((item) => (
                <li key={item.slug}>
                  <a
                    href={`#${item.slug}`}
                    data-slug={item.slug}
                    className={`block py-1 text-sm transition-colors pl-3 ${
                      active === item.slug
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
