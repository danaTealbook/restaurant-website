import { useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Header />

      <Main />

      <div className="grid grid-cols-4">
        <Menu setCart={setCart} />
        <Cart cart={cart} setCart={setCart} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
