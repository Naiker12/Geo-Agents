import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Monitor,
  Apple,
  Terminal,
  Code2,
  Download,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export function DesktopInstall() {
  const [windowsArch, setWindowsArch] = useState<"x64" | "arm64">("x64");
  
  const downloads = {
    windows: {
      x64: {
        url: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_0.1.0_x64_en-US.msi",
        label: "GeoNexus_0.1.0_x64_en-US.msi",
        size: "~85 MB",
        arch: "x64",
      },
      arm64: {
        url: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_0.1.0_aarch64_en-US.msi",
        label: "GeoNexus_0.1.0_aarch64_en-US.msi",
        size: "~85 MB",
        arch: "ARM64",
      },
    },
    macos: {
      intel: {
        url: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_0.1.0_x64.dmg",
        label: "GeoNexus_0.1.0_x64.dmg",
        size: "~102 MB",
        arch: "Intel (x64)",
      },
      apple: {
        url: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_0.1.0_aarch64.dmg",
        label: "GeoNexus_0.1.0_aarch64.dmg",
        size: "~102 MB",
        arch: "Apple Silicon (M1/M2/M3)",
      },
    },
    linux: {
      url: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_0.1.0_amd64.AppImage",
      label: "GeoNexus_0.1.0_amd64.AppImage",
      size: "~98 MB",
      arch: "x64",
    },
  };

  const currentWindowsDownload = downloads.windows[windowsArch];

  return (
    <section id="instalación-de-escritorio" className="prose-docs">
      <h2>Instalación de escritorio</h2>
      <p>
        GeoNexus se distribuye como <strong>aplicación de escritorio nativa</strong> generada con Tauri 2.
        Cada plataforma produce un instalador firmado y autocontenido — no requiere runtime externo.
      </p>

      <Tabs defaultValue="windows" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="windows" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Windows
          </TabsTrigger>
          <TabsTrigger value="macos" className="flex items-center gap-2">
            <Apple className="h-4 w-4" />
            macOS
          </TabsTrigger>
          <TabsTrigger value="linux" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            Linux
          </TabsTrigger>
          <TabsTrigger value="cli" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            CLI
          </TabsTrigger>
        </TabsList>

        {/* Windows */}
        <TabsContent value="windows" className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="h-5 w-5 text-blue-500" />
                  <h3 className="text-xl font-semibold">Windows</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Instalador .msi para Windows 10/11. Autocontenido y sin dependencias.
                </p>
                
                <div className="flex gap-2 mb-4">
                  <Button 
                    variant={windowsArch === "x64" ? "default" : "secondary"}
                    onClick={() => setWindowsArch("x64")}
                    size="sm"
                  >
                    x64
                  </Button>
                  <Button 
                    variant={windowsArch === "arm64" ? "default" : "secondary"}
                    onClick={() => setWindowsArch("arm64")}
                    size="sm"
                  >
                    ARM64
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    {currentWindowsDownload.arch}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    {currentWindowsDownload.size}
                  </span>
                </div>
                <a
                  href={currentWindowsDownload.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="flex items-center gap-2">
                    <Download className="h-4.5 w-4.5" />
                    Descargar {currentWindowsDownload.label}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-semibold mb-3">Instrucciones de instalación</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Descarga el archivo <code className="bg-secondary px-1.5 py-0.5 rounded">{currentWindowsDownload.label}</code></li>
                <li>Ejecuta el instalador haciendo doble clic</li>
                <li>Sigue los pasos del asistente de instalación</li>
                <li>¡Listo! GeoNexus se lanzará automáticamente</li>
              </ol>
            </div>
          </div>
        </TabsContent>

        {/* macOS */}
        <TabsContent value="macos" className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Apple className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <h3 className="text-xl font-semibold">macOS</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Imágenes de disco .dmg para Intel y Apple Silicon separadas.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Apple Silicon (M1/M2/M3)</h4>
                    <a
                      href={downloads.macos.apple.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="lg" className="flex items-center gap-2">
                        <Download className="h-4.5 w-4.5" />
                        Descargar {downloads.macos.apple.label}
                      </Button>
                    </a>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Intel (x64)</h4>
                    <a
                      href={downloads.macos.intel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="lg" className="flex items-center gap-2">
                        <Download className="h-4.5 w-4.5" />
                        Descargar {downloads.macos.intel.label}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-semibold mb-3">Instrucciones de instalación</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Descarga el archivo .dmg correspondiente a tu arquitectura</li>
                <li>Abre la imagen .dmg</li>
                <li>Arrastra el icono de GeoNexus a la carpeta Aplicaciones</li>
                <li>Abre GeoNexus desde Launchpad o Spotlight</li>
              </ol>
            </div>
          </div>
        </TabsContent>

        {/* Linux */}
        <TabsContent value="linux" className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-xl font-semibold">Linux (x64)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  AppImage compatible con la mayoría de distribuciones (Ubuntu, Fedora, Debian, etc.).
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    {downloads.linux.arch}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    {downloads.linux.size}
                  </span>
                </div>
                <a
                  href={downloads.linux.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="flex items-center gap-2">
                    <Download className="h-4.5 w-4.5" />
                    Descargar {downloads.linux.label}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-semibold mb-3">Instrucciones de instalación</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Descarga el archivo <code className="bg-secondary px-1.5 py-0.5 rounded">{downloads.linux.label}</code></li>
                <li>Haz el archivo ejecutable: <code className="bg-secondary px-1.5 py-0.5 rounded">chmod +x {downloads.linux.label}</code></li>
                <li>Ejecútalo: <code className="bg-secondary px-1.5 py-0.5 rounded">./{downloads.linux.label}</code></li>
                <li>¡Listo! Opcionalmente, puedes integrarlo con tu entorno de escritorio</li>
              </ol>
            </div>
          </div>
        </TabsContent>

        {/* CLI */}
        <TabsContent value="cli" className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="h-5 w-5 text-purple-500" />
              <h3 className="text-xl font-semibold">CLI — geoagents</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Instala y gestiona GeoNexus directamente desde la terminal.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Instalación rápida (Windows PowerShell)</h4>
                <div className="rounded-lg bg-secondary/50 p-4 font-mono text-xs overflow-x-auto">
                  <code>irm https://raw.githubusercontent.com/Naiker12/GeoNexus/main/install.ps1 | iex</code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Instalación rápida (macOS/Linux)</h4>
                <div className="rounded-lg bg-secondary/50 p-4 font-mono text-xs overflow-x-auto">
                  <code>curl -fsSL https://raw.githubusercontent.com/Naiker12/GeoNexus/main/install.sh | bash</code>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-3 text-sm">Comandos básicos</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-3">
                    <code className="bg-secondary px-2 py-1 rounded text-xs shrink-0">geoagents install --desktop</code>
                    <span className="text-muted-foreground">Instala la app de escritorio</span>
                  </div>
                  <div className="flex gap-3">
                    <code className="bg-secondary px-2 py-1 rounded text-xs shrink-0">geoagents open</code>
                    <span className="text-muted-foreground">Abre la aplicación</span>
                  </div>
                  <div className="flex gap-3">
                    <code className="bg-secondary px-2 py-1 rounded text-xs shrink-0">geoagents doctor</code>
                    <span className="text-muted-foreground">Diagnóstico del entorno</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
