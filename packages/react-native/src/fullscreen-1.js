import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Fullscreen1Icon = (props) => (
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
      d="M4 4H10V6H6V10H4V4ZM14 4H20V10H18V6H14V4ZM6 14V18H10V20H4V14H6ZM20 14V20H14V18H18V14H20Z"
      fill="currentColor"
    />
  </Svg>
);
export { Fullscreen1Icon };

export default Fullscreen1Icon;
