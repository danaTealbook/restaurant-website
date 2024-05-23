const defaultColor = "bg-gradient-to-b from-green-500 to-green-600";

function Button({ value, addStyle, disabled, color = defaultColor, ...props }) {
  return (
    <button
      className={`${
        disabled
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : color + " text-white hover:opacity-70 hover:text-black"
      } rounded-full px-3 py-1 ${addStyle}`}
      {...props}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export default Button;
