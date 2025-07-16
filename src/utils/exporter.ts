import type { Template } from "../templates/templates";
import JSZip from "jszip";

type ExportData = {
  images?: string[];
  beforeImage?: string;
  afterImage?: string;
  // otros datos si quieres
};

// Estructura de archivos para Google Ads/DV360
interface GoogleAdsStructure {
  html: string;
  css: string;
  js: string;
  images?: string[];
}

export function generateGoogleAdsStructure(
  template: Template,
  data: ExportData
): GoogleAdsStructure {
  switch (template.id) {
    case "beforeAfter": {
      if (!data.beforeImage || !data.afterImage) {
        throw new Error(
          "BeforeAfter template requiere beforeImage y afterImage"
        );
      }
      
      const html = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${template.name}</title>
            <style>${template.styles}</style>
          </head>
          <body>
            <div class="before-after-container">
              <div class="before-img" style="background-image: url('${data.beforeImage}')"></div>
              <div class="after-img" style="background-image: url('${data.afterImage}')"></div>
              <div class="slider"><div class="slider-handle"></div></div>
            </div>
            <script>${template.script}</script>
          </body>
        </html>
      `;

      return {
        html: html.trim(),
        css: template.styles,
        js: template.script,
        images: [data.beforeImage, data.afterImage]
      };
    }
    
    case "carouselA": {
      if (!data.images) {
        throw new Error("CarouselA template requiere images");
      }
      
      const slidesHtml = data.images
        .map(
          (src) =>
            `<div class="slideA" style="background-image:url('${src}')"></div>`
        )
        .join("");
      
      const html = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${template.name}</title>
            <style>${template.styles}</style>
          </head>
          <body>
            <div class="carouselA">
              <button class="flecha izquierda" onclick="moverA(-1)">←</button>
              <div class="slides" id="slidesA">
                ${slidesHtml}
              </div>
              <button class="flecha derecha" onclick="moverA(1)">→</button>
            </div>
            <script>${template.script}</script>
          </body>
        </html>
      `;

      return {
        html: html.trim(),
        css: template.styles,
        js: template.script,
        images: data.images
      };
    }
    
    case "carouselB": {
      if (!data.images) {
        throw new Error("CarouselB template requiere images");
      }
      
      const slidesHtml = data.images
        .map(
          (src, index) =>
            `<div class="thumbB" style="background-image:url('${src}')" onclick="showSlideB(${index})"></div>`
        )
        .join("");
      
      const html = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${template.name}</title>
            <style>${template.styles}</style>
          </head>
          <body>
            <div class="carouselB-container">
              <div class="arrow-buttons">
                <button onclick="prevSlideB()">←</button>
                <button onclick="nextSlideB()">→</button>
              </div>
              <div class="main-slideB"></div>
              <div class="thumbs">
                ${slidesHtml}
              </div>
            </div>
            <script>${template.script}</script>
          </body>
        </html>
      `;

      return {
        html: html.trim(),
        css: template.styles,
        js: template.script,
        images: data.images
      };
    }
    
    default:
      throw new Error(`Template no soportado: ${template.id}`);
  }
}

export async function exportTemplateAsZIP(
  template: Template,
  data: ExportData
): Promise<Blob> {
  const structure = generateGoogleAdsStructure(template, data);
  
  const zip = new JSZip();
  
  // Agregar archivos principales
  zip.file("index.html", structure.html);
  zip.file("styles.css", structure.css);
  zip.file("script.js", structure.js);
  
  // Crear archivo README con instrucciones
  const readme = `
# ${template.name} - Google Ads/DV360 Template

## Archivos incluidos:
- index.html: Archivo principal HTML (con CSS y JS integrados)
- styles.css: Estilos CSS (archivo separado para referencia)
- script.js: JavaScript funcional (archivo separado para referencia)

## Instrucciones de uso:
1. **Opción 1 (Recomendada)**: Abre directamente index.html en el navegador
2. **Opción 2**: Sube todos los archivos a tu servidor web
3. Asegúrate de que las imágenes estén accesibles desde las URLs especificadas

## Compatibilidad:
- Google Ads
- DV360 (Display & Video 360)
- Servidores web estáticos
- Navegadores modernos

## Notas:
- El CSS y JS están integrados en el HTML para funcionamiento inmediato
- También se incluyen archivos separados para optimización
- Compatible con políticas de seguridad de Google Ads
- Las imágenes deben estar hospedadas en URLs públicas
`;

  zip.file("README.md", readme.trim());
  
  // Crear archivo de configuración para Google Ads
  const config = {
    templateName: template.name,
    templateId: template.id,
    version: "1.0.0",
    compatibleWith: ["Google Ads", "DV360"],
    files: ["index.html", "styles.css", "script.js"],
    requirements: {
      images: structure.images || [],
      externalDependencies: []
    },
    features: {
      inlineStyles: true,
      inlineScripts: true,
      responsive: true,
      touchSupport: true
    }
  };
  
  zip.file("config.json", JSON.stringify(config, null, 2));
  
  // Generar el archivo ZIP
  return await zip.generateAsync({ type: "blob" });
}

export function downloadZIP(filename: string, blob: Blob) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.zip`;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Mantener compatibilidad con el sistema anterior
export function exportTemplateAsHTML(
  template: Template,
  data: ExportData
): string {
  const structure = generateGoogleAdsStructure(template, data);
  return structure.html;
}

export function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}
