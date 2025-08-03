import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { ZipCodeDropdown } from "./ZipCodeDropdown";

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe("ZipCodeDropdown", () => {
  const mockOnChange = jest.fn();
  
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with default props", () => {
    renderWithTheme(
      <ZipCodeDropdown value="" onChange={mockOnChange} />
    );
    
    expect(screen.getByLabelText("Zip Code")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search zip code or city...")).toBeInTheDocument();
  });

  it("renders with custom label and placeholder", () => {
    renderWithTheme(
      <ZipCodeDropdown
        value=""
        onChange={mockOnChange}
        label="Custom Label"
        placeholder="Custom placeholder"
      />
    );
    
    expect(screen.getByLabelText("Custom Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Custom placeholder")).toBeInTheDocument();
  });

  it("opens dropdown on focus", async () => {
    renderWithTheme(
      <ZipCodeDropdown value="" onChange={mockOnChange} />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    
    // Should show some zip codes
    await waitFor(() => {
      expect(screen.getByText("35201")).toBeInTheDocument();
    });
  });

  it("filters zip codes based on search term", async () => {
    renderWithTheme(
      <ZipCodeDropdown value="" onChange={mockOnChange} />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "90210" } });
    
    await waitFor(() => {
      expect(screen.getByText("90210")).toBeInTheDocument();
      expect(screen.getByText("Beverly Hills, CA")).toBeInTheDocument();
    });
  });

  it("filters by city name", async () => {
    renderWithTheme(
      <ZipCodeDropdown value="" onChange={mockOnChange} />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Miami" } });
    
    await waitFor(() => {
      expect(screen.getByText("33101")).toBeInTheDocument();
      expect(screen.getByText("Miami, FL")).toBeInTheDocument();
    });
  });

  it("calls onChange when zip code is selected", async () => {
    renderWithTheme(
      <ZipCodeDropdown value="" onChange={mockOnChange} />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    
    await waitFor(() => {
      expect(screen.getByText("90210")).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText("90210"));
    
    expect(mockOnChange).toHaveBeenCalledWith("90210");
  });

  it("handles direct 5-digit zip code entry", async () => {
    renderWithTheme(
      <ZipCodeDropdown value="" onChange={mockOnChange} />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "12345" } });
    
    expect(mockOnChange).toHaveBeenCalledWith("12345");
  });

  it("handles keyboard navigation", async () => {
    renderWithTheme(
      <ZipCodeDropdown value="" onChange={mockOnChange} />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    
    await waitFor(() => {
      expect(screen.getByText("35201")).toBeInTheDocument();
    });
    
    // Navigate down and select with Enter
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("closes dropdown on Escape key", async () => {
    renderWithTheme(
      <ZipCodeDropdown value="" onChange={mockOnChange} />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    
    await waitFor(() => {
      expect(screen.getByText("35201")).toBeInTheDocument();
    });
    
    fireEvent.keyDown(input, { key: "Escape" });
    
    await waitFor(() => {
      expect(screen.queryByText("35201")).not.toBeInTheDocument();
    });
  });

  it("shows error message when provided", () => {
    renderWithTheme(
      <ZipCodeDropdown
        value=""
        onChange={mockOnChange}
        error="Invalid zip code"
      />
    );
    
    expect(screen.getByText("Invalid zip code")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    renderWithTheme(
      <ZipCodeDropdown
        value=""
        onChange={mockOnChange}
        disabled={true}
      />
    );
    
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("shows no results message when no matches found", async () => {
    renderWithTheme(
      <ZipCodeDropdown value="" onChange={mockOnChange} />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "99999" } });
    
    await waitFor(() => {
      expect(screen.getByText(/No zip codes found matching/)).toBeInTheDocument();
    });
  });

  it("displays selected zip code with city and state", () => {
    renderWithTheme(
      <ZipCodeDropdown value="90210" onChange={mockOnChange} />
    );
    
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("90210 - Beverly Hills, CA");
  });
});
