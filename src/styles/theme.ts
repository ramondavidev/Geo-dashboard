export const theme = {
  __brand: "DefaultTheme" as const,
  colors: {
    primary: "#3B82F6",
    primaryHover: "#2563EB",
    secondary: "#10B981",
    secondaryHover: "#059669",
    danger: "#EF4444",
    dangerHover: "#DC2626",
    warning: "#F59E0B",
    warningHover: "#D97706",

    // Neutrals
    white: "#FFFFFF",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",

    // Background
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceHover: "#F1F5F9",

    // Text
    textPrimary: "#1E293B",
    textSecondary: "#64748B",
    textMuted: "#94A3B8",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  transitions: {
    fast: "0.15s ease",
    medium: "0.3s ease",
    slow: "0.5s ease",
  },

  breakpoints: {
    mobile: "640px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
  },

  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },

  fontWeights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  lineHeights: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
};

export type Theme = typeof theme;
