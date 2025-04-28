
import React, { ReactNode } from "react";
import GmailHeader from "./GmailHeader";
import GmailSidebar from "./GmailSidebar";
import { GmailProvider } from "@/context/GmailContext";

interface GmailLayoutProps {
  children: ReactNode;
}

const GmailLayout: React.FC<GmailLayoutProps> = ({ children }) => {
  return (
    <GmailProvider>
      <div className="min-h-screen flex flex-col bg-gmail-background">
        <GmailHeader />
        <div className="flex flex-grow overflow-hidden">
          <GmailSidebar />
          <main className="flex-grow overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </GmailProvider>
  );
};

export default GmailLayout;
