import React, { useState, useRef } from 'react';

interface ProfilePopupProps {
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  currentUserName: string;
  currentAvatarUrl?: string;
  onSave: (username: string, avatarUrl: string) => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ 
  isVisible, 
  onClose, 
  isDarkMode, 
  currentUserName, 
  currentAvatarUrl,
  onSave 
}) => {
  const [username, setUsername] = useState(currentUserName);
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl || "https://avatars.githubusercontent.com/u/9919?s=64");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarUrl(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(username, avatarUrl);
    onClose();
  };

  const handleCancel = () => {
    // Reset to original values
    setUsername(currentUserName);
    setAvatarUrl(currentAvatarUrl || "https://avatars.githubusercontent.com/u/9919?s=64");
    onClose();
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        }}
        onClick={onClose}
      />
      
      {/* Popup */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
          border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
          zIndex: 1001,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
            backgroundColor: isDarkMode ? "#111827" : "#f9fafb",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: isDarkMode ? "#f9fafb" : "#111827",
              }}
            >
              Edit Profile
            </h3>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
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

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {/* Profile Picture Section */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div
              style={{
                position: "relative",
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            >
              <img
                src={avatarUrl}
                alt="Profile"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `3px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.borderColor = "#9333ea";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = isDarkMode ? "#374151" : "#e5e7eb";
                }}
              />
              
              {/* Upload overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                }}
                className="upload-overlay"
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  Change
                </span>
              </div>
            </div>
            
            <p
              style={{
                margin: "12px 0 0 0",
                fontSize: "14px",
                color: isDarkMode ? "#9ca3af" : "#6b7280",
                fontWeight: 500,
              }}
            >
              Click to change profile picture
            </p>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>

          {/* Username Section */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: isDarkMode ? "#f9fafb" : "#111827",
              }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: `1px solid ${isDarkMode ? "#374151" : "#d1d5db"}`,
                borderRadius: "8px",
                fontSize: "14px",
                backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                color: isDarkMode ? "#f9fafb" : "#111827",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#9333ea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(147, 51, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = isDarkMode ? "#374151" : "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
              placeholder="Enter your username"
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              onClick={handleCancel}
              style={{
                padding: "10px 20px",
                border: `1px solid ${isDarkMode ? "#374151" : "#d1d5db"}`,
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                backgroundColor: "transparent",
                color: isDarkMode ? "#d1d5db" : "#6b7280",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? "#374151" : "#f9fafb";
                e.currentTarget.style.borderColor = isDarkMode ? "#4b5563" : "#9ca3af";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = isDarkMode ? "#374151" : "#d1d5db";
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isUploading || !username.trim()}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: isUploading || !username.trim() ? "not-allowed" : "pointer",
                backgroundColor: isUploading || !username.trim() ? "#9ca3af" : "#9333ea",
                color: "#ffffff",
                transition: "all 0.2s ease",
                opacity: isUploading || !username.trim() ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isUploading && username.trim()) {
                  e.currentTarget.style.backgroundColor = "#7c3aed";
                }
              }}
              onMouseLeave={(e) => {
                if (!isUploading && username.trim()) {
                  e.currentTarget.style.backgroundColor = "#9333ea";
                }
              }}
            >
              {isUploading ? "Uploading..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* CSS for hover effect */}
      <style>
        {`
          .upload-overlay:hover {
            opacity: 1 !important;
          }
        `}
      </style>
    </>
  );
};

export default ProfilePopup;
