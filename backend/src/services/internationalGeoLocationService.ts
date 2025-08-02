import axios from "axios";
import { GeoLocationData, OpenWeatherResponse } from "../types";

export class InternationalGeoLocationService {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  private readonly isConfigured: boolean;

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || "";
    this.isConfigured =
      !!this.apiKey &&
      this.apiKey !== "your_openweather_api_key_here" &&
      this.apiKey !== "your_api_key_here" &&
      this.apiKey.length > 10;

    if (!this.isConfigured) {
      console.log(
        "⚠️  OpenWeatherMap API key not configured. Using enhanced international mock data."
      );
    } else {
      console.log("✅ OpenWeatherMap API configured for international use");
    }
  }

  async getLocationDataByPostalCode(
    postalCode: string,
    countryCode = "US"
  ): Promise<GeoLocationData> {
    if (!this.isConfigured) {
      console.log(
        `🔸 Using enhanced mock data for postal code: ${postalCode}, country: ${countryCode}`
      );
      return this.getMockDataForCountry(postalCode, countryCode);
    }

    try {
      // First try with postal code (works for US, UK, CA)
      console.log(
        `🌍 Fetching real geo data for postal code: ${postalCode}, country: ${countryCode}`
      );

      let response;
      try {
        response = await axios.get<OpenWeatherResponse>(`${this.baseUrl}`, {
          params: {
            zip: `${postalCode},${countryCode}`,
            appid: this.apiKey,
          },
          timeout: 10000,
        });
      } catch {
        // If zip code fails, try to get city from postal code mapping
        console.log(
          `🔄 Zip code failed, trying city lookup for ${countryCode}`
        );
        const cityName = this.getCityFromPostalCode(postalCode, countryCode);

        response = await axios.get<OpenWeatherResponse>(`${this.baseUrl}`, {
          params: {
            q: `${cityName},${countryCode}`,
            appid: this.apiKey,
          },
          timeout: 10000,
        });
      }

      const { coord } = response.data;
      const timezoneString = this.getTimezoneFromCoordinates(
        coord.lat,
        coord.lon,
        countryCode
      );

      console.log(
        `✅ Retrieved international geo data: lat=${coord.lat}, lon=${coord.lon}, timezone=${timezoneString}`
      );

      return {
        latitude: coord.lat,
        longitude: coord.lon,
        timezone: timezoneString,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(
            `Invalid postal code or city not found: ${postalCode} in ${countryCode}`
          );
        }
        if (error.response?.status === 401) {
          console.log(
            "⚠️  OpenWeatherMap API key is invalid. Falling back to mock data."
          );
          return this.getMockDataForCountry(postalCode, countryCode);
        }
      }

      console.error("International geo-location service error:", error);
      console.log("🔸 Falling back to mock data due to API error");
      return this.getMockDataForCountry(postalCode, countryCode);
    }
  }

  private getCityFromPostalCode(
    postalCode: string,
    countryCode: string
  ): string {
    // Simple mapping for demonstration - in production, you'd use a postal code database
    const cityMappings: Record<string, Record<string, string>> = {
      BR: {
        "01310-100": "Sao Paulo",
        "20040-020": "Rio de Janeiro",
        "70040-010": "Brasilia",
        "40070-110": "Salvador",
        "80010-000": "Curitiba",
      },
      MX: {
        "01000": "Mexico City",
        "44100": "Guadalajara",
        "64000": "Monterrey",
      },
      AR: {
        C1002: "Buenos Aires",
        X5000: "Cordoba",
        S2000: "Rosario",
      },
      DE: {
        "10115": "Berlin",
        "80331": "Munich",
        "20095": "Hamburg",
      },
      FR: {
        "75001": "Paris",
        "69001": "Lyon",
        "13001": "Marseille",
      },
    };

    const countryMapping = cityMappings[countryCode];
    if (countryMapping && countryMapping[postalCode]) {
      return countryMapping[postalCode];
    }

    // Fallback to capital cities
    const capitals: Record<string, string> = {
      BR: "Sao Paulo",
      MX: "Mexico City",
      AR: "Buenos Aires",
      DE: "Berlin",
      FR: "Paris",
      JP: "Tokyo",
      IN: "Mumbai",
      AU: "Sydney",
      CA: "Toronto",
      GB: "London",
    };

    return capitals[countryCode] || "New York";
  }

  private getMockDataForCountry(
    postalCode: string,
    countryCode: string
  ): GeoLocationData {
    // Enhanced mock data with international coverage
    const countryData: Record<
      string,
      { lat: number; lon: number; timezone: string }
    > = {
      BR: { lat: -23.5475, lon: -46.6361, timezone: "America/Sao_Paulo" },
      MX: { lat: 19.4326, lon: -99.1332, timezone: "America/Mexico_City" },
      AR: {
        lat: -34.6037,
        lon: -58.3816,
        timezone: "America/Argentina/Buenos_Aires",
      },
      DE: { lat: 52.52, lon: 13.405, timezone: "Europe/Berlin" },
      FR: { lat: 48.8566, lon: 2.3522, timezone: "Europe/Paris" },
      GB: { lat: 51.5074, lon: -0.1278, timezone: "Europe/London" },
      JP: { lat: 35.6762, lon: 139.6503, timezone: "Asia/Tokyo" },
      IN: { lat: 19.076, lon: 72.8777, timezone: "Asia/Kolkata" },
      AU: { lat: -33.8688, lon: 151.2093, timezone: "Australia/Sydney" },
      CA: { lat: 43.6532, lon: -79.3832, timezone: "America/Toronto" },
      US: { lat: 40.7128, lon: -74.006, timezone: "America/New_York" },
    };

    const defaultData = {
      lat: 40.7128,
      lon: -74.006,
      timezone: "America/New_York",
    };
    const data = countryData[countryCode] || defaultData;

    // Add some randomness to coordinates for variety
    return {
      latitude: data.lat + (Math.random() - 0.5) * 2.0,
      longitude: data.lon + (Math.random() - 0.5) * 2.0,
      timezone: data.timezone,
    };
  }

  private getTimezoneFromCoordinates(
    lat: number,
    lon: number,
    countryCode: string
  ): string {
    // Enhanced timezone mapping based on coordinates and country
    const timezoneMap: Record<string, (lat: number, lon: number) => string> = {
      BR: (lat, lon) => {
        if (lon > -41) return "America/Fortaleza"; // UTC-3 (Eastern Brazil)
        if (lon > -52) return "America/Sao_Paulo"; // UTC-3 (Central Brazil)
        if (lon > -68) return "America/Cuiaba"; // UTC-4 (Western Brazil)
        return "America/Rio_Branco"; // UTC-5 (Acre)
      },

      MX: (lat, lon) => {
        if (lon > -90) return "America/Cancun"; // Eastern Mexico
        if (lon > -103) return "America/Mexico_City"; // Central Mexico
        if (lon > -108) return "America/Mazatlan"; // Mountain Mexico
        return "America/Tijuana"; // Pacific Mexico
      },

      AR: () => "America/Argentina/Buenos_Aires", // Argentina uses single timezone

      DE: () => "Europe/Berlin", // Germany uses single timezone

      FR: () => "Europe/Paris", // France mainland uses single timezone

      US: (lat, lon) => {
        if (lon >= -125 && lon <= -114) return "America/Los_Angeles"; // Pacific
        if (lon >= -114 && lon <= -104) return "America/Denver"; // Mountain
        if (lon >= -104 && lon <= -87) return "America/Chicago"; // Central
        return "America/New_York"; // Eastern
      },
    };

    const mapFunction = timezoneMap[countryCode];
    if (mapFunction) {
      return mapFunction(lat, lon);
    }

    // Default fallback based on longitude for unknown countries
    if (lon >= -180 && lon < -120) return "Pacific/Honolulu";
    if (lon >= -120 && lon < -90) return "America/Los_Angeles";
    if (lon >= -90 && lon < -60) return "America/Chicago";
    if (lon >= -60 && lon < -30) return "America/New_York";
    if (lon >= -30 && lon < 30) return "Europe/London";
    if (lon >= 30 && lon < 90) return "Europe/Moscow";
    if (lon >= 90 && lon < 150) return "Asia/Tokyo";
    return "Pacific/Auckland";
  }

  async validatePostalCode(
    postalCode: string,
    countryCode = "US"
  ): Promise<boolean> {
    try {
      await this.getLocationDataByPostalCode(postalCode, countryCode);
      return true;
    } catch {
      return false;
    }
  }
}
