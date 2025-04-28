
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, X, User, Bell, Inbox, 
  Mail, Layout, Calendar, Clock
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import DensitySelector from "./DensitySelector";

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-4 border-b border-gmail-border flex items-center justify-between">
              <h2 className="text-xl font-medium">Settings</h2>
              <button className="gmail-icon-button" onClick={onClose}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Display Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Theme</span>
                    <ThemeToggle />
                  </div>
                  
                  <DensitySelector />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Quick Settings</h3>
                
                <div className="space-y-2">
                  <SettingsMenuItem icon={<Inbox className="h-5 w-5" />} label="Inbox type" value="Default" />
                  <SettingsMenuItem icon={<User className="h-5 w-5" />} label="Profile picture" value="Change" />
                  <SettingsMenuItem icon={<Bell className="h-5 w-5" />} label="Notifications" value="On" />
                  <SettingsMenuItem icon={<Layout className="h-5 w-5" />} label="Reading pane" value="Right" />
                  <SettingsMenuItem icon={<Mail className="h-5 w-5" />} label="Email threading" value="On" />
                  <SettingsMenuItem icon={<Calendar className="h-5 w-5" />} label="Calendar integration" value="On" />
                  <SettingsMenuItem icon={<Clock className="h-5 w-5" />} label="Auto-advance" value="Next" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Labels</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm p-2 hover:bg-gmail-hover rounded">
                    <span>Manage labels</span>
                    <span className="text-gmail-blue">Edit</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-2 hover:bg-gmail-hover rounded">
                    <span>Create new label</span>
                    <span className="text-gmail-blue">Create</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gmail-border text-center text-xs text-gmail-gray">
                <p>Terms · Privacy · Program Policies</p>
                <p className="mt-1">Last account activity: Today</p>
                <p className="mt-1">Demo Version · 2025</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface SettingsMenuItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gmail-hover rounded">
      <div className="flex items-center">
        <span className="mr-3 text-gmail-gray">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm text-gmail-blue">{value}</span>
    </div>
  );
};

export default SettingsMenu;
