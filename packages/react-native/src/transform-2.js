import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Transform2Icon = (props) => (
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
      d="M8 1L8 16H14V18H6V8H1V6H6L6 1L8 1ZM10 6H18V16H23V18H18V23H16V8H10V6Z"
      fill="currentColor"
    />
  </Svg>
);
export { Transform2Icon };

export default Transform2Icon;
