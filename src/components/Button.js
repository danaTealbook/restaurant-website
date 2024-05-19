function Button({ value, onClick, addStyle }) {
  return (
    <button
      className={
        "bg-gradient-to-b from-green-500 to-green-600 rounded-full px-3 py-1 text-white hover:opacity-70 hover:text-black " +
        addStyle
      }
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Button;
