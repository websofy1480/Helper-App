"use client";

import { createContext, useContext, useEffect, useState, ReactNode} from "react";

type ThemeType = "default" | "dark" | "high-contrast";

interface AccessibilityContextType {
    fontSize: number;
    setFontSize: (size: number) => void;
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(
    undefined
);


export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
    const [fontSize, setFontSize] = useState<number>(16);
    const [theme, setTheme] = useState<ThemeType>("default");

    // Apply font size
    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`;
        localStorage.setItem("fontSize", fontSize.toString());
    }, [fontSize]);

    // Apply theme
    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Load saved settings
    useEffect(() => {
        const savedFont = localStorage.getItem("fontSize");
        const savedTheme = localStorage.getItem("theme") as ThemeType | null;
        if (savedFont) setFontSize(Number(savedFont));
        if (savedTheme) setTheme(savedTheme);
    }, []);

    return (
        <AccessibilityContext.Provider
            value={{ fontSize, setFontSize, theme, setTheme }}
        >
            {children}
        </AccessibilityContext.Provider>
    );
};

export const useAccessibility = (): AccessibilityContextType => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error("useAccessibility must be used within AccessibilityProvider");
    }
    return context;
};
