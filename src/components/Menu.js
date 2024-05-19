import { useState, useEffect } from "react";
import parseName from "../functions/parseName";
import Button from "./Button";

function Menu({ setCart }) {
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [tokens, setTokens] = useState({
    all: true,
    hot: false,
    dessert: false,
    fish: false,
    salad: false,
  });

  useEffect(() => {
    fetch("/menuItems.json")
      .then((response) => response.json())
      .then((data) => setAllMenuItems(data.menuItems))
      .catch((error) => console.error("Error fetching the menu items:", error));
  }, []);

  useEffect(() => {
    if (tokens["all"] === true) {
      setMenuItems(allMenuItems);
    } else {
      const selectedTokens = Object.keys(tokens).filter(
        (token) => tokens[token] && token !== "all"
      );
      const filteredItems = allMenuItems.filter((item) =>
        selectedTokens.some((token) => item.keywords.includes(token))
      );
      setMenuItems(filteredItems);
    }
  }, [tokens, allMenuItems]);

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

  const handleToggle = (token) => {
    // do nothing if all is selected when it's true
    if (!tokens["all"] || token !== "all") {
      setTokens((prevValue) => {
        const newTokens = { ...prevValue, [token]: !prevValue[token] };
        // Set "all" to false if any other token is selected,
        // to true if all others are deselected
        if (token !== "all") {
          newTokens.all = !Object.values(newTokens).some(
            (value, key) => key !== "all" && value === true
          );
        } else {
          // If "all" is toggled, set all other tokens to false
          if (newTokens.all) {
            Object.keys(newTokens).forEach((key) => {
              if (key !== "all") newTokens[key] = false;
            });
          }
        }

        return newTokens;
      });
    }
  };

  return (
    <div className="col-span-4 sm:col-span-3 bg-gradient-to-b from-blue-100 m-0 px-4 lg:px-24">
      {/* <h1 className="text-center py-8 font-bold text-xl animate-glow">Menu</h1> */}
      <div className="flex justify-center pt-4">
        <img
          className="w-44"
          src="./images/menu-text-copy.png"
          alt="menu-text"
        />
      </div>

      <div className="flex flex-wrap justify-center items-center">
        {Object.keys(tokens).map((t) => (
          <button
            key={t}
            className={`px-4 py-1 mx-2 mt-4 rounded-full hover:opacity-90 hover:shadow-md cursor-pointer 
              ${tokens[t] ? " bg-blue-500" : " bg-blue-300"}`}
            onClick={() => handleToggle(t)}
          >
            {parseName(t)}
          </button>
        ))}
      </div>

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
              <Button value="Add Me" onClick={() => handleAddToCart(food)} />
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
