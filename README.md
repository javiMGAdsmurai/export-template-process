# Google Ads/DV360 Template Exporter

## Descripción

Este proyecto es un **generador especializado de plantillas HTML interactivas** para Google Ads y Display & Video 360 (DV360). El sistema convierte componentes React en paquetes ZIP con estructura optimizada para plataformas publicitarias de Google.

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

- **Estructura de archivos separados**: HTML, CSS, JS independientes
- **Compatibilidad**: Google Ads, DV360, servidores web estáticos
- **Archivos incluidos**:
  - `index.html`: Archivo principal
  - `styles.css`: Estilos CSS
  - `script.js`: JavaScript funcional
  - `README.md`: Instrucciones de uso
  - `config.json`: Configuración del template

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

#### Fase 3: Generación de ZIP
```typescript
// src/utils/exporter.ts
export async function exportTemplateAsZIP(
  template: Template,
  data: ExportData
): Promise<Blob> {
  // Genera ZIP con estructura Google Ads/DV360
}
```

**Concepto Técnico**: **Template-to-ZIP Transformation**
- Conversión de componentes React a archivos ZIP
- Separación de archivos para optimización
- Estructura compatible con Google Ads/DV360

### 4. Conceptos Técnicos Clave

#### A. CSS-in-JS para Exportación
```typescript
export const carouselAStyles = `
  .carrusel-container {
    position: relative;
    width: 600px;
    margin: auto;
    overflow: hidden;
  }
  // ... más estilos
`;
```

**Ventajas**:
- Estilos encapsulados por componente
- Fácil exportación como string
- No requiere bundling de CSS

#### B. JavaScript Autocontenido
```typescript
export const carouselAScript = `
  let index = 0;
  function moverA(dir) {
    // Lógica de navegación
  }
  window.onload = () => moverA(0);
`;
```

**Características**:
- JavaScript vanilla (sin dependencias)
- Autoejecutable al cargar la página
- Compatible con cualquier servidor web

#### C. ZIP Generation con JSZip
```typescript
import JSZip from "jszip";

export async function exportTemplateAsZIP(
  template: Template,
  data: ExportData
): Promise<Blob> {
  const zip = new JSZip();
  
  // Agregar archivos al ZIP
  zip.file("index.html", structure.html);
  zip.file("styles.css", structure.css);
  zip.file("script.js", structure.js);
  
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
  html: string;        // HTML principal
  css: string;         // Estilos CSS
  js: string;          // JavaScript
  images?: string[];   // URLs de imágenes
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
const structure = generateGoogleAdsStructure(template, data);
// Separa HTML, CSS y JS en archivos independientes
```

#### Paso 3: Creación de ZIP
```typescript
const zip = new JSZip();
zip.file("index.html", structure.html);
zip.file("styles.css", structure.css);
zip.file("script.js", structure.js);
zip.file("README.md", readmeContent);
zip.file("config.json", configContent);
```

#### Paso 4: Descarga Automática
```typescript
export function downloadZIP(filename: string, blob: Blob) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.zip`;
  link.click();
  URL.revokeObjectURL(link.href);
}
```

### 7. Estructura de Archivos ZIP

```
template-name.zip
├── index.html          # Archivo principal HTML
├── styles.css          # Estilos CSS
├── script.js           # JavaScript funcional
├── README.md           # Instrucciones de uso
└── config.json         # Configuración del template
```

### 8. Compatibilidad con Google Ads/DV360

#### ✅ **Requisitos Cumplidos**
- **Archivos separados**: HTML, CSS, JS independientes
- **Sin dependencias externas**: Todo autocontenido
- **JavaScript vanilla**: Sin frameworks externos
- **CSS inline/externo**: Compatible con políticas de seguridad
- **Estructura estándar**: Fácil integración en plataformas

#### ✅ **Optimizaciones**
- **Carga optimizada**: CSS y JS separados para mejor rendimiento
- **Caché eficiente**: Archivos independientes permiten mejor caché
- **Debugging fácil**: Archivos separados facilitan debugging
- **Mantenimiento**: Estructura clara para actualizaciones

### 9. Ventajas del Sistema

#### ✅ **Especialización**
- Enfocado únicamente en Google Ads/DV360
- Optimizaciones específicas para plataformas publicitarias
- Estructura de archivos estandarizada

#### ✅ **Portabilidad**
- ZIP contiene todos los archivos necesarios
- CSS y JavaScript separados para optimización
- Fácil de compartir y distribuir

#### ✅ **Extensibilidad**
- Fácil agregar nuevos templates
- Patrón consistente para todos los componentes
- Separación clara de responsabilidades

#### ✅ **Interactividad**
- Mantiene funcionalidad JavaScript
- Eventos de mouse y touch
- Animaciones CSS preservadas

#### ✅ **Compatibilidad Google Ads**
- Estructura de archivos optimizada
- Sin dependencias externas
- Cumple políticas de seguridad
- Listo para producción

### 10. Casos de Uso

1. **Google Ads Campaigns**: Crear banners interactivos para campañas publicitarias
2. **DV360 Display Ads**: Generar creativos para Display & Video 360
3. **Rich Media Ads**: Desarrollar anuncios interactivos avanzados
4. **A/B Testing**: Crear variaciones de creativos para testing
5. **Campaign Optimization**: Generar creativos optimizados para diferentes audiencias

### 11. Tecnologías Utilizadas

- **React 18**: Framework de UI
- **TypeScript**: Tipado estático
- **Vite**: Build tool y dev server
- **JSZip**: Generación de archivos ZIP
- **CSS Variables**: Sistema de colores moderno
- **Blob API**: Generación de archivos

### 12. Estructura del Proyecto

```
src/
├── App.tsx              # Componente principal
├── styles.css           # Sistema de colores y estilos
├── templates/
│   ├── templates.ts     # Registro de plantillas
│   ├── BeforeAfterSlider.tsx
│   ├── CarouselA.tsx
│   └── CarouselB.tsx
└── utils/
    ├── exporter.ts      # Lógica de exportación ZIP
    └── test-exporter.ts # Funciones de prueba
```

### 13. Testing de Funcionalidad

#### Pruebas de Exportación ZIP
1. **Estructura de archivos**: Verificar que el ZIP contiene todos los archivos necesarios
2. **Compatibilidad Google Ads**: Probar en entorno de Google Ads
3. **Funcionalidad JavaScript**: Verificar que el JS funciona correctamente
4. **Estilos CSS**: Confirmar que los estilos se aplican correctamente
5. **Imágenes**: Verificar que las imágenes se cargan desde URLs externas

### 14. Comandos de Prueba

#### Ejecutar Pruebas Automáticas
```bash
# En la consola del navegador
window.testExporter.runAllTests()
```

#### Verificar Compatibilidad
```bash
# En la consola del navegador
window.testExporter.testGoogleAdsCompatibility()
```

Este sistema proporciona una solución especializada para crear componentes HTML interactivos optimizados para Google Ads y Display & Video 360, manteniendo toda la funcionalidad original en un formato ZIP listo para producción. 