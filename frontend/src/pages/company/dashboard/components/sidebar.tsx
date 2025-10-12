import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  FileBarChart,
  Building2,
  Settings,
} from "lucide-react";

interface SidebarProps {
  company: {
    name: string;
    type: string;
    logo: string;
    isLoading: boolean;
  };
}

export function Sidebar({ company }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    {
      section: "MAIN",
      items: [
        { name: "Dashboard", icon: LayoutDashboard, count: null },
        { name: "Job Postings", icon: FileText, count: 0 },
        { name: "Applications", icon: Users, count: 0 },
      ],
    },
    {
      section: "ANALYTICS",
      items: [
        { name: "Analytics", icon: BarChart3, count: null },
        { name: "Reports", icon: FileBarChart, count: null },
      ],
    },
    {
      section: "SETTINGS",
      items: [
        {
          name: "Company Profile",
          icon: Building2,
          count: null,
          path: "/edit-profile", // <-- navigation path
        },
        { name: "Settings", icon: Settings, count: null },
      ],
    },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      {/* Company Info */}
      <div className="p-6 border-b border-sidebar-border transition-all duration-300 hover:bg-sidebar-accent/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-md">
            {company.isLoading ? (
              <div className="text-xs text-muted-foreground animate-pulse">Logo</div>
            ) : (
              <img
                src={company.logo || "/placeholder.svg"}
                alt="Company Logo"
                className="w-8 h-8 rounded transition-transform duration-300 hover:scale-110"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium text-sidebar-foreground transition-colors duration-200 hover:text-primary">
              {company.isLoading ? <span className="animate-pulse">Loading...</span> : company.name}
            </div>
            <div className="text-sm text-muted-foreground transition-colors duration-200">
              {company.isLoading ? <span className="animate-pulse">Loading...</span> : company.type}
            </div>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-200 hover:scale-105"
        >
          Active
        </Badge>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            <div className="text-xs font-medium text-muted-foreground mb-3 px-2 transition-colors duration-200 hover:text-foreground">
              {section.section}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.name;

                // If the item has a path (like Company Profile), use Link
                if (item.path) {
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setActiveItem(item.name)}
                      className={`flex items-center w-full gap-3 p-2 rounded transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:translate-x-1"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "scale-110" : ""}`} />
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.count !== null && (
                        <Badge
                          variant="secondary"
                          className="bg-muted text-muted-foreground transition-all duration-200 hover:scale-105"
                        >
                          {item.count}
                        </Badge>
                      )}
                    </Link>
                  );
                }

                // Otherwise, keep existing Button behavior
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:translate-x-1"
                    }`}
                    onClick={() => setActiveItem(item.name)}
                  >
                    <Icon
                      className={`w-4 h-4 transition-all duration-200 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.count !== null && (
                      <Badge
                        variant="secondary"
                        className="bg-muted text-muted-foreground transition-all duration-200 hover:scale-105"
                      >
                        {item.count}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
