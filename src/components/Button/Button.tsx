const defaultColor: string = "bg-gradient-to-b from-green-500 to-green-600";

interface ButtonProps {
  value: string;
  addStyle?: string;
  disabled?: boolean;
  color?: string;
  [key: string]: any; // For additional props like onClick, etc.
}
// TODO remove React.FC
const Button: React.FC<ButtonProps> = ({
  value,
  addStyle = "",
  disabled,
  color = defaultColor,
  ...props
}) => {
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
};

export default Button;
