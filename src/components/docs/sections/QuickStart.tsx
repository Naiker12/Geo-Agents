import { CodeBlock } from "../CodeBlock";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function QuickStart() {
  return (
    <section id="quick-start" className="prose-docs">
      <h2>Quick Start</h2>

      <Card className="mb-8 not-prose">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Requisitos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Node.js</strong> ≥ 18 + <strong>pnpm</strong></li>
            <li><strong>Rust</strong> ≥ 1.77 (via rustup)</li>
            <li><strong>Python</strong> ≥ 3.11</li>
            <li><strong>Tauri CLI</strong> v2</li>
            <li>Sistema operativo: Windows 10+, macOS 12+, Linux (Wayland/X11)</li>
          </ul>
        </CardContent>
      </Card>

      <h3>Instalación</h3>
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

      <blockquote>
        <p><strong>Nota:</strong> La primera compilación de Rust puede tardar 3-5 minutos. Los builds subsecuentes son incrementales.</p>
      </blockquote>

      <h3>Build para producción</h3>
      <CodeBlock>{`pnpm build`}</CodeBlock>
      <p>Genera un instalador nativo en <code>src-tauri/target/release/bundle/</code>.</p>

      <Card className="not-prose">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Scripts disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <table>
            <thead>
              <tr>
                <th>Comando</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>pnpm dev</code></td>
                <td>Inicia el servidor Vite + Tauri en modo desarrollo</td>
              </tr>
              <tr>
                <td><code>pnpm build</code></td>
                <td>Build de producción con instalador nativo</td>
              </tr>
              <tr>
                <td><code>pnpm test</code></td>
                <td>Ejecuta tests TypeScript (Vitest)</td>
              </tr>
              <tr>
                <td><code>cargo test</code></td>
                <td>Ejecuta los 81+ tests Rust</td>
              </tr>
              <tr>
                <td><code>./test_llm_providers.ps1</code></td>
                <td>Prueba conectividad con todos los proveedores LLM</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </section>
  );
}
