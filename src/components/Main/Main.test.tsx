import { render, screen } from "@testing-library/react";
import Main from "./Main";

jest.mock("../ParticlesBackground", () => () => (
  <div data-testid="particles-background"></div>
));

describe("Main Component", () => {
  test("renders the main section with correct background", () => {
    render(<Main />);

    const mainSection = screen.getByTestId("main");
    expect(mainSection).toBeInTheDocument();
    expect(mainSection).toHaveStyle({
      backgroundImage: "url('./images/main-background.jpg')",
    });
  });

  test("renders the ParticlesBackground component", () => {
    render(<Main />);

    const particlesBackground = screen.getByTestId("particles-background");
    expect(particlesBackground).toBeInTheDocument();
  });

  test("renders the messages correctly", () => {
    render(<Main />);

    const welcomeMessage = screen.getByText("Welcome to");
    expect(welcomeMessage).toBeInTheDocument();

    const title = screen.getByText("Bon Appetit");
    expect(title).toBeInTheDocument();

    const address = screen.getByText("123 York Street, Toronto");
    expect(address).toBeInTheDocument();

    const workingHours = screen.getByText("We work between 8AM - 6PM");
    expect(workingHours).toBeInTheDocument();
  });
});
