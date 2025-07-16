// Archivo de prueba para verificar la exportación
import { exportTemplateAsZIP, generateGoogleAdsStructure } from "./exporter";
import { templates } from "../templates/templates";

// Función para probar la exportación
export async function testExport() {
  console.log("🧪 Probando exportación...");
  
  try {
    const template = templates[0]; // Carrusel A
    const data = {
      images: [
        "https://picsum.photos/id/1015/600/400",
        "https://picsum.photos/id/1018/600/400",
        "https://picsum.photos/id/1020/600/400"
      ]
    };
    
    // Generar estructura
    const structure = generateGoogleAdsStructure(template, data);
    
    // Verificar que el HTML contiene CSS y JS inline
    const hasInlineCSS = structure.html.includes('<style>');
    const hasInlineJS = structure.html.includes('<script>');
    const hasNoExternalRefs = !structure.html.includes('href="styles.css"') && !structure.html.includes('src="script.js"');
    const hasProperStructure = structure.html.includes('<!DOCTYPE html>') && structure.html.includes('<html');
    
    console.log("✅ HTML generado:", structure.html.length > 0);
    console.log("✅ CSS inline:", hasInlineCSS);
    console.log("✅ JS inline:", hasInlineJS);
    console.log("✅ Sin referencias externas:", hasNoExternalRefs);
    console.log("✅ Estructura HTML válida:", hasProperStructure);
    
    // Verificar contenido específico
    const hasCarouselClass = structure.html.includes('class="carouselA"');
    const hasSlidesContainer = structure.html.includes('id="slidesA"');
    const hasMoverAFunction = structure.js.includes('function moverA');
    
    console.log("✅ Clase carouselA presente:", hasCarouselClass);
    console.log("✅ Contenedor slides presente:", hasSlidesContainer);
    console.log("✅ Función moverA presente:", hasMoverAFunction);
    
    // Generar ZIP
    const zipBlob = await exportTemplateAsZIP(template, data);
    console.log("✅ ZIP generado:", zipBlob.size > 0);
    
    // Crear URL para preview
    const url = URL.createObjectURL(zipBlob);
    console.log("✅ URL del ZIP:", url);
    
    return {
      success: true,
      structure,
      zipBlob,
      url
    };
    
  } catch (error) {
    console.error("❌ Error en exportación:", error);
    return {
      success: false,
      error
    };
  }
}

// Función para crear preview del HTML
export function createHTMLPreview(template: any, data: any) {
  const structure = generateGoogleAdsStructure(template, data);
  
  // Crear blob del HTML
  const htmlBlob = new Blob([structure.html], { type: "text/html" });
  const url = URL.createObjectURL(htmlBlob);
  
  // Abrir en nueva ventana
  window.open(url, '_blank');
  
  return url;
}

// Función para generar y abrir HTML de prueba automáticamente
export function autoTestHTML() {
  console.log("🚀 Generando y abriendo HTML de prueba automáticamente...");
  
  const template = templates[0]; // Carrusel A
  const data = {
    images: [
      "https://picsum.photos/id/1015/600/400",
      "https://picsum.photos/id/1018/600/400",
      "https://picsum.photos/id/1020/600/400"
    ]
  };
  
  try {
    const structure = generateGoogleAdsStructure(template, data);
    
    // Crear blob del HTML
    const htmlBlob = new Blob([structure.html], { type: "text/html" });
    const url = URL.createObjectURL(htmlBlob);
    
    console.log("✅ HTML generado exitosamente");
    console.log("✅ Abriendo en nueva ventana...");
    
    // Abrir en nueva ventana
    const newWindow = window.open(url, '_blank');
    
    if (newWindow) {
      console.log("✅ Ventana abierta correctamente");
      console.log("🔍 Verifica que:");
      console.log("  - Los estilos se aplican (carrusel visible)");
      console.log("  - Los botones funcionan (flechas)");
      console.log("  - Las imágenes se cargan");
      console.log("  - Las transiciones son suaves");
    } else {
      console.log("⚠️ El navegador bloqueó la ventana emergente");
      console.log("📋 Copia esta URL y ábrela manualmente:");
      console.log(url);
    }
    
    return url;
    
  } catch (error) {
    console.error("❌ Error generando HTML:", error);
    return null;
  }
}

// Función para debug del HTML generado
export function debugHTML(template: any, data: any) {
  const structure = generateGoogleAdsStructure(template, data);
  
  console.log("🔍 DEBUG HTML:");
  console.log("Longitud HTML:", structure.html.length);
  console.log("Longitud CSS:", structure.css.length);
  console.log("Longitud JS:", structure.js.length);
  
  // Mostrar fragmentos del HTML
  const htmlLines = structure.html.split('\n');
  console.log("Primeras 10 líneas del HTML:");
  htmlLines.slice(0, 10).forEach((line, i) => {
    console.log(`${i + 1}: ${line}`);
  });
  
  // Verificar elementos críticos
  const checks = {
    hasDoctype: structure.html.includes('<!DOCTYPE html>'),
    hasHtmlTag: structure.html.includes('<html'),
    hasHead: structure.html.includes('<head>'),
    hasBody: structure.html.includes('<body>'),
    hasStyleTag: structure.html.includes('<style>'),
    hasScriptTag: structure.html.includes('<script>'),
    hasClosingTags: structure.html.includes('</html>'),
    hasImages: structure.html.includes('background-image'),
    hasButtons: structure.html.includes('onclick=')
  };
  
  console.log("🔍 Verificaciones de estructura:");
  Object.entries(checks).forEach(([check, result]) => {
    console.log(`${result ? '✅' : '❌'} ${check}: ${result}`);
  });
  
  return structure;
}

// Función para probar todos los templates
export async function testAllTemplates() {
  console.log("🧪 Probando todos los templates...");
  
  const testData = {
    images: [
      "https://picsum.photos/id/1015/600/400",
      "https://picsum.photos/id/1018/600/400",
      "https://picsum.photos/id/1020/600/400"
    ],
    beforeImage: "https://picsum.photos/id/1015/600/400",
    afterImage: "https://picsum.photos/id/1018/600/400"
  };
  
  for (const template of templates) {
    console.log(`\n📋 Probando template: ${template.name}`);
    
    try {
      const structure = generateGoogleAdsStructure(template, testData);
      const hasInlineCSS = structure.html.includes('<style>');
      const hasInlineJS = structure.html.includes('<script>');
      
      console.log(`✅ ${template.name}: CSS inline=${hasInlineCSS}, JS inline=${hasInlineJS}`);
      
    } catch (error) {
      console.error(`❌ ${template.name}: Error - ${error}`);
    }
  }
}

// Exportar para uso en consola
if (typeof window !== "undefined") {
  (window as any).testExport = testExport;
  (window as any).createHTMLPreview = createHTMLPreview;
  (window as any).debugHTML = debugHTML;
  (window as any).testAllTemplates = testAllTemplates;
  (window as any).autoTestHTML = autoTestHTML;
  
  console.log("🧪 Funciones de prueba disponibles:");
  console.log("- window.testExport() - Probar exportación completa");
  console.log("- window.createHTMLPreview(template, data) - Crear preview HTML");
  console.log("- window.debugHTML(template, data) - Debug del HTML generado");
  console.log("- window.testAllTemplates() - Probar todos los templates");
  console.log("- window.autoTestHTML() - Generar y abrir HTML automáticamente");
} 