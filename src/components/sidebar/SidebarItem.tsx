
import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  isActive?: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  count,
  isActive = false,
  collapsed,
  onClick,
}) => {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`gmail-sidebar-item flex items-center transition-all duration-150 w-full rounded-lg px-3 py-2 hover:bg-gmail-hover ${
          isActive ? "bg-gmail-selected font-semibold text-gmail-blue" : ""
        } ${collapsed ? "justify-center px-3" : ""}`}
        style={{ touchAction: "manipulation" }}
      >
        {icon}
        {!collapsed && (
          <>
            <span className="ml-3 flex-grow">{label}</span>
            {count !== undefined && (
              <span className="text-xs font-medium px-2">{count}</span>
            )}
          </>
        )}
      </button>
    </li>
  );
};

export default SidebarItem;
