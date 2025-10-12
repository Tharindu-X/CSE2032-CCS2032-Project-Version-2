import React from "react";

type AdminSidebarProps = {
  activeKey?: "dashboard" | "adminsettings";
  onNavigate?: (key: string) => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
};

const brandPurple = "#9333ea"; // matches original
const brandAmber = "#f59e0b"; // matches original
const deepPurple = "#6d28d9";
const lightBg = "#f5f3ff";
const textPrimary = "#0f172a";
const sidebarBorder = "#e5e7eb";
const sidebarBg = "#fff";

export default function AdminSidebar(props: AdminSidebarProps) {
  const {
    activeKey = "dashboard",
    onNavigate,
    onLogout,
    onProfileClick,
    userName,
    userRole = "Admin",
    avatarUrl,
  } = props;

  const currentText = textPrimary;
  const iconColor = "black";

  const item = (
    key: AdminSidebarProps["activeKey"],
    label: string,
    icon: React.ReactNode,
    href?: string
  ) => {
    const isActive = activeKey === key;
    return (
      <li
        key={key}
        style={{
          listStyle: "none",
          margin: "8px 0",
        }}
      >
        <a
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.(key || "");
          }}
          href={href || "#"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: isActive ? "#fff" : currentText,
            background: isActive ? brandPurple : "transparent",
            padding: "14px 16px",
            borderRadius: 12,
            boxShadow: isActive ? "0 6px 14px rgba(147,51,234,0.25)" : "none",
            fontWeight: 600,
            transition: "all 0.3s ease",
            transform: "translateX(0)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = "rgba(147,51,234,0.1)";
              e.currentTarget.style.transform = "translateX(4px)";
              e.currentTarget.style.color = brandPurple;
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.color = currentText;
            }
          }}
        >
          <span 
            style={{ 
              fontSize: 18,
              transition: "all 0.3s ease",
              transform: "scale(1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {icon}
          </span>
          <span>{label}</span>
        </a>
      </li>
    );
  };

  return (
    <section
      id="admin-sidebar"
      style={{
        width: 300,
        minHeight: "100vh",
        padding: 16,
        borderRight: `1px solid ${sidebarBorder}`,
        background: sidebarBg,
        position: "sticky",
        top: 0,
        zIndex: 10,
          }}
    >
      {/* Logo Section */}
      <div
        id="navlogo"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 24,
          fontWeight: 800,
          color: brandPurple,
          padding: "12px 8px",
          marginBottom: 12,
          transition: "all 0.3s ease",
          transform: "scale(1)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.color = deepPurple;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = brandPurple;
        }}
      >
        <span role="img" aria-label="briefcase">
          💼</span>
        <span>
          Grag<span style={{ color: brandAmber }}> Gig</span>
        </span>
      </div>

      <ul className="side-menu top" style={{ padding: 0, margin: "16px 0" }}>
        {item(
          "dashboard",
          "Dashboard",
          <img src="/analytics.svg" alt="Dashboard" style={{ width: 18, height: 18 }} />
        )}
            {item("adminsettings", "Settings", <span style={{ marginRight: 8}}><span
              aria-hidden
              style={{
                width: 18,
                height: 18,
                display: "inline-block",
                backgroundColor: iconColor,
                WebkitMaskImage: "url(/settings.svg)",
                maskImage: "url(/settings.svg)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
              
            /></span>)}
      </ul>

       <ul className="side-menu" style={{ padding: 0, margin: "18px 0 130px" }}>
        <li style={{ listStyle: "none", margin: "8px 0" }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLogout?.();
            }}
            className="logout"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              color: "#ef4444",
              padding: "12px 16px",
              borderRadius: 12,
              transition: "all 0.3s ease",
              transform: "translateX(0)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.1)";
              e.currentTarget.style.transform = "translateX(4px)";
              e.currentTarget.style.color = "#dc2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.color = "#ef4444";
            }}
          >
            <span 
              style={{ 
                fontSize: 18,
                transition: "all 0.3s ease",
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
            <span style={{ marginRight: 8}}><span
              aria-hidden
              style={{
                width: 18,
                height: 18,
                display: "inline-block",
                backgroundColor: iconColor,
                WebkitMaskImage: "url(/logout.svg)",
                maskImage: "url(/logout.svg)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            /></span>
            </span>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>

      <div
        className="profile-section"
        style={{
          background: brandPurple,
          color: "#fff",
          padding: 18,
          borderRadius: 18,
          boxShadow: "0 10px 24px rgba(147,51,234,0.35)",
          transition: "all 0.3s ease",
          transform: "translateY(0)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 15px 35px rgba(147,51,234,0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 24px rgba(147,51,234,0.35)";
        }}
      >
        <div
          className="profile-content"
          style={{ display: "flex", alignItems: "center", gap: 14 }}
        >
          <img
            src={avatarUrl || "https://avatars.githubusercontent.com/u/9919?s=64"}
            alt="Profile"
            className="profile-img"
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              objectFit: "cover",
              background: lightBg,
              border: "3px solid rgba(255,255,255,.35)",
              transition: "all 0.3s ease",
              transform: "scale(1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.35)";
            }}
          />
          <div className="profile-info">
            <h4 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{userName}</h4>
            <p style={{ margin: "4px 0 0", color: "#e9d5ff", fontWeight: 600 }}>
              {userRole}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

