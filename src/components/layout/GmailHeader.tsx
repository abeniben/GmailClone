
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGmail } from "@/context/GmailContext";
import { Menu, Search, Bell, Settings, HelpCircle, PenSquare } from "lucide-react";
import SettingsMenu from "@/components/settings/SettingsMenu";

const GmailHeader: React.FC = () => {
  const { state, dispatch } = useGmail();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  const handleComposeClick = () => {
    dispatch({ type: "TOGGLE_COMPOSE" });
  };

  return (
    <motion.header 
      className="flex items-center px-4 py-2 border-b border-gmail-border dark:border-gmail-dark-border bg-white dark:bg-gmail-dark-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="gmail-icon-button mr-2"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="h-12 flex items-center">
          <img 
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" 
            alt="Gmail" 
            className="h-6 dark:hidden"
          />
          <img 
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x.png" 
            alt="Gmail" 
            className="h-6 hidden dark:block"
          />
        </div>
      </div>

      <div className="flex-grow mx-8">
        <div className="gmail-search-bar max-w-2xl mx-auto">
          <Search className="h-5 w-5 text-gmail-gray dark:text-gmail-lightGray" />
          <input 
            type="text"
            placeholder="Search mail"
            className="flex-grow bg-transparent border-none outline-none text-sm dark:text-gmail-lightGray"
            value={state.searchQuery}
            onChange={handleSearch}
          />
          <select 
            className="text-xs bg-transparent border-none outline-none text-gmail-gray dark:text-gmail-lightGray"
            aria-label="Search options"
          >
            <option value="all">All Mail</option>
            <option value="inbox">Inbox</option>
            <option value="sent">Sent</option>
            <option value="drafts">Drafts</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          className="gmail-compose-button flex items-center" 
          onClick={handleComposeClick}
        >
          <PenSquare className="h-4 w-4 mr-2" />
          {!state.sidebarCollapsed && <span>Compose</span>}
        </button>
        
        <button className="gmail-icon-button" aria-label="Support">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button 
          className="gmail-icon-button" 
          aria-label="Settings"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="h-5 w-5" />
        </button>
        <button className="gmail-icon-button" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>
        <button className="ml-2 h-8 w-8 rounded-full overflow-hidden" aria-label="Profile">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent("John Smith")}&background=random`} 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
        </button>
      </div>
      
      <SettingsMenu isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </motion.header>
  );
};

export default GmailHeader;
