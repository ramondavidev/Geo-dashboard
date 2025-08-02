import axios from "axios";
import { GeoLocationData, OpenWeatherResponse } from "../types";

export class GeoLocationService {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  private readonly isConfigured: boolean;

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || "";
    this.isConfigured =
      !!this.apiKey &&
      this.apiKey !== "your_openweather_api_key_here" &&
      this.apiKey !== "your_api_key_here" &&
      this.apiKey.length > 10; // Basic length check for valid API key

    if (!this.isConfigured) {
      console.log(
        "⚠️  OpenWeatherMap API key not configured. Location features will use mock data."
      );
      console.log(
        `   Current API key: "${
          this.apiKey ? this.apiKey.substring(0, 8) + "..." : "not set"
        }"`
      );
    } else {
      console.log("✅ OpenWeatherMap API configured successfully");
    }
  }

  async getLocationDataByZipCode(
    zipCode: string,
    countryCode = "US"
  ): Promise<GeoLocationData> {
    if (!this.isConfigured) {
      // Return mock data when API key is not configured
      console.log(`🔸 Using mock data for zip code: ${zipCode}`);
      return {
        latitude: 40.7128 + (Math.random() - 0.5) * 0.1, // Random around NYC
        longitude: -74.006 + (Math.random() - 0.5) * 0.1,
        timezone: "America/New_York",
      };
    }

    try {
      console.log(`🌍 Fetching real geo data for zip code: ${zipCode}`);
      const response = await axios.get<OpenWeatherResponse>(`${this.baseUrl}`, {
        params: {
          zip: `${zipCode},${countryCode}`,
          appid: this.apiKey,
        },
        timeout: 10000, // 10 second timeout
      });

      const { coord, timezone } = response.data;

      // Convert timezone offset (seconds) to proper timezone name
      const timezoneString = this.getTimezoneFromCoordinates(
        coord.lat,
        coord.lon,
        timezone
      );

      console.log(
        `✅ Retrieved geo data: lat=${coord.lat}, lon=${coord.lon}, timezone=${timezoneString}`
      );

      return {
        latitude: coord.lat,
        longitude: coord.lon,
        timezone: timezoneString,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`Invalid zip code: ${zipCode}`);
        }
        if (error.response?.status === 401) {
          throw new Error("Invalid OpenWeatherMap API key");
        }
      }

      console.error("Geo-location service error:", error);
      throw new Error("Failed to fetch location data. Please try again later.");
    }
  }

  private getTimezoneFromCoordinates(
    lat: number,
    lon: number,
    offsetInSeconds: number
  ): string {
    // Convert seconds to hours
    const offsetInHours = offsetInSeconds / 3600;

    // Map common US timezone offsets to proper timezone names
    const timezoneMap: { [key: number]: string } = {
      [-10]: "Pacific/Honolulu", // Hawaii
      [-9]: "America/Anchorage", // Alaska
      [-8]: "America/Los_Angeles", // Pacific Time
      [-7]: "America/Denver", // Mountain Time
      [-6]: "America/Chicago", // Central Time
      [-5]: "America/New_York", // Eastern Time
      [-4]: "America/Caracas", // Atlantic Time
    };

    // Try to find a matching timezone name
    if (timezoneMap[offsetInHours]) {
      return timezoneMap[offsetInHours];
    }

    // For coordinates, we can make educated guesses based on longitude
    if (lon >= -125 && lon <= -114) {
      return "America/Los_Angeles"; // Pacific Time
    } else if (lon >= -114 && lon <= -104) {
      return "America/Denver"; // Mountain Time
    } else if (lon >= -104 && lon <= -87) {
      return "America/Chicago"; // Central Time
    } else if (lon >= -87 && lon <= -67) {
      return "America/New_York"; // Eastern Time
    }

    // Fallback to UTC offset format
    const sign = offsetInHours >= 0 ? "+" : "-";
    const absOffset = Math.abs(offsetInHours);
    const hours = Math.floor(absOffset);
    const minutes = Math.floor((absOffset - hours) * 60);

    return `UTC${sign}${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  async validateZipCode(zipCode: string): Promise<boolean> {
    try {
      await this.getLocationDataByZipCode(zipCode);
      return true;
    } catch {
      return false;
    }
  }
}
