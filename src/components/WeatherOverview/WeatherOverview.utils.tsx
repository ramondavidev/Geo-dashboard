import React from "react";
import { WeatherConditionData } from "./WeatherOverview.types";

// Weather condition icons using Unicode symbols
export const weatherIcons: Record<string, string> = {
  sunny: "☀️",
  cloudy: "☁️",
  rainy: "🌧️",
  snowy: "🌨️",
  stormy: "⛈️",
  foggy: "🌫️",
  clear: "☀️",
  partlycloudy: "⛅",
  overcast: "☁️",
  drizzle: "🌦️",
  thunderstorm: "⛈️",
  mist: "🌫️",
  haze: "🌫️",
};

// Minimal SVG icons for better consistency
export const weatherSvgIcons: Record<string, React.ReactElement> = {
  sunny: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41" />
    </svg>
  ),
  cloudy: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  rainy: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      <path
        d="M8 19v2M8 13v2M16 19v2M16 13v2M12 21v2M12 15v2"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
      />
    </svg>
  ),
  snowy: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      <circle cx="8" cy="17" r="1" />
      <circle cx="8" cy="21" r="1" />
      <circle cx="16" cy="17" r="1" />
      <circle cx="16" cy="21" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  ),
  stormy: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      <path
        d="M13 16l-3 5 3-3 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),
  foggy: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M4 14h16M4 18h12M4 10h10" />
    </svg>
  ),
};

// Get weather condition color based on type
export const getWeatherColor = (condition: string): string => {
  const colors: Record<string, string> = {
    sunny: "#F59E0B",
    clear: "#F59E0B",
    cloudy: "#6B7280",
    overcast: "#4B5563",
    partlycloudy: "#94A3B8",
    rainy: "#3B82F6",
    drizzle: "#60A5FA",
    snowy: "#E5E7EB",
    stormy: "#7C3AED",
    thunderstorm: "#7C3AED",
    foggy: "#9CA3AF",
    mist: "#9CA3AF",
    haze: "#9CA3AF",
  };

  return colors[condition.toLowerCase()] || "#6B7280";
};

// Format temperature with proper unit
export const formatTemperature = (
  temp: number,
  unit: string = "°F"
): string => {
  return `${Math.round(temp)}${unit}`;
};

// Calculate percentage for condition distribution
export const calculateConditionData = (
  conditions: Record<string, number>,
  total: number
): WeatherConditionData[] => {
  return Object.entries(conditions)
    .map(([condition, count]) => ({
      condition,
      count,
      percentage: Math.round((count / total) * 100),
      icon: weatherIcons[condition.toLowerCase()] || weatherIcons.sunny,
      color: getWeatherColor(condition),
    }))
    .sort((a, b) => b.count - a.count);
};

// Get appropriate icon (Unicode or SVG)
export const getWeatherIcon = (
  condition: string,
  type: "unicode" | "svg" = "unicode"
) => {
  const normalizedCondition = condition.toLowerCase();

  if (type === "svg") {
    return weatherSvgIcons[normalizedCondition] || weatherSvgIcons.sunny;
  }

  return weatherIcons[normalizedCondition] || weatherIcons.sunny;
};
