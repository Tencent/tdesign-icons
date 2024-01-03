import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Houses1Icon = (props) => (
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
      d="M2 2H22V22H2V2ZM4 4V20H8V13H16V20H20V4H4ZM14 20V15H10V20H14ZM8 6V9H6V6H8ZM13 6V9H11V6H13ZM18 6V9H16V6H18Z"
      fill="currentColor"
    />
  </Svg>
);
export { Houses1Icon };

export default Houses1Icon;
