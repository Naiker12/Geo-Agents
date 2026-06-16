import { CodeBlock } from "../CodeBlock";

export function AppExperienceSection() {
  return (
    <section id="experiencia-y-aplicacion" className="prose-docs">
      <h2>Experiencia y aplicación</h2>
      
      <h3>Capa API (src/api/)</h3>
      <p>
        Wrappers TypeScript sobre los comandos Tauri. Toda la comunicación con el backend pasa por aquí.
      </p>
      <CodeBlock>{`src/api/
├── chat.ts         →  sendMessage, deleteConversation, listConversations,
│                      listMessages, getProjectContext, recallChunks,
│                      getMentionableSources
├── llm.ts          →  listLlmModels, pingLlmProvider, sendLlmMessage
├── analysis.ts     →  getAnalysisMetrics, getTokenTimeline, getModelUsage,
│                      listAnalysisRuns, getSkillUsage, getCostByTimeframe,
│                      getTopQueries, exportAnalysisTraces
├── connector.ts    →  registerLocalConnector, listConnectorFiles,
│                      cacheConnectorFile, syncLocalConnector,
│                      listConnectorConfigs
└── data.ts         →  listDataAssets, getDataAsset, getDataStoreMetrics,
                      getSyncEvents, deleteDataAsset, validateDataAsset,
                      indexDocument, listDocumentChunks, listGraphNodes,
                      listGraphEdges, rebuildKnowledgeGraph,
                      updateNodePosition, clearEphemeralNodes,
                      getRecentGraphEvents`}</CodeBlock>

      <h3>Hooks principales</h3>
      
      <h4>useChatSession</h4>
      <p>
        Gestiona toda la lógica del chat: mensajes, envío, regeneración y toggle de web search.
      </p>
      <CodeBlock>{`// components/chat/useChatSession.ts
const { messages, sendMessage, regenerate, webSearchEnabled, toggleWebSearch, isLoading } = useChatSession(conversationId)`}</CodeBlock>

      <h4>useDocuments</h4>
      <p>
        CRUD completo de assets documentales: fetch, upload, indexación, sincronización de carpetas.
      </p>
      <CodeBlock>{`// features/workspace/documents/useDocuments.ts
const { documents, upload, index, syncFolder } = useDocuments(projectId)`}</CodeBlock>

      <h4>useGraphEvents</h4>
      <p>
        Estado del grafo de conocimiento: nodos, aristas, animación y listener de eventos Tauri.
      </p>
      <CodeBlock>{`// features/workspace/graph/useGraphEvents.ts
const { nodes, edges, isAnimating } = useGraphEvents(projectId)`}</CodeBlock>

      <h4>useConnectors</h4>
      <p>
        Estado global de conectores AI via React Context + localStorage.
      </p>
      <CodeBlock>{`// contexts/ConnectorsContext.tsx
const { connectors, addConnector, removeConnector } = useConnectors()`}</CodeBlock>

      <h4>useStreamPreview</h4>
      <p>
        Vista previa streaming de chunks para un evento de chat en curso.
      </p>
      <CodeBlock>{`// features/workspace/chat/hooks/useStreamPreview.ts
const { preview } = useStreamPreview(eventId)`}</CodeBlock>
    </section>
  );
}
