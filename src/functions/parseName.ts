import { Tokens } from "../interfaces/Tokens";

const parseName = (name: string | keyof Tokens): string => {
  //TODO remove string
  if (name.length === 0) return name;
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export default parseName;
