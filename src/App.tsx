import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { MenuItem } from "./interfaces/MenuItem";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

function App() {
  const [cart, setCart] = useState<MenuItem[]>([]);

  return (
    <div>
      <Header />

      <Main />

      <div className="grid grid-cols-4">
        <Menu setCart={setCart} />
        <Cart cart={cart} setCart={setCart} />
      </div>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
