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

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "stormy" | "foggy";
  timestamp: string;
}

export interface CreateUserRequest {
  name: string;
  zipCode: string;
}

export interface UpdateUserRequest {
  name?: string;
  zipCode?: string;
}

export interface GeoLocationData {
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface OpenWeatherResponse {
  coord: {
    lat: number;
    lon: number;
  };
  timezone: number;
  name: string;
  sys: {
    country: string;
  };
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
