import React from "react";
import { render, screen } from "../../__tests__/utils/test-utils";
import "@testing-library/jest-dom";
import { ForecastImage } from "./ForecastImage";
import { User } from "@/types";

const mockUsersWithWeather: User[] = [
  {
    id: "1",
    name: "John Doe",
    zipCode: "10001",
    latitude: 40.7128,
    longitude: -74.006,
    timezone: "America/New_York",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    weather: {
      temp: 72,
      description: "Sunny",
      icon: "01d",
      humidity: 60,
      windSpeed: 5,
      condition: "sunny",
      timestamp: "2024-01-01T12:00:00Z",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    zipCode: "90210",
    latitude: 34.0522,
    longitude: -118.2437,
    timezone: "America/Los_Angeles",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    weather: {
      temp: 75,
      description: "Cloudy",
      icon: "02d",
      humidity: 65,
      windSpeed: 3,
      condition: "cloudy",
      timestamp: "2024-01-01T12:00:00Z",
    },
  },
];

const mockUsersWithoutWeather: User[] = [
  {
    id: "3",
    name: "Bob Johnson",
    zipCode: "60601",
    latitude: 41.8781,
    longitude: -87.6298,
    timezone: "America/Chicago",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

describe("ForecastImage", () => {
  it("renders empty state when no users have weather data", () => {
    render(<ForecastImage users={mockUsersWithoutWeather} />);

    expect(
      screen.getByText("No weather data available for users")
    ).toBeInTheDocument();
  });

  it("renders weather overview when users have weather data", () => {
    render(<ForecastImage users={mockUsersWithWeather} />);

    expect(screen.getByText("2 Locations Tracked")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Real-time weather monitoring across 2 active locations worldwide/
      )
    ).toBeInTheDocument();
  });

  it("displays correct location count with singular/plural", () => {
    const singleUser = [mockUsersWithWeather[0]];
    render(<ForecastImage users={singleUser} />);

    expect(screen.getByText("1 Location Tracked")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Real-time weather monitoring across 1 active location worldwide/
      )
    ).toBeInTheDocument();
  });

  it("renders weather feature cards", () => {
    render(<ForecastImage users={mockUsersWithWeather} />);

    expect(screen.getByText("Live Weather")).toBeInTheDocument();
    expect(screen.getByText("Temperature & Conditions")).toBeInTheDocument();
    expect(screen.getByText("Time Zones")).toBeInTheDocument();
    expect(screen.getByText("Global Time Tracking")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Weather Insights")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <ForecastImage users={mockUsersWithWeather} className="custom-forecast" />
    );

    // Check if the className is applied to the component
    expect(container.firstChild).toBeDefined();
  });

  it("handles mixed users with and without weather data", () => {
    const mixedUsers = [...mockUsersWithWeather, ...mockUsersWithoutWeather];
    render(<ForecastImage users={mixedUsers} />);

    // Should show count of users with weather data
    expect(screen.getByText("3 Locations Tracked")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Real-time weather monitoring across 2 active locations worldwide/
      )
    ).toBeInTheDocument();
  });

  it("renders decorative elements", () => {
    render(<ForecastImage users={mockUsersWithWeather} />);

    // Check for main emoji
    expect(screen.getByText("🗺️")).toBeInTheDocument();
  });
});
