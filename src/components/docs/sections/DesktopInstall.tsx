import { InstallButtons } from "@/components/docs/InstallButtons";

export function DesktopInstall() {
  return (
    <section id="instalación-de-escritorio">
      <h2 className="mb-4 text-3xl font-bold">Instalación de escritorio</h2>
      <p className="mb-6 text-lg text-muted-foreground">
        GeoNexus se distribuye como <strong>aplicación de escritorio nativa</strong> generada con Tauri 2.
        Cada plataforma produce un instalador firmado y autocontenido — no requiere runtime externo.
      </p>
      <InstallButtons />
    </section>
  );
}
