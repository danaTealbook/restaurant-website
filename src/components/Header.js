function Header({ setShowCart }) {
  const handleClick = (value) => {
    setShowCart(value);
  };

  return (
    <div className="sticky top-0 z-10 sm:hidden m-0 p-2 text-xl font-bold flex justify-between items-center text-gray-100 bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg">
      <h1 className="hover:text-gray-300 cursor-pointer">Home</h1>
      <div className="flex">
        <h1
          className="hover:text-gray-300 cursor-pointer"
          onClick={() => handleClick(false)}
        >
          Menu
        </h1>
        <h1
          className="ml-6 hover:text-gray-300 cursor-pointer"
          onClick={() => handleClick(true)}
        >
          Cart
        </h1>
      </div>
    </div>
  );
}

export default Header;