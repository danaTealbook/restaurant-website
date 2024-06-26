// import { memo } from "react";
import parseName from "../../functions/parseName";
import { MenuItem } from "../../interfaces/MenuItem";
import Button from "../Button/Button";
import { toast } from "sonner";

type CartProps = {
  cart: MenuItem[];
  setCart: (cart: (prevCart: MenuItem[]) => MenuItem[]) => void;
};

function Cart({ cart, setCart }: CartProps) {
  const total = cart.reduce((acc, food) => acc + food.price * food.count, 0);

  const handleOrder = () => {
    alert(
      "This is a fictional restaurant website, so purchasing part is not implemented."
    );
  };

  const handleEmptyCart = () => {
    setCart(() => []);
    toast("Cart is now empty");
  };

  const handleDeleteItem = (foodName: string) => {
    setCart((prevValue) =>
      prevValue
        .map((item) =>
          item.name === foodName ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count !== 0)
    );
    toast(foodName + " is deleted");
  };

  return (
    <section
      id="cart"
      className="col-span-4 order-2 sm:col-span-1 sm:order-1 mb-6"
    >
      <div className="flex flex-col p-4">
        <div className="text-center mt-4 mb-2 font-bold text-xl">Cart</div>
        {cart.map((c, index) => (
          <div key={c.name}>
            <div className="flex justify-between py-2">
              <div>
                <span>{index + 1}) </span>
                <span>{parseName(c.name)}</span>
                {c.count > 1 && <span> * {c.count}</span>}
              </div>
              <div className="flex items-center">
                <span>${c.count * c.price}</span>
                <button
                  className="bg-red-200 rounded-full p-1 ml-1"
                  onClick={() => handleDeleteItem(c.name)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
        <hr />
        <div className="flex justify-between font-bold mt-2">
          <div>Total: </div>
          <div>${total}</div>
        </div>
        <Button
          addStyle="mt-6"
          value="Order now"
          onClick={handleOrder}
          disabled={total === 0}
        />
        <div className="flex flex-col items-center">
          <Button
            addStyle="mt-6 w-2/4"
            color="bg-red-600"
            value="Empty cart"
            onClick={handleEmptyCart}
            disabled={total === 0}
          />
        </div>
      </div>
    </section>
  );
}

export default Cart;
