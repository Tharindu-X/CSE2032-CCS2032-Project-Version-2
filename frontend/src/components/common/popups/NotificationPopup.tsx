import React from 'react';

interface NotificationPopupProps {
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ isVisible, onClose, isDarkMode }) => {
  // Sample notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      title: "New Application Received",
      message: "John Doe has submitted an application for Software Engineer position.",
      time: "2 minutes ago",
      isRead: false
    },
    {
      id: 2,
      title: "Interview Scheduled",
      message: "Interview with Sarah Johnson scheduled for tomorrow at 2:00 PM.",
      time: "1 hour ago",
      isRead: false
    },
    {
      id: 3,
      title: "Document Approved",
      message: "Your profile document has been approved by the admin.",
      time: "3 hours ago",
      isRead: true
    },
    {
      id: 4,
      title: "System Update",
      message: "The system will undergo maintenance tonight from 11 PM to 1 AM.",
      time: "5 hours ago",
      isRead: true
    }
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}
        onClick={onClose}
      />
      
      {/* Popup */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          right: 0,
          width: 350,
          maxHeight: 400,
          backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
          border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          zIndex: 1001,
          marginTop: "8px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
            backgroundColor: isDarkMode ? "#111827" : "#f9fafb",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 600,
                color: isDarkMode ? "#f9fafb" : "#111827",
              }}
            >
              Notifications
            </h3>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: isDarkMode ? "#9ca3af" : "#6b7280",
                padding: "4px",
                borderRadius: "4px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? "#374151" : "#f3f4f6";
                e.currentTarget.style.color = isDarkMode ? "#f9fafb" : "#111827";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = isDarkMode ? "#9ca3af" : "#6b7280";
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                padding: "16px 20px",
                borderBottom: `1px solid ${isDarkMode ? "#374151" : "#f3f4f6"}`,
                backgroundColor: notification.isRead 
                  ? "transparent" 
                  : (isDarkMode ? "rgba(147, 51, 234, 0.1)" : "rgba(147, 51, 234, 0.05)"),
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? "#374151" : "#f9fafb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = notification.isRead 
                  ? "transparent" 
                  : (isDarkMode ? "rgba(147, 51, 234, 0.1)" : "rgba(147, 51, 234, 0.05)");
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                {/* Unread indicator */}
                {!notification.isRead && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#9333ea",
                      borderRadius: "50%",
                      marginTop: "6px",
                      flexShrink: 0,
                    }}
                  />
                )}
                
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: isDarkMode ? "#f9fafb" : "#111827",
                    }}
                  >
                    {notification.title}
                  </h4>
                  <p
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "13px",
                      color: isDarkMode ? "#d1d5db" : "#6b7280",
                      lineHeight: "1.4",
                    }}
                  >
                    {notification.message}
                  </p>
                  <span
                    style={{
                      fontSize: "12px",
                      color: isDarkMode ? "#9ca3af" : "#9ca3af",
                    }}
                  >
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
            backgroundColor: isDarkMode ? "#111827" : "#f9fafb",
            textAlign: "center",
          }}
        >
        </div>
      </div>
    </>
  );
};

export default NotificationPopup;