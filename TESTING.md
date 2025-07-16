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

#### ❌ Problemas comunes:
- **CSS no se aplica**: Verificar que los estilos están en `<style>` tags
- **JS no funciona**: Verificar que el script está en `<script>` tags
- **Referencias externas**: El HTML no debería referenciar archivos externos

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

### 6. Verificaciones Automáticas

El sistema verifica automáticamente:
- ✅ HTML válido con DOCTYPE
- ✅ CSS inline presente
- ✅ JS inline presente
- ✅ Sin referencias externas
- ✅ Estructura correcta
- ✅ Funciones JavaScript presentes
- ✅ Clases CSS correctas

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