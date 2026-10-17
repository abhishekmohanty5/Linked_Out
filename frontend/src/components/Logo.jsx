import "./Logo.css";

export function Logo({ white = false, compact = false }) {
  return (
    <a href="/" className={`lo-logo-wrap ${white ? "white" : ""}`} aria-label="LinkedOut home">
      <div className="lo-mark">
        <span className="lo-mark-text">Lo</span>
      </div>
      {!compact && <span className="lo-wordmark">LinkedOut</span>}
    </a>
  );
}
