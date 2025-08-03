import React from "react";
import { render, screen, fireEvent } from "../../../__tests__/utils/test-utils";
import "@testing-library/jest-dom";
import { Button } from "./Button";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    button: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...props}>{children}</button>
    ),
  },
}));

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders with custom text", () => {
    render(<Button>Custom Text</Button>);

    expect(screen.getByText("Custom Text")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click me</Button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("is disabled when loading prop is true", () => {
    render(<Button loading>Loading Button</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("shows loading spinner when loading", () => {
    render(<Button loading>Loading Button</Button>);

    // The loading spinner should be present in the DOM
    expect(screen.getByText("Loading Button")).toBeInTheDocument();
  });

  it("does not call onClick when disabled", () => {
    const mockOnClick = jest.fn();
    render(
      <Button disabled onClick={mockOnClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", () => {
    const mockOnClick = jest.fn();
    render(
      <Button loading onClick={mockOnClick}>
        Loading Button
      </Button>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("renders with different variants", () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    expect(screen.getByText("Secondary Button")).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    render(<Button size="lg">Large Button</Button>);

    expect(screen.getByText("Large Button")).toBeInTheDocument();
  });

  it("renders as submit button when type is submit", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders full width when fullWidth prop is true", () => {
    render(<Button fullWidth>Full Width Button</Button>);

    expect(screen.getByText("Full Width Button")).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom Button">
        Button
      </Button>
    );

    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("aria-label", "Custom Button");
  });

  it("renders children correctly", () => {
    render(
      <Button>
        <span>Icon</span>
        Text
      </Button>
    );

    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("Text")).toBeInTheDocument();
  });

  it("handles both disabled and loading states", () => {
    render(
      <Button disabled loading>
        Button
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("renders with all variant options", () => {
    const variants = ["primary", "secondary", "ghost", "danger"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <Button variant={variant}>{variant} Button</Button>
      );
      expect(screen.getByText(`${variant} Button`)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders with all size options", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>{size} Button</Button>);
      expect(screen.getByText(`${size} Button`)).toBeInTheDocument();
      unmount();
    });
  });
});
