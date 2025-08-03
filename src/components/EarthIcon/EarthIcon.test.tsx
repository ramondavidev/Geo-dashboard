import React from "react";
import { render, screen } from "../../__tests__/utils/test-utils";
import "@testing-library/jest-dom";
import { EarthIcon } from "./EarthIcon";

describe("EarthIcon", () => {
  it("renders with default size", () => {
    render(<EarthIcon />);
    
    const earthImage = screen.getByAltText("Earth");
    expect(earthImage).toBeInTheDocument();
    expect(earthImage).toHaveAttribute("width", "64");
    expect(earthImage).toHaveAttribute("height", "64");
  });

  it("renders with custom size", () => {
    const customSize = 100;
    render(<EarthIcon size={customSize} />);
    
    const earthImage = screen.getByAltText("Earth");
    expect(earthImage).toBeInTheDocument();
    expect(earthImage).toHaveAttribute("width", "100");
    expect(earthImage).toHaveAttribute("height", "100");
  });

  it("applies custom className", () => {
    const { container } = render(<EarthIcon className="custom-class" />);
    
    const earthContainer = container.firstChild as HTMLElement;
    expect(earthContainer).toHaveClass("custom-class");
  });

  it("renders earth image with correct src", () => {
    render(<EarthIcon />);
    
    const earthImage = screen.getByAltText("Earth");
    expect(earthImage).toBeInTheDocument();
    expect(earthImage).toHaveAttribute("src");
    expect(earthImage.getAttribute("src")).toContain("earth.png");
  });

  it("applies correct container styles based on size", () => {
    const size = 80;
    const { container } = render(<EarthIcon size={size} />);
    
    const earthContainer = container.firstChild as HTMLElement;
    expect(earthContainer).toHaveStyle({ width: "80px", height: "80px" });
  });
});
