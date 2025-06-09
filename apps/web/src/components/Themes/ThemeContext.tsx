"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// TODOS:
// 1. Create Theme Provider

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);
  
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      
      localStorage.setItem("theme", newTheme);
      
      document.documentElement.setAttribute("data-theme", newTheme);
     
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 2. Create useTheme hook

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};
// 3. Use the provider in your layout
