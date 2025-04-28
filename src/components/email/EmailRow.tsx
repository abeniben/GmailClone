
import React from "react";
import { motion } from "framer-motion";
import { useGmail } from "@/context/GmailContext";
import { Email } from "@/data/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, StarOff, Paperclip } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface EmailRowProps {
  email: Email;
  isSelected: boolean;
  onSelect: () => void;
}

const EmailRow: React.FC<EmailRowProps> = ({ email, isSelected, onSelect }) => {
  const { dispatch } = useGmail();
  
  const handleStarToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (email.isStarred) {
      dispatch({ type: "UNSTAR_EMAIL", payload: email.id });
    } else {
      dispatch({ type: "STAR_EMAIL", payload: email.id });
    }
  };
  
  const handleRowClick = () => {
    dispatch({ type: "SET_CURRENT_EMAIL", payload: email });
    dispatch({ type: "TOGGLE_READING", payload: true });
    
    // Mark as read if unread
    if (!email.isRead) {
      dispatch({ type: "MARK_AS_READ", payload: [email.id] });
    }
  };
  
  // Handle checkbox click separately to prevent row click
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };
  
  // Format the timestamp
  const formattedDate = formatDistanceToNow(new Date(email.timestamp), {
    addSuffix: false,
  });
  
  return (
    <motion.div
      className={`gmail-email-row ${email.isRead ? "read" : "unread"} ${
        isSelected ? "selected" : ""
      }`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleRowClick}
      whileHover={{ 
        backgroundColor: isSelected ? "#E8F0FE" : "#F5F5F5",
        transition: { duration: 0.1 }
      }}
      layout
    >
      <div className="flex items-center p-2 gmail-density-comfortable">
        <div className="flex items-center w-10 flex-shrink-0">
          <div onClick={handleCheckboxClick}>
            <Checkbox 
              checked={isSelected} 
              className="data-[state=checked]:bg-gmail-blue data-[state=checked]:text-white border-gmail-gray" 
            />
          </div>
        </div>
        
        <div 
          className="flex items-center w-8 flex-shrink-0" 
          onClick={handleStarToggle}
        >
          {email.isStarred ? (
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          ) : (
            <StarOff className="h-5 w-5 text-gmail-gray opacity-50" />
          )}
        </div>
        
        <div className="flex-grow min-w-0 flex">
          <div className="w-48 flex-shrink-0 truncate font-medium">
            {email.sender.name}
          </div>
          
          <div className="flex-grow truncate pr-2">
            <span className={email.isRead ? "" : "font-medium"}>
              {email.subject}
            </span>
            {" - "}
            <span className="text-gmail-gray">{email.snippet}</span>
          </div>
          
          {email.attachments.length > 0 && (
            <div className="w-6 flex-shrink-0 flex items-center">
              <Paperclip className="h-4 w-4 text-gmail-gray" />
            </div>
          )}
          
          <div className="w-24 flex-shrink-0 text-right text-xs text-gmail-gray">
            {formattedDate}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailRow;
