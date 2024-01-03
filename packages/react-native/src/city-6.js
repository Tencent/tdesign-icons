import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const City6Icon = (props) => (
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
      d="M18 2H6V8H1V22H23V6H18V2ZM18 8H21V20H18V8ZM16 20H13V15H11V20H8V4H16V20ZM6 20H3V10H6V20Z"
      fill="currentColor"
    />
  </Svg>
);
export { City6Icon };

export default City6Icon;
