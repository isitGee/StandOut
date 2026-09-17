import { TemplateRenderer } from "../templates/CVTemplates.jsx";
import { IconDownload, IconEye } from "../Icons.jsx";
import { useRef, useState, useEffect } from "react";

export function Preview({ cv, onDownload }) {
  const ref = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Estimate pages based on content height vs A4 height (1123px at 96dpi)
    const h = el.scrollHeight;
    const p = Math.max(1, Math.ceil(h / 1123));
    setPages(p);
  }, [cv]);

  const handlePrint = () => {
    if (onDownload) onDownload();
    window.print();
  };

  return (
    <div style={{ display:"grid", gap:"0.75rem" }}>
      <div className="preview-toolbar">
        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
          <strong style={{ fontSize:"0.92rem", display:"inline-flex", gap:"0.4rem", alignItems:"center"}}><IconEye style={{width:14,height:14, color:"var(--brand)"}}/> Live preview</strong>
          <span className="tag">A4 · {pages} page{pages>1? "s":""}</span>
          <span className="tag" style={{background:"var(--surface)", color:"var(--text-2)"}}>{cv.design.templateId}</span>
        </div>
        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
          <div className="zoom-controls" role="toolbar" aria-label="Zoom">
            <button className="btn btn-secondary btn-small" onClick={()=> setZoom(z=> Math.max(0.6, z-0.1))} aria-label="Zoom out">−</button>
            <span className="small muted" style={{ minWidth:36, textAlign:"center" }}>{Math.round(zoom*100)}%</span>
            <button className="btn btn-secondary btn-small" onClick={()=> setZoom(z=> Math.min(1.4, z+0.1))} aria-label="Zoom in">+</button>
          </div>
          <button className="btn btn-primary btn-small" onClick={handlePrint}>
            <IconDownload style={{width:14,height:14}}/> Download PDF
          </button>
        </div>
      </div>

      <div className="preview-paper-wrap">
        <div className="preview-paper-inner" style={{ transform: `scale(${zoom})`, transformOrigin:"top center" }}>
          <div className="cv-paper" ref={ref} id="cv-print-root">
            <TemplateRenderer cv={cv} />
          </div>
          {pages > 1 && <div className="page-indicator">Page 1 of {pages} · content flows automatically to A4 pages</div>}
        </div>
      </div>

      <p className="field-hint" style={{ textAlign:"center" }}>
        Preview mirrors the final PDF — selectable text, real A4 proportions, page separation with shadow. Use <strong>Download PDF</strong> and choose “Save as PDF” for your file.
      </p>
    </div>
  );
}
