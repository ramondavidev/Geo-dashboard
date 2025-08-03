import React from "react";
import { render, screen, act } from "../../__tests__/utils/test-utils";
import "@testing-library/jest-dom";
import { TimeZoneClock } from "./TimeZoneClock";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  },
}));

// Mock the utility functions
jest.mock("./TimeZoneClock.utils", () => ({
  getTimeZoneInfo: (_timezone: string) => ({
    localTime: new Date("2024-01-01T12:00:00Z"),
    offset: "-05:00",
    abbreviation: "EST",
    isDST: false,
  }),
  formatTime: (time: Date, showSeconds: boolean) => {
    if (showSeconds) {
      return "12:00:00 PM";
    }
    return "12:00 PM";
  },
  formatDate: (_timezone: string) => "January 1, 2024",
}));

describe("TimeZoneClock", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders user name correctly", () => {
    render(
      <TimeZoneClock 
        timezone="America/New_York" 
        userName="John Doe" 
      />
    );
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("truncates long user names", () => {
    render(
      <TimeZoneClock 
        timezone="America/New_York" 
        userName="This is a very long username that should be truncated" 
      />
    );
    
    expect(screen.getByText("This is a ve...")).toBeInTheDocument();
  });

  it("displays time with seconds by default", () => {
    render(
      <TimeZoneClock 
        timezone="America/New_York" 
        userName="John Doe" 
      />
    );
    
    expect(screen.getByText("12:00:00 PM")).toBeInTheDocument();
  });

  it("displays time without seconds when showSeconds is false", () => {
    render(
      <TimeZoneClock 
        timezone="America/New_York" 
        userName="John Doe" 
        showSeconds={false}
      />
    );
    
    expect(screen.getByText("12:00 PM")).toBeInTheDocument();
  });

  it("displays timezone information", () => {
    render(
      <TimeZoneClock 
        timezone="America/New_York" 
        userName="John Doe" 
      />
    );
    
    expect(screen.getByText("EST (-05:00)")).toBeInTheDocument();
  });

  it("displays formatted date", () => {
    render(
      <TimeZoneClock 
        timezone="America/New_York" 
        userName="John Doe" 
      />
    );
    
    expect(screen.getByText("January 1, 2024")).toBeInTheDocument();
  });

  it("updates time periodically", () => {
    render(
      <TimeZoneClock 
        timezone="America/New_York" 
        userName="John Doe" 
      />
    );

    // Fast-forward time to trigger the interval
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Component should still be rendering
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("handles different size props", () => {
    render(
      <TimeZoneClock 
        timezone="America/New_York" 
        userName="John Doe" 
        size="lg"
      />
    );
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("handles different timezone", () => {
    render(
      <TimeZoneClock 
        timezone="America/Los_Angeles" 
        userName="Jane Smith" 
      />
    );
    
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("EST (-05:00)")).toBeInTheDocument();
  });

  it("cleans up interval on unmount", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    
    const { unmount } = render(
      <TimeZoneClock 
        timezone="America/New_York" 
        userName="John Doe" 
      />
    );
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    
    clearIntervalSpy.mockRestore();
  });
});
