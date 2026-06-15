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

<InstallButtons />

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

*GeoNexus · v0.9-beta · Junio 2026*
