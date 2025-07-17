# Guía de Pruebas - Sistema de Exportación

## 🧪 Cómo Probar el Sistema

### 1. Acceder a la Aplicación
- Abre http://localhost:5175/ en tu navegador
- La aplicación debería cargar correctamente

### 2. Probar desde la Consola del Navegador
Una vez que la app esté cargada, abre las herramientas de desarrollador (F12) y ejecuta:

```javascript
// Probar exportación completa
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

#### ❌ Problemas comunes:
- **CSS no se aplica**: Verificar que los estilos están en `<style>` tags
- **JS no funciona**: Verificar que el script está en `<script>` tags
- **Referencias externas**: El HTML no debería referenciar archivos externos
- **Botón Buy Now no aparece**: Verificar que está incluido en el HTML

### 4. Probar Exportación ZIP

1. En la aplicación, selecciona un template
2. Agrega imágenes de prueba
3. Haz clic en "Exportar como ZIP"
4. Descarga y extrae el ZIP
5. Abre `index.html` en el navegador
6. Verifica que todo funciona correctamente

### 5. Archivos de Prueba

#### test-export.html
- Archivo de prueba independiente
- Contiene un carrusel funcional
- Verifica que CSS y JS se aplican correctamente

#### Funciones de Debug Disponibles:
- `window.testExport()` - Prueba completa
- `window.debugHTML()` - Debug detallado
- `window.createHTMLPreview()` - Preview HTML
- `window.testAllTemplates()` - Prueba todos los templates
- `window.testGoogleAdsCompatibility()` - Prueba compatibilidad Google Ads
- `window.generateGoogleAdsTestZIP()` - Generar ZIP para Google Ads

### 6. Verificaciones Automáticas

El sistema verifica automáticamente:
- ✅ HTML válido con DOCTYPE
- ✅ CSS inline presente
- ✅ JS inline presente
- ✅ Sin referencias externas
- ✅ Estructura correcta
- ✅ Funciones JavaScript presentes
- ✅ Clases CSS correctas
- ✅ Botón Buy Now presente
- ✅ ClickTag presente
- ✅ Texto "Buy Now" presente

### 7. Solución de Problemas

#### Si el CSS no se aplica:
1. Verificar que los estilos están en `<style>` tags
2. Verificar que las clases CSS coinciden
3. Verificar que no hay conflictos de CSS

#### Si el JS no funciona:
1. Verificar que el script está en `<script>` tags
2. Verificar que las funciones están definidas
3. Verificar que los IDs y clases coinciden

#### Si las imágenes no cargan:
1. Verificar que las URLs son accesibles
2. Verificar que las URLs están correctamente escapadas
3. Probar con URLs de prueba como Picsum

#### Si el botón Buy Now no aparece:
1. Verificar que está incluido en el HTML generado
2. Verificar que tiene la clase `buy-now-btn`
3. Verificar que tiene el `href="javascript:window.open(window.clickTag)"`

### 8. Resultados Esperados

Al ejecutar `window.testExport()`, deberías ver:
```
🧪 Probando exportación...
✅ HTML generado: true
✅ CSS inline: true
✅ JS inline: true
✅ Sin referencias externas: true
✅ Estructura HTML válida: true
✅ Clase carouselA presente: true
✅ Contenedor slides presente: true
✅ Función moverA presente: true
✅ Botón Buy Now presente: true
✅ ClickTag presente: true
✅ Texto 'Buy Now' presente: true
✅ ZIP generado: true
✅ URL del ZIP: blob:http://localhost:5175/...
```

### 9. Compatibilidad

El sistema está optimizado para:
- Google Ads
- DV360 (Display & Video 360)
- Navegadores modernos
- Servidores web estáticos
- Políticas de seguridad de Google Ads

## 🔧 Cambios Específicos para Google Ads

### Problema Resuelto: "Zip file contents check"

**Problema**: El validador de Google Ads rechazaba los ZIPs por contenido incorrecto.

**Solución Implementada**:

1. **Estructura ZIP Simplificada**:
   - ❌ **Antes**: ZIP contenía múltiples archivos (`index.html`, `styles.css`, `script.js`, `README.md`, `config.json`)
   - ✅ **Ahora**: ZIP contiene solo `index.html` con CSS y JS integrados

2. **Configuración de Compresión**:
   - ✅ Compresión DEFLATE nivel 6
   - ✅ Optimizado específicamente para Google Ads

3. **Funciones de Prueba Específicas**:
   ```javascript
   // Ejecutar para verificar compatibilidad
   window.testGoogleAdsCompatibility()
   ```

### Funciones Específicas para Google Ads

#### `window.testGoogleAdsCompatibility()`
Verifica que el ZIP cumple con las especificaciones de Google Ads:
- ✅ Solo contiene `index.html`
- ✅ Tamaño optimizado
- ✅ CSS y JS inline
- ✅ Sin referencias externas
- ✅ Botón Buy Now presente
- ✅ ClickTag presente

#### `window.generateGoogleAdsTestZIP()`
Genera un ZIP de prueba listo para subir al validador:
- ✅ Descarga automática del archivo
- ✅ Nombre: `google-ads-test.zip`
- ✅ Listo para subir a https://h5validator.appspot.com/dcm/asset

### Estructura del ZIP para Google Ads

```
google-ads-test.zip
└── index.html (con CSS y JS integrados)
```

**Antes (❌ Rechazado)**:
```
template.zip
├── index.html
├── styles.css
├── script.js
├── README.md
└── config.json
```

**Ahora (✅ Aceptado)**:
```
template.zip
└── index.html (todo integrado)
```

### Verificación en el Validador

1. Ejecuta `window.generateGoogleAdsTestZIP()`
2. Descarga el archivo `google-ads-test.zip`
3. Sube a https://h5validator.appspot.com/dcm/asset
4. Verifica que pasa todas las pruebas

### Resultados Esperados en el Validador

- ✅ **Zip file contents check**: PASS
- ✅ **HTML validation**: PASS
- ✅ **CSS validation**: PASS
- ✅ **JavaScript validation**: PASS
- ✅ **Asset size**: PASS
- ✅ **Compatibility**: PASS

## 🛒 Botón "Buy Now" para Google Ads

### Especificaciones del Botón

#### Posicionamiento:
- ✅ **Posición**: Absoluta
- ✅ **Ubicación**: Parte inferior centrada
- ✅ **Margen**: 20px desde el borde inferior
- ✅ **Centrado**: `left: 50%; transform: translateX(-50%)`

#### Estilo:
- ✅ **Color de fondo**: #007bff (azul)
- ✅ **Color de texto**: Blanco
- ✅ **Bordes**: Redondeados (25px)
- ✅ **Padding**: 12px 24px
- ✅ **Fuente**: 16px, bold
- ✅ **Sombra**: Efecto de elevación
- ✅ **Transiciones**: Suaves en hover y active

#### Funcionalidad:
- ✅ **ClickTag**: `href="javascript:window.open(window.clickTag)"`
- ✅ **Target**: `target="_blank"`
- ✅ **Z-index**: 10-15 (por encima del contenido)
- ✅ **Hover**: Escala 1.05x y cambio de color
- ✅ **Active**: Escala 0.95x

### Código del Botón

```html
<a href="javascript:window.open(window.clickTag)" class="buy-now-btn" target="_blank">
  Buy Now
</a>
```

### CSS del Botón

```css
.buy-now-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.buy-now-btn:hover {
  background: #0056b3;
  transform: translateX(-50%) scale(1.05);
  box-shadow: 0 6px 12px rgba(0,0,0,0.4);
}

.buy-now-btn:active {
  transform: translateX(-50%) scale(0.95);
}
```

### Verificaciones del Botón

Al ejecutar las pruebas, verifica que:
- ✅ El botón aparece en todas las templates
- ✅ Está posicionado correctamente
- ✅ Tiene el clickTag implementado
- ✅ Los estilos se aplican correctamente
- ✅ Las transiciones funcionan
- ✅ Es clickeable y funcional

### Templates con Botón Buy Now

1. **Carousel A**: Botón sobre el carrusel
2. **Carousel B**: Botón sobre el contenedor principal
3. **Before/After Slider**: Botón sobre el slider

Todos los templates incluyen el botón con las mismas especificaciones para consistencia en Google Ads. 