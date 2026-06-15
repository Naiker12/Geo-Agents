# GeoNexus

> Plataforma GIS profesional con inteligencia artificial para urbanistas y especialistas territoriales. Construida con Tauri 2, Rust, React y Python.

---

## Introducción

GeoNexus es una aplicación desktop que combina herramientas GIS profesionales con un motor de inteligencia artificial local y en nube. Está diseñada para equipos de planeación urbana y análisis territorial que necesitan procesar documentos, construir grafos de conocimiento y consultar múltiples LLMs sin depender de infraestructura externa.

### ¿Qué incluye?

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 · TypeScript · Vite · TailwindCSS v4 · shadcn/ui · Lucide · D3-Force · Sonner |
| Desktop shell | Tauri 2 |
| Backend | Rust (4 crates) |
| IA sidecar | Python (LLM router, ChromaDB, RAG, web search) |
| Base de datos | SQLite (sqlx, 12 tablas) + ChromaDB (vectores) |

### Los 4 crates Rust

```
geonexus-core    →  Tipos compartidos (Message, GraphNode, DataAsset, etc.)
geonexus-db      →  Repositorios SQLite + migraciones (12 tablas, 8 archivos)
geonexus-mcp     →  MCP tool schemas para containers
geonexus-tauri   →  56+ comandos Tauri, eventos, UI shell
```

---

## Quick Start

### Requisitos

- **Node.js** ≥ 18 + **pnpm**
- **Rust** ≥ 1.77 (via rustup)
- **Python** ≥ 3.11
- **Tauri CLI** v2
- Sistema operativo: Windows 10+, macOS 12+, Linux (Wayland/X11)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Naiker12/GeoNexus.git
cd GeoNexus

# 2. Instalar dependencias frontend
pnpm install

# 3. Instalar dependencias Python del sidecar
cd ai
pip install -r requirements.txt
cd ..

# 4. Compilar y lanzar en modo desarrollo
pnpm dev
```

> **Nota:** La primera compilación de Rust puede tardar 3-5 minutos. Los builds subsecuentes son incrementales.

### Build para producción

```bash
pnpm build
```

Genera un instalador nativo en `src-tauri/target/release/bundle/`.

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor Vite + Tauri en modo desarrollo |
| `pnpm build` | Build de producción con instalador nativo |
| `pnpm test` | Ejecuta tests TypeScript (Vitest) |
| `cargo test` | Ejecuta los 81+ tests Rust |
| `./test_llm_providers.ps1` | Prueba conectividad con todos los proveedores LLM |

---

## Instalación de escritorio

GeoNexus se distribuye como **aplicación de escritorio nativa** generada con Tauri 2.
Cada plataforma produce un instalador firmado y autocontenido — no requiere runtime externo.

### Windows 10 / 11

Descarga el instalador desde GitHub Releases y ejecútalo.

### macOS 12+

Descarga el .dmg desde GitHub Releases y arrastra GeoNexus a Aplicaciones.

### Linux (Wayland / X11)

Descarga el paquete correspondiente (deb, rpm, AppImage) desde GitHub Releases.

---

## CLI — `geonexus`

La CLI permite instalar, lanzar y operar GeoNexus sin abrir la interfaz gráfica —
ideal para servidores, automatización y pipelines de datos.

### Comandos principales

| Comando | Descripción |
|---------|-------------|
| `geoagents install --desktop` | Instala la app de escritorio para tu plataforma |
| `geoagents open` | Lanza la aplicación |
| `geoagents ai --warmup` | Pre-carga el sidecar de IA y auto-detecta modelos |
| `geoagents index <ruta>` | Indexa documentos de una carpeta al proyecto activo |
| `geoagents connect <ruta>` | Registra una carpeta local como conector |
| `geoagents models` | Lista los modelos LLM detectados |
| `geoagents doctor` | Diagnóstico de entorno (Rust, Python, Tauri, modelos) |
| `geoagents --version` | Muestra la versión instalada |

### Ejemplo de sesión

```bash
# 1. Calienta el motor de IA y detecta modelos locales
geoagents ai --warmup

# 2. Conecta una carpeta de documentos territoriales
geoagents connect ~/proyectos/pot-2026

# 3. Indexa todo el contenido al grafo de conocimiento
geoagents index ~/proyectos/pot-2026 --recursive

# 4. Verifica el estado del entorno
geoagents doctor
```

```
✔ Rust 1.79         ✔ Python 3.11        ✔ Tauri CLI v2
✔ Ollama (4 modelos) ✔ ChromaDB           ✔ SQLite (12 tablas)
Geo Agents 0.9.0-beta — todo en orden.
```

---

## Proveedores de IA

GeoNexus es **multi-LLM**: puedes cambiar de proveedor en caliente, sin reiniciar la aplicación. Combina modelos **locales** (privacidad total, sin coste por token) con modelos **en la nube** (máxima capacidad) según cada tarea.

![Configuración de proveedores de IA](/modelsia.png)

### Tabla de proveedores

| Proveedor | Tipo | Endpoint por defecto | Autenticación | Estado |
|-----------|------|----------------------|---------------|--------|
| **Ollama** | Local | `http://localhost:11434` | No requiere | ✅ Estable |
| **LM Studio** | Local | `http://localhost:1234` | No requiere | ✅ Estable |
| **OpenAI** | Nube | `https://api.openai.com` | API Key | ✅ Estable |
| **Anthropic** | Nube | `https://api.anthropic.com` | API Key | ✅ Estable |
| **OpenRouter** | Nube | `https://openrouter.ai/api` | API Key | ✅ Estable |

### Modelos sugeridos por proveedor

| Proveedor | Modelos recomendados | Uso ideal |
|-----------|----------------------|-----------|
| Ollama | `llama3.1`, `qwen2.5`, `mistral`, `nomic-embed-text` | Chat offline, embeddings locales |
| LM Studio | Cualquier GGUF compatible | Pruebas locales con GPU |
| OpenAI | `gpt-4o`, `gpt-4o-mini`, `text-embedding-3` | Razonamiento avanzado, RAG de calidad |
| Anthropic | `claude-3.5-sonnet`, `claude-3-haiku` | Análisis largo de documentos |
| OpenRouter | Acceso unificado a 100+ modelos | Comparar proveedores con una sola key |

### Cómo conectar un proveedor

1. Abre **Configuración → Proveedores de IA**.
2. Selecciona el proveedor y verifica el endpoint.
3. Para proveedores en la nube, pega tu **API Key** (se guarda cifrada en el keychain del sistema).
4. Pulsa **Probar conexión** — internamente ejecuta `ping_llm_provider`.
5. Geo Agents auto-detecta los modelos disponibles con `list_llm_models`.

```bash
# Verificar proveedores desde la CLI
geoagents ai --providers
geoagents ai --warmup        # precarga el modelo local por defecto
```

> Las API Keys nunca se exponen al frontend ni se incluyen en el bundle: viven
> en el keychain del sistema operativo y solo el backend Rust las utiliza.

---

## Canales

Los **canales** permiten interactuar con tus agentes desde fuera de la aplicación
de escritorio. En esta versión GeoNexus integra **Telegram** como único canal,
con más canales planificados en el roadmap.

![Integración con Telegram](/telegram.png)

### Integración con Telegram

Conecta un bot de Telegram para consultar tu conocimiento territorial desde el
móvil: envía preguntas, recibe respuestas con citas y dispara indexaciones, todo
por chat.

| Capacidad | Descripción |
|-----------|-------------|
| Mensajes entrantes | Recibe preguntas vía webhook seguro y las enruta al motor de chat |
| Respuestas con IA | Usa el mismo pipeline RAG + grafo que la app de escritorio |
| Adjuntos | Reenvía PDFs/DOCX para indexarlos directamente desde el chat |
| Seguridad | Verificación de firma por `secret_token`; el bot token nunca se expone |

#### Configuración

1. Crea un bot con **@BotFather** en Telegram y obtén el token.
2. En **Configuración → Canales → Telegram**, conecta la cuenta.
3. Geo Agents registra el webhook automáticamente (`setWebhook`).
4. Escribe a tu bot — las respuestas llegan con citas verificables.

```bash
# Estado del canal de Telegram
geoagents channels --status telegram
```

> Próximamente: WhatsApp, Slack y correo electrónico como canales adicionales.

---


## Arquitectura


```
┌─────────────────────────────────────────────────┐
│  React Frontend (TypeScript)                     │
│  ├── Pages (DataPage, DocumentsPage, etc.)       │
│  ├── Hooks (useChatSession, useDocuments, etc.)  │
│  ├── API layer (src/api/*.ts)                    │
│  └── invoke('command', {args})                   │
├─────────────────────────────────────────────────┤
│  Tauri Rust Backend                              │
│  ├── 56+ commands registrados en main.rs         │
│  ├── geoagents-core (tipos, lógica de negocio)   │
│  ├── geoagents-db (repositorios SQLite)           │
│  ├── geoagents-mcp (MCP containers)               │
│  └── geoagents-tauri (commands, eventos)          │
├─────────────────────────────────────────────────┤
│  Python Sidecar (ai/sidecar.py)                  │
│  ├── index (extracción + chunk + embedding)      │
│  ├── recall_chunks (RAG vectorial)               │
│  ├── chat_llm (comunicación con LLMs)            │
│  ├── search_web (búsqueda web)                   │
│  ├── extract_chat_entities (NER para grafo)      │
│  ├── extract_graph_entities (NER documental)     │
│  ├── ping_llm (health check)                     │
│  └── build_project_context (resumen proyecto)    │
└─────────────────────────────────────────────────┘
```

### Base de datos SQLite — 12 tablas

```
init → assets → workspaces → connectors → document_chunks
     → graph_nodes/edges → conversations → messages
     → chat_tool_calls → analysis_sessions → message_stats
```

### Migraciones

8 archivos de migración gestionados con `sqlx`. Al modificar migraciones existentes, eliminar la entrada en `_sqlx_migrations` y reiniciar la app.

---

## Motor y comandos

> Todos los comandos se invocan desde el frontend con `invoke('nombre_comando', { ...args })`.

### Inventario y Metadata

#### list_data_assets

Lista todos los activos (documentos, capas, etc.) de un proyecto.

```rust
// Archivo: crates/geoagents-tauri/src/commands/data/assets.rs:6
invoke('list_data_assets', { project_id: string }) → Vec<DataAsset>
```

#### get_data_asset

Obtiene un activo individual por su ID.

```rust
// assets.rs:17
invoke('get_data_asset', { asset_id: string }) → Option<DataAsset>
```

#### get_data_store_metrics

Métricas del almacén de datos: conteos, tamaños totales, distribución por tipo.

```rust
// assets.rs:28
invoke('get_data_store_metrics', { project_id: string }) → DataStoreMetrics
```

#### get_sync_events

Historial de eventos de sincronización con paginación. Paginación agregada en Jun 2026.

```rust
// assets.rs:39
invoke('get_sync_events', {
  project_id: string,
  limit?: number,
  offset?: number
}) → Vec<SyncEvent>
```

#### validate_data_asset

Valida la integridad de un activo (existencia en disco, hash, metadatos).

```rust
// assets.rs:52
invoke('validate_data_asset', { asset_id: string }) → AssetValidation
```

#### delete_data_asset

Elimina un activo del proyecto de forma permanente.

```rust
// assets.rs:63
invoke('delete_data_asset', { asset_id: string }) → ()
```

#### get_mentionable_sources

Obtiene fuentes mencionables (`@`) para el chat: conectores + assets + nodos del grafo.

```rust
// queries.rs:14
invoke('get_mentionable_sources', {
  project_id: string,
  query?: string
}) → MentionableSources
```

### Conectores

#### register_local_connector

Registra una carpeta local como fuente de datos con protección contra path-traversal.

```rust
// connector/register.rs:11
invoke('register_local_connector', {
  input: RegisterLocalConnectorInput
}) → ConnectorConfig
```

#### list_connector_files

Lista archivos de un conector local.

```rust
// connector/list.rs:8
invoke('list_connector_files', { connector_id: string }) → Vec<ConnectorFile>
```

#### list_connector_configs

Lista todas las configuraciones de conectores, opcionalmente filtradas por proyecto.

```rust
// connector/list.rs:26
invoke('list_connector_configs', { project_id?: string }) → Vec<ConnectorConfig>
```

#### cache_connector_file

Descarga y cachea un archivo del conector, lo registra como `DataAsset`.

```rust
// connector/sync.rs:14
invoke('cache_connector_file', {
  connector_id: string,
  file_id: string
}) → ConnectorFile
```

#### upload_asset_file

Sube un archivo al sistema, lo guarda en disco y crea un `DataAsset`.

```rust
// connector/sync.rs:116
invoke('upload_asset_file', {
  project_id: string,
  workspace_id: string,
  connector_id: string,
  file_name: string,
  bytes: number[]
}) → string  // asset_id
```

#### sync_local_connector

Sincroniza un conector local: descubre cambios, actualiza la base de datos.

```rust
// connector/sync.rs:224
invoke('sync_local_connector', { connector_id: string }) → SyncReport
```

### Indexación documental

#### index_document

Orquesta el pipeline completo de indexación:

```
Extrae texto → Chunkifica → Genera embeddings → ChromaDB → Grafo de entidades
```

```rust
// document/indexer.rs:50
invoke('index_document', { document_id: string }) → i64  // número de chunks
```

> **Estado:** ChromaDB real pendiente en producción. El pipeline completo funciona en desarrollo.

#### list_document_chunks

Obtiene todos los chunks de un documento ordenados por posición.

```rust
// document/indexer.rs:304
invoke('list_document_chunks', { document_id: string }) → Vec<DocumentChunk>
```

#### rebuild_knowledge_graph

Vacía y recalcula toda la red del grafo de conocimiento para un proyecto.

```rust
// document/rebuild.rs:8
invoke('rebuild_knowledge_graph', { project_id: string }) → ()
```

### Containers MCP

#### init_containers_mcp

Inicializa el sistema MCP de contenedores. Retorna status y schemas de tools disponibles.

```rust
// containers_mcp/mod.rs:28
invoke('init_containers_mcp') → Value  // { status, tools_schemas }
```

#### dispatch_container_tool

Despacha herramientas container: `list`, `get`, `search`, `sync`, `upload`.

```rust
// containers_mcp/mod.rs:45
invoke('dispatch_container_tool', {
  tool_name: string,
  args: Value
}) → Value
```

> **Estado:** Solo provider local operativo. Cloud (OneDrive, S3, etc.) pendiente de OAuth.

### OAuth — Conectores Cloud

> ⚠️ **Estado:** Esqueleto implementado. El flujo completo no está integrado. Pendiente Fase 5.

#### exchange_oauth_code

Intercambia código OAuth PKCE por tokens de acceso.

```rust
invoke('exchange_oauth_code', {
  code: string,
  code_verifier: string,
  client_id: string,
  tenant_id: string,
  redirect_uri: string
}) → OAuthTokenResponse
```

#### get_oauth_user_info

Obtiene información del usuario autenticado via Microsoft Graph.

```rust
invoke('get_oauth_user_info', { access_token: string }) → OAuthUserInfo
```

#### save_oauth_token

Almacena token OAuth en el llavero seguro (Tauri Stronghold).

```rust
invoke('save_oauth_token', { provider: string, token_json: string }) → ()
```

#### get_oauth_token

Recupera un token OAuth almacenado previamente.

```rust
invoke('get_oauth_token', { provider: string }) → Option<string>
```

### Proveedor LLM

#### ping_llm_provider

Prueba la conexión con un proveedor LLM. Útil para validar configuración.

```rust
// llm/commands.rs:9
invoke('ping_llm_provider', {
  config: LlmProviderConfig
}) → LlmPingResult
```

#### send_llm_message

Envía un mensaje simple a un LLM (sin historial ni tool-calling).

```rust
// llm/commands.rs:33
invoke('send_llm_message', {
  request: LlmChatRequest
}) → LlmChatResult
```

#### list_llm_models

Lista modelos disponibles directamente desde Rust para evitar CORS del webview.

```rust
// llm/commands.rs:67
invoke('list_llm_models', {
  provider: string,
  endpoint: string,
  api_key?: string
}) → Vec<LlmModelInfo>
```

**Proveedores soportados:**

| Proveedor | Endpoint por defecto |
|-----------|---------------------|
| Ollama | `http://localhost:11434` |
| LM Studio | `http://localhost:1234` |
| OpenAI | `https://api.openai.com` |
| OpenRouter | `https://openrouter.ai/api` |
| Anthropic | `https://api.anthropic.com` |

> 11 tests unitarios en Rust cubren este comando.

### Chat con memoria

#### send_message ★ Núcleo del sistema

Pipeline completo de conversación con contexto, tools y memoria.

```rust
// chat/send_message.rs:38
invoke('send_message', {
  input: SendMessageInput
}) → SendMessageResponse
```

**Flujo interno:**

```
1. Clasifica intención (QueryIntent)
2. Construye contexto → grafo + RAG + web search + menciones @
3. Tool-calling loop (hasta 10 iteraciones)
4. Valida respuesta
5. Guarda en Analysis Sessions (memoria episódica)
6. Extrae entidades al grafo (nodos y aristas)
7. Emite evento graph:updated
```

#### delete_conversation

```rust
// chat/mod.rs:132
invoke('delete_conversation', { conversation_id: string }) → ()
```

#### list_conversations

```rust
// chat/mod.rs:143
invoke('list_conversations', { project_id: string }) → Vec<Conversation>
```

#### list_messages

```rust
// chat/mod.rs:154
invoke('list_messages', { conversation_id: string }) → Vec<Message>
```

#### recall_chunks

Recupera chunks relevantes vía RAG (sidecar Python → ChromaDB).

```rust
// chat/mod.rs:165
invoke('recall_chunks', {
  input: RecallInput  // { project_id, query, top_k, collection }
}) → Vec<RecallChunk>
```

#### get_project_context

Obtiene resumen del proyecto (assets + graph_nodes) para contexto del LLM.

```rust
// chat/mod.rs:195
invoke('get_project_context', { project_id: string }) → ProjectContext
```

### Análisis y Métricas

#### get_analysis_metrics

Métricas generales de análisis del proyecto.

```rust
// analysis.rs:6
invoke('get_analysis_metrics', { project_id: string }) → AnalysisMetrics
```

#### get_token_timeline

Línea de tiempo de uso de tokens por período.

```rust
// analysis.rs:17
invoke('get_token_timeline', {
  project_id: string,
  timeframe: string
}) → Vec<TokenBucket>
```

#### get_model_usage

Estadísticas de uso desglosadas por modelo LLM.

```rust
// analysis.rs:33
invoke('get_model_usage', { project_id: string }) → Vec<ModelUsage>
```

#### list_analysis_runs

Historial de ejecuciones de análisis con paginación. Paginación agregada en Jun 2026.

```rust
// analysis.rs:44
invoke('list_analysis_runs', {
  project_id: string,
  limit?: number,
  offset?: number
}) → Vec<AnalysisRun>
```

#### get_skill_usage

Uso de skills (tools del agente) por proyecto.

```rust
invoke('get_skill_usage', { project_id: string }) → Vec<SkillUsage>
```

#### export_analysis_traces

Exporta trazas de análisis en formato JSON o CSV.

```rust
// analysis.rs:66
invoke('export_analysis_traces', {
  project_id: string,
  format: 'json' | 'csv'
}) → string
```

#### get_cost_by_timeframe

Resumen de costos estimados por período.

```rust
invoke('get_cost_by_timeframe', { project_id: string }) → CostSummary
```

#### get_top_queries

Consultas más frecuentes de un proyecto.

```rust
invoke('get_top_queries', {
  project_id: string,
  limit: number
}) → Vec<TopQuery>
```

### Grafo de Conocimiento

#### list_graph_nodes

Obtiene todos los nodos del grafo de un proyecto.

```rust
// graph/queries.rs:7
invoke('list_graph_nodes', { project_id: string }) → Vec<GraphNode>
```

#### list_graph_edges

Obtiene todas las aristas del grafo.

```rust
// graph/queries.rs:19
invoke('list_graph_edges', { project_id: string }) → Vec<GraphEdge>
```

#### update_node_position

Persiste la posición de un nodo en el canvas (drag & drop).

```rust
// graph/queries.rs:31
invoke('update_node_position', {
  node_id: string,
  x: number,
  y: number
}) → ()
```

#### delete_graph_node

Borrado suave de un nodo. Verifica si está pinneado antes de eliminar.

```rust
// graph/crud.rs:39
invoke('delete_graph_node', { id: string, force: boolean }) → ()
```

#### pin_node

Fija o desfija un nodo del grafo (los nodos pinneados no pueden borrarse).

```rust
// graph/crud.rs:71
invoke('pin_node', { id: string, pinned: boolean }) → ()
```

#### restore_graph_node

Restaura un nodo eliminado por soft-delete.

```rust
// graph/crud.rs:89
invoke('restore_graph_node', { id: string }) → ()
```

#### list_orphan_nodes

Lista nodos huérfanos: sin asset ni conversación asociada.

```rust
// graph/crud.rs:106
invoke('list_orphan_nodes', { project_id: string }) → Vec<GraphNode>
```

#### merge_nodes

Fusiona múltiples nodos en uno solo, redirigiendo sus aristas.

```rust
// graph/crud.rs:129
invoke('merge_nodes', { ids: string[], name: string }) → ()
```

#### clear_ephemeral_nodes

Limpia nodos efímeros (generados en sesión sin persistir).

```rust
// graph_events.rs:12
invoke('clear_ephemeral_nodes', { project_id: string }) → u64  // filas eliminadas
```

#### get_recent_graph_events

Obtiene eventos recientes del grafo desde un evento fuente.

```rust
// graph_events.rs:33
invoke('get_recent_graph_events', {
  project_id: string,
  source_event: string,
  limit: number
}) → Vec<GraphNode>
```

### Filesystem

#### open_folder_picker

Abre el diálogo nativo del OS para seleccionar una carpeta.

```rust
invoke('open_folder_picker') → Option<string>
```

#### open_file_picker

Abre el diálogo nativo para seleccionar uno o varios archivos.

```rust
invoke('open_file_picker', { extensions?: string[] }) → Option<string[]>
```

#### read_file_base64

Lee un archivo del disco y lo retorna codificado en base64.

```rust
invoke('read_file_base64', { path: string }) → string
```

#### validate_folder_path

Valida que una ruta exista y sea un directorio.

```rust
invoke('validate_folder_path', { path: string }) → boolean
```

#### list_directory

Lista el contenido de un directorio (no recursivo), con filtro opcional por extensión.

```rust
invoke('list_directory', {
  path: string,
  include_extensions?: string[]
}) → Vec<DirEntry>
```

### Agentes

#### list_agents

Lista todos los agentes disponibles, agrupados por categoría.

```rust
// agent.rs:6
invoke('list_agents') → Vec<Agent>
```

**Categorías:** Procesamiento · Conocimiento · Interacción · Sistema

#### toggle_agent

Activa o desactiva un agente específico.

```rust
// agent.rs:12
invoke('toggle_agent', { agent_id: string, active: boolean }) → ()
```

---

## Experiencia y aplicación

### Capa API (`src/api/`)

Wrappers TypeScript sobre los comandos Tauri. Toda la comunicación con el backend pasa por aquí.

```
src/api/
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
                       getRecentGraphEvents
```

### Hooks principales

#### useChatSession

Gestiona toda la lógica del chat: mensajes, envío, regeneración y toggle de web search.

```typescript
// components/chat/useChatSession.ts
const {
  messages,
  sendMessage,
  regenerate,
  webSearchEnabled,
  toggleWebSearch,
  isLoading
} = useChatSession(conversationId)
```

#### useDocuments

CRUD completo de assets documentales: fetch, upload, indexación, sincronización de carpetas.

```typescript
// features/workspace/documents/useDocuments.ts
const { documents, upload, index, syncFolder } = useDocuments(projectId)
```

#### useGraphEvents

Estado del grafo de conocimiento: nodos, aristas, animación y listener de eventos Tauri.

```typescript
// features/workspace/graph/useGraphEvents.ts
const { nodes, edges, isAnimating } = useGraphEvents(projectId)
```

#### useConnectors

Estado global de conectores AI via React Context + localStorage.

```typescript
// contexts/ConnectorsContext.tsx
const { connectors, addConnector, removeConnector } = useConnectors()
```

#### useStreamPreview

Vista previa streaming de chunks para un evento de chat en curso.

```typescript
// features/workspace/chat/hooks/useStreamPreview.ts
const { preview } = useStreamPreview(eventId)
```

#### Hooks de análisis

```typescript
// features/workspace/analysis/useAnalysis.ts
useAnalysisMetrics(projectId)
useTokenTimeline(projectId, timeframe)
useModelUsage(projectId)
useAnalysisRuns(projectId)
useSkillUsage(projectId)
useCostByTimeframe(projectId)
useTopQueries(projectId, limit)
```

#### Utilidades

```typescript
useIsMobile()    // Breakpoint 768px — hooks/use-mobile.ts
useToast()       // Notificaciones toast — components/ui/toast.tsx
```

---

## Módulos principales

### Chat

7 componentes en `src/components/chat/`:

- `ChatPanel` — Panel principal del chat con historial
- `MessageInput` — Input con soporte de @menciones y adjuntos
- `AssistantMessage` — Render de mensajes con markdown, fuentes y tool calls
- `ThinkingInline` — Indicador de razonamiento del modelo
- `MessageActions` — Acciones por mensaje (copiar, regenerar, feedback)
- `DeepResearchPanel` — Panel de investigación profunda multi-paso
- `StreamEventRenderer` — Render de eventos de streaming en tiempo real

### Grafo de conocimiento

`GraphPage` (~595 líneas) en `features/workspace/graph/`:

- Visualización D3-Force con nodos y aristas animadas
- Controles: zoom, pan, fit, center
- Acciones por nodo: pin, delete, restore, merge
- Listener de evento `graph:updated` de Tauri
- Persistencia de posiciones en SQLite al soltar nodos

### Análisis

7 componentes en `features/workspace/analysis/`:

- `AnalysisDashboard` — Vista principal con métricas agregadas
- `TokenTimelineChart` — Gráfico de uso de tokens en el tiempo
- `ModelUsageChart` — Distribución de uso por modelo
- `AnalysisRunsList` — Historial paginado de ejecuciones
- `SkillUsagePanel` — Estadísticas de tools del agente
- `CostSummaryCard` — Estimación de costos por período
- `RecentTracesPanel` — Últimos sync events con paginación

### Configuración

`ConfigDialog` con secciones:

- `AgentsSection` — Agentes IA agrupados por categoría con toggle on/off
- `NotificationsPanel` — Categorías, canales y posición de notificaciones
- `ThemeSettingsDialog` — Temas claro/oscuro/acento (8 temas disponibles)
- `ModelSettingsDialog` — Configuración de proveedores LLM

---

## Python Sidecar

`ai/sidecar.py` — 8 acciones CLI invocadas desde Rust:

| Acción | Descripción |
|--------|-------------|
| `index` | Extrae texto, chunkifica y genera embeddings → ChromaDB |
| `recall_chunks` | Búsqueda vectorial RAG en ChromaDB |
| `chat_llm` | Comunicación con proveedores LLM |
| `search_web` | Búsqueda web para contexto |
| `extract_chat_entities` | NER para extracción de entidades de chat al grafo |
| `extract_graph_entities` | NER documental para el grafo |
| `ping_llm` | Health check de proveedores |
| `build_project_context` | Genera resumen de proyecto para el LLM |

---

## Estado del proyecto

### Fases de desarrollo

| Fase | Nombre | Estado |
|------|--------|--------|
| 1 | Inventario y metadata local | ✅ Completo |
| 2 | Conector local y cache | ✅ Completo |
| 3 | Indexación documental y vectorial | ✅ Completo (ChromaDB prod pendiente) |
| 4 | Containers MCP | ✅ Completo (cloud pendiente) |
| 5 | OAuth — Conectores cloud | ❌ Sin implementar |
| 6 | Proveedor LLM base | ✅ Completo |
| 7 | Chat real con memoria | ✅ Completo |
| 8 | Auto-detect modelos | ✅ Completo |
| 9 | RAG + contexto GIS | ✅ Completo |

**8 de 9 fases completas en beta.** 56+ comandos Tauri · 12 tablas SQLite · 81 tests Rust · 62 tests TypeScript.

---

## Pendientes y Roadmap

### Crítico

- **OAuth completo (Fase 5):** `exchange_oauth_code`, `save_oauth_token`, `get_oauth_token` existen pero el flujo de callback no está conectado. Impide conectores cloud (OneDrive, Google Drive, SharePoint, Dropbox, S3/MinIO).
- **ChromaDB en producción:** El pipeline de indexación usa ChromaDB vía sidecar Python pero no está configurado para producción.

### Alto

- **Vista de Skills standalone:** Página dedicada con listado, búsqueda, tasa de éxito y últimas ejecuciones por tool.
- **Unificar ProviderSetupDialog:** `ModelSettingsDialog` (config) y `ProviderSetupDialog` (ai-containers) tienen código duplicado. El segundo es superior — ~45 min de trabajo.
- **Selector de embeddings funcional:** Actualmente el selector de modelo de embeddings es texto muerto sin acción real. ~30 min.
- **Footer reactivo:** Footer hardcodeado, debe mostrar el modelo activo actual. ~15 min.
- **Fix DialogClose de shadcn/ui:** Ícono × superpuesto en algunos diálogos. ~5 min.

### Medio

- **Persistencia de config LLM en SQLite:** `ConnectorsContext` usa localStorage, no la base de datos.
- **Zustand stores:** `src/store/` está vacío. Toda la gestión es hooks + context, puede generar inconsistencias al escalar.
- **Código duplicado:** `map_extension_to_kind` existe en `connector/mod.rs:19` y `containers_mcp/handlers.rs:260`.
- **Web Search / Deep Research:** `useChatSession.ts` tiene el toggle pero la integración backend puede estar incompleta.
- **Streaming de chat:** `chat:stream_event` y `chat:preview_chunk` existen como listeners pero `StreamEventRenderer` puede necesitar pulido.

### Bajo

- Centralizar `list_agents`, `toggle_agent` en `src/api/` (actualmente en `features/agents/api.ts`).
- Implementar densidad de UI en `ThemeSettingsDialog`.
- Agregar tests TypeScript para los hooks de análisis.
- `get_data_lineage` pendiente (mencionado en docs/09).
- `reindex_asset` pendiente (mencionado en docs/09).
- Citas por chunk no implementadas.
- Container upload para proveedores cloud (reservado para Fase 5).

---

## Estructura de archivos

```
geoagents/
├── src/                          # Frontend React
│   ├── api/                      # Wrappers Tauri → chat, data, connector, llm, analysis
│   ├── components/               # chat/ + ui/ (shadcn)
│   ├── contexts/                 # ConnectorsContext
│   ├── features/workspace/       # graph, mcp, tools, theme, ai, analysis, documents
│   ├── hooks/                    # use-mobile, etc.
│   ├── lib/utils.ts
│   ├── store/                    # (vacío — pendiente Zustand)
│   └── types/                    # chat, data, llm, analysis, connector
├── crates/
│   ├── geoagents-core/            # Tipos compartidos
│   ├── geoagents-db/              # SQLite repos + migraciones
│   ├── geoagents-mcp/             # MCP tool schemas
│   └── geoagents-tauri/
│       └── src/commands/
│           ├── data/             # assets.rs, queries.rs
│           ├── connector/        # register.rs, list.rs, sync.rs
│           ├── document/         # indexer.rs, rebuild.rs
│           ├── containers_mcp/   # mod.rs, handlers.rs
│           ├── graph/            # queries.rs, crud.rs
│           ├── chat/             # send_message.rs, mod.rs
│           ├── llm/              # commands.rs
│           ├── analysis.rs
│           ├── agent.rs
│           ├── filesystem/
│           ├── graph_events.rs
│           └── oauth.rs
├── ai/
│   ├── sidecar.py                # 8 acciones CLI
│   └── requirements.txt
├── test_llm_providers.ps1
├── package.json
└── src-tauri/
    └── tauri.conf.json
```

---

*Geo Agents · v0.9-beta · Code Clean · Junio 2026*
