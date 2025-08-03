import React from "react";
import { render, screen } from "../../__tests__/utils/test-utils";
import "@testing-library/jest-dom";
import { Layout } from "./Layout";

// Mock framer-motion to avoid issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    header: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <header {...props}>{children}</header>
    ),
    main: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <main {...props}>{children}</main>
    ),
  },
}));

// Mock the EarthIcon component
jest.mock("../EarthIcon", () => ({
  EarthIcon: ({ size }: { size: number }) => (
    <div data-testid="earth-icon" style={{ width: size, height: size }}>
      Earth Icon
    </div>
  ),
}));

describe("Layout", () => {
  it("renders with default title", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText("Geo-CRUD")).toBeInTheDocument();
    expect(
      screen.getByText("Modern geo-location user management")
    ).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(
      <Layout title="Custom Title">
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(
      screen.getByText("Modern geo-location user management")
    ).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    const childContent = "This is child content";
    render(<Layout>{childContent}</Layout>);

    expect(screen.getByText(childContent)).toBeInTheDocument();
  });

  it("renders EarthIcon with correct size", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const earthIcon = screen.getByTestId("earth-icon");
    expect(earthIcon).toBeInTheDocument();
    expect(earthIcon).toHaveStyle({ width: "38px", height: "38px" });
  });
});
