import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import { MenuItem } from "../../interfaces/MenuItem";
import { act } from "react";
import { toast } from "sonner";

jest.mock("sonner", () => ({
  toast: jest.fn(),
}));

const cartItems: MenuItem[] = [
  { name: "Pizza", price: 10, count: 2, src: "", keywords: [] },
  { name: "Burger", price: 5, count: 3, src: "", keywords: [] },
  { name: "Salad", price: 7, count: 1, src: "", keywords: [] },
];

describe("Cart Component", () => {
  let setCart: jest.Mock;

  beforeEach(() => {
    setCart = jest.fn();
  });

  test("renders the cart with items", () => {
    render(<Cart cart={cartItems} setCart={setCart} />);

    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByText("Salad")).toBeInTheDocument();
    // expect(screen.getByRole("button").to)
  });

  test("calculates the total price correctly", () => {
    render(<Cart cart={cartItems} setCart={setCart} />);

    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    expect(screen.getByText(`$${total}`)).toBeInTheDocument();
  });

  test('handles "Order now" button click', () => {
    render(<Cart cart={cartItems} setCart={setCart} />);

    const orderButton = screen.getByRole("button", { name: /order now/i });

    window.alert = jest.fn();

    act(() => {
      fireEvent.click(orderButton);
    });

    expect(window.alert).toHaveBeenCalledWith(
      "This is a fictional restaurant website, so purchasing part is not implemented."
    );
  });

  test('handles "Empty cart" button click', () => {
    render(<Cart cart={cartItems} setCart={setCart} />);

    const emptyCartButton = screen.getByRole("button", { name: /empty cart/i });

    act(() => {
      fireEvent.click(emptyCartButton);
    });

    expect(setCart).toHaveBeenCalledWith(expect.any(Function));
    expect(toast).toHaveBeenCalledWith("Cart is now empty");
  });

  //   test("handles delete item button click", () => {
  //     render(<Cart cart={cartItems} setCart={setCart} />);

  //     const deleteButtons = screen.getAllByRole("button", { name: /svg/i });

  //     act(() => {
  //       fireEvent.click(deleteButtons[0]);
  //     });

  //     expect(setCart).toHaveBeenCalledWith(expect.any(Function));
  //     expect(toast).toHaveBeenCalledWith("Pizza is deleted");
  //   });

  test("disables buttons when cart is empty", () => {
    render(<Cart cart={[]} setCart={setCart} />);

    const orderButton = screen.getByText(/order now/i);
    const emptyCartButton = screen.getByText(/empty cart/i);

    expect(orderButton).toBeDisabled();
    expect(emptyCartButton).toBeDisabled();
  });
});
