import parseName from "../functions/parseName";
import Button from "./Button";

function Cart({ cart, showCart }) {
  const total = cart.reduce((acc, food) => acc + food.price * food.count, 0);

  const handleOrder = () => {
    alert(
      "This is a fictional restaurant website, so purchasing part is not implemented."
    );
  };

  return (
    <div
      className={`col-span-4  ${
        showCart ? "" : "hidden"
      } sm:block sm:col-span-1`}
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
              <span>${c.count * c.price}</span>
            </div>
            <hr />
          </div>
        ))}
        <hr />
        <div className="flex justify-between font-bold mt-2">
          <div>Total: </div>
          <div>${total}</div>
        </div>
        <Button addStyle="mt-6" value="Order now" onClick={handleOrder} />
      </div>
    </div>
  );
}

export default Cart;
