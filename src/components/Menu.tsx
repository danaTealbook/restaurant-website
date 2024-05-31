import { useState, useEffect, memo, useCallback, useMemo } from "react";
import parseName from "../functions/parseName";
import Button from "./Button";
import { toast } from "sonner";
import { MenuItem } from "../interfaces/MenuItem";
import { Tokens } from "../interfaces/Tokens";
import LazyLoad from "react-lazyload";

type MenuProps = {
  setCart: (cart: (prevCart: MenuItem[]) => MenuItem[]) => void;
};

function Menu({ setCart }: MenuProps) {
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const initialTokens: Tokens = {
    all: true,
    hot: false,
    dessert: false,
    fish: false,
    salad: false,
  };

  const [tokens, setTokens] = useState<Tokens>(initialTokens);

  useEffect(() => {
    fetch("./menuItems.json")
      .then((response) => response.json())
      .then((data) => setAllMenuItems(data.menuItems))
      .catch((error) => console.error("Error fetching the menu items:", error));
  }, []);

  useEffect(() => {
    if (tokens["all"] === true) {
      setMenuItems(allMenuItems);
    } else {
      const selectedTokens = Object.keys(tokens).filter(
        (token) => tokens[token as keyof Tokens] && token !== "all"
      );
      const filteredItems = allMenuItems.filter((item) =>
        selectedTokens.some((token) => item.keywords.includes(token))
      );
      setMenuItems(filteredItems);
    }
  }, [tokens, allMenuItems]);

  const handleAddToCart = useCallback(
    (food: MenuItem) => {
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
      toast.success(parseName(food.name) + " added to cart");
    },
    [setCart]
  );

  const handleToggle = useCallback(
    (token: keyof Tokens) => {
      // do nothing if all is selected when it's true
      if (!tokens["all"] || token !== "all") {
        setTokens((prevValue) => {
          const newTokens = { ...prevValue, [token]: !prevValue[token] };
          // Set "all" to false if any other token is selected,
          // to true if all others are deselected
          if (token !== "all") {
            newTokens.all = !Object.entries(newTokens).some(
              ([key, value]) => key !== "all" && value === true
            );
          } else {
            // If "all" is toggled, set all other tokens to false
            if (newTokens.all) {
              Object.keys(newTokens).forEach((key) => {
                if (key !== "all") newTokens[key as keyof Tokens] = false;
              });
            }
          }

          return newTokens;
        });
      }
    },
    [tokens]
  );

  const memoizedMenuItems = useMemo(() => {
    return menuItems.map((food) => (
      <div
        key={food.name}
        className="relative border rounded-lg border-red-800 overflow-hidden transform sm:hover:scale-105 hover:shadow-lg transition ease-in-out duration-500"
      >
        <LazyLoad height={200} offset={100} placeholder={<div>Loading...</div>}>
          <img
            className="w-full h-48 sm:h-56 object-cover"
            src={food.src}
            alt={food.name}
            loading="lazy"
          />
        </LazyLoad>
        <div className="flex justify-between items-center text-base px-2 py-1 bg-gray-50">
          <span className="text-red-800">{parseName(food.name)}</span>
          <Button value="Add Me" onClick={() => handleAddToCart(food)} />
        </div>
        <div className="absolute top-0 m-2 py-1 px-2 bg-gray-400 rounded-full ">
          <span className="text-white">${food.price}</span>
        </div>
      </div>
    ));
  }, [menuItems, handleAddToCart]);

  return (
    <section
      id="menu"
      className="col-span-4 order-1 sm:col-span-3 sm:order-2 bg-gray-100 m-0 px-4 lg:px-24"
    >
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
            className={`px-4 py-1 mx-2 mt-4 text-white font-medium rounded-full hover:opacity-90 hover:shadow-md cursor-pointer 
              ${tokens[t as keyof Tokens] ? " bg-red-700" : " bg-red-400"}`}
            onClick={() => handleToggle(t as keyof Tokens)}
          >
            {parseName(t as keyof Tokens)}
          </button>
        ))}
      </div>

      <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4 sm:p-10">
        {memoizedMenuItems}
      </div>
    </section>
  );
}

export default memo(Menu);
