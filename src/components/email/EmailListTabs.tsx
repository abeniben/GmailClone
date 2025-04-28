
import React from "react";
import { motion } from "framer-motion";
import { useGmail } from "@/context/GmailContext";

const EmailListTabs: React.FC = () => {
  const { state, dispatch } = useGmail();
  
  const handleCategoryChange = (
    category: "primary" | "social" | "promotions" | "updates" | "forums"
  ) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };
  
  // Get unread count for each category
  const getUnreadCount = (category: string) => {
    return state.emails.filter(
      (email) => email.category === category && !email.isRead
    ).length;
  };
  
  const tabs = [
    {
      id: "primary",
      label: "Primary",
      icon: "📥",
      color: "blue"
    },
    {
      id: "social",
      label: "Social",
      icon: "👥",
      color: "green"
    },
    {
      id: "promotions",
      label: "Promotions",
      icon: "🏷️",
      color: "red"
    },
    {
      id: "updates",
      label: "Updates",
      icon: "📣",
      color: "yellow"
    },
    {
      id: "forums",
      label: "Forums",
      icon: "💬",
      color: "purple"
    }
  ];
  
  return (
    <div className="flex border-b border-gmail-border overflow-x-auto">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          className={`gmail-tab flex-1 flex items-center justify-center relative ${
            state.activeCategory === tab.id ? "active" : ""
          }`}
          onClick={() => 
            handleCategoryChange(
              tab.id as "primary" | "social" | "promotions" | "updates" | "forums"
            )
          }
          whileHover={{ backgroundColor: "#F5F5F5" }}
          whileTap={{ backgroundColor: "#E5E5E5" }}
        >
          <span className="mr-2">{tab.icon}</span>
          <span>{tab.label}</span>
          
          {getUnreadCount(tab.id) > 0 && (
            <motion.span
              className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-red-500 text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {getUnreadCount(tab.id)}
            </motion.span>
          )}
          
          {state.activeCategory === tab.id && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gmail-blue"
              layoutId="activeTab"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default EmailListTabs;
