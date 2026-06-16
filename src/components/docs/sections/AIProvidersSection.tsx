import { CodeBlock } from "../CodeBlock";
import modelsiaImage from "/modelsia.png";

export function AIProvidersSection() {
  return (
    <section id="proveedores-de-ia" className="prose-docs">
      <h2>Proveedores de IA</h2>
      <p>
        GeoNexus es multi-LLM: puedes cambiar de proveedor en caliente, sin reiniciar la aplicación. Combina modelos locales (privacidad total, sin coste por token) con modelos en la nube (máxima capacidad) según cada tarea.
      </p>

      <div className="my-6">
        <img src={modelsiaImage} alt="Configuración de proveedores de IA" className="w-full rounded-lg border" />
      </div>

      <h3>Tabla de proveedores</h3>
      <table>
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Tipo</th>
            <th>Endpoint por defecto</th>
            <th>Autenticación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ollama</td>
            <td>Local</td>
            <td><code>http://localhost:11434</code></td>
            <td>No requiere</td>
            <td className="text-green-600 font-medium">✅ Estable</td>
          </tr>
          <tr>
            <td>LM Studio</td>
            <td>Local</td>
            <td><code>http://localhost:1234</code></td>
            <td>No requiere</td>
            <td className="text-green-600 font-medium">✅ Estable</td>
          </tr>
          <tr>
            <td>OpenAI</td>
            <td>Nube</td>
            <td><code>https://api.openai.com</code></td>
            <td>API Key</td>
            <td className="text-green-600 font-medium">✅ Estable</td>
          </tr>
          <tr>
            <td>Anthropic</td>
            <td>Nube</td>
            <td><code>https://api.anthropic.com</code></td>
            <td>API Key</td>
            <td className="text-green-600 font-medium">✅ Estable</td>
          </tr>
          <tr>
            <td>OpenRouter</td>
            <td>Nube</td>
            <td><code>https://openrouter.ai/api/v1</code></td>
            <td>API Key</td>
            <td className="text-green-600 font-medium">✅ Estable</td>
          </tr>
        </tbody>
      </table>

      <h3>Modelos sugeridos por proveedor</h3>
      <table>
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Modelos recomendados</th>
            <th>Uso ideal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ollama</td>
            <td><code>llama3.1</code>, <code>qwen2.5</code>, <code>mistral</code>, <code>nomic-embed-text</code></td>
            <td>Chat offline, embeddings locales</td>
          </tr>
          <tr>
            <td>LM Studio</td>
            <td>Cualquier GGUF compatible</td>
            <td>Pruebas locales con GPU</td>
          </tr>
          <tr>
            <td>OpenAI</td>
            <td><code>gpt-4o</code>, <code>gpt-4o-mini</code>, <code>text-embedding-3</code></td>
            <td>Razonamiento avanzado, RAG de calidad</td>
          </tr>
          <tr>
            <td>Anthropic</td>
            <td><code>claude-3.5-sonnet</code>, <code>claude-3-haiku</code></td>
            <td>Análisis largo de documentos</td>
          </tr>
          <tr>
            <td>OpenRouter</td>
            <td>Acceso unificado a 100+ modelos</td>
            <td>Comparar proveedores con una sola key</td>
          </tr>
        </tbody>
      </table>

      <h3>Cómo conectar un proveedor</h3>
      <ol>
        <li>Abre Configuración → Proveedores de IA</li>
        <li>Selecciona el proveedor y verifica el endpoint</li>
        <li>Para proveedores en la nube, pega tu API Key (se guarda cifrada en el keychain del sistema)</li>
        <li>Pulsa Probar conexión — internamente ejecuta <code>ping_llm_provider</code></li>
        <li>GeoNexus auto-detecta los modelos disponibles con <code>list_llm_models</code></li>
      </ol>

      <CodeBlock>{`# Verificar proveedores desde la CLI
geoagents ai --providers
geoagents ai --warmup        # precarga el modelo local por defecto`}</CodeBlock>

      <p>
        Las API Keys nunca se exponen al frontend ni se incluyen en el bundle: viven en el keychain del sistema operativo y solo el backend Rust las utiliza.
      </p>
    </section>
  );
}
