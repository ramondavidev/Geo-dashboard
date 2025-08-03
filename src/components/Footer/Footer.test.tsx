import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Footer } from "./Footer";
import { theme } from "@/styles/theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe("Footer", () => {
  it("renders footer when show is true and userCount > 0", () => {
    renderWithTheme(<Footer show={true} userCount={5} />);
    
    expect(screen.getByText("Created by")).toBeInTheDocument();
    expect(screen.getByText("Ramon")).toBeInTheDocument();
    expect(screen.getByText("Built with passion")).toBeInTheDocument();
  });

  it("does not render when show is false", () => {
    renderWithTheme(<Footer show={false} userCount={5} />);
    
    expect(screen.queryByText("Created by")).not.toBeInTheDocument();
  });

  it("does not render when userCount is 0", () => {
    renderWithTheme(<Footer show={true} userCount={0} />);
    
    expect(screen.queryByText("Created by")).not.toBeInTheDocument();
  });

  it("does not render when userCount is not provided", () => {
    renderWithTheme(<Footer show={true} />);
    
    expect(screen.queryByText("Created by")).not.toBeInTheDocument();
  });

  it("renders link with correct href and attributes", () => {
    renderWithTheme(<Footer show={true} userCount={1} />);
    
    const link = screen.getByText("Ramon").closest("a");
    expect(link).toHaveAttribute("href", "https://ramondavi.dev/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders star icon", () => {
    renderWithTheme(<Footer show={true} userCount={1} />);
    
    const starIcon = screen.getByText("Built with passion").previousElementSibling;
    expect(starIcon).toBeInTheDocument();
    expect(starIcon?.querySelector("svg")).toBeInTheDocument();
  });
});
