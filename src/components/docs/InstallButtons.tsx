import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Apple, MonitorPlay } from "lucide-react";

export function InstallButtons() {
  const [selectedPlatform, setSelectedPlatform] = useState<"windows" | "macos" | "linux">("windows");

  const platforms = [
    { id: "windows", label: "Windows", icon: Monitor, color: "bg-blue-600 hover:bg-blue-700" },
    { id: "macos", label: "macOS", icon: Apple, color: "bg-gray-800 hover:bg-gray-900" },
    { id: "linux", label: "Linux", icon: MonitorPlay, color: "bg-yellow-600 hover:bg-yellow-700" },
  ];

  const downloadLinks = {
    windows: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus_Setup.exe",
    macos: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus.dmg",
    linux: "https://github.com/Naiker12/GeoNexus/releases/latest/download/GeoNexus.AppImage",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
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

      <a
        href={downloadLinks[selectedPlatform]}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
      >
        Descargar para {platforms.find((p) => p.id === selectedPlatform)?.label}
      </a>
    </div>
  );
}