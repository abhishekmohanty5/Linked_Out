import { useState } from "react";
import { EyeOff, Eye, Building2, Hash, AlertTriangle, Video, Image, FileText } from "lucide-react";
import "./PostComposer.css";

const MAX_CHARS = 500;
const PII_PATTERNS = [
  { re: /[\w.+-]+@[\w-]+\.\w{2,}/, label: "email addresses" },
  { re: /(\+?\d[\s.-]?){10,}/,      label: "phone numbers"   },
];
function detectPII(text) {
  return PII_PATTERNS.filter(({ re }) => re.test(text)).map(p => p.label);
}

export function PostComposer({ onSubmit }) {
  const [open, setOpen]             = useState(false);
  const [content, setContent]       = useState("");
  const [company, setCompany]       = useState("");
  const [topic, setTopic]           = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);

  const remaining   = MAX_CHARS - content.length;
  const piiWarnings = content.length > 10 ? detectPII(content) : [];
  const canSubmit   = content.trim().length > 0 && remaining >= 0 && piiWarnings.length === 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ content: content.trim(), company, topic, isAnonymous });
    setContent(""); setCompany(""); setTopic(""); setOpen(false);
  }

  return (
    <div className="composer-card">
      {/* Top: avatar + pill */}
      <div className="composer-top">
        <div className={`composer-avatar ${isAnonymous ? "anon" : ""}`}>
          {isAnonymous ? "👤" : "🧑"}
        </div>
        {!open ? (
          <button className="composer-pill" onClick={() => setOpen(true)}>
            Share a workplace experience…
          </button>
        ) : (
          <button className="composer-pill" style={{ color: "var(--text-3)" }} onClick={() => setOpen(false)}>
            Collapse
          </button>
        )}
      </div>

      {/* Expanded compose area */}
      {open && (
        <form className="composer-expand" onSubmit={handleSubmit}>
          {/* Anon toggle */}
          <div className="anon-row">
            <button
              type="button"
              className={`anon-btn ${isAnonymous ? "on" : "off"}`}
              onClick={() => setIsAnonymous(v => !v)}
            >
              {isAnonymous ? <EyeOff size={12} /> : <Eye size={12} />}
              {isAnonymous ? "Anonymous" : "Identified"}
            </button>
            <span className="anon-hint">
              {isAnonymous
                ? "A random workplace alias will represent you."
                : "Your name will appear on this post."}
            </span>
          </div>

          {/* PII warning */}
          {piiWarnings.length > 0 && (
            <div className="pii-warning">
              <AlertTriangle size={14} style={{ marginTop: 1, flexShrink: 0 }} />
              <span><strong>Privacy alert —</strong> possible {piiWarnings.join(", ")} detected. Remove before posting.</span>
            </div>
          )}

          {/* Textarea */}
          <textarea
            className="composer-textarea"
            placeholder="What workplace experience do you want to share?"
            value={content}
            onChange={e => setContent(e.target.value)}
            onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit(e); }}
            rows={4}
            autoFocus
          />

          {/* Tags */}
          <div className="composer-tags">
            <div className="tag-pill">
              <Building2 size={12} />
              <input className="tag-input" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
            </div>
            <div className="tag-pill">
              <Hash size={12} />
              <input className="tag-input" placeholder="Topic tag" value={topic} onChange={e => setTopic(e.target.value)} />
            </div>
          </div>

          {/* Toolbar */}
          <div className="composer-toolbar">
            <button type="button" className="toolbar-btn" disabled title="Video (coming soon)">
              <Video size={18} color="#70B5F9" /> Video
            </button>
            <button type="button" className="toolbar-btn" disabled title="Photo (coming soon)">
              <Image size={18} color="#5F9B41" /> Photo
            </button>
            <button type="button" className="toolbar-btn" disabled title="Write article (coming soon)">
              <FileText size={18} color="#E06847" /> Write article
            </button>

            <div className="toolbar-spacer" />

            <span className={`char-count ${remaining < 50 ? "warn" : ""} ${remaining < 0 ? "danger" : ""}`}>
              {remaining}
            </span>
            <button className="submit-btn" type="submit" disabled={!canSubmit}>Post</button>
          </div>
        </form>
      )}

      {/* Collapsed toolbar — always visible like LinkedIn */}
      {!open && (
        <div className="composer-toolbar">
          <button type="button" className="toolbar-btn" onClick={() => setOpen(true)}>
            <Video size={18} color="#70B5F9" /> Video
          </button>
          <button type="button" className="toolbar-btn" onClick={() => setOpen(true)}>
            <Image size={18} color="#5F9B41" /> Photo
          </button>
          <button type="button" className="toolbar-btn" onClick={() => setOpen(true)}>
            <FileText size={18} color="#E06847" /> Write article
          </button>
        </div>
      )}
    </div>
  );
}
