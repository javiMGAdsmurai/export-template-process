# Google Ads/DV360 Template Exporter

## Descripción

Este proyecto es un **generador especializado de plantillas HTML interactivas** para Google Ads y Display & Video 360 (DV360). El sistema convierte componentes React en paquetes ZIP con estructura optimizada para plataformas publicitarias de Google, incluyendo **descarga automática de imágenes externas** y **implementación correcta del click tag**.

## ✅ Características Principales

### 🔧 **Descarga Automática de Imágenes**
- **Descarga imágenes externas**: Convierte URLs externas a archivos locales
- **Inclusión en ZIP**: Todas las imágenes se incluyen localmente en el ZIP
- **Compatibilidad total**: Cumple con los requisitos de Google Ads (sin recursos externos)

### 🎯 **Click Tag Implementado Correctamente**
- **Implementación estándar**: `onclick="window.open(window.clickTag); return false;"`
- **Solo en el botón**: El click tag solo está en el botón "Buy Now"
- **Cumple con Google Ads**: Estructura válida según documentación oficial

### 📦 **Estructura ZIP Optimizada**
- **Archivo principal**: `index.html` en la raíz del ZIP
- **Meta tag ad.size**: `width=300,height=250` (tamaño estándar)
- **Imágenes locales**: Todas las imágenes incluidas localmente
- **Sin referencias externas**: CSS y JS integrados inline

## Flujo de Trabajo

### 1. Arquitectura del Sistema

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Templates     │    │   React App      │    │   Exporter      │
│   Registry      │───▶│   Preview        │───▶│   ZIP Gen       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Template      │    │   Live Preview   │    │   Download      │
│   Components    │    │   Interaction    │    │   ZIP File      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### 2. Exportación ZIP (Google Ads/DV360)

- **Estructura de archivos optimizada**: HTML con imágenes locales
- **Compatibilidad total**: Google Ads, DV360, servidores web estáticos
- **Archivos incluidos**:
  - `index.html`: Archivo principal con meta tag ad.size
  - `image_1.jpg`, `image_2.jpg`, etc.: Imágenes descargadas localmente
  - CSS y JS integrados inline

### 3. Flujo de Trabajo Detallado

#### Fase 1: Registro de Plantillas
```typescript
// src/templates/templates.ts
export type Template = {
  id: string;
  name: string;
  Component: React.FC<any>;
  styles: string;    // CSS como string
  script: string;    // JavaScript como string
};
```

**Concepto Técnico**: **Template Registry Pattern**
- Centraliza la definición de plantillas disponibles
- Separa la lógica de presentación de la lógica de exportación
- Permite extensibilidad sin modificar el núcleo de la aplicación

#### Fase 2: Renderizado en Tiempo Real
```typescript
// src/App.tsx - Lógica de Preview
const TemplateComponent = selectedTemplate.Component;
return (
  <TemplateComponent 
    images={demoImages} 
    // Props específicas por template
  />
);
```

**Concepto Técnico**: **Dynamic Component Rendering**
- Renderizado dinámico basado en selección del usuario
- Props condicionales según el tipo de template
- Inyección de estilos CSS en tiempo real

#### Fase 3: Generación de ZIP con Imágenes Locales
```typescript
// src/utils/exporter.ts
export async function exportTemplateAsZIP(
  template: Template,
  data: ExportData
): Promise<Blob> {
  // Descarga imágenes externas y las incluye localmente
  // Genera ZIP con estructura Google Ads/DV360
}
```

**Concepto Técnico**: **Template-to-ZIP Transformation with Local Assets**
- Conversión de componentes React a archivos ZIP
- Descarga automática de imágenes externas
- Estructura compatible con Google Ads/DV360

### 4. Conceptos Técnicos Clave

#### A. Descarga Automática de Imágenes
```typescript
async function downloadImage(url: string): Promise<Blob> {
  const response = await fetch(url);
  return await response.blob();
}

async function processImagesAndUpdateHTML(
  html: string,
  images: string[]
): Promise<{ updatedHtml: string; imageFiles: { name: string; blob: Blob }[] }> {
  // Descarga imágenes y actualiza rutas en HTML
}
```

**Ventajas**:
- Elimina dependencias externas
- Cumple con requisitos de Google Ads
- Mantiene funcionalidad completa

#### B. Click Tag Implementado Correctamente
```html
<!-- Implementación estándar de Google Ads -->
<a href="#" class="buy-now-btn" onclick="window.open(window.clickTag); return false;">
  Buy Now
</a>
```

**Características**:
- Solo activo en el botón "Buy Now"
- Implementación estándar de Google Ads
- Prevención de comportamiento por defecto

#### C. Meta Tag de Dimensiones
```html
<meta name="ad.size" content="width=300,height=250">
```

**Beneficios**:
- Tamaño estándar soportado por Google Ads
- Evita errores de "Unsupported creative size"
- Compatibilidad total con validador

#### D. ZIP Generation con JSZip
```typescript
import JSZip from "jszip";

export async function exportTemplateAsZIP(
  template: Template,
  data: ExportData
): Promise<Blob> {
  const zip = new JSZip();
  
  // Agregar archivos al ZIP
  zip.file("index.html", structure.html);
  
  // Incluir imágenes descargadas
  for (const imageFile of imageFiles) {
    zip.file(imageFile.name, imageFile.blob);
  }
  
  return await zip.generateAsync({ type: "blob" });
}
```

**Características**:
- Generación de archivos ZIP en el navegador
- Estructura de archivos optimizada
- Compatible con Google Ads/DV360

### 5. Estructura de Datos

#### Template Interface
```typescript
interface Template {
  id: string;           // Identificador único
  name: string;         // Nombre para UI
  Component: React.FC;  // Componente React
  styles: string;       // CSS como string
  script: string;       // JS como string
}
```

#### Export Data Interface
```typescript
type ExportData = {
  images?: string[];        // Para carruseles
  beforeImage?: string;     // Para before/after
  afterImage?: string;      // Para before/after
};
```

#### Google Ads Structure
```typescript
interface GoogleAdsStructure {
  html: string;        // HTML principal con meta tag ad.size
  css: string;         // Estilos CSS inline
  js: string;          // JavaScript inline
  images?: string[];   // URLs de imágenes (se descargan)
}
```

### 6. Proceso de Exportación

#### Paso 1: Validación de Datos
```typescript
if (!data.beforeImage || !data.afterImage) {
  throw new Error("BeforeAfter template requiere beforeImage y afterImage");
}
```

#### Paso 2: Generación de Estructura
```typescript
const structure = await generateGoogleAdsStructure(template, data);
// Separa HTML, CSS y JS en archivos independientes
// Incluye meta tag ad.size
```

#### Paso 3: Descarga de Imágenes
```typescript
const { updatedHtml, imageFiles } = await processImagesAndUpdateHTML(
  html,
  allImages
);
// Descarga imágenes externas y actualiza rutas
```

#### Paso 4: Creación de ZIP
```typescript
const zip = new JSZip();
zip.file("index.html", structure.html);
// Agregar todas las imágenes descargadas
for (const imageFile of imageFiles) {
  zip.file(imageFile.name, imageFile.blob);
}
```

### 7. Plantillas Disponibles

#### BeforeAfter Slider
- **Funcionalidad**: Comparación antes/después con slider interactivo
- **Imágenes**: 2 imágenes (before/after)
- **Interactividad**: Slider arrastrable
- **Click tag**: Solo en botón "Buy Now"

#### Carousel A
- **Funcionalidad**: Carrusel con navegación por flechas
- **Imágenes**: Múltiples imágenes
- **Interactividad**: Botones de navegación
- **Click tag**: Solo en botón "Buy Now"

#### Carousel B
- **Funcionalidad**: Carrusel con miniaturas
- **Imágenes**: Múltiples imágenes con thumbnails
- **Interactividad**: Navegación por miniaturas
- **Click tag**: Solo en botón "Buy Now"

### 8. Compatibilidad con Google Ads

#### ✅ Requisitos Cumplidos
- **Archivo principal**: `index.html` en la raíz del ZIP
- **Meta tag ad.size**: Dimensiones estándar (300x250)
- **Click tag válido**: Solo en el botón "Buy Now"
- **Sin recursos externos**: Todas las imágenes incluidas localmente
- **CSS y JS inline**: Sin referencias externas
- **Estructura HTML válida**: DOCTYPE, html, head, body

#### ✅ Validación Exitosa
- **Missing primary asset check**: ✅ Resuelto
- **Unsupported creative size**: ✅ Resuelto (300x250)
- **Click tag tracking**: ✅ Solo en botón
- **External resources**: ✅ Todas las imágenes locales

### 9. Uso del Sistema

#### Instalación
```bash
npm install
npm run dev
```

#### Exportación
1. Selecciona un template en la aplicación
2. Haz clic en "Exportar Template ZIP"
3. El ZIP descargado contendrá:
   - `index.html` con rutas locales a imágenes
   - Todas las imágenes incluidas localmente
   - Estructura compatible con Google Ads

#### Pruebas
```javascript
// En la consola del navegador
window.testGoogleAdsCompatibility()
window.generateGoogleAdsTestZIP()
```

### 10. Solución de Problemas

#### Error: "Missing primary asset check"
- ✅ **Solución**: Meta tag ad.size agregado
- ✅ **Verificación**: index.html en la raíz del ZIP

#### Error: "Unsupported creative size"
- ✅ **Solución**: Cambiado a 300x250 (estándar)
- ✅ **Verificación**: Meta tag correcto

#### Error: Click tag en todo el banner
- ✅ **Solución**: Click tag solo en botón "Buy Now"
- ✅ **Verificación**: No hay handlers globales

#### Error: Recursos externos
- ✅ **Solución**: Descarga automática de imágenes
- ✅ **Verificación**: Todas las imágenes locales

### 11. Archivos del Proyecto

```
export-template-process/
├── src/
│   ├── templates/
│   │   ├── BeforeAfterSlider.tsx    # Slider antes/después
│   │   ├── CarouselA.tsx           # Carrusel con flechas
│   │   ├── CarouselB.tsx           # Carrusel con miniaturas
│   │   └── templates.ts             # Registro de plantillas
│   ├── utils/
│   │   ├── exporter.ts              # Exportador principal
│   │   ├── test-export.ts          # Funciones de prueba
│   │   └── test-exporter.ts        # Pruebas adicionales
│   ├── App.tsx                     # Aplicación principal
│   └── index.tsx                   # Punto de entrada
├── README.md                       # Esta documentación
├── TESTING.md                      # Guía de pruebas
└── package.json                    # Dependencias
```

### 12. Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Implementa los cambios
4. Asegúrate de que pasa las pruebas de Google Ads
5. Envía un pull request

### 13. Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

---

## 🎯 Resumen de Mejoras Implementadas

### ✅ **Descarga Automática de Imágenes**
- Convierte URLs externas a archivos locales
- Incluye todas las imágenes en el ZIP
- Cumple con requisitos de Google Ads

### ✅ **Click Tag Corregido**
- Implementación estándar de Google Ads
- Solo activo en el botón "Buy Now"
- Prevención de comportamiento por defecto

### ✅ **Meta Tag de Dimensiones**
- Tamaño estándar 300x250
- Evita errores de validación
- Compatibilidad total

### ✅ **Estructura ZIP Optimizada**
- Archivo principal index.html
- Imágenes locales incluidas
- Sin referencias externas

El sistema ahora es **100% compatible con Google Ads y Display & Video 360**. 