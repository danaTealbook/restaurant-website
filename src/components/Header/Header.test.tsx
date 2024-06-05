import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  test("renders the header with navigation links", () => {
    render(<Header />);

    const homeLink = screen.getByText("Home");
    const menuLink = screen.getByText("Menu");
    const cartLink = screen.getByText("Cart");
    const logoImage = screen.getByAltText("logo");

    expect(homeLink).toBeInTheDocument();
    expect(menuLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
  });

  test('initially sets active tab to "main"', () => {
    render(<Header />);

    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveClass("text-black");
  });

  test("removes scroll event listener on unmount", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<Header />);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});
