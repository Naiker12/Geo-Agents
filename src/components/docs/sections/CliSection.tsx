import { CodeBlock } from "../CodeBlock";

export function CliSection() {
  return (
    <section id="cli--geonexus" className="prose-docs">
      <h2>CLI — geonexus</h2>
      <p>
        La CLI permite instalar, lanzar y operar GeoNexus sin abrir la interfaz gráfica — ideal para servidores, automatización y pipelines de datos.
      </p>

      <h3>Comandos principales</h3>
      <table>
        <thead>
          <tr>
            <th>Comando</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>geoagents install --desktop</code></td>
            <td>Instala la app de escritorio para tu plataforma</td>
          </tr>
          <tr>
            <td><code>geoagents open</code></td>
            <td>Lanza la aplicación</td>
          </tr>
          <tr>
            <td><code>geoagents ai --warmup</code></td>
            <td>Pre-carga el sidecar de IA y auto-detecta modelos</td>
          </tr>
          <tr>
            <td><code>geoagents index &lt;ruta&gt;</code></td>
            <td>Indexa documentos de una carpeta al proyecto activo</td>
          </tr>
          <tr>
            <td><code>geoagents connect &lt;ruta&gt;</code></td>
            <td>Registra una carpeta local como conector</td>
          </tr>
          <tr>
            <td><code>geoagents models</code></td>
            <td>Lista los modelos LLM detectados</td>
          </tr>
          <tr>
            <td><code>geoagents doctor</code></td>
            <td>Diagnóstico de entorno (Rust, Python, Tauri, modelos)</td>
          </tr>
          <tr>
            <td><code>geoagents --version</code></td>
            <td>Muestra la versión instalada</td>
          </tr>
        </tbody>
      </table>

      <h3>Ejemplo de sesión</h3>
      <CodeBlock>{`# 1. Calienta el motor de IA y detecta modelos locales
geoagents ai --warmup

# 2. Conecta una carpeta de documentos territoriales
geoagents connect ~/proyectos/pot-2026

# 3. Indexa todo el contenido al grafo de conocimiento
geoagents index ~/proyectos/pot-2026 --recursive

# 4. Verifica el estado del entorno
geoagents doctor`}</CodeBlock>
    </section>
  );
}
