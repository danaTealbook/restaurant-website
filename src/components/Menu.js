import { useState, useEffect } from "react";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/menuItems.json")
      .then((response) => response.json())
      .then((data) => setMenuItems(data.menuItems))
      .catch((error) => console.error("Error fetching the menu items:", error));
  }, []);

  function parseName(string) {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 m-0 px-4 lg:px-24">
      <h1 className="text-center py-8 font-bold text-xl">Menu</h1>
      <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 bg-red-900">
        {menuItems.map((food) => (
          <div
            key={food.name}
            className="relative border-2 rounded-lg border-cyan-500 overflow-hidden transform hover:scale-105 transition ease-in-out duration-500"
          >
            <img
              className="w-56 h-56 object-cover"
              src={food.src}
              alt={food.name}
            />
            <div className="text-left">
              <span className="pl-2 text-base text-cyan-800">
                {parseName(food.name)}
              </span>
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
