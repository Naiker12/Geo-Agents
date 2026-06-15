
# Geo-Agents

Plataforma GIS profesional con IA para urbanistas y especialistas territoriales.

## Características

- **Backend en Rust**: 4 crates, 56+ comandos Tauri, eventos en tiempo real y lógica de negocio fuertemente tipada
- **Motor de IA local**: Sidecar Python con router multi-LLM, RAG vectorial sobre ChromaDB y búsqueda web integrada
- **Grafo de conocimiento**: Visualización D3-Force con extracción automática de entidades, merge, pin y persistencia
- **SQLite + Vectores**: 12 tablas gestionadas con sqlx y migraciones, más almacenamiento vectorial para embeddings
- **Containers MCP**: Esquemas de tools MCP para conectores locales y, próximamente, almacenamiento en nube
- **Multi-proveedor LLM**: Ollama, LM Studio, OpenAI, OpenRouter y Anthropic con auto-detección de modelos

## Tech Stack

- Tauri 2
- Rust
- React 19
- TanStack Router
- TanStack Query
- Tailwind CSS
- Python (sidecar AI)
- ChromaDB
- SQLite

## Instalación

```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Build para producción
pnpm build
```

## Estructura del proyecto

```
Geo-Agents/
├── src/
│   ├── components/        # Componentes UI
│   ├── features/          # Features de la app
│   ├── lib/               # Utilidades y helpers
│   ├── routes/            # Rutas de la app
│   ├── assets/            # Imágenes y recursos
│   └── styles.css         # Estilos globales
├── public/                # Archivos públicos
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Contribuciones

¡Contribuciones son bienvenidas! Por favor abre un issue o un pull request.

## Licencia

MIT
