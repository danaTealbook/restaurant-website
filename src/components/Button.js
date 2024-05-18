function Button({ value, handleClick, style }) {
  return (
    <button
      className={
        "bg-gradient-to-b from-green-500 to-green-600 rounded-full px-3 py-1 text-white hover:opacity-70 hover:text-black " +
        style
      }
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default Button;
