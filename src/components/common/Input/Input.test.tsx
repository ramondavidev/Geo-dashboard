import React from "react";
import { render, screen, fireEvent } from "../../../__tests__/utils/test-utils";
import "@testing-library/jest-dom";
import { Input } from "./Input";

describe("Input", () => {
  it("renders basic input", () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Input label="Username" id="username" />);
    
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("renders with helper text", () => {
    render(<Input helperText="This is helpful information" />);
    
    expect(screen.getByText("This is helpful information")).toBeInTheDocument();
  });

  it("renders with error message", () => {
    render(<Input error="This field is required" />);
    
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("prioritizes error over helper text", () => {
    render(
      <Input 
        error="This field is required" 
        helperText="This is helpful information" 
      />
    );
    
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.queryByText("This is helpful information")).not.toBeInTheDocument();
  });

  it("handles value changes", () => {
    const mockOnChange = jest.fn();
    render(<Input onChange={mockOnChange} />);
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test value" } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("renders with icon", () => {
    const TestIcon = () => <span data-testid="test-icon">📧</span>;
    render(<Input icon={<TestIcon />} />);
    
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("applies different sizes", () => {
    render(<Input size="lg" placeholder="Large input" />);
    
    expect(screen.getByPlaceholderText("Large input")).toBeInTheDocument();
  });

  it("renders as full width", () => {
    render(<Input fullWidth placeholder="Full width input" />);
    
    expect(screen.getByPlaceholderText("Full width input")).toBeInTheDocument();
  });

  it("handles disabled state", () => {
    render(<Input disabled placeholder="Disabled input" />);
    
    const input = screen.getByPlaceholderText("Disabled input");
    expect(input).toBeDisabled();
  });

  it("handles different input types", () => {
    render(<Input type="email" placeholder="Enter email" />);
    
    const input = screen.getByPlaceholderText("Enter email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("associates label with input correctly", () => {
    render(<Input label="Email" id="email-input" />);
    
    const label = screen.getByText("Email");
    const input = screen.getByLabelText("Email");
    
    expect(label).toHaveAttribute("for", "email-input");
    expect(input).toHaveAttribute("id", "email-input");
  });

  it("renders with custom placeholder", () => {
    render(<Input placeholder="Custom placeholder text" />);
    
    expect(screen.getByPlaceholderText("Custom placeholder text")).toBeInTheDocument();
  });

  it("handles focus and blur events", () => {
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();
    
    render(<Input onFocus={mockOnFocus} onBlur={mockOnBlur} />);
    
    const input = screen.getByRole("textbox");
    
    fireEvent.focus(input);
    expect(mockOnFocus).toHaveBeenCalled();
    
    fireEvent.blur(input);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("passes through additional props", () => {
    render(
      <Input 
        data-testid="custom-input" 
        aria-describedby="help-text"
        maxLength={100}
      />
    );
    
    const input = screen.getByTestId("custom-input");
    expect(input).toHaveAttribute("aria-describedby", "help-text");
    expect(input).toHaveAttribute("maxLength", "100");
  });

  it("renders with all size variations", () => {
    const sizes = ["sm", "md", "lg"] as const;
    
    sizes.forEach((size) => {
      const { unmount } = render(<Input size={size} placeholder={`${size} input`} />);
      expect(screen.getByPlaceholderText(`${size} input`)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders error state correctly", () => {
    render(<Input error="Error message" value="test" />);
    
    const input = screen.getByDisplayValue("test");
    expect(input).toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });
});
