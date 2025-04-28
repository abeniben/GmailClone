
import React from "react";

interface SidebarLabelProps {
  name: string;
  color: string;
  count?: number;
  collapsed: boolean;
  onClick?: () => void;
  isActive?: boolean;
  dropProps?: React.HTMLAttributes<HTMLLIElement>;
  icon?: string;
}

const SidebarLabel: React.FC<SidebarLabelProps> = ({
  name,
  color,
  count,
  collapsed,
  onClick,
  isActive,
  dropProps,
  icon
}) => (
  <li
    {...(dropProps || {})}
    className={`${
      isActive ? "gmail-sidebar-item active" : "gmail-sidebar-item"
    } flex items-center px-3 py-2 w-full hover:bg-gmail-hover dark:hover:bg-gmail-dark-hover rounded-lg transition-all`}
  >
    <button
      type="button"
      onClick={onClick}
      className="flex items-center w-full h-full bg-transparent focus:outline-none"
      tabIndex={0}
    >
      <span
        className="h-3 w-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      {icon && !collapsed && (
        <span className="ml-2 mr-2">{icon}</span>
      )}
      {!collapsed && (
        <>
          <span className="flex-grow text-left dark:text-gmail-lightGray">{name}</span>
          {count !== undefined && (
            <span className="text-xs font-medium px-2 dark:text-gmail-lightGray">{count}</span>
          )}
        </>
      )}
    </button>
  </li>
);

export default SidebarLabel;
