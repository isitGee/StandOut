import { TemplateRenderer } from "../templates/CVTemplates.jsx";
import { IconDownload } from "../Icons.jsx";
import { useRef, useState } from "react";

export function Preview({ cv, onDownload }) {
  const ref = useRef(null);
  const [zoom, setZoom] = useState(1);

  const handlePrint = () => {
    if (onDownload) onDownload();
    // rely on @media print rules in print.css — keep it simple, selectable text, crisp
    window.print();
  };

  return (
    <div style={{ display:"grid", gap:"0.75rem" }}>
      <div className="preview-toolbar">
        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
          <strong style={{ fontSize:"0.92rem" }}>Live preview</strong>
          <span className="tag">A4</span>
        </div>
        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
          <div className="zoom-controls" role="toolbar" aria-label="Zoom">
            <button className="btn btn-secondary btn-small" onClick={()=> setZoom(z=> Math.max(0.6, z-0.1))} aria-label="Zoom out">−</button>
            <span className="small muted" style={{ minWidth:36, textAlign:"center" }}>{Math.round(zoom*100)}%</span>
            <button className="btn btn-secondary btn-small" onClick={()=> setZoom(z=> Math.min(1.2, z+0.1))} aria-label="Zoom in">+</button>
          </div>
          <button className="btn btn-primary btn-small" onClick={handlePrint}>
            <IconDownload /> Download PDF
          </button>
        </div>
      </div>

      <div className="preview-paper-wrap" style={{ transform: `scale(${zoom})`, transformOrigin:"top center" }}>
        <div className="cv-paper" ref={ref} id="cv-print-root">
          <TemplateRenderer cv={cv} />
        </div>
      </div>

      <p className="field-hint" style={{ textAlign:"center" }}>
        Preview mirrors the final PDF. Use <strong>Download PDF</strong> and choose “Save as PDF” in the print dialog for a selectable-text A4 file.
      </p>
    </div>
  );
}
