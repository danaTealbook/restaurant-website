import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("renders the footer div", () => {
    render(<Footer />);
    const footerDiv = screen.getByTestId("footer");
    expect(footerDiv).toBeInTheDocument();
    const footerButton = screen.getByTestId("footer-homepage-link");
    expect(footerButton).toBeInTheDocument();
  });

  test("renders the link with correct href", () => {
    render(<Footer />);
    const link = screen.getByTestId("footer-homepage-link");
    expect(link).toHaveAttribute("href", "#main");
  });
});
