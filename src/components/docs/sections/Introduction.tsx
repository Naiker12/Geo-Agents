export function Introduction() {
  return (
    <section id="introducción">
      <h2 className="mb-4 text-3xl font-bold">Introducción</h2>
      <p className="mb-4 text-lg text-muted-foreground">
        GeoNexus es una aplicación desktop que combina herramientas GIS profesionales con un motor de inteligencia artificial local y en nube. Está diseñada para equipos de planeación urbana y análisis territorial que necesitan procesar documentos, construir grafos de conocimiento y consultar múltiples LLMs sin depender de infraestructura externa.
      </p>

      <h3 className="mb-3 mt-8 text-xl font-semibold">¿Qué incluye?</h3>
      <table className="mb-4 w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 px-3 text-left font-medium">Capa</th>
            <th className="py-2 px-3 text-left font-medium">Tecnología</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="py-2 px-3">Frontend</td>
            <td className="py-2 px-3 text-muted-foreground">React 18 · TypeScript · Vite · TailwindCSS v4 · shadcn/ui · Lucide · D3-Force · Sonner</td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-2 px-3">Desktop shell</td>
            <td className="py-2 px-3 text-muted-foreground">Tauri 2</td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-2 px-3">Backend</td>
            <td className="py-2 px-3 text-muted-foreground">Rust (4 crates)</td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-2 px-3">IA sidecar</td>
            <td className="py-2 px-3 text-muted-foreground">Python (LLM router, ChromaDB, RAG, web search)</td>
          </tr>
          <tr>
            <td className="py-2 px-3">Base de datos</td>
            <td className="py-2 px-3 text-muted-foreground">SQLite (sqlx, 12 tablas) + ChromaDB (vectores)</td>
          </tr>
        </tbody>
      </table>

      <h3 className="mb-3 mt-8 text-xl font-semibold">Los 4 crates Rust</h3>
      <pre className="mb-4 rounded-lg bg-muted p-4">
        geonexus-core    →  Tipos compartidos (Message, GraphNode, DataAsset, etc.)
geonexus-db      →  Repositorios SQLite + migraciones (12 tablas, 8 archivos)
geonexus-mcp     →  MCP tool schemas para containers
geonexus-tauri   →  56+ comandos Tauri, eventos, UI shell
      </pre>
    </section>
  );
}
