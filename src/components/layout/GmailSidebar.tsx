import React from "react";
import { useGmail } from "@/context/GmailContext";
import SidebarLabel from "../sidebar/SidebarLabel";
import { useEmailDragDrop } from "@/hooks/useEmailDragDrop";

const categories = [
  { name: "Inbox", key: "primary", color: "#1A73E8", icon: "📥" },
  { name: "Sent", key: "sent", color: "#34A853", icon: "📤" },
  { name: "Drafts", key: "drafts", color: "#FBBC04", icon: "📝" },
  { name: "Spam", key: "spam", color: "#EA4335", icon: "🚫" },
  { name: "Trash", key: "trash", color: "#8A898C", icon: "🗑️" },
];

const GmailSidebar: React.FC = () => {
  const { state, dispatch } = useGmail();
  const { getSidebarDropProps } = useEmailDragDrop();

  // Responsive collapse
  const sidebarCollapsed = state.sidebarCollapsed;

  // Count for each category (from state.emails)
  const getCount = (key: string) =>
    state.emails.filter(email => email.category === key).length;

  // Activate tab & filtering
  const handleCategoryClick = (category: string) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  return (
    <aside className={`bg-sidebar-DEFAULT dark:bg-gmail-dark-bg flex flex-col py-3 ${sidebarCollapsed ? "w-14" : "w-56"} transition-all`}>
      <ul className="flex flex-col gap-1">
        {categories.map(cat => (
          <SidebarLabel
            key={cat.key}
            name={cat.name}
            color={cat.color}
            count={getCount(cat.key)}
            collapsed={sidebarCollapsed}
            onClick={() => handleCategoryClick(cat.key)}
            isActive={state.activeCategory === cat.key}
            dropProps={getSidebarDropProps(cat.key)}
            icon={cat.icon}
          />
        ))}
      </ul>
    </aside>
  );
};

export default GmailSidebar;
