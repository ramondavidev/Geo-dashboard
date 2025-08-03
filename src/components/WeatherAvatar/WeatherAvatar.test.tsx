import React from "react";
import { render, screen } from "../../__tests__/utils/test-utils";
import "@testing-library/jest-dom";
import { WeatherAvatar } from "./WeatherAvatar";
import { WeatherData } from "@/types";

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

// Mock the utility functions
jest.mock("./WeatherAvatar.utils", () => ({
  getInitials: (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  },
  createRainDrops: () => <div data-testid="rain-drops">Rain</div>,
  createSnowFlakes: () => <div data-testid="snow-flakes">Snow</div>,
}));

const mockWeatherData: WeatherData = {
  temp: 72,
  description: "Sunny",
  icon: "01d",
  humidity: 60,
  windSpeed: 5,
  condition: "sunny",
  timestamp: "2024-01-01T12:00:00Z",
};

describe("WeatherAvatar", () => {
  it("renders user initials correctly", () => {
    render(<WeatherAvatar userName="John Doe" weather={mockWeatherData} />);

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders sunny avatar by default", () => {
    render(
      <WeatherAvatar
        userName="John Doe"
        weather={{ ...mockWeatherData, condition: "sunny" }}
      />
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders rainy avatar with rain overlay", () => {
    render(
      <WeatherAvatar
        userName="John Doe"
        weather={{ ...mockWeatherData, condition: "rainy" }}
      />
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.getByTestId("rain-drops")).toBeInTheDocument();
  });

  it("renders snowy avatar with snow overlay", () => {
    render(
      <WeatherAvatar
        userName="John Doe"
        weather={{ ...mockWeatherData, condition: "snowy" }}
      />
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.getByTestId("snow-flakes")).toBeInTheDocument();
  });

  it("renders cloudy avatar", () => {
    render(
      <WeatherAvatar
        userName="John Doe"
        weather={{ ...mockWeatherData, condition: "cloudy" }}
      />
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders stormy avatar with rain and cloud overlay", () => {
    render(
      <WeatherAvatar
        userName="John Doe"
        weather={{ ...mockWeatherData, condition: "stormy" }}
      />
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.getByTestId("rain-drops")).toBeInTheDocument();
  });

  it("renders foggy avatar", () => {
    render(
      <WeatherAvatar
        userName="John Doe"
        weather={{ ...mockWeatherData, condition: "foggy" }}
      />
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("handles single name correctly", () => {
    render(<WeatherAvatar userName="John" weather={mockWeatherData} />);

    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("handles three names correctly", () => {
    render(
      <WeatherAvatar userName="John Michael Doe" weather={mockWeatherData} />
    );

    expect(screen.getByText("JMD")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <WeatherAvatar
        userName="John Doe"
        weather={mockWeatherData}
        className="custom-avatar"
      />
    );

    expect(container.firstChild).toHaveClass("custom-avatar");
  });

  it("handles undefined weather condition", () => {
    const weatherWithoutCondition = { ...mockWeatherData };
    delete (weatherWithoutCondition as Partial<WeatherData>).condition;

    render(
      <WeatherAvatar
        userName="John Doe"
        weather={weatherWithoutCondition as WeatherData}
      />
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("handles different sizes", () => {
    render(
      <WeatherAvatar userName="John Doe" weather={mockWeatherData} size="lg" />
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
  });
});
