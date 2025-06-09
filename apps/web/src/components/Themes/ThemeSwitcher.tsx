"use client";

import { Button } from "@repo/ui/button";
import { useTheme } from "./ThemeContext";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme(); // <- TODO: Get the theme from the context

  return (
    <Button 
      onClick={toggleTheme}
      className={"hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-2"}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </Button>
  );
};

export default ThemeSwitch;
