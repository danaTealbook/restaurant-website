import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Menu from "./Menu"; // Adjust the path if necessary
import { MenuItem } from "../../interfaces/MenuItem";
import { toast } from "sonner";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockSetCart = jest.fn();

const mockMenuItems: MenuItem[] = [
  {
    name: "pizza",
    src: "/images/pizza.png",
    price: 10,
    keywords: ["hot"],
    count: 0,
  },
  {
    name: "ice-cream",
    src: "/images/ice-cream.png",
    price: 5,
    keywords: ["dessert"],
    count: 0,
  },
];

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue({ menuItems: mockMenuItems }),
  } as any);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Menu Component", () => {
  it("renders correctly", async () => {
    await act(async () => {
      render(<Menu setCart={mockSetCart} />);
    });
    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getByAltText("menu-text")).toBeInTheDocument();
    expect(screen.getAllByText("Add Me")).toHaveLength(2);
  });

  it("fetches and displays menu items", async () => {
    await act(async () => {
      render(<Menu setCart={mockSetCart} />);
    });
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith("./menuItems.json")
    );
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Ice-cream")).toBeInTheDocument();
  });

  it("toggles tokens and filters menu items", async () => {
    await act(async () => {
      render(<Menu setCart={mockSetCart} />);
    });
    await waitFor(() => expect(screen.getByText("Pizza")).toBeInTheDocument());

    fireEvent.click(screen.getByText("Dessert"));
    expect(screen.queryByText("Pizza")).not.toBeInTheDocument();
    expect(screen.getByText("Ice-cream")).toBeInTheDocument();

    fireEvent.click(screen.getByText("All"));
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Ice-cream")).toBeInTheDocument();
  });

  //   it("adds item to cart and shows success toast", async () => {
  //     await act(async () => {
  //       render(<Menu setCart={mockSetCart} />);
  //     });
  //     await waitFor(() => expect(screen.getByText("Pizza")).toBeInTheDocument());

  //     fireEvent.click(screen.getAllByText("Add Me")[0]);
  //     expect(mockSetCart).toHaveBeenCalledWith(expect.any(Function));
  //     expect(toast.success).toHaveBeenCalledWith("Pizza added to cart");
  //   });
});
