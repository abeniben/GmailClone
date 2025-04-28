import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGmail } from "@/context/GmailContext";
import EmailRow from "./EmailRow";
import EmailListToolbar from "./EmailListToolbar";
import EmailListTabs from "./EmailListTabs";
import { Email } from "@/data/mockData";
import EmailSkeletonLoader from "./EmailSkeletonLoader";
import { useEmailDragDrop } from "@/hooks/useEmailDragDrop";

const EmailList: React.FC = () => {
  const { state, dispatch } = useGmail();
  const [loading, setLoading] = useState(true);
  const [visibleEmails, setVisibleEmails] = useState<Email[]>([]);
  const [page, setPage] = useState(1);
  const emailsPerPage = 20;

  const { getEmailRowProps } = useEmailDragDrop();

  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      const filteredEmails = state.emails.filter((email) => {
        const categoryMatch = email.category === state.activeCategory;
        const searchMatch = state.searchQuery
          ? email.subject.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            email.sender.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            email.sender.email.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            email.body.toLowerCase().includes(state.searchQuery.toLowerCase())
          : true;
        
        return categoryMatch && searchMatch;
      });
      
      const startIndex = 0;
      const endIndex = page * emailsPerPage;
      setVisibleEmails(filteredEmails.slice(startIndex, endIndex));
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [state.activeCategory, state.emails, state.searchQuery, page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const isEmailSelected = (emailId: string) => {
    return state.selectedEmails.includes(emailId);
  };

  const toggleSelectEmail = (emailId: string) => {
    if (isEmailSelected(emailId)) {
      dispatch({ type: "DESELECT_EMAIL", payload: emailId });
    } else {
      dispatch({ type: "SELECT_EMAIL", payload: emailId });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gmail-dark-card rounded-lg shadow-sm overflow-hidden transition-colors">
      <EmailListToolbar />
      <EmailListTabs />

      <div className="flex-grow overflow-auto" onScroll={handleScroll}>
        <AnimatePresence initial={false}>
          {loading && visibleEmails.length === 0 ? (
            <div className="py-2">
              {[...Array(10)].map((_, i) => (
                <EmailSkeletonLoader key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {visibleEmails.length > 0 ? (
                visibleEmails.map((email) => (
                  <div key={email.id} {...getEmailRowProps(email)}>
                    <EmailRow
                      email={email}
                      isSelected={isEmailSelected(email.id)}
                      onSelect={() => toggleSelectEmail(email.id)}
                    />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-gmail-gray">
                  <img 
                    src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/empty_inbox.png" 
                    alt="Empty inbox" 
                    className="w-32 mb-4"
                  />
                  <p className="text-lg font-medium mb-1">No emails found</p>
                  <p className="text-sm">Try a different search or category</p>
                </div>
              )}

              {loading && visibleEmails.length > 0 && (
                <div className="py-2">
                  {[...Array(3)].map((_, i) => (
                    <EmailSkeletonLoader key={`additional-${i}`} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmailList;
