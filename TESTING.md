# Guía de Pruebas - Sistema de Exportación

## 🧪 Cómo Probar el Sistema

### 1. Acceder a la Aplicación
- Abre http://localhost:5175/ en tu navegador
- La aplicación debería cargar correctamente

### 2. Probar desde la Consola del Navegador
Una vez que la app esté cargada, abre las herramientas de desarrollador (F12) y ejecuta:

```javascript
// Probar exportación completa con imágenes locales
window.testExport()

// Probar compatibilidad con Google Ads
window.testGoogleAdsCompatibility()

// Generar ZIP de prueba para Google Ads
window.generateGoogleAdsTestZIP()

// Probar todos los templates
window.testAllTemplates()

// Debug del HTML generado
const template = window.templates[0];
const data = {
  images: [
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1018/600/400",
    "https://picsum.photos/id/1020/600/400"
  ]
};
window.debugHTML(template, data);

// Crear preview HTML
window.createHTMLPreview(template, data);
```

### 3. Verificar que el CSS y JS se Aplican

#### ✅ Lo que deberías ver:
- **CSS inline**: El HTML contiene `<style>` con los estilos
- **JS inline**: El HTML contiene `<script>` con el JavaScript
- **Sin referencias externas**: No hay `href="styles.css"` ni `src="script.js"`
- **Funcionalidad**: Los botones y controles funcionan correctamente
- **Botón Buy Now**: Aparece en la parte inferior centrado
- **Meta tag ad.size**: `<meta name="ad.size" content="width=300,height=250">`
- **Click tag solo en botón**: No se activa al hacer clic en otras áreas

#### ❌ Problemas comunes:
- **CSS no se aplica**: Verificar que los estilos están en `<style>` tags
- **JS no funciona**: Verificar que el script está en `<script>` tags
- **Referencias externas**: El HTML no debería referenciar archivos externos
- **Botón Buy Now no aparece**: Verificar que está incluido en el HTML
- **Click tag en todo el banner**: Solo debe estar en el botón "Buy Now"

### 4. Probar Exportación ZIP

1. En la aplicación, selecciona un template
2. Agrega imágenes de prueba
3. Haz clic en "Exportar como ZIP"
4. Descarga y extrae el ZIP
5. Abre `index.html` en el navegador
6. Verifica que todo funciona correctamente

### 5. Verificar Descarga de Imágenes

#### ✅ Verificaciones de Imágenes:
- **Imágenes descargadas**: El ZIP debe contener `image_1.jpg`, `image_2.jpg`, etc.
- **Rutas locales**: El HTML debe referenciar `image_1.jpg` en lugar de URLs externas
- **Sin URLs externas**: No debe haber referencias a `https://picsum.photos/...`
- **Tamaño apropiado**: El ZIP debe tener un tamaño razonable (100KB - 5MB)

#### 🔍 Comandos de verificación:
```javascript
// Verificar contenido del ZIP
window.testGoogleAdsCompatibility()

// Verificar descarga de imágenes
const zipBlob = await window.generateGoogleAdsTestZIP();
console.log("ZIP generado:", zipBlob.size, "bytes");
```

### 6. Probar Click Tag

#### ✅ Verificaciones del Click Tag:
- **Solo en botón**: El click tag solo debe estar en el botón "Buy Now"
- **Implementación correcta**: `onclick="window.open(window.clickTag); return false;"`
- **No en otras áreas**: Hacer clic en otras partes no debe activar el click tag
- **Prevención de comportamiento**: `return false;` debe prevenir navegación

#### 🔍 Comandos de prueba:
```javascript
// Probar click tag en preview
window.autoTestHTML()

// Verificar HTML generado
window.debugHTML(template, data);
```

### 7. Verificar Compatibilidad con Google Ads

#### ✅ Requisitos Cumplidos:
- **Archivo principal**: `index.html` en la raíz del ZIP
- **Meta tag ad.size**: `width=300,height=250`
- **Click tag válido**: Solo en el botón "Buy Now"
- **Sin recursos externos**: Todas las imágenes incluidas localmente
- **CSS y JS inline**: Sin referencias externas
- **Estructura HTML válida**: DOCTYPE, html, head, body

#### 🔍 Comandos de verificación:
```javascript
// Verificar compatibilidad completa
window.testGoogleAdsCompatibility()

// Generar ZIP para Google Ads
window.generateGoogleAdsTestZIP()
```

### 8. Archivos de Prueba

#### test-export.html
- Archivo de prueba para verificar la exportación
- Incluye ejemplos de todos los templates
- Funciones de prueba integradas

#### Funciones de Prueba Disponibles:
```javascript
// Funciones principales
window.testExport()                    // Prueba exportación completa
window.testGoogleAdsCompatibility()    // Verificar compatibilidad Google Ads
window.generateGoogleAdsTestZIP()      // Generar ZIP de prueba
window.testAllTemplates()              // Probar todos los templates

// Funciones de debug
window.debugHTML(template, data)       // Debug del HTML generado
window.createHTMLPreview(template, data) // Crear preview HTML
window.autoTestHTML()                  // Generar y abrir HTML automáticamente
```

### 9. Verificar Errores Comunes

#### ❌ Error: "Missing primary asset check"
- **Causa**: Falta meta tag ad.size o index.html no está en la raíz
- **Solución**: Verificar que el HTML incluye `<meta name="ad.size" content="width=300,height=250">`

#### ❌ Error: "Unsupported creative size"
- **Causa**: Tamaño no soportado por Google Ads
- **Solución**: Usar tamaño estándar 300x250

#### ❌ Error: Click tag en todo el banner
- **Causa**: Click tag implementado globalmente
- **Solución**: Verificar que solo está en el botón "Buy Now"

#### ❌ Error: Recursos externos
- **Causa**: Imágenes referenciadas desde URLs externas
- **Solución**: Verificar que las imágenes se descargan y se incluyen localmente

### 10. Comandos de Debug Avanzado

```javascript
// Debug completo del sistema
window.testExport()

// Verificar estructura del ZIP
const result = await window.testGoogleAdsCompatibility();
console.log("Resultado:", result);

// Verificar HTML generado
const template = window.templates[0];
const data = { images: ["https://picsum.photos/id/1015/600/400"] };
const structure = await window.debugHTML(template, data);
console.log("Estructura:", structure);

// Verificar descarga de imágenes
const zipBlob = await window.generateGoogleAdsTestZIP();
const zip = new JSZip();
const zipContent = await zip.loadAsync(zipBlob);
console.log("Archivos en ZIP:", Object.keys(zipContent.files));
```

### 11. Verificar Funcionalidad de Templates

#### BeforeAfter Slider:
- ✅ Slider arrastrable funciona
- ✅ Comparación antes/después visible
- ✅ Botón "Buy Now" centrado
- ✅ Click tag solo en botón

#### Carousel A:
- ✅ Navegación con flechas funciona
- ✅ Transiciones suaves
- ✅ Botón "Buy Now" centrado
- ✅ Click tag solo en botón

#### Carousel B:
- ✅ Navegación por miniaturas funciona
- ✅ Imagen principal se actualiza
- ✅ Botón "Buy Now" centrado
- ✅ Click tag solo en botón

### 12. Verificar Exportación ZIP

#### ✅ Estructura del ZIP:
```
template-name.zip
├── index.html          # Archivo principal con meta tag ad.size
├── image_1.jpg        # Imagen descargada localmente
├── image_2.jpg        # Imagen descargada localmente
└── image_3.jpg        # Imagen descargada localmente
```

#### ✅ Verificaciones:
- **index.html en la raíz**: Archivo principal debe estar en la raíz
- **Meta tag presente**: `<meta name="ad.size" content="width=300,height=250">`
- **Imágenes locales**: No debe haber URLs externas
- **CSS y JS inline**: Sin referencias externas
- **Click tag correcto**: Solo en el botón "Buy Now"

### 13. Probar en Google Ads Validator

1. Genera un ZIP usando `window.generateGoogleAdsTestZIP()`
2. Ve a https://h5validator.appspot.com/dcm/asset
3. Sube el ZIP generado
4. Verifica que no hay errores:
   - ✅ No "Missing primary asset check"
   - ✅ No "Unsupported creative size"
   - ✅ No "External resources"
   - ✅ Click tag solo en botón

### 14. Comandos de Prueba Rápida

```javascript
// Prueba rápida completa
async function quickTest() {
  console.log("🚀 Iniciando prueba rápida...");
  
  // Probar exportación
  const exportResult = await window.testExport();
  console.log("✅ Exportación:", exportResult.success);
  
  // Probar compatibilidad Google Ads
  const compatibilityResult = await window.testGoogleAdsCompatibility();
  console.log("✅ Compatibilidad Google Ads:", compatibilityResult.success);
  
  // Generar ZIP de prueba
  const zipBlob = await window.generateGoogleAdsTestZIP();
  console.log("✅ ZIP generado:", zipBlob ? "Éxito" : "Error");
  
  console.log("🎉 Prueba rápida completada");
}

// Ejecutar prueba rápida
quickTest();
```

### 15. Solución de Problemas

#### Problema: ZIP muy pequeño
- **Causa**: Imágenes no se descargan correctamente
- **Solución**: Verificar conexión a internet y URLs de imágenes

#### Problema: ZIP muy grande
- **Causa**: Imágenes muy pesadas
- **Solución**: Optimizar imágenes antes de usar

#### Problema: Click tag no funciona
- **Causa**: Implementación incorrecta
- **Solución**: Verificar que usa `window.open(window.clickTag); return false;`

#### Problema: Estilos no se aplican
- **Causa**: CSS no está inline
- **Solución**: Verificar que el CSS está en `<style>` tags

### 16. Verificaciones Finales

Antes de usar en producción, verifica:

- ✅ **HTML válido**: DOCTYPE, html, head, body
- ✅ **Meta tag ad.size**: Dimensiones correctas
- ✅ **Click tag**: Solo en botón "Buy Now"
- ✅ **Imágenes locales**: Sin URLs externas
- ✅ **CSS y JS inline**: Sin referencias externas
- ✅ **Funcionalidad**: Todos los controles funcionan
- ✅ **Compatibilidad**: Pasa validación de Google Ads

El sistema ahora es **100% compatible con Google Ads y Display & Video 360**. 