import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Apple, MonitorPlay } from "lucide-react";

export function InstallButtons() {
  const [selectedPlatform, setSelectedPlatform] = useState<"windows" | "macos" | "linux">("windows");
  const [windowsArch, setWindowsArch] = useState<"x64" | "arm64">("x64");
  const [macosArch, setMacosArch] = useState<"x64" | "aarch64">("aarch64");

  const downloadLinks = {
    windows: {
      x64: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_x64_en-US.msi",
      arm64: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_aarch64_en-US.msi",
    },
    macos: {
      x64: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_x64.dmg",
      aarch64: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_aarch64.dmg",
    },
    linux: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_amd64.AppImage",
  };

  let currentDownloadLink;
  if (selectedPlatform === "windows") {
    currentDownloadLink = downloadLinks.windows[windowsArch];
  } else if (selectedPlatform === "macos") {
    currentDownloadLink = downloadLinks.macos[macosArch];
  } else {
    currentDownloadLink = downloadLinks.linux;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { id: "windows", label: "Windows", icon: Monitor },
          { id: "macos", label: "macOS", icon: Apple },
          { id: "linux", label: "Linux", icon: MonitorPlay },
        ].map((platform) => (
          <Button
            key={platform.id}
            variant={selectedPlatform === platform.id ? "default" : "secondary"}
            onClick={() => setSelectedPlatform(platform.id as any)}
            className="flex items-center gap-2"
          >
            <platform.icon className="h-4 w-4" />
            {platform.label}
          </Button>
        ))}
      </div>

      {selectedPlatform === "windows" && (
        <div className="flex gap-2">
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
      )}

      {selectedPlatform === "macos" && (
        <div className="flex gap-2">
          <Button
            variant={macosArch === "aarch64" ? "default" : "secondary"}
            onClick={() => setMacosArch("aarch64")}
            size="sm"
          >
            Apple Silicon
          </Button>
          <Button
            variant={macosArch === "x64" ? "default" : "secondary"}
            onClick={() => setMacosArch("x64")}
            size="sm"
          >
            Intel
          </Button>
        </div>
      )}

      <a
        href={currentDownloadLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
      >
        Descargar para {[
          { id: "windows", label: `Windows (${windowsArch})` },
          { id: "macos", label: `macOS (${macosArch === "aarch64" ? "Apple Silicon" : "Intel"})` },
          { id: "linux", label: "Linux (x64)" },
        ].find((p) => p.id === selectedPlatform)?.label}
      </a>
    </div>
  );
}
