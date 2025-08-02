import { WeatherData } from "@/types";

interface OpenWeatherMapResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.openweathermap.org/data/2.5/weather";

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "";
  }

  private getWeatherCondition(description: string): WeatherData["condition"] {
    const desc = description.toLowerCase();
    if (desc.includes("rain") || desc.includes("drizzle")) return "rainy";
    if (desc.includes("snow") || desc.includes("sleet")) return "snowy";
    if (desc.includes("storm") || desc.includes("thunder")) return "stormy";
    if (desc.includes("cloud") || desc.includes("overcast")) return "cloudy";
    if (desc.includes("fog") || desc.includes("mist")) return "foggy";
    return "sunny";
  }

  private generateMockWeather(
    latitude: number,
    longitude: number
  ): WeatherData {
    // Generate deterministic mock data based on coordinates
    const seed = Math.abs(latitude + longitude);
    const temp = 45 + (seed % 50); // Temperature between 45-95°F
    const conditions = ["sunny", "cloudy", "rainy", "snowy"] as const;
    const descriptions = {
      sunny: "Clear sky",
      cloudy: "Partly cloudy",
      rainy: "Light rain",
      snowy: "Light snow",
    };

    const conditionIndex = Math.floor(seed) % conditions.length;
    const condition = conditions[conditionIndex];

    return {
      temp,
      description: descriptions[condition],
      icon:
        condition === "sunny"
          ? "01d"
          : condition === "cloudy"
          ? "02d"
          : condition === "rainy"
          ? "10d"
          : "13d",
      humidity: 40 + (Math.floor(seed * 2) % 40), // 40-80%
      windSpeed: 5 + (Math.floor(seed * 3) % 15), // 5-20 mph
      condition,
      timestamp: new Date().toISOString(),
    };
  }

  async getWeatherByCoordinates(
    latitude: number,
    longitude: number
  ): Promise<WeatherData> {
    if (!this.apiKey || this.apiKey === "your_api_key_here") {
      console.log("🔸 Using mock weather data - API key not configured");
      return this.generateMockWeather(latitude, longitude);
    }

    try {
      const response = await fetch(
        `${this.baseUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=imperial`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data: OpenWeatherMapResponse = await response.json();

      return {
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        condition: this.getWeatherCondition(data.weather[0].description),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      console.log("🔸 Falling back to mock weather data");
      return this.generateMockWeather(latitude, longitude);
    }
  }

  async getWeatherForMultipleLocations(
    coordinates: Array<{ lat: number; lng: number; id: string }>
  ): Promise<Map<string, WeatherData>> {
    const weatherMap = new Map<string, WeatherData>();

    // Process in batches to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < coordinates.length; i += batchSize) {
      const batch = coordinates.slice(i, i + batchSize);

      const promises = batch.map(async ({ lat, lng, id }) => {
        const weather = await this.getWeatherByCoordinates(lat, lng);
        return { id, weather };
      });

      const results = await Promise.all(promises);
      results.forEach(({ id, weather }) => {
        weatherMap.set(id, weather);
      });

      // Small delay between batches
      if (i + batchSize < coordinates.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return weatherMap;
  }
}

export const weatherService = new WeatherService();
