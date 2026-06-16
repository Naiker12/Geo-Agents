export function ProjectStatusSection() {
  const phases = [
    { name: "Inventario y metadata local", status: "✅ Completo" },
    { name: "Conector local y cache", status: "✅ Completo" },
    { name: "Indexación documental y vectorial", status: "✅ Completo (ChromaDB prod pendiente)" },
    { name: "Containers MCP", status: "✅ Completo (cloud pendiente)" },
    { name: "OAuth — Conectores cloud", status: "❌ Sin implementar" },
    { name: "Proveedor LLM base", status: "✅ Completo" },
    { name: "Chat real con memoria", status: "✅ Completo" },
    { name: "Auto-detect modelos", status: "✅ Completo" },
    { name: "RAG + contexto GIS", status: "✅ Completo" },
  ];

  return (
    <section id="estado-del-proyecto" className="prose-docs">
      <h2>Estado del proyecto</h2>
      
      <div>
        <h3>Fases de desarrollo</h3>
        <div className="space-y-3 not-prose">
          {phases.map((phase, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <span className="font-medium">{phase.name}</span>
              <span className={`font-medium ${phase.status.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>
                {phase.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg border border-border bg-card not-prose">
        <p className="text-lg font-medium">
          8 de 9 fases completas en beta. 56+ comandos Tauri · 12 tablas SQLite · 81 tests Rust · 62 tests TypeScript.
        </p>
      </div>
    </section>
  );
}