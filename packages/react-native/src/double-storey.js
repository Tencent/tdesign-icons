import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DoubleStoreyIcon = (props) => (
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
      d="M5 2H19V4H18V8H22V10H21V20H22V22H2V20H3V10H2V8H6V4H5V2ZM8 4V8H16V4H8ZM5 10V20H8V13H16V20H19V10H5ZM14 20V15H10V20H14ZM10.998 4.99805H13.002V7.00195H10.998V4.99805Z"
      fill="currentColor"
    />
  </Svg>
);
export { DoubleStoreyIcon };

export default DoubleStoreyIcon;
