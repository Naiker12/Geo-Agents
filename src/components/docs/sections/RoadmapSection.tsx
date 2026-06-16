import { AlertCircle, Clock, Sparkles } from "lucide-react";

export function RoadmapSection() {
  const priorities = [
    {
      title: "Crítico",
      icon: AlertCircle,
      color: "text-red-500 bg-red-500/10",
      items: [
        "OAuth completo (Fase 5): exchange_oauth_code, save_oauth_token, get_oauth_token existen pero el flujo de callback no está conectado. Impide conectores cloud (OneDrive, Google Drive, SharePoint, Dropbox, S3/MinIO).",
        "ChromaDB en producción: El pipeline de indexación usa ChromaDB vía sidecar Python pero no está configurado para producción.",
      ],
    },
    {
      title: "Alto",
      icon: Clock,
      color: "text-orange-500 bg-orange-500/10",
      items: [
        "Vista de Skills standalone: Página dedicada con listado, búsqueda, tasa de éxito y últimas ejecuciones por tool.",
        "Unificar ProviderSetupDialog: ModelSettingsDialog (config) y ProviderSetupDialog (ai-containers) tienen código duplicado. El segundo es superior — ~45 min de trabajo.",
        "Selector de embeddings funcional: Actualmente el selector de modelo de embeddings es texto muerto sin acción real. ~30 min.",
        "Footer reactivo: Footer hardcodeado, debe mostrar el modelo activo actual. ~15 min.",
        "Fix DialogClose de shadcn/ui: Ícono × superpuesto en algunos diálogos. ~5 min.",
      ],
    },
    {
      title: "Medio",
      icon: Sparkles,
      color: "text-blue-500 bg-blue-500/10",
      items: [
        "Persistencia de config LLM en SQLite: ConnectorsContext usa localStorage, no la base de datos.",
        "Zustand stores: src/store/ está vacío. Toda la gestión es hooks + context, puede generar inconsistencias al escalar.",
        "Código duplicado: map_extension_to_kind existe en connector/mod.rs:19 y containers_mcp/handlers.rs:260.",
        "Web Search / Deep Research: useChatSession.ts tiene el toggle pero la integración backend puede estar incompleta.",
        "Streaming de chat: chat:stream_event y chat:preview_chunk existen como listeners pero StreamEventRenderer puede necesitar pulido.",
      ],
    },
    {
      title: "Bajo",
      icon: Sparkles,
      color: "text-green-500 bg-green-500/10",
      items: [
        "Centralizar list_agents, toggle_agent en src/api/ (actualmente en features/agents/api.ts).",
        "Implementar densidad de UI en ThemeSettingsDialog.",
        "Agregar tests TypeScript para los hooks de análisis.",
        "get_data_lineage pendiente (mencionado en docs/09).",
        "reindex_asset pendiente (mencionado en docs/09).",
        "Citas por chunk no implementadas.",
        "Container upload para proveedores cloud (reservado para Fase 5).",
      ],
    },
  ];

  return (
    <section id="pendientes-y-roadmap" className="prose-docs">
      <h2>Pendientes y Roadmap</h2>
      
      <div className="space-y-8 not-prose">
        {priorities.map((priority) => {
          const Icon = priority.icon;
          return (
            <div key={priority.title} className="space-y-4">
              <h3 className="flex items-center gap-3 text-xl font-semibold">
                <div className={`grid h-8 w-8 place-items-center rounded-lg ${priority.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                {priority.title}
              </h3>
              <ul className="space-y-3">
                {priority.items.map((item, idx) => (
                  <li key={idx} className="p-4 rounded-lg border border-border bg-card text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}