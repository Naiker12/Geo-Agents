import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { AnimatedTerminal } from "@/components/AnimatedTerminal";
import {
  ArrowRight,
  Cpu,
  Database,
  Network,
  Terminal,
  Boxes,
  Brain,
  Github,
  Download,
} from "lucide-react";
import panelImage from "/panel.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GeoNexus — Plataforma GIS profesional con IA" },
      {
        name: "description",
        content:
          "GeoNexus combina herramientas GIS profesionales con un motor de IA local y en nube. Construida con Tauri 2, Rust, React y Python para urbanistas y especialistas territoriales.",
      },
      { property: "og:title", content: "GeoNexus — Plataforma GIS profesional con IA" },
      {
        property: "og:description",
        content: "Procesa documentos, construye grafos de conocimiento y consulta múltiples LLMs sin infraestructura externa.",
      },
    ],
  }),
  component: Home,
});

const FEATURES = [
  {
    icon: Cpu,
    title: "Backend en Rust",
    body: "4 crates, 56+ comandos Tauri, eventos en tiempo real y lógica de negocio fuertemente tipada.",
  },
  {
    icon: Brain,
    title: "Motor de IA local",
    body: "Sidecar Python con router multi-LLM, RAG vectorial sobre ChromaDB y búsqueda web integrada.",
  },
  {
    icon: Network,
    title: "Grafo de conocimiento",
    body: "Visualización D3-Force con extracción automática de entidades, merge, pin y persistencia.",
  },
  {
    icon: Database,
    title: "SQLite + Vectores",
    body: "12 tablas gestionadas con sqlx y migraciones, más almacenamiento vectorial para embeddings.",
  },
  {
    icon: Boxes,
    title: "Containers MCP",
    body: "Esquemas de tools MCP para conectores locales y, próximamente, almacenamiento en nube.",
  },
  {
    icon: Terminal,
    title: "Multi-proveedor LLM",
    body: "Ollama, LM Studio, OpenAI, OpenRouter y Anthropic con auto-detección de modelos.",
  },
];

const STATS = [
  { value: "56+", label: "Comandos Tauri" },
  { value: "12", label: "Tablas SQLite" },
  { value: "81", label: "Tests Rust" },
  { value: "8/9", label: "Fases completas" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="grain hero-glow absolute inset-0" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-20 md:py-28 lg:grid-cols-2">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Plataforma GIS con IA · v0.9-beta
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Análisis territorial,
              <br />
              <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                potenciado por IA.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              GeoNexus es una aplicación desktop que combina herramientas GIS profesionales
              con un motor de inteligencia artificial local y en nube. Para urbanistas y
              especialistas territoriales.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Empezar
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/docs#quick-start"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Quick Start
              </a>
              <a
                href="https://github.com/Naiker12/GeoNexus/releases/download/v0.1.0-beta.1/GeoNexus_0.1.0_x64_en-US.msi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="h-4 w-4" />
                Descargar
              </a>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right-4 duration-700 lg:pl-4">
            <AnimatedTerminal />
          </div>
        </div>
      </section>

      {/* Product showcase */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-sm font-medium text-primary">La aplicación</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Un espacio de trabajo, todos tus agentes.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Chat con IA, mapas GIS, conocimiento y conectores MCP — todo en una
              interfaz de escritorio limpia y elegante.
            </p>
          </div>
          <div className="grain hero-glow relative overflow-hidden rounded-2xl border border-border p-2 md:p-3">
            <img
              src={panelImage}
              alt="Interfaz de escritorio de GeoNexus mostrando el chat con IA, conversaciones y navegación lateral"
              className="relative w-full rounded-xl border border-border shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-border md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-8">
              <div className="text-3xl font-bold tracking-tight text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1400px] px-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight">
          Todo lo que necesitas, <span className="text-primary">local primero</span>.
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Una arquitectura de tres capas: frontend React, backend Rust y sidecar de IA en
          Python. Sin dependencias de infraestructura externa.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-4 pb-24">
        <div className="grain hero-glow relative overflow-hidden rounded-2xl border border-border p-10 md:p-14">
          <div className="relative max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight">Empieza a construir</h2>
            <p className="mt-3 text-muted-foreground">
              Explora la referencia completa de comandos Tauri, la capa API del frontend, los
              hooks y la arquitectura del sistema.
            </p>
            <Link
              to="/docs"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Leer la documentación
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted-foreground md:flex-row">
          <span>GeoNexus · v0.9-beta · Code Clean · Junio 2026</span>
          <a
            href="https://github.com/Naiker12"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
