export function MainModulesSection() {
  return (
    <section id="modulos-principales" className="prose-docs">
      <h2>Módulos principales</h2>
      
      <h3>Chat</h3>
      <p>
        7 componentes en src/components/chat/:
      </p>
      <ul>
        <li>ChatPanel — Panel principal del chat con historial</li>
        <li>MessageInput — Input con soporte de @menciones y adjuntos</li>
        <li>AssistantMessage — Render de mensajes con markdown, fuentes y tool calls</li>
        <li>ThinkingInline — Indicador de razonamiento del modelo</li>
        <li>MessageActions — Acciones por mensaje (copiar, regenerar, feedback)</li>
        <li>DeepResearchPanel — Panel de investigación profunda multi-paso</li>
        <li>StreamEventRenderer — Render de eventos de streaming en tiempo real</li>
      </ul>

      <h3>Grafo de conocimiento</h3>
      <p>
        GraphPage (~595 líneas) en features/workspace/graph/:
      </p>
      <ul>
        <li>Visualización D3-Force con nodos y aristas animadas</li>
        <li>Controles: zoom, pan, fit, center</li>
        <li>Acciones por nodo: pin, delete, restore, merge</li>
        <li>Listener de evento graph:updated de Tauri</li>
        <li>Persistencia de posiciones en SQLite al soltar nodos</li>
      </ul>

      <h3>Análisis</h3>
      <p>
        7 componentes en features/workspace/analysis/:
      </p>
      <ul>
        <li>AnalysisDashboard — Vista principal con métricas agregadas</li>
        <li>TokenTimelineChart — Gráfico de uso de tokens en el tiempo</li>
        <li>ModelUsageChart — Distribución de uso por modelo</li>
        <li>AnalysisRunsList — Historial paginado de ejecuciones</li>
        <li>SkillUsagePanel — Estadísticas de tools del agente</li>
        <li>CostSummaryCard — Estimación de costos por período</li>
        <li>RecentTracesPanel — Últimos sync events con paginación</li>
      </ul>

      <h3>Configuración</h3>
      <p>
        ConfigDialog con secciones:
      </p>
      <ul>
        <li>AgentsSection — Agentes IA agrupados por categoría con toggle on/off</li>
        <li>NotificationsPanel — Categorías, canales y posición de notificaciones</li>
        <li>ThemeSettingsDialog — Temas claro/oscuro/acento (8 temas disponibles)</li>
        <li>ModelSettingsDialog — Configuración de proveedores LLM</li>
      </ul>
    </section>
  );
}
