import React, { useEffect, useState } from "react";

import analyticsIcon from "../../../assets/analytics.svg";
import applicationsIcon from "../../../assets/applications.svg";
import browseJobsIcon from "../../../assets/browseJobs.svg";
import companyIcon from "../../../assets/company.svg";
import settingsIcon from "../../../assets/settings.svg";
import logoutIcon from "../../../assets/logout.svg";  

import LogoutPopup from "../popups/LogoutPopup";
import ProfilePopup from "../popups/ProfilePopup";
import { useAuth } from "../../../context/AuthContext";

type SidebarProps = {
  activeKey?: "dashboard" | "applications" | "browse" | "companies" | "settings";
  onNavigate?: (key: string) => void;
  onLogout?: () => void;
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
  isOpen?: boolean;
  onLogoutPopupChange?: (isOpen: boolean) => void;
  isDarkMode?: boolean;
  onProfileUpdate?: (username: string, avatarUrl: string) => void;
  onProfilePopupChange?: (isOpen: boolean) => void;
};

const brandPurple = "#9333ea"; // matches original
const brandAmber = "#f59e0b"; // matches original
const deepPurple = "#6d28d9";
const lightBg = "#f5f3ff";
const textPrimary = "#0f172a";
const sidebarBorder = "#e5e7eb";
const sidebarBg = "#fff";

export default function Sidebar(props: SidebarProps) {
  const {
    activeKey = "dashboard",
    onNavigate,
    onLogout,
    userName,
    userRole = "Student",
    avatarUrl,
    isOpen = true,
    onLogoutPopupChange,
    isDarkMode = false,
    onProfileUpdate,
    onProfilePopupChange,
  } = props;

  const { user, token } = useAuth();
  const [resolvedUserName, setResolvedUserName] = useState<string>(userName || "User");

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
    onLogoutPopupChange?.(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutPopup(false);
    onLogoutPopupChange?.(false);
    onLogout?.();
  };

  const handleLogoutCancel = () => {
    setShowLogoutPopup(false);
    onLogoutPopupChange?.(false);
  };

  const handleProfileClick = () => {
    setShowProfilePopup(true);
    onProfilePopupChange?.(true);
  };

  const handleProfileClose = () => {
    setShowProfilePopup(false);
    onProfilePopupChange?.(false);
  };

  const handleProfileSave = (username: string, avatarUrl: string) => {
    onProfileUpdate?.(username, avatarUrl);
    setResolvedUserName(username);
    setShowProfilePopup(false);
    onProfilePopupChange?.(false);
  };

  useEffect(() => {
    setResolvedUserName(userName || "User");
  }, [userName]);

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        if (!user?.email || !token) return;
        const response = await fetch(`http://localhost:5000/api/student/${encodeURIComponent(user.email)}/settings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json?.message || 'Failed to fetch settings');
        }
        const firstName = json?.data?.f_name || json?.data?.first_name || json?.data?.firstName;
        const lastName = json?.data?.l_name || json?.data?.last_name || json?.data?.lastName;
        const combined = [firstName, lastName].filter(Boolean).join(' ').trim();
        const nameFromApi = combined || json?.data?.full_name || json?.data?.name || json?.data?.username;
        if (typeof nameFromApi === 'string' && nameFromApi.trim()) {
          setResolvedUserName(nameFromApi);
        }
      } catch (_err) {
        // leave fallback name; non-fatal for UI
      }
    };
    fetchUserSettings();
  }, [user?.email, token]);

  const currentText = isDarkMode ? "#f9fafb" : textPrimary;

  const item = (
    key: SidebarProps["activeKey"],
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
      id="sidebar"
      style={{
        width: 300,
        height: "100vh",
        padding: 16,
        borderRight: `1px solid ${isDarkMode ? "#374151" : sidebarBorder}`,
        background: isDarkMode ? "#1f2937" : sidebarBg,
        position: "fixed",
        top: 0,
        left: isOpen ? 0 : -300,
        zIndex: 10,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        transition: "left 0.3s ease",
      }}
    >
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
          <img src={analyticsIcon} alt="Dashboard" style={{ width: 18, height: 18 }} />
        )}
        {item(
          "applications",
          "Applications",
          <img src={applicationsIcon} alt="Applications" style={{ width: 18, height: 18 }} />
        )}
        {item(
          "browse",
          "Browse Jobs",
          <img src={browseJobsIcon} alt="Browse Jobs" style={{ width: 18, height: 18 }} />
        )}
        {item(
          "companies",
          "Companies",
          <img src={companyIcon} alt="Companies" style={{ width: 18, height: 18 }} />
        )}
        {item(
          "settings",
          "Settings",
          <img src={settingsIcon} alt="Settings" style={{ width: 18, height: 18 }} />
        )}
      </ul>

      <ul className="side-menu" style={{ padding: 0, margin: "18px 0 24px" }}>
        <li style={{ listStyle: "none", margin: "8px 0" }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogoutClick();
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
            <img src={logoutIcon} alt="Logout" style={{ width: 18, height: 18, marginRight: 8 }} />
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
          padding: "10px 16px",
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
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 14,
            cursor: "pointer",
            padding: "8px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
          }}
          onClick={handleProfileClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
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
            <h4 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{resolvedUserName}</h4>
            <p style={{ margin: "4px 0 0", color: "#e9d5ff", fontWeight: 600 }}>
              {userRole}
            </p>
          </div>
        </div>
      </div>
      
      {/* Logout Popup */}
      <LogoutPopup
        isOpen={showLogoutPopup}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        userName={userName}
      />
      
      {/* Profile Popup */}
      <ProfilePopup
        isVisible={showProfilePopup}
        onClose={handleProfileClose}
        isDarkMode={isDarkMode}
        currentUserName={userName || "User"}
        currentAvatarUrl={avatarUrl}
        onSave={handleProfileSave}
      />
    </section>
  );
}

