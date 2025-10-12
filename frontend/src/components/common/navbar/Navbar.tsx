
// Local color tokens (kept in sync with dashboard)
const purple = "#7c3aed";
const deepPurple = "#6d28d9";
const slate600 = "#475569";
const border = "#e5e7eb";
const surface = "#ffffff";

type NavbarProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function Navbar(props: NavbarProps) {
  const { isSidebarOpen, onToggleSidebar } = props;
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        borderBottom: `1px solid ${border}`,
        background: surface,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, color: slate600 }}>
        <span
          role="button"
          aria-label="Toggle sidebar"
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          style={{ fontSize: 22, cursor: "pointer", userSelect: "none", transition: "transform .2s ease" }}
          onClick={onToggleSidebar}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggleSidebar();
            }
          }}
          tabIndex={0}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ☰
        </span>
        <a href="#" style={{ textDecoration: "none", color: slate600 }}>
          Categories
        </a>
      </div>

      {/* Search */}
      <form
        className="search-box"
        style={{
          display: "flex",
          alignItems: "center",
          background: surface,
          border: `3px solid ${purple}`,
          borderRadius: 28,
          padding: "4px 10px",
          width: 400,
          transition: "all 0.3s ease",
          boxShadow: "0 2px 8px rgba(124,58,237,0.1)",
        }}
        onSubmit={(e) => e.preventDefault()}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(124,58,237,0.1)";
        }}
      >
        <input
          type="text"
          placeholder="Search here..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: 14,
            padding: "8px 8px 8px 10px",
            fontFamily: "inherit",
          }}
        />
        <button
          type="reset"
          title="clear"
          style={{
            border: "none",
            background: "transparent",
            color: deepPurple,
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 24,
              height: 24,
              display: "inline-block",
              backgroundColor: deepPurple,
              WebkitMaskImage: "url(/search1.svg)",
              maskImage: "url(/search1.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </button>
      </form>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <label
            title="dark mode"
            style={{
              cursor: "pointer",
              display: "inline-block",
              transition: "transform 200ms ease, color 200ms ease, text-shadow 200ms ease",
              transform: "scale(1)",
              color: slate600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15)";
              e.currentTarget.style.color = deepPurple;
              e.currentTarget.style.textShadow = "0 4px 12px rgba(109,40,217,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = slate600;
              e.currentTarget.style.textShadow = "none";
            }}
          ><span style={{ marginRight: 8}}><span
              aria-hidden
              style={{
                width: 24,
                height: 24,
                display: "inline-block",
                backgroundColor: "black",
                WebkitMaskImage: "url(/moon.svg)",
                maskImage: "url(/moon.svg)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            /></span></label>
          <a
            href="#"
            className="notification"
            style={{ position: "relative", color: slate600, display: "inline-block", transition: "transform 200ms ease, color 200ms ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.color = purple;
              const badge = e.currentTarget.querySelector('.num') as HTMLElement | null;
              if (badge) {
                badge.style.transform = " scale(1)";
                badge.style.boxShadow = "0 6px 14px rgba(124,58,237,0.35)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = slate600;
              const badge = e.currentTarget.querySelector('.num') as HTMLElement | null;
              if (badge) {
                badge.style.transform = "translateY(0) scale(1)";
                badge.style.boxShadow = "none";
              }
            }}
          >
          <span style={{ marginRight: 8}}><span
              aria-hidden
              style={{
                width: 24,
                height: 24,
                display: "inline-block",
                backgroundColor: "black",
                WebkitMaskImage: "url(/bell.svg)",
                maskImage: "url(/bell.svg)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            /></span>
            <span
              className="num"
              style={{
                position: "absolute",
                top: -6,
                right: -8,
                background: purple,
                color: "#fff",
                borderRadius: 10,
                fontSize: 12,
                padding: "0 6px",
                transition: "transform 200ms ease, box-shadow 200ms ease",
              }}
            >
              3
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}


