import axios from "axios";
import { GeoLocationData, OpenWeatherResponse } from "../types";

export class GeoLocationService {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  private readonly isConfigured: boolean;

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || "";

    // Fix the API key validation logic
    this.isConfigured =
      !!this.apiKey &&
      this.apiKey !== "your_openweather_api_key_here" &&
      this.apiKey !== "your_api_key_here" &&
      this.apiKey.length > 10; // Basic length check for valid API key

    if (!this.isConfigured) {
      console.log(
        "⚠️  OpenWeatherMap API key not configured. Using enhanced mock data with realistic timezones."
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
      // Return mock data with realistic timezones based on zip code patterns
      console.log(`🔸 Using enhanced mock data for zip code: ${zipCode}`);
      return this.getMockDataForZipCode(zipCode);
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

      // Convert timezone offset (seconds) to timezone string with better mapping
      const timezoneString = this.getTimezoneFromOffset(timezone, coord.lon);

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
          console.log(
            "⚠️  OpenWeatherMap API key is invalid. Falling back to mock data."
          );
          return this.getMockDataForZipCode(zipCode);
        }
      }

      console.error("Geo-location service error:", error);
      console.log("🔸 Falling back to mock data due to API error");
      return this.getMockDataForZipCode(zipCode);
    }
  }

  private getMockDataForZipCode(zipCode: string): GeoLocationData {
    // Parse zip code to determine timezone
    const zip = parseInt(zipCode.substring(0, 5));

    let latitude: number;
    let longitude: number;
    let timezone: string;

    // US timezone mapping based on zip code ranges
    if (zip >= 96701 && zip <= 96898) {
      // Hawaii
      latitude = 21.3099 + (Math.random() - 0.5) * 0.5;
      longitude = -157.8581 + (Math.random() - 0.5) * 0.5;
      timezone = "Pacific/Honolulu";
    } else if (zip >= 99501 && zip <= 99950) {
      // Alaska
      latitude = 61.2181 + (Math.random() - 0.5) * 2.0;
      longitude = -149.9003 + (Math.random() - 0.5) * 2.0;
      timezone = "America/Anchorage";
    } else if (
      (zip >= 90001 && zip <= 96162) ||
      (zip >= 97001 && zip <= 99401)
    ) {
      // Pacific Time (CA, WA, OR, NV)
      latitude = 37.7749 + (Math.random() - 0.5) * 8.0;
      longitude = -122.4194 + (Math.random() - 0.5) * 8.0;
      timezone = "America/Los_Angeles";
    } else if (
      (zip >= 80001 && zip <= 89999) ||
      (zip >= 82001 && zip <= 83999)
    ) {
      // Mountain Time (CO, UT, AZ, NM, MT, WY, ID)
      latitude = 39.7392 + (Math.random() - 0.5) * 6.0;
      longitude = -104.9903 + (Math.random() - 0.5) * 6.0;
      timezone = "America/Denver";
    } else if (zip >= 50001 && zip <= 79999) {
      // Central Time (TX, OK, KS, NE, ND, SD, MN, IA, MO, AR, LA, MS, AL, TN, KY, IL, WI, IN, MI)
      latitude = 32.7767 + (Math.random() - 0.5) * 10.0;
      longitude = -96.797 + (Math.random() - 0.5) * 10.0;
      timezone = "America/Chicago";
    } else {
      // Eastern Time (everything else)
      latitude = 40.7128 + (Math.random() - 0.5) * 8.0;
      longitude = -74.006 + (Math.random() - 0.5) * 8.0;
      timezone = "America/New_York";
    }

    return { latitude, longitude, timezone };
  }

  private getTimezoneFromOffset(
    offsetInSeconds: number,
    longitude: number
  ): string {
    // Convert seconds to hours
    const offsetInHours = offsetInSeconds / 3600;

    // Map common US timezone offsets to proper timezone names based on longitude
    if (longitude >= -125 && longitude <= -114) {
      return "America/Los_Angeles"; // Pacific Time
    } else if (longitude >= -114 && longitude <= -104) {
      return "America/Denver"; // Mountain Time
    } else if (longitude >= -104 && longitude <= -87) {
      return "America/Chicago"; // Central Time
    } else if (longitude >= -87 && longitude <= -67) {
      return "America/New_York"; // Eastern Time
    }

    // For other locations, use common timezone mappings
    switch (offsetInHours) {
      case -10:
        return "Pacific/Honolulu"; // Hawaii
      case -9:
        return "America/Anchorage"; // Alaska
      case -8:
        return "America/Los_Angeles"; // Pacific Time
      case -7:
        return "America/Denver"; // Mountain Time
      case -6:
        return "America/Chicago"; // Central Time
      case -5:
        return "America/New_York"; // Eastern Time
      case -4:
        return "America/Caracas"; // Atlantic Time
      default:
        // Fallback to UTC offset format
        const sign = offsetInHours >= 0 ? "+" : "-";
        const absOffset = Math.abs(offsetInHours);
        const hours = Math.floor(absOffset);
        const minutes = Math.floor((absOffset - hours) * 60);
        return `UTC${sign}${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
    }
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
