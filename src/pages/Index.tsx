
import React from "react";
import GmailLayout from "@/components/layout/GmailLayout";
import EmailList from "@/components/email/EmailList";
import EmailView from "@/components/email/EmailView";
import ComposeEmail from "@/components/email/ComposeEmail";

const Index = () => {
  return (
    <GmailLayout>
      <div className="h-full p-0 relative flex flex-col">
        <EmailList />
        <EmailView />
        <ComposeEmail />
      </div>
    </GmailLayout>
  );
};

export default Index;
