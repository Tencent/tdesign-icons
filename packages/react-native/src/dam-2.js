import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Dam2Icon = (props) => (
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
      d="M3 2H21V20H22V22H13V20H14V10H10V20H11V22H2V20H3V2ZM5.00079 20H7.99921L8 10H5L5.00079 20ZM5 8H19V4H5V8ZM19 10H16V20H19L19 10Z"
      fill="currentColor"
    />
  </Svg>
);
export { Dam2Icon };

export default Dam2Icon;
