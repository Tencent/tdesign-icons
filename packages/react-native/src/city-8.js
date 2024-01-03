import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const City8Icon = (props) => (
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
      d="M2 2H14V10H22V22H2V2ZM12 10V8H9V10H12ZM9 12V14H12V12H9ZM7 10V8H4V10H7ZM4 12V14H7V12H4ZM4 16V20H12V16H4ZM14 20H16V16H18V20H20V12H14V20ZM4 6H7V4H4V6ZM9 4V6H12V4H9Z"
      fill="currentColor"
    />
  </Svg>
);
export { City8Icon };

export default City8Icon;
