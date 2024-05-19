function Button({ value, addStyle, disabled, ...props }) {
  return (
    <button
      className={`${
        disabled
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : "bg-gradient-to-b from-green-500 to-green-600 text-white hover:opacity-70 hover:text-black"
      } rounded-full px-3 py-1 ${addStyle}`}
      {...props}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export default Button;
