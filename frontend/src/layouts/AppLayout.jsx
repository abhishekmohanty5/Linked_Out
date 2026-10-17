import { Home, Search, Bell, Building2, UserCircle, Bookmark, Flag, TrendingUp } from "lucide-react";
import { Logo } from "../components/Logo";
import "./AppLayout.css";

// ✅ Only LinkedOut-relevant navigation items
const NAV_ITEMS = [
  { icon: Home,        label: "Home",          active: true  },
  { icon: Search,      label: "Explore",       active: false },
  { icon: Building2,   label: "Companies",     active: false },
  { icon: Bell,        label: "Notifications", active: false, badge: "3" },
  { icon: UserCircle,  label: "Profile",       active: false },
];

// ✅ Only LinkedOut-relevant sidebar shortcuts
const SIDEBAR_ITEMS = [
  { icon: Bookmark,    label: "Saved posts"       },
  { icon: Flag,        label: "My reports"        },
  { icon: TrendingUp,  label: "Trending issues"   },
  { icon: Building2,   label: "Followed companies"},
];

const FOOTER_LINKS = [
  "About", "Accessibility", "Help", "Privacy", "Terms", "Advertising", "© 2025 LinkedOut"
];

function TopNav() {
  return (
    <nav className="topnav">
      <div className="topnav-logo">
        <Logo />
      </div>

      {/* Search */}
      <div className="topnav-search">
        <Search size={15} />
        <input placeholder="Search" aria-label="Search LinkedOut" />
      </div>

      {/* Nav items */}
      <div className="topnav-items">
        {NAV_ITEMS.map(({ icon: Icon, label, active, badge }) => (
          <button key={label} className={`topnav-item ${active ? "active" : ""}`} title={label}>
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={20} strokeWidth={active ? 2.2 : 1.6} />
              {badge && <span className="topnav-badge">{badge}</span>}
            </div>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function LeftColumn() {
  return (
    <aside className="col-left">
      {/* Profile card */}
      <div className="card profile-card">
        <div className="profile-banner" />
        <div className="profile-avatar-wrap">🧑</div>
        <h2 className="profile-name">Your Name</h2>
        <p className="profile-title">Workplace experience sharer · Anonymous by default</p>
        <hr className="profile-divider" />
        <div className="profile-stats">
          <div className="profile-stat-row">
            <span>Profile viewers</span>
            <span className="profile-stat-count">142</span>
          </div>
          <div className="profile-stat-row">
            <span>Post impressions</span>
            <span className="profile-stat-count">3.8K</span>
          </div>
        </div>
        <hr className="profile-divider" />
        <div style={{ padding: "10px 16px" }}>
          <button className="btn-outline" style={{ width: "100%", fontSize: 13 }}>
            View full profile
          </button>
        </div>
      </div>

      {/* Sidebar nav */}
      <div className="card" style={{ paddingBottom: 8 }}>
        <ul className="sidebar-nav">
          {SIDEBAR_ITEMS.map(({ icon: Icon, label }) => (
            <li key={label}>
              <button className="sidebar-nav-item" style={{ width: "100%", textAlign: "left" }}>
                <Icon size={16} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function RightColumn({ trending }) {
  return (
    <aside className="col-right">
      {/* Trending / News */}
      <div className="card news-card">
        <div className="news-title">
          <span>Trending Issues</span>
          <div className="news-title-icon">ℹ</div>
        </div>
        {trending.slice(0, 5).map(({ tag, posts }, i) => (
          <div key={tag} className="news-item">
            <div className="news-item-headline">#{tag}</div>
            <div className="news-item-meta">{`${i + 1}d ago · ${posts.toLocaleString()} experiences`}</div>
          </div>
        ))}
        <div className="news-item" style={{ fontWeight: 600, color: "var(--text-1)", fontSize: 13 }}>
          Show more ↓
        </div>
      </div>

      {/* Footer links */}
      <div className="footer-links">
        {FOOTER_LINKS.map(l => (
          l.startsWith("©")
            ? <span key={l}>{l}</span>
            : <a key={l} href="#">{l}</a>
        ))}
      </div>
    </aside>
  );
}

export function AppLayout({ children, trending }) {
  return (
    <>
      <TopNav />
      <div className="page-body">
        <LeftColumn />
        <main className="col-center">{children}</main>
        <RightColumn trending={trending} />
      </div>
    </>
  );
}
