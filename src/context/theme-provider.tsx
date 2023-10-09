// src/ThemeProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Theme,
} from "@mui/material";
type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

type ProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ProviderProps) => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#f8f4f4",
        light: "#DFDFDF",
        dark: "#00A3FF",
        contrastText: "#515151",
      },
      secondary: {
        main: "#FFFFFF",
        light: "#A0A0A0",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#121212",
        light: "#181818",
        dark: "#00A3FF",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#323232",
        light: "#A0A0A0",
      },
    },
  });

  const theme: Theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
