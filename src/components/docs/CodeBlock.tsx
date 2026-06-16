import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 group">
      <pre className="rounded-lg p-4 overflow-x-auto" style={{ background: "var(--color-code)" }}>
        <code className="text-sm font-mono" style={{ color: "var(--color-code-foreground)" }}>
          {children}
        </code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md transition-all"
        style={{ 
          background: "var(--color-secondary)",
          color: "var(--color-muted-foreground)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--color-accent)";
          e.currentTarget.style.color = "var(--color-foreground)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--color-secondary)";
          e.currentTarget.style.color = "var(--color-muted-foreground)";
        }}
        aria-label="Copiar código"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}