// Archivo de prueba para verificar la exportación
import { exportTemplateAsZIP, generateGoogleAdsStructure } from "./exporter";
import { templates } from "../templates/templates";
import JSZip from "jszip";

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
    const structure = await generateGoogleAdsStructure(template, data);
    
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
    
    // Verificar botón Buy Now
    const hasBuyNowButton = structure.html.includes('buy-now-btn');
    const hasClickTag = structure.html.includes('window.clickTag');
    const hasBuyNowText = structure.html.includes('Buy Now');
    
    console.log("✅ Botón Buy Now presente:", hasBuyNowButton);
    console.log("✅ ClickTag presente:", hasClickTag);
    console.log("✅ Texto 'Buy Now' presente:", hasBuyNowText);
    
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
export async function createHTMLPreview(template: any, data: any) {
  const structure = await generateGoogleAdsStructure(template, data);
  
  // Crear blob del HTML
  const htmlBlob = new Blob([structure.html], { type: "text/html" });
  const url = URL.createObjectURL(htmlBlob);
  
  // Abrir en nueva ventana
  window.open(url, '_blank');
  
  return url;
}

// Función para generar y abrir HTML de prueba automáticamente
export async function autoTestHTML() {
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
    const structure = await generateGoogleAdsStructure(template, data);
    
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
      console.log("  - El botón 'Buy Now' aparece en la parte inferior");
      console.log("  - El botón 'Buy Now' está centrado");
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
export async function debugHTML(template: any, data: any) {
  const structure = await generateGoogleAdsStructure(template, data);
  
  console.log("🔍 DEBUG HTML:");
  console.log("Longitud HTML:", structure.html.length);
  console.log("Longitud CSS:", structure.css.length);
  console.log("Longitud JS:", structure.js.length);
  
  // Mostrar fragmentos del HTML
  const htmlLines = structure.html.split('\n');
  console.log("Primeras 10 líneas del HTML:");
  htmlLines.slice(0, 10).forEach((line: string, i: number) => {
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
    hasButtons: structure.html.includes('onclick='),
    hasBuyNowButton: structure.html.includes('buy-now-btn'),
    hasClickTag: structure.html.includes('window.clickTag'),
    hasBuyNowText: structure.html.includes('Buy Now')
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
      const structure = await generateGoogleAdsStructure(template, testData);
      const hasInlineCSS = structure.html.includes('<style>');
      const hasInlineJS = structure.html.includes('<script>');
      const hasBuyNowButton = structure.html.includes('buy-now-btn');
      const hasClickTag = structure.html.includes('window.clickTag');
      
      console.log(`✅ ${template.name}: CSS inline=${hasInlineCSS}, JS inline=${hasInlineJS}`);
      console.log(`✅ ${template.name}: Buy Now button=${hasBuyNowButton}, ClickTag=${hasClickTag}`);
      
    } catch (error) {
      console.error(`❌ ${template.name}: Error - ${error}`);
    }
  }
}

// Función específica para probar compatibilidad con Google Ads
export async function testGoogleAdsCompatibility() {
  console.log("🔍 Probando compatibilidad con Google Ads...");
  
  const template = templates[0]; // Carrusel A
  const data = {
    images: [
      "https://picsum.photos/id/1015/600/400",
      "https://picsum.photos/id/1018/600/400",
      "https://picsum.photos/id/1020/600/400"
    ]
  };
  
  try {
    // Generar ZIP
    const zipBlob = await exportTemplateAsZIP(template, data);
    
    // Verificar estructura del ZIP
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipBlob);
    
    console.log("📦 Contenido del ZIP:");
    Object.keys(zipContent.files).forEach(filename => {
      console.log(`  - ${filename}`);
    });
    
    // Verificar que contiene index.html como archivo principal
    const hasIndexHtml = Object.keys(zipContent.files).includes('index.html');
    const fileCount = Object.keys(zipContent.files).length;
    
    console.log("✅ Contiene index.html:", hasIndexHtml);
    console.log("✅ Número total de archivos:", fileCount);
    console.log("✅ Tamaño ZIP:", Math.round(zipBlob.size / 1024), "KB");
    
    // Verificar contenido del HTML
    const htmlContent = await zipContent.file('index.html')?.async('string');
    if (htmlContent) {
      const checks = {
        hasDoctype: htmlContent.includes('<!DOCTYPE html>'),
        hasHtmlTag: htmlContent.includes('<html'),
        hasAdSizeMeta: htmlContent.includes('meta name="ad.size"'),
        hasInlineCSS: htmlContent.includes('<style>'),
        hasInlineJS: htmlContent.includes('<script>'),
        noExternalRefs: !htmlContent.includes('href="') && !htmlContent.includes('src="'),
        hasImages: htmlContent.includes('background-image'),
        hasInteractivity: htmlContent.includes('onclick='),
        hasBuyNowButton: htmlContent.includes('buy-now-btn'),
        hasClickTag: htmlContent.includes('window.clickTag'),
        hasBuyNowText: htmlContent.includes('Buy Now')
      };
      
      console.log("🔍 Verificaciones de Google Ads:");
      Object.entries(checks).forEach(([check, result]) => {
        console.log(`${result ? '✅' : '❌'} ${check}: ${result}`);
      });
      
      // Verificar metadatos específicos
      if (htmlContent.includes('meta name="ad.size"')) {
        console.log("✅ Meta tag ad.size presente");
      } else {
        console.log("❌ Meta tag ad.size faltante");
      }
    }
    
    // Crear URL para descarga
    const url = URL.createObjectURL(zipBlob);
    console.log("📥 URL para descarga:", url);
    
    return {
      success: true,
      zipBlob,
      url,
      size: zipBlob.size
    };
    
  } catch (error) {
    console.error("❌ Error en compatibilidad Google Ads:", error);
    return {
      success: false,
      error
    };
  }
}

// Función para generar ZIP de prueba para Google Ads
export async function generateGoogleAdsTestZIP() {
  console.log("🚀 Generando ZIP de prueba para Google Ads...");
  
  const template = templates[0]; // Carrusel A
  const data = {
    images: [
      "https://picsum.photos/id/1015/600/400",
      "https://picsum.photos/id/1018/600/400",
      "https://picsum.photos/id/1020/600/400"
    ]
  };
  
  try {
    const zipBlob = await exportTemplateAsZIP(template, data);
    
    // Verificar estructura del ZIP
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipBlob);
    
    console.log("📦 Verificación del ZIP:");
    console.log("✅ Archivos incluidos:");
    Object.keys(zipContent.files).forEach(filename => {
      console.log(`   - ${filename}`);
    });
    
    // Verificar requisitos específicos de Google Ads
    const htmlContent = await zipContent.file('index.html')?.async('string');
    if (htmlContent) {
      const requirements = {
        hasIndexHtml: Object.keys(zipContent.files).includes('index.html'),
        hasDoctype: htmlContent.includes('<!DOCTYPE html>'),
        hasAdSizeMeta: htmlContent.includes('meta name="ad.size"'),
        hasClickTag: htmlContent.includes('window.clickTag'),
        hasBuyNowButton: htmlContent.includes('buy-now-btn'),
        hasInlineCSS: htmlContent.includes('<style>'),
        hasInlineJS: htmlContent.includes('<script>'),
        noExternalRefs: !htmlContent.includes('href="styles.css"') && !htmlContent.includes('src="script.js"')
      };
      
      console.log("🔍 Verificación de requisitos Google Ads:");
      Object.entries(requirements).forEach(([req, result]) => {
        console.log(`${result ? '✅' : '❌'} ${req}: ${result}`);
      });
      
      // Verificar tamaño del ZIP
      const sizeKB = Math.round(zipBlob.size / 1024);
      console.log(`📏 Tamaño del ZIP: ${sizeKB} KB`);
      
      if (sizeKB < 100) {
        console.log("⚠️ ZIP muy pequeño, verificar contenido");
      } else if (sizeKB > 5000) {
        console.log("⚠️ ZIP muy grande, optimizar imágenes");
      } else {
        console.log("✅ Tamaño del ZIP apropiado");
      }
    }
    
    // Crear enlace de descarga
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "google-ads-test.zip";
    link.click();
    URL.revokeObjectURL(link.href);
    
    console.log("✅ ZIP descargado: google-ads-test.zip");
    console.log("📋 Ahora puedes subir este archivo a:");
    console.log("   https://h5validator.appspot.com/dcm/asset");
    console.log("🔍 El ZIP incluye:");
    console.log("   - index.html como archivo principal");
    console.log("   - Meta tag ad.size para dimensiones");
    console.log("   - Botón 'Buy Now' con clickTag");
    console.log("   - CSS y JS integrados inline");
    console.log("   - Imágenes incluidas localmente");
    
    return zipBlob;
    
  } catch (error) {
    console.error("❌ Error generando ZIP:", error);
    return null;
  }
}

// Exportar para uso en consola
if (typeof window !== "undefined") {
  (window as any).testExport = testExport;
  (window as any).createHTMLPreview = createHTMLPreview;
  (window as any).debugHTML = debugHTML;
  (window as any).testAllTemplates = testAllTemplates;
  (window as any).autoTestHTML = autoTestHTML;
  (window as any).testGoogleAdsCompatibility = testGoogleAdsCompatibility;
  (window as any).generateGoogleAdsTestZIP = generateGoogleAdsTestZIP;
  
  console.log("🧪 Funciones de prueba disponibles:");
  console.log("- window.testExport() - Probar exportación completa");
  console.log("- window.createHTMLPreview(template, data) - Crear preview HTML");
  console.log("- window.debugHTML(template, data) - Debug del HTML generado");
  console.log("- window.testAllTemplates() - Probar todos los templates");
  console.log("- window.autoTestHTML() - Generar y abrir HTML automáticamente");
  console.log("- window.testGoogleAdsCompatibility() - Probar compatibilidad Google Ads");
  console.log("- window.generateGoogleAdsTestZIP() - Generar ZIP para Google Ads");
} 