import { purposes, industries, experienceLevels, submissionTypes, stylePreferences } from "../../data/purposes.js";

function ChoiceGrid({ value, onChange, options, cols = 1, name }) {
  return (
    <div className={`choice-grid ${cols === 2 ? "cols-2" : ""}`} role="radiogroup" aria-label={name}>
      {options.map(opt => {
        const checked = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={checked}
            className="choice-card"
            onClick={() => onChange(opt.id)}
          >
            <span className="choice-icon" aria-hidden>
              {/* simple dot */}
              <span style={{ width: 8, height: 8, borderRadius: 999, background: checked ? "#fff" : "#94a3b8", display: "block" }} />
            </span>
            <span style={{ flex: 1 }}>
              <h4>{opt.label}</h4>
              <p>{opt.desc}</p>
            </span>
            {checked && <span aria-hidden style={{ color:"var(--brand)", fontWeight:800 }}>✓</span>}
          </button>
        );
      })}
    </div>
  );
}

export function GoalStep({ cv, updateTarget, onRecommend }) {
  const t = cv.target;

  return (
    <div style={{ display:"grid", gap:"1.4rem" }}>
      <div>
        <h3 style={{ fontSize:"1.05rem" }}>What will you use this CV for?</h3>
        <p className="field-hint">Pick the closest option. If you’re unsure, choose “I’m not sure yet” — we’ll keep it versatile.</p>
        <div style={{ marginTop:"0.75rem" }}>
          <ChoiceGrid name="Purpose" value={t.purpose} onChange={v=> updateTarget({ purpose: v })} options={purposes} />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize:"1.05rem" }}>What kind of field are you in?</h3>
        <p className="field-hint">This helps us order sections. Choose “Other” if you don’t see your field.</p>
        <div style={{ marginTop:"0.75rem" }}>
          <ChoiceGrid name="Industry" value={t.industry} onChange={v=> updateTarget({ industry: v })} options={industries} cols={2} />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize:"1.05rem" }}>What best describes your experience?</h3>
        <div style={{ marginTop:"0.75rem" }}>
          <ChoiceGrid name="Experience" value={t.experienceLevel} onChange={v=> updateTarget({ experienceLevel: v })} options={experienceLevels} />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize:"1.05rem" }}>How will you submit this CV?</h3>
        <p className="field-hint">Online portals sometimes use screening software. We’ll adapt the design.</p>
        <div style={{ marginTop:"0.75rem" }}>
          <ChoiceGrid name="Submission" value={t.submissionType} onChange={v=> updateTarget({ submissionType: v })} options={submissionTypes} />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize:"1.05rem" }}>Do you want your CV to be…</h3>
        <div style={{ marginTop:"0.75rem" }}>
          <ChoiceGrid name="Style" value={t.stylePreference} onChange={v=> updateTarget({ stylePreference: v })} options={stylePreferences} />
        </div>
      </div>

      <div className="helper">
        <strong>How we use this:</strong> Your answers never leave your browser. We use them to recommend a structure and template — you can change either any time. Nothing here is permanent.
      </div>

      {onRecommend && (
        <button className="btn btn-primary" onClick={onRecommend} type="button">
          See my recommendation
        </button>
      )}
    </div>
  );
}
