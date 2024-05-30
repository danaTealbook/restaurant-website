declare module "react-lazyload" {
  import { Component, CSSProperties } from "react";

  interface LazyLoadProps {
    once?: boolean;
    offset?: number | number[];
    scroll?: boolean;
    resize?: boolean;
    overflow?: boolean;
    children?: React.ReactNode;
    throttle?: number | boolean;
    debounce?: number | boolean;
    height?: number | string;
    placeholder?: React.ReactNode;
    unmountIfInvisible?: boolean;
    className?: string;
    style?: CSSProperties;
  }

  export default class LazyLoad extends Component<LazyLoadProps> {}
}
