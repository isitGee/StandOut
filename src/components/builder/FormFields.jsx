export function Field({ label, hint, error, children, htmlFor, optional }) {
  return (
    <div className="field">
      {label && (
        <label className="field-label" htmlFor={htmlFor}>
          {label} {optional && <span>— optional</span>}
        </label>
      )}
      {children}
      {hint && !error && <div className="field-hint" id={htmlFor ? `${htmlFor}-hint` : undefined}>{hint}</div>}
      {error && <div className="field-error" role="alert">⚠ {error}</div>}
    </div>
  );
}

export function TextInput(props) {
  return <input className="input" {...props} />;
}
export function TextArea(props) {
  return <textarea className="textarea" {...props} />;
}
export function Select(props) {
  return <select className="select" {...props} />;
}
