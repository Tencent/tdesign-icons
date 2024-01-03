import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TextboxIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path
      d="M2 2L22 2L22 22L2 22L2 2ZM4 4L4 20L20 20L20 4L4 4ZM11 8.5L6 8.5V6.5L18 6.5V8.5L13 8.5V18H11V8.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { TextboxIcon };

export default TextboxIcon;
