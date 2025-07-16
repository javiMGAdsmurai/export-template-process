import React, { useState } from "react";
import { templates, Template } from "./templates/templates";
import { exportTemplateAsZIP, downloadZIP } from "./utils/exporter";
import "./utils/test-export"; // Importar funciones de prueba
import "./styles.css"; // Importar estilos

const demoImages = [
  "https://picsum.photos/id/1015/600/400",
  "https://picsum.photos/id/1018/600/400",
];

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    templates[0]
  );
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Exportar como ZIP para Google Ads/DV360
      let data;
      if (selectedTemplate.id === "beforeAfter") {
        data = {
          beforeImage: demoImages[0],
          afterImage: demoImages[1],
        };
      } else {
        data = { images: demoImages };
      }
      
      const zipBlob = await exportTemplateAsZIP(selectedTemplate, data);
      downloadZIP(selectedTemplate.name, zipBlob);
    } catch (error) {
      console.error("Error al exportar:", error);
      alert("Error al exportar el template. Revisa la consola para más detalles.");
    } finally {
      setIsExporting(false);
    }
  };

  const TemplateComponent = selectedTemplate.Component;

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Google Ads/DV360 Template Exporter</h1>
        <p className="app-subtitle">Generador de plantillas HTML interactivas para Google Ads y Display & Video 360</p>
      </div>
      
      <div className="controls-section">
        <div className="control-group">
          <label htmlFor="template-select" className="control-label">
            Seleccionar Plantilla:
          </label>
          <select
            id="template-select"
            className="control-select"
            value={selectedTemplate.id}
            onChange={(e) => {
              const t = templates.find((t) => t.id === e.target.value);
              if (t) setSelectedTemplate(t);
            }}
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="preview-section">
        <h2 className="preview-title">Vista Previa</h2>
        {selectedTemplate.id === "beforeAfter" ? (
          <TemplateComponent
            beforeImage={demoImages[0]}
            afterImage={demoImages[1]}
          />
        ) : (
          <TemplateComponent images={demoImages} />
        )}
      </div>

      <div className="export-section">
        <button 
          className="export-button"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? "Exportando..." : "Exportar Template ZIP"}
        </button>
        
        <div className="info-card">
          <h3 className="info-card-title">Compatibilidad Google Ads/DV360</h3>
          <ul className="info-card-list">
            <li>Archivos separados (HTML, CSS, JS)</li>
            <li>Estructura compatible con Google Ads</li>
            <li>Incluye README y configuración</li>
            <li>Listo para subir a servidores web</li>
            <li>Optimizado para Display & Video 360</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
