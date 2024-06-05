import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders the button with the correct value", () => {
    render(<Button value="Click Me" />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("applies the default color class when no color prop is provided", () => {
    render(<Button value="Click Me" />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toHaveClass(
      "bg-gradient-to-b from-green-500 to-green-600"
    );
  });

  test("applies the provided color class", () => {
    render(<Button value="Click Me" color="bg-blue-500" />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toHaveClass("bg-blue-500");
  });

  test("applies additional styles passed via addStyle prop", () => {
    render(<Button value="Click Me" addStyle="extra-class" />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toHaveClass("extra-class");
  });

  test("disables the button when the disabled prop is true", () => {
    render(<Button value="Click Me" disabled />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass(
      "bg-gray-400 text-gray-700 cursor-not-allowed"
    );
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button value="Click Me" onClick={handleClick} />);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
