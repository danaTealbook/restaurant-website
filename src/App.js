import { useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Main from "./components/Main";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false); //on mobile devices, the cart is hidden

  return (
    <div>
      <Header setShowCart={setShowCart} />

      <Main />

      <div className="grid grid-cols-4">
        <Cart cart={cart} setCart={setCart} showCart={showCart} />
        <Menu setCart={setCart} />
      </div>
    </div>
  );
}

export default App;
