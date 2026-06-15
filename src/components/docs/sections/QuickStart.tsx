import { CodeBlock } from "@/components/docs/CodeBlock";

export function QuickStart() {
  return (
    <section id="quick-start">
      <h2 className="mb-4 text-3xl font-bold">Quick Start</h2>

      <h3 className="mb-3 mt-8 text-xl font-semibold">Requisitos</h3>
      <ul className="mb-4 list-disc pl-6 space-y-1 text-muted-foreground">
        <li><strong>Node.js</strong> ≥ 18 + <strong>pnpm</strong></li>
        <li><strong>Rust</strong> ≥ 1.77 (via rustup)</li>
        <li><strong>Python</strong> ≥ 3.11</li>
        <li><strong>Tauri CLI</strong> v2</li>
        <li>Sistema operativo: Windows 10+, macOS 12+, Linux (Wayland/X11)</li>
      </ul>

      <h3 className="mb-3 mt-8 text-xl font-semibold">Instalación</h3>
      <CodeBlock>{`# 1. Clonar el repositorio
git clone https://github.com/Naiker12/GeoNexus.git
cd GeoNexus

# 2. Instalar dependencias frontend
pnpm install

# 3. Instalar dependencias Python del sidecar
cd ai
pip install -r requirements.txt
cd ..

# 4. Compilar y lanzar en modo desarrollo
pnpm dev`}</CodeBlock>

      <div className="mb-4 mt-4 rounded-lg border-l-4 border-primary bg-primary/5 p-4">
        <p className="text-sm font-medium"><strong>Nota:</strong> La primera compilación de Rust puede tardar 3-5 minutos. Los builds subsecuentes son incrementales.</p>
      </div>

      <h3 className="mb-3 mt-8 text-xl font-semibold">Build para producción</h3>
      <CodeBlock>{`pnpm build`}</CodeBlock>
      <p className="mb-4 text-muted-foreground">Genera un instalador nativo en <code>src-tauri/target/release/bundle/</code>.</p>

      <h3 className="mb-3 mt-8 text-xl font-semibold">Scripts disponibles</h3>
      <table className="mb-4 w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 px-3 text-left font-medium">Comando</th>
            <th className="py-2 px-3 text-left font-medium">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="py-2 px-3"><code>pnpm dev</code></td>
            <td className="py-2 px-3 text-muted-foreground">Inicia el servidor Vite + Tauri en modo desarrollo</td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-2 px-3"><code>pnpm build</code></td>
            <td className="py-2 px-3 text-muted-foreground">Build de producción con instalador nativo</td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-2 px-3"><code>pnpm test</code></td>
            <td className="py-2 px-3 text-muted-foreground">Ejecuta tests TypeScript (Vitest)</td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-2 px-3"><code>cargo test</code></td>
            <td className="py-2 px-3 text-muted-foreground">Ejecuta los 81+ tests Rust</td>
          </tr>
          <tr>
            <td className="py-2 px-3"><code>./test_llm_providers.ps1</code></td>
            <td className="py-2 px-3 text-muted-foreground">Prueba conectividad con todos los proveedores LLM</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
