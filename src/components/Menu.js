import { useState, useEffect } from "react";
import parseName from "../functions/parseName";
import Button from "./Button";

function Menu({ setCart }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/menuItems.json")
      .then((response) => response.json())
      .then((data) => setMenuItems(data.menuItems))
      .catch((error) => console.error("Error fetching the menu items:", error));
  }, []);

  const handleAddToCart = (food) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === food.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === food.name ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevCart, { ...food, count: 1 }];
      }
    });
  };

  return (
    <div className="col-span-4 sm:col-span-3 bg-gradient-to-b from-blue-100 m-0 px-4 lg:px-24">
      <h1 className="text-center py-8 font-bold text-xl">Menu</h1>
      <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4 sm:p-10">
        {menuItems.map((food) => (
          <div
            key={food.name}
            className="relative border-2 rounded-lg border-cyan-800 overflow-hidden transform hover:scale-105 hover:shadow-lg transition ease-in-out duration-500"
          >
            <img
              className="w-full h-48 sm:h-56 object-cover"
              src={food.src}
              alt={food.name}
            />
            <div className="flex justify-between items-center text-base px-2 py-1">
              <span className="text-cyan-800">{parseName(food.name)}</span>
              <Button
                value="Add Me"
                handleClick={() => handleAddToCart(food)}
              />
            </div>
            <div className="absolute top-0 m-2 py-1 px-2 bg-gray-400 rounded-full ">
              <span className="text-white">${food.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
