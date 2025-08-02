import { WeatherData } from "@/types";

export interface WeatherAvatarProps {
  userName: string;
  weather?: WeatherData;
  size?: "sm" | "md" | "lg";
  className?: string;
}
