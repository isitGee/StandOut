import { useState } from "react";
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
              <span style={{ width: 8, height: 8, borderRadius: 999, background: checked ? "#fff" : "var(--border-strong)", display: "block" }} />
            </span>
            <span style={{ flex: 1 }}>
              <h4>{opt.label}</h4>
              <p>{opt.desc}</p>
            </span>
            {checked && <span aria-hidden style={{ color: "var(--brand)", fontWeight: 800 }}>✓</span>}
          </button>
        );
      })}
    </div>
  );
}

export function GoalStep({ cv, updateTarget, onRecommend, mode: initialMode }) {
  const t = cv.target;
  const [guidedView, setGuidedView] = useState(initialMode === "guided");
  const [currentQ, setCurrentQ] = useState(0);

  const questions = [
    {
      title: "1. What will you use this CV for?",
      hint: "Pick the closest match. If you’re unsure, choose “I’m not sure yet” — we’ll keep it versatile.",
      component: <ChoiceGrid name="Purpose" value={t.purpose} onChange={v => updateTarget({ purpose: v })} options={purposes} />
    },
    {
      title: "2. What kind of field or industry are you targeting?",
      hint: "This helps order sections — for example, putting publications higher for academia, or projects higher for tech.",
      component: <ChoiceGrid name="Industry" value={t.industry} onChange={v => updateTarget({ industry: v })} options={industries} cols={2} />
    },
    {
      title: "3. What best describes your experience level?",
      hint: "Students aren't expected to have long work history; we emphasize education and projects instead.",
      component: <ChoiceGrid name="Experience" value={t.experienceLevel} onChange={v => updateTarget({ experienceLevel: v })} options={experienceLevels} />
    },
    {
      title: "4. How will you submit this CV?",
      hint: "Online portals may use screening software (ATS). Email or portfolio submissions allow more visual polish.",
      component: <ChoiceGrid name="Submission" value={t.submissionType} onChange={v => updateTarget({ submissionType: v })} options={submissionTypes} />
    },
    {
      title: "5. What style do you prefer?",
      hint: "You can change templates at any point later without re-typing any data.",
      component: <ChoiceGrid name="Style" value={t.stylePreference} onChange={v => updateTarget({ stylePreference: v })} options={stylePreferences} />
    }
  ];

  return (
    <div style={{ display: "grid", gap: "1.4rem" }}>
      {/* Mode toggle */}
      <div style={{ display: "flex", gap: "0.5rem", background: "var(--surface-2)", padding: "4px", borderRadius: "var(--radius-md)" }}>
        <button
          type="button"
          onClick={() => setGuidedView(false)}
          className="btn btn-small"
          style={{
            flex: 1,
            background: !guidedView ? "var(--surface)" : "transparent",
            color: !guidedView ? "var(--text)" : "var(--text-2)",
            boxShadow: !guidedView ? "var(--shadow-sm)" : "none",
            border: "none",
            fontWeight: 600
          }}
        >
          Quick setup (all fields)
        </button>
        <button
          type="button"
          onClick={() => setGuidedView(true)}
          className="btn btn-small"
          style={{
            flex: 1,
            background: guidedView ? "var(--surface)" : "transparent",
            color: guidedView ? "var(--brand)" : "var(--text-2)",
            boxShadow: guidedView ? "var(--shadow-sm)" : "none",
            border: "none",
            fontWeight: 600
          }}
        >
          Guided 5-question intake
        </button>
      </div>

      {guidedView ? (
        /* Guided Step-by-Step Flow */
        <div style={{ display: "grid", gap: "1.2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow">
              <span className="eyebrow-dot">•</span> QUESTION {currentQ + 1} OF 5
            </span>
            <span className="small muted">Step {currentQ + 1} / 5</span>
          </div>

          <div className="progress" style={{ height: "4px" }}>
            <div className="progress-bar" style={{ width: `${((currentQ + 1) / 5) * 100}%` }} />
          </div>

          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{questions[currentQ].title}</h3>
            <p className="field-hint" style={{ marginTop: "0.3rem" }}>{questions[currentQ].hint}</p>
            <div style={{ marginTop: "1rem" }}>
              {questions[currentQ].component}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              className="btn btn-secondary btn-small"
              onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
              disabled={currentQ === 0}
              type="button"
            >
              Previous question
            </button>

            {currentQ < 4 ? (
              <button
                className="btn btn-primary btn-small"
                onClick={() => setCurrentQ(q => Math.min(4, q + 1))}
                type="button"
              >
                Next question <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <button
                className="btn btn-primary btn-small"
                onClick={() => {
                  if (onRecommend) onRecommend();
                }}
                type="button"
              >
                See recommended template <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quick Overview Flow */
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {questions.map((q, idx) => (
            <div key={idx}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{q.title}</h3>
              <p className="field-hint" style={{ marginTop: "0.25rem" }}>{q.hint}</p>
              <div style={{ marginTop: "0.75rem" }}>
                {q.component}
              </div>
            </div>
          ))}

          {onRecommend && (
            <button className="btn btn-primary" onClick={onRecommend} type="button">
              See my recommendation <span className="btn-arrow" aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      )}

      <div className="helper">
        <strong>Privacy promise:</strong> Your responses stay entirely in this browser. We use them to recommend the right structure, ordering, and template — you can change any of them at any time.
      </div>
    </div>
  );
}
