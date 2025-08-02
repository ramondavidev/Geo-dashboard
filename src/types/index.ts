export interface User {
  id: string;
  name: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  createdAt: string;
  updatedAt: string;
  weather?: WeatherData;
}

export interface CreateUserRequest {
  name: string;
  zipCode: string;
}

export interface UpdateUserRequest {
  name?: string;
  zipCode?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface MapMarker {
  id: string;
  position: [number, number];
  user: User;
}

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "stormy" | "foggy";
  timestamp: string;
}

export interface HeatmapData {
  lat: number;
  lng: number;
  intensity: number;
}

export interface TimeZoneInfo {
  timezone: string;
  localTime: string;
  offset: string;
  abbreviation: string;
}
