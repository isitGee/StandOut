import { useCallback, useState } from "react";

export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, kind = "success") => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(t => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);
  const dismiss = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);
  return { toasts, push, dismiss };
}

export function Toasts({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.kind}`}>
          <span style={{ flex: 1 }}>{t.msg}</span>
          {onDismiss && (
            <button className="btn btn-ghost btn-small" onClick={() => onDismiss(t.id)} aria-label="Dismiss">×</button>
          )}
        </div>
      ))}
    </div>
  );
}
