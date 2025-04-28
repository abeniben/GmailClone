
import React, { useState } from "react";
import { useGmail } from "@/context/GmailContext";
import { 
  RefreshCw, 
  MoreVertical, 
  Archive, 
  AlertOctagon, 
  Trash2,
  Clock,
  Tag,
  Mail,
  MailOpen,
  ChevronDown
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const EmailListToolbar: React.FC = () => {
  const { state, dispatch } = useGmail();
  const [refreshing, setRefreshing] = useState(false);
  
  // Get visible emails based on the current category
  const visibleEmails = state.emails.filter(
    (email) => email.category === state.activeCategory
  );
  
  // Check if all visible emails are selected
  const allSelected = 
    visibleEmails.length > 0 && 
    visibleEmails.every((email) => state.selectedEmails.includes(email.id));
  
  // Check if some emails are selected
  const someSelected = state.selectedEmails.length > 0;
  
  // Toggle all emails selection
  const toggleSelectAll = () => {
    if (allSelected) {
      dispatch({ type: "DESELECT_ALL_EMAILS" });
    } else {
      dispatch({ type: "SELECT_ALL_EMAILS" });
    }
  };
  
  // Refresh emails
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  // Delete selected emails
  const handleDelete = () => {
    if (state.selectedEmails.length > 0) {
      dispatch({ type: "DELETE_EMAILS", payload: state.selectedEmails });
    }
  };
  
  // Archive selected emails
  const handleArchive = () => {
    if (state.selectedEmails.length > 0) {
      dispatch({ type: "ARCHIVE_EMAILS", payload: state.selectedEmails });
    }
  };
  
  // Mark selected emails as read/unread
  const handleMarkAsRead = () => {
    if (state.selectedEmails.length > 0) {
      dispatch({ type: "MARK_AS_READ", payload: state.selectedEmails });
    }
  };
  
  const handleMarkAsUnread = () => {
    if (state.selectedEmails.length > 0) {
      dispatch({ type: "MARK_AS_UNREAD", payload: state.selectedEmails });
    }
  };
  
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gmail-border">
      <div className="flex items-center space-x-1">
        <div onClick={toggleSelectAll} className="gmail-icon-button">
          <Checkbox 
            checked={allSelected}
            className="data-[state=checked]:bg-gmail-blue data-[state=checked]:text-white border-gmail-gray"
          />
        </div>
        
        <motion.button 
          className="gmail-icon-button"
          onClick={handleRefresh}
          whileTap={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
        </motion.button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="gmail-icon-button">
              <MoreVertical className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>Mark all as read</DropdownMenuItem>
            <DropdownMenuItem>Select all</DropdownMenuItem>
            <DropdownMenuItem>Select none</DropdownMenuItem>
            <DropdownMenuItem>Select read</DropdownMenuItem>
            <DropdownMenuItem>Select unread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {someSelected && (
          <motion.div 
            className="flex items-center space-x-1 ml-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <button className="gmail-icon-button" onClick={handleArchive}>
              <Archive className="h-5 w-5" />
            </button>
            
            <button className="gmail-icon-button" onClick={handleDelete}>
              <Trash2 className="h-5 w-5" />
            </button>
            
            <button className="gmail-icon-button" onClick={handleMarkAsRead}>
              <MailOpen className="h-5 w-5" />
            </button>
            
            <button className="gmail-icon-button" onClick={handleMarkAsUnread}>
              <Mail className="h-5 w-5" />
            </button>
            
            <button className="gmail-icon-button">
              <Clock className="h-5 w-5" />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="gmail-icon-button">
                  <Tag className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {state.labels.map((label) => (
                  <DropdownMenuItem key={label.id}>
                    {label.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem>Create new</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        )}
      </div>
      
      <div className="text-xs text-gmail-gray flex items-center">
        <span>1-20 of 143</span>
        <div className="flex items-center ml-4">
          <button className="gmail-icon-button" disabled>
            <ChevronDown className="h-5 w-5 transform rotate-90" />
          </button>
          <button className="gmail-icon-button">
            <ChevronDown className="h-5 w-5 transform -rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailListToolbar;
