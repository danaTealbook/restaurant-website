import { useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Cart from "./components/Cart";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-4">
        <Cart cart={cart} />
        <Menu setCart={setCart} />
      </div>
    </div>
  );
}

export default App;
