import React, { useState } from "react";
import { templates, Template } from "./templates/templates";
import { exportTemplateAsHTML, downloadHtml } from "./utils/exporter";

const demoImages = [
  "https://picsum.photos/id/1015/600/400",
  "https://picsum.photos/id/1018/600/400",
];

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    templates[0]
  );

  const handleExport = () => {
    let html = "";
    if (selectedTemplate.id === "beforeAfter") {
      html = exportTemplateAsHTML(selectedTemplate, {
        beforeImage: demoImages[0],
        afterImage: demoImages[1],
      });
    } else {
      html = exportTemplateAsHTML(selectedTemplate, { images: demoImages });
    }
    downloadHtml(selectedTemplate.name, html);
  };

  const TemplateComponent = selectedTemplate.Component;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Selector de Plantillas</h1>
      <select
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

      <div style={{ marginTop: "2rem" }}>
        {selectedTemplate.id === "beforeAfter" ? (
          <TemplateComponent
            beforeImage={demoImages[0]}
            afterImage={demoImages[1]}
          />
        ) : (
          <TemplateComponent images={demoImages} />
        )}
      </div>

      <button style={{ marginTop: "2rem" }} onClick={handleExport}>
        Exportar como HTML
      </button>
    </div>
  );
}
