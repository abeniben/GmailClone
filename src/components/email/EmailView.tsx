
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGmail } from "@/context/GmailContext";
import { 
  ArrowLeft, Star, Reply, Forward, MoreVertical, 
  Printer, Trash2, Archive, Tag, Clock, ChevronLeft, 
  ChevronRight, StarOff, Paperclip
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

const EmailView: React.FC = () => {
  const { state, dispatch } = useGmail();
  
  if (!state.currentEmail) return null;
  
  const handleBackToList = () => {
    dispatch({ type: "TOGGLE_READING", payload: false });
    dispatch({ type: "SET_CURRENT_EMAIL", payload: null });
  };
  
  const handleStarToggle = () => {
    if (state.currentEmail) {
      if (state.currentEmail.isStarred) {
        dispatch({ type: "UNSTAR_EMAIL", payload: state.currentEmail.id });
      } else {
        dispatch({ type: "STAR_EMAIL", payload: state.currentEmail.id });
      }
    }
  };
  
  const handleDelete = () => {
    if (state.currentEmail) {
      dispatch({ type: "DELETE_EMAILS", payload: [state.currentEmail.id] });
      handleBackToList();
    }
  };
  
  const handleArchive = () => {
    if (state.currentEmail) {
      dispatch({ type: "ARCHIVE_EMAILS", payload: [state.currentEmail.id] });
      handleBackToList();
    }
  };
  
  return (
    <AnimatePresence>
      {state.isReading && state.currentEmail && (
        <motion.div
          className="fixed inset-0 bg-white z-10 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Email view toolbar */}
          <div className="sticky top-0 bg-white z-10 border-b border-gmail-border flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-2">
              <button className="gmail-icon-button" onClick={handleBackToList}>
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <button className="gmail-icon-button" onClick={handleArchive}>
                <Archive className="h-5 w-5" />
              </button>
              
              <button className="gmail-icon-button" onClick={handleDelete}>
                <Trash2 className="h-5 w-5" />
              </button>
              
              <button className="gmail-icon-button">
                <Clock className="h-5 w-5" />
              </button>
              
              <button className="gmail-icon-button">
                <Tag className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="gmail-icon-button">
                <Printer className="h-5 w-5" />
              </button>
              
              <div className="flex items-center text-xs text-gmail-gray">
                <span>1 of 143</span>
                <button className="gmail-icon-button ml-1">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="gmail-icon-button">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Email header */}
          <div className="px-16 py-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-medium">{state.currentEmail.subject}</h1>
              
              <div className="flex items-center space-x-2">
                <button className="gmail-icon-button" onClick={handleStarToggle}>
                  {state.currentEmail.isStarred ? (
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ) : (
                    <StarOff className="h-5 w-5 text-gmail-gray" />
                  )}
                </button>
                
                <button className="gmail-icon-button">
                  <Reply className="h-5 w-5" />
                </button>
                
                <button className="gmail-icon-button">
                  <Forward className="h-5 w-5" />
                </button>
                
                <button className="gmail-icon-button">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Sender info */}
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                <img 
                  src={state.currentEmail.sender.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(state.currentEmail.sender.name)}&background=random`} 
                  alt={state.currentEmail.sender.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{state.currentEmail.sender.name}</span>
                    <span className="text-gmail-gray ml-2 text-sm">
                      {`<${state.currentEmail.sender.email}>`}
                    </span>
                  </div>
                  
                  <div className="text-gmail-gray text-sm">
                    {format(new Date(state.currentEmail.timestamp), "MMM d, yyyy, h:mm aa")}
                    <span className="ml-2 text-xs">
                      ({formatDistanceToNow(new Date(state.currentEmail.timestamp), { addSuffix: true })})
                    </span>
                  </div>
                </div>
                
                <div className="text-sm text-gmail-gray mt-1">
                  to me
                </div>
              </div>
            </div>
            
            {/* Email body */}
            <div className="prose prose-sm max-w-none mt-8">
              <div dangerouslySetInnerHTML={{ __html: state.currentEmail.body.replace(/\n/g, "<br />") }} />
            </div>
            
            {/* Attachments */}
            {state.currentEmail.attachments.length > 0 && (
              <div className="mt-8 border-t border-gmail-border pt-4">
                <div className="text-sm font-medium mb-2">
                  {state.currentEmail.attachments.length} Attachment{state.currentEmail.attachments.length > 1 ? "s" : ""}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {state.currentEmail.attachments.map((attachment) => (
                    <div 
                      key={attachment.id}
                      className="border border-gmail-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 w-48"
                    >
                      <div className="bg-gmail-lightGray h-24 flex items-center justify-center">
                        <Paperclip className="h-8 w-8 text-gmail-gray" />
                      </div>
                      
                      <div className="p-2">
                        <div className="text-sm font-medium truncate">
                          {attachment.name}
                        </div>
                        <div className="text-xs text-gmail-gray flex justify-between mt-1">
                          <span>{attachment.type}</span>
                          <span>{attachment.size}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Reply section */}
            <div className="mt-8 pt-4">
              <button className="gmail-icon-button p-3 hover:bg-gmail-lightGray">
                <Reply className="h-5 w-5 mr-2" />
                <span>Reply</span>
              </button>
              
              <button className="gmail-icon-button p-3 hover:bg-gmail-lightGray ml-2">
                <Forward className="h-5 w-5 mr-2" />
                <span>Forward</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailView;
