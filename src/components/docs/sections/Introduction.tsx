export function Introduction() {
  return (
    <section id="introducción" className="prose-docs">
      <h2>Introducción</h2>
      <p>
        GeoNexus es una aplicación desktop que combina herramientas GIS profesionales con un motor de inteligencia artificial local y en nube. Está diseñada para equipos de planeación urbana y análisis territorial que necesitan procesar documentos, construir grafos de conocimiento y consultar múltiples LLMs sin depender de infraestructura externa.
      </p>

      <h3>¿Qué incluye?</h3>
      <table>
        <thead>
          <tr>
            <th>Capa</th>
            <th>Tecnología</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Frontend</td>
            <td>React 18 · TypeScript · Vite · TailwindCSS v4 · shadcn/ui · Lucide · D3-Force · Sonner</td>
          </tr>
          <tr>
            <td>Desktop shell</td>
            <td>Tauri 2</td>
          </tr>
          <tr>
            <td>Backend</td>
            <td>Rust (4 crates)</td>
          </tr>
          <tr>
            <td>IA sidecar</td>
            <td>Python (LLM router, ChromaDB, RAG, web search)</td>
          </tr>
          <tr>
            <td>Base de datos</td>
            <td>SQLite (sqlx, 12 tablas) + ChromaDB (vectores)</td>
          </tr>
        </tbody>
      </table>

      <h3>Los 4 crates Rust</h3>
      <pre>
        geonexus-core    →  Tipos compartidos (Message, GraphNode, DataAsset, etc.)
geonexus-db      →  Repositorios SQLite + migraciones (12 tablas, 8 archivos)
geonexus-mcp     →  MCP tool schemas para containers
geonexus-tauri   →  56+ comandos Tauri, eventos, UI shell
      </pre>
    </section>
  );
}
