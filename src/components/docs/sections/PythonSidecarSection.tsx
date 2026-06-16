export function PythonSidecarSection() {
  const actions = [
    { name: "index", description: "Extrae texto, chunkifica y genera embeddings → ChromaDB" },
    { name: "recall_chunks", description: "Búsqueda vectorial RAG en ChromaDB" },
    { name: "chat_llm", description: "Comunicación con proveedores LLM" },
    { name: "search_web", description: "Búsqueda web para contexto" },
    { name: "extract_chat_entities", description: "NER para extracción de entidades de chat al grafo" },
    { name: "extract_graph_entities", description: "NER documental para el grafo" },
    { name: "ping_llm", description: "Health check de proveedores" },
    { name: "build_project_context", description: "Genera resumen de proyecto para el LLM" },
  ];

  return (
    <section id="python-sidecar" className="prose-docs">
      <h2>Python Sidecar</h2>
      
      <p>
        El sidecar Python es el corazón de la IA de GeoNexus. Gestiona el embedding, RAG, búsqueda web y todo lo relacionado con LLMs.
      </p>

      <div>
        <h3>Acciones del sidecar</h3>
        <div className="grid gap-4 sm:grid-cols-2 not-prose">
          {actions.map((action) => (
            <div key={action.name} className="p-4 rounded-lg border border-border bg-card">
              <div className="font-medium font-mono text-sm bg-primary/10 inline-block px-2 py-1 rounded text-primary mb-2">
                {action.name}
              </div>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}