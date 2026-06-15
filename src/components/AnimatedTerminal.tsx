import { useEffect, useRef, useState } from "react";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "ai"; text: string }
  | { kind: "bar"; label: string };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "geoagents install --desktop" },
  { kind: "out", text: "Resolviendo plataforma … Linux x86_64 (Wayland)" },
  { kind: "bar", label: "Descargando binario nativo (Tauri 2)" },
  { kind: "ok", text: "Binario verificado · firma válida" },
  { kind: "out", text: "Compilando 4 crates Rust …" },
  { kind: "bar", label: "geoagents-core · geoagents-db · geoagents-mcp · geoagents-tauri" },
  { kind: "ok", text: "81 tests Rust · 62 tests TS — passed" },
  { kind: "cmd", text: "geoagents ai --warmup" },
  { kind: "ai", text: "◇ Iniciando sidecar Python (LLM router + ChromaDB)" },
  { kind: "ai", text: "◇ Auto-detectando modelos: Ollama, LM Studio, OpenAI…" },
  { kind: "ai", text: "◇ Cargando grafo de conocimiento + RAG vectorial" },
  { kind: "ok", text: "Geo Agents listo · 56+ comandos Tauri activos" },
];

export function AnimatedTerminal() {
  const [rendered, setRendered] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [progress, setProgress] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        const t = setTimeout(res, ms);
        timers.current.push(t);
      });

    async function run() {
      while (!cancelled) {
        setRendered([]);
        for (const line of SCRIPT) {
          if (cancelled) return;
          if (line.kind === "cmd") {
            setTyping("");
            for (let i = 0; i < line.text.length; i++) {
              if (cancelled) return;
              setTyping(line.text.slice(0, i + 1));
              await wait(28);
            }
            await wait(220);
            setRendered((r) => [...r, line]);
            setTyping("");
          } else if (line.kind === "bar") {
            setRendered((r) => [...r, line]);
            setProgress(0);
            for (let p = 0; p <= 100; p += 8) {
              if (cancelled) return;
              setProgress(p);
              await wait(45);
            }
            setProgress(100);
            await wait(180);
          } else {
            setRendered((r) => [...r, line]);
            await wait(line.kind === "ok" ? 320 : 240);
          }
        }
        await wait(2400);
      }
    }
    run();
    return () => {
      cancelled = true;
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[oklch(0.12_0.006_270)] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          geoagents — zsh
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          AI
        </span>
      </div>

      <div className="h-[320px] overflow-hidden p-4 font-mono text-[12.5px] leading-relaxed">
        {rendered.map((line, i) => (
          <TermLine key={i} line={line} progress={progress} isLast={i === rendered.length - 1} />
        ))}
        {typing && (
          <div className="flex">
            <span className="mr-2 select-none text-primary">❯</span>
            <span className="text-foreground">{typing}</span>
            <span className="ml-0.5 inline-block h-[1.1em] w-[7px] animate-pulse bg-primary align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}

function TermLine({
  line,
  progress,
  isLast,
}: {
  line: Line;
  progress: number;
  isLast: boolean;
}) {
  if (line.kind === "cmd") {
    return (
      <div className="flex animate-in fade-in slide-in-from-bottom-1 duration-200">
        <span className="mr-2 select-none text-primary">❯</span>
        <span className="text-foreground">{line.text}</span>
      </div>
    );
  }
  if (line.kind === "ok") {
    return (
      <div className="animate-in fade-in duration-200 text-[oklch(0.8_0.13_145)]">
        ✔ {line.text}
      </div>
    );
  }
  if (line.kind === "ai") {
    return (
      <div className="animate-in fade-in duration-200 text-primary/90">{line.text}</div>
    );
  }
  if (line.kind === "bar") {
    const filled = Math.round((isLast ? progress : 100) / 5);
    return (
      <div className="animate-in fade-in duration-200 text-muted-foreground">
        <div>{line.label}</div>
        <div className="text-foreground/80">
          <span className="text-primary">{"█".repeat(filled)}</span>
          <span className="text-border">{"░".repeat(20 - filled)}</span>{" "}
          {isLast ? progress : 100}%
        </div>
      </div>
    );
  }
  return (
    <div className="animate-in fade-in duration-200 text-muted-foreground">
      {line.text}
    </div>
  );
}
