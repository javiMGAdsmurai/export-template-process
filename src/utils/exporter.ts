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

// Función para descargar una imagen desde URL
async function downloadImage(url: string): Promise<Blob> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error descargando imagen: ${response.statusText}`);
    }
    return await response.blob();
  } catch (error) {
    console.error(`Error descargando imagen ${url}:`, error);
    throw error;
  }
}

// Función para obtener la extensión de archivo basada en el tipo MIME
function getFileExtension(mimeType: string): string {
  const extensions: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg'
  };
  return extensions[mimeType] || 'jpg';
}

// Función para procesar imágenes y actualizar HTML
async function processImagesAndUpdateHTML(
  html: string,
  images: string[]
): Promise<{ updatedHtml: string; imageFiles: { name: string; blob: Blob }[] }> {
  const imageFiles: { name: string; blob: Blob }[] = [];
  let updatedHtml = html;

  for (let i = 0; i < images.length; i++) {
    const imageUrl = images[i];
    
    try {
      // Descargar la imagen
      const imageBlob = await downloadImage(imageUrl);
      const mimeType = imageBlob.type;
      const extension = getFileExtension(mimeType);
      const fileName = `image_${i + 1}.${extension}`;
      
      // Guardar información de la imagen
      imageFiles.push({ name: fileName, blob: imageBlob });
      
      // Reemplazar la URL en el HTML con la ruta local
      updatedHtml = updatedHtml.replace(imageUrl, fileName);
      
    } catch (error) {
      console.error(`Error procesando imagen ${imageUrl}:`, error);
      // Si falla la descarga, mantener la URL original
    }
  }

  return { updatedHtml, imageFiles };
}

export async function generateGoogleAdsStructure(
  template: Template,
  data: ExportData
): Promise<GoogleAdsStructure> {
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
            <meta name="ad.size" content="width=300,height=250">
            <title>${template.name}</title>
            <style>${template.styles}</style>
          </head>
          <body>
            <div class="before-after-container">
              <div class="before-img" style="background-image: url('${data.beforeImage}')"></div>
              <div class="after-img" style="background-image: url('${data.afterImage}')"></div>
              <div class="slider"><div class="slider-handle"></div></div>
              
              <!-- Botón Buy Now para Google Ads -->
              <a href="#" class="buy-now-btn" onclick="window.open(window.clickTag); return false;">
                Buy Now
              </a>
            </div>
            <script>${template.script}</script>
          </body>
        </html>
      `;

      // Procesar imágenes y actualizar HTML
      const { updatedHtml } = await processImagesAndUpdateHTML(
        html,
        [data.beforeImage, data.afterImage]
      );

      return {
        html: updatedHtml.trim(),
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
            <meta name="ad.size" content="width=300,height=250">
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
              
              <!-- Botón Buy Now para Google Ads -->
              <a href="#" class="buy-now-btn" onclick="window.open(window.clickTag); return false;">
                Buy Now
              </a>
            </div>
            <script>${template.script}</script>
          </body>
        </html>
      `;

      // Procesar imágenes y actualizar HTML
      const { updatedHtml } = await processImagesAndUpdateHTML(
        html,
        data.images
      );

      return {
        html: updatedHtml.trim(),
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
            <meta name="ad.size" content="width=300,height=250">
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
              
              <!-- Botón Buy Now para Google Ads -->
              <a href="#" class="buy-now-btn" onclick="window.open(window.clickTag); return false;">
                Buy Now
              </a>
            </div>
            <script>${template.script}</script>
          </body>
        </html>
      `;

      // Procesar imágenes y actualizar HTML
      const { updatedHtml } = await processImagesAndUpdateHTML(
        html,
        data.images
      );

      return {
        html: updatedHtml.trim(),
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
  const structure = await generateGoogleAdsStructure(template, data);
  
  const zip = new JSZip();
  
  // Incluir index.html como archivo principal (requerido por Google Ads)
  zip.file("index.html", structure.html);
  
  // Procesar y incluir todas las imágenes localmente
  const allImages = structure.images || [];
  const { imageFiles } = await processImagesAndUpdateHTML(structure.html, allImages);
  
  // Agregar todas las imágenes al ZIP
  for (const imageFile of imageFiles) {
    zip.file(imageFile.name, imageFile.blob);
  }
  
  // Generar el archivo ZIP con configuración optimizada para Google Ads
  const zipBlob = await zip.generateAsync({ 
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6
    }
  });
  
  // Verificar que el ZIP contiene el archivo principal
  console.log("✅ ZIP generado con éxito");
  console.log("📦 Archivos incluidos:");
  console.log("  - index.html (archivo principal)");
  imageFiles.forEach(img => {
    console.log(`  - ${img.name}`);
  });
  console.log(`📏 Tamaño total: ${Math.round(zipBlob.size / 1024)} KB`);
  
  return zipBlob;
}

export function downloadZIP(filename: string, blob: Blob) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.zip`;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Mantener compatibilidad con el sistema anterior
export async function exportTemplateAsHTML(
  template: Template,
  data: ExportData
): Promise<string> {
  const structure = await generateGoogleAdsStructure(template, data);
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
