# Configurar GitHub Pages para Geo-Agents

El error "There isn't a GitHub Pages site here" se debe a que aún no has habilitado GitHub Pages en la configuración del repositorio! Aquí tienes los pasos para arreglarlo:

## Paso 1: Habilitar GitHub Pages en la configuración del repositorio
1. Ve a tu repositorio en GitHub: https://github.com/Naiker12/Geo-Agents
2. Haz clic en la pestaña "Settings"
3. En el menú lateral izquierdo, busca la sección "Pages" (debería estar bajo "Code and automation")
4. En la sección "Build and deployment":
   - Para "Source", selecciona "Deploy from a branch" **o** "GitHub Actions" (recomendamos "GitHub Actions" ya que tenemos el workflow listo)
   - Si eliges "GitHub Actions", ¡no necesitas configurar nada más en esta página!
5. Guarda los cambios

## Paso 2: Asegúrate de que los cambios estén en la rama main
1. Verifica que hayas commiteado y pusheado todos los cambios a la rama `main` (incluyendo el workflow deploy.yml y vite.config.ts)
2. En tu terminal, desde D:\Geo-Agents:
   ```bash
   git add .
   git commit -m "Configurar GitHub Pages"
   git push origin main
   ```

## Paso 3: Ejecutar el workflow de deployment (si no se ejecutó automáticamente)
1. En tu repositorio en GitHub, ve a la pestaña "Actions"
2. Selecciona el workflow "Deploy to GitHub Pages"
3. Haz clic en el botón "Run workflow" → selecciona la rama main y haz clic en "Run workflow"

## Paso 4: Esperar a que termine el deployment y verificar
1. Espera a que el workflow termine (debería tardar ~2-5 minutos)
2. Cuando termine, ve a la sección "Pages" en Settings de nuevo; deberías ver la URL de tu sitio!
3. La URL será algo como: https://naiker12.github.io/Geo-Agents/
