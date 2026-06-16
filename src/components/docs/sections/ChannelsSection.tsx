import { CodeBlock } from "../CodeBlock";
import telegramImage from "/telegram.png";

export function ChannelsSection() {
  return (
    <section id="canales" className="prose-docs">
      <h2>Canales</h2>
      <p>
        Los canales permiten interactuar con tus agentes desde fuera de la aplicación de escritorio. En esta versión GeoNexus integra Telegram como único canal, con más canales planificados en el roadmap.
      </p>

      <div className="my-6">
        <img src={telegramImage} alt="Integración con Telegram" className="w-full rounded-lg border" />
      </div>

      <h3>Integración con Telegram</h3>
      <p>
        Conecta un bot de Telegram para consultar tu conocimiento territorial desde el móvil: envía preguntas, recibe respuestas con citas y dispara indexaciones, todo por chat.
      </p>

      <table>
        <thead>
          <tr>
            <th>Capacidad</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mensajes entrantes</td>
            <td>Recibe preguntas vía webhook seguro y las enruta al motor de chat</td>
          </tr>
          <tr>
            <td>Respuestas con IA</td>
            <td>Usa el mismo pipeline RAG + grafo que la app de escritorio</td>
          </tr>
          <tr>
            <td>Adjuntos</td>
            <td>Reenvía PDFs/DOCX para indexarlos directamente desde el chat</td>
          </tr>
          <tr>
            <td>Seguridad</td>
            <td>Verificación de firma por <code>secret_token</code>; el bot token nunca se expone</td>
          </tr>
        </tbody>
      </table>

      <h4>Configuración</h4>
      <ol>
        <li>Crea un bot con @BotFather en Telegram y obtén el token</li>
        <li>En Configuración → Canales → Telegram, conecta la cuenta</li>
        <li>GeoNexus registra el webhook automáticamente (<code>setWebhook</code>)</li>
        <li>Escribe a tu bot — las respuestas llegan con citas verificables</li>
      </ol>

      <CodeBlock>{`# Estado del canal de Telegram
geoagents channels --status telegram`}</CodeBlock>

      <p>
        Próximamente: WhatsApp, Slack y correo electrónico como canales adicionales.
      </p>
    </section>
  );
}
