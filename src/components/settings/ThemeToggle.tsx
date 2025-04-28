
import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useGmail } from "@/context/GmailContext";

const ThemeToggle: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const { state, dispatch } = useGmail();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: { theme: newTheme as "light" | "dark" },
    });
  };

  return (
    <motion.button
      className="relative h-8 w-14 rounded-full bg-gmail-lightGray flex items-center p-1"
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="h-6 w-6 rounded-full bg-white shadow-md flex items-center justify-center"
        animate={{ x: theme === "light" ? 0 : 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {theme === "light" ? (
          <Sun className="h-4 w-4 text-yellow-500" />
        ) : (
          <Moon className="h-4 w-4 text-blue-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
