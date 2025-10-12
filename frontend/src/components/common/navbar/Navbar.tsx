
import React, { useState } from 'react';
import NotificationPopup from '../popups/NotificationPopup';

// Local color tokens (kept in sync with sidebar)
const brandPurple = "#9333ea"; // matches sidebar
const deepPurple = "#6d28d9";
const slate600 = "#475569";
const border = "#e5e7eb";
const surface = "#ffffff";

type NavbarProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isBlurred?: boolean;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
};

export default function Navbar(props: NavbarProps) {
  const { isSidebarOpen, onToggleSidebar, isBlurred = false, isDarkMode = false, onToggleDarkMode } = props;
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNotificationPopupOpen(!isNotificationPopupOpen);
  };

  const handleCloseNotificationPopup = () => {
    setIsNotificationPopupOpen(false);
  };
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        borderBottom: `1px solid ${isDarkMode ? "#374151" : border}`,
        background: isBlurred 
          ? (isDarkMode ? "rgba(31, 41, 55, 0.7)" : "rgba(255, 255, 255, 0.7)")
          : (isDarkMode ? "#1f2937" : surface),
        position: "sticky",
        top: 0,
        zIndex: 10,
        filter: isBlurred ? "blur(4px)" : "none",
        transition: "all 0.3s ease",
        color: isDarkMode ? "#f9fafb" : "#0f172a",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, color: isDarkMode ? "#d1d5db" : slate600 }}>
        <span
          role="button"
          aria-label="Toggle sidebar"
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          style={{ 
            fontSize: 22, 
            cursor: "pointer", 
            userSelect: "none", 
            transition: "all 0.3s ease",
            transform: "scale(1)",
            color: isDarkMode ? "#d1d5db" : slate600,
            padding: "8px",
            borderRadius: "8px"
          }}
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
            e.currentTarget.style.color = brandPurple;
            e.currentTarget.style.background = "rgba(147,51,234,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.color = isDarkMode ? "#d1d5db" : slate600;
            e.currentTarget.style.background = "transparent";
          }}
        >
          ☰
        </span>
        <a 
          href="#" 
          style={{ 
            textDecoration: "none", 
            color: isDarkMode ? "#d1d5db" : slate600,
            fontWeight: 600,
            padding: "8px 12px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            transform: "translateX(0)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = brandPurple;
            e.currentTarget.style.background = "rgba(147,51,234,0.1)";
            e.currentTarget.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = isDarkMode ? "#d1d5db" : slate600;
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          Categories
        </a>
      </div>

      {/* Search */}
      <form
        className="search-box"
        style={{
          display: "flex",
          alignItems: "center",
          background: isDarkMode ? "#374151" : surface,
          border: `3px solid ${brandPurple}`,
          borderRadius: 28,
          padding: "4px 10px",
          width: 400,
          transition: "all 0.3s ease",
          boxShadow: "0 6px 14px rgba(147,51,234,0.25)",
        }}
        onSubmit={(e) => e.preventDefault()}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 10px 24px rgba(147,51,234,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 14px rgba(147,51,234,0.25)";
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
            background: "transparent",
            color: isDarkMode ? "#f9fafb" : "#0f172a",
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
            padding: "4px",
            borderRadius: "4px",
            transition: "all 0.3s ease",
            transform: "scale(1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.background = "rgba(109,40,217,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "transparent";
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
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              cursor: "pointer",
              display: "inline-block",
              transition: "all 0.3s ease",
              transform: "scale(1)",
              color: isDarkMode ? "#d1d5db" : slate600, 
              padding: "8px",
              borderRadius: "8px",
              background: "transparent",
              border: "none"
            }}
            onClick={onToggleDarkMode}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.color = brandPurple;
              e.currentTarget.style.background = "rgba(147,51,234,0.2)";
              e.currentTarget.style.border = "none";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = isDarkMode ? "#d1d5db" : slate600;
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.border = "none";
            }}
          >
            <span style={{ marginRight: 8}}>
              <span
                aria-hidden
                style={{
                  width: 24,
                  height: 24,
                  display: "inline-block",
                  backgroundColor: isDarkMode ? "white" : "black",
                  WebkitMaskImage: "url(/moon.svg)",
                  maskImage: "url(/moon.svg)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  filter: "none",
                }}
              />
            </span>
          </label>
          <div style={{ position: "relative" }}>
            <a
              href="#"
              className="notification"
              style={{ 
                position: "relative", 
                color: isDarkMode ? "#d1d5db" : slate600, 
                display: "inline-block", 
                transition: "all 0.3s ease",
                transform: "scale(1)",
                padding: "8px",
                borderRadius: "8px"
              }}
              onClick={handleNotificationClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.color = brandPurple;
                e.currentTarget.style.background = "rgba(147,51,234,0.1)";
                const badge = e.currentTarget.querySelector('.num') as HTMLElement | null;
                if (badge) {
                  badge.style.transform = "scale(1.1)";
                  badge.style.boxShadow = "0 6px 14px rgba(147,51,234,0.35)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.color = isDarkMode ? "#d1d5db" : slate600;
                e.currentTarget.style.background = "transparent";
                const badge = e.currentTarget.querySelector('.num') as HTMLElement | null;
                if (badge) {
                  badge.style.transform = "scale(1)";
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
                backgroundColor: isDarkMode ? "#d1d5db" : "black",
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
                background: brandPurple,
                color: "#fff",
                borderRadius: 10,
                fontSize: 12,
                padding: "0 6px",
                transition: "all 0.3s ease",
                transform: "scale(1)",
                boxShadow: "0 2px 8px rgba(147,51,234,0.25)"
              }}
            >
              3
            </span>
            </a>
            
            {/* Notification Popup */}
            <NotificationPopup
              isVisible={isNotificationPopupOpen}
              onClose={handleCloseNotificationPopup}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}


