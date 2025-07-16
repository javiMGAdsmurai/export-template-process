import type { Template } from "./templates";

type ExportData = {
  images?: string[];
  beforeImage?: string;
  afterImage?: string;
  // otros datos si quieres
};

export function exportTemplateAsHTML(
  template: Template,
  data: ExportData
): string {
  switch (template.id) {
    case "beforeAfter": {
      if (!data.beforeImage || !data.afterImage) {
        throw new Error(
          "BeforeAfter template requiere beforeImage y afterImage"
        );
      }
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${template.name}</title>
            <style>${template.styles}</style>
          </head>
          <body>
            <div class="before-after-container">
              <div class="before-img" style="background-image: url('${data.beforeImage}')"></div>
              <div class="after-img" style="background-image: url('${data.afterImage}')"></div>
              <div class="slider"><div class="slider-handle"></div></div>
            </div>
            <script>${template.script}</script>
          </body>
        </html>
      `;
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
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${template.name}</title>
            <style>${template.styles}</style>
          </head>
          <body>
            <div class="carouselA">
              ${slidesHtml}
            </div>
            <script>${template.script}</script>
          </body>
        </html>
      `;
    }
    // otros templates aquí
    default:
      throw new Error(`Template no soportado: ${template.id}`);
  }
}

export function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}
