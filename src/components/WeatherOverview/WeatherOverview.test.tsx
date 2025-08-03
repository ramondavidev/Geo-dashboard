import React from "react";
import { render, screen } from "../../__tests__/utils/test-utils";
import "@testing-library/jest-dom";
import { WeatherOverview } from "./WeatherOverview";
import { WeatherStats } from "./WeatherOverview.types";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock react-icons
jest.mock("react-icons/fa", () => ({
  FaThermometerHalf: () => (
    <div data-testid="thermometer-icon">Thermometer</div>
  ),
  FaTemperatureHigh: () => (
    <div data-testid="temperature-high-icon">Temperature High</div>
  ),
  FaUsers: () => <div data-testid="users-icon">Users</div>,
  FaChartPie: () => <div data-testid="chart-pie-icon">Chart Pie</div>,
}));

// Mock the utility functions
jest.mock("./WeatherOverview.utils", () => ({
  formatTemperature: (temp: number) => `${temp}°F`,
  calculateConditionData: (
    _conditionCounts: Record<string, number>,
    _totalUsers: number
  ) => [
    {
      condition: "sunny",
      count: 2,
      percentage: 50,
      icon: "☀️",
      color: "#F59E0B",
    },
    {
      condition: "cloudy",
      count: 2,
      percentage: 50,
      icon: "☁️",
      color: "#6B7280",
    },
  ],
  getWeatherIcon: (_condition: string) => "☀️",
}));

const mockWeatherStats: WeatherStats = {
  avgTemp: 72,
  mostCommonCondition: "sunny",
  totalUsers: 4,
  conditionCounts: {
    sunny: 2,
    cloudy: 2,
  },
  temperatureRange: {
    min: 65,
    max: 80,
  },
};

describe("WeatherOverview", () => {
  it("renders empty state when no weather stats", () => {
    render(
      <WeatherOverview
        weatherStats={null as unknown as WeatherStats}
        totalUsers={0}
      />
    );

    expect(screen.getByText("Weather Overview")).toBeInTheDocument();
    expect(screen.getByText("🌍")).toBeInTheDocument();
    expect(
      screen.getByText("No weather data available yet")
    ).toBeInTheDocument();
  });

  it("renders empty state when totalUsers is 0", () => {
    const emptyStats = { ...mockWeatherStats, totalUsers: 0 };
    render(<WeatherOverview weatherStats={emptyStats} totalUsers={0} />);

    expect(
      screen.getByText("No weather data available yet")
    ).toBeInTheDocument();
  });

  it("renders weather stats correctly", () => {
    render(<WeatherOverview weatherStats={mockWeatherStats} totalUsers={5} />);

    expect(screen.getByText("Weather Overview")).toBeInTheDocument();
    expect(screen.getByText("72°F")).toBeInTheDocument();
  });

  it("displays weather icons", () => {
    render(<WeatherOverview weatherStats={mockWeatherStats} totalUsers={5} />);

    expect(screen.getByTestId("thermometer-icon")).toBeInTheDocument();
    expect(screen.getByTestId("temperature-high-icon")).toBeInTheDocument();
    expect(screen.getByTestId("users-icon")).toBeInTheDocument();
    expect(screen.getByTestId("chart-pie-icon")).toBeInTheDocument();
  });

  it("calculates coverage percentage correctly", () => {
    render(<WeatherOverview weatherStats={mockWeatherStats} totalUsers={5} />);

    // Coverage should be (4/5) * 100 = 80%
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("displays condition data", () => {
    render(<WeatherOverview weatherStats={mockWeatherStats} totalUsers={5} />);

    expect(screen.getByText("sunny")).toBeInTheDocument();
    expect(screen.getByText("cloudy")).toBeInTheDocument();
    expect(screen.getAllByText("2 users")).toHaveLength(2); // Both conditions show 2 users
  });

  it("applies custom className", () => {
    const { container } = render(
      <WeatherOverview
        weatherStats={mockWeatherStats}
        totalUsers={5}
        className="custom-overview"
      />
    );

    expect(container.firstChild).toHaveClass("custom-overview");
  });

  it("handles edge case with 100% coverage", () => {
    render(<WeatherOverview weatherStats={mockWeatherStats} totalUsers={4} />);

    // Coverage should be (4/4) * 100 = 100%
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders title with emoji", () => {
    render(<WeatherOverview weatherStats={mockWeatherStats} totalUsers={5} />);

    expect(screen.getByText("🌤️")).toBeInTheDocument();
    expect(screen.getByText("Weather Overview")).toBeInTheDocument();
  });
});
