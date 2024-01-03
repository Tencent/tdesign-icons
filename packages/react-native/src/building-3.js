import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Building3Icon = (props) => (
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
      d="M8 2H16V5H19V9H22V22H2V9H5V5H8V2ZM10 5H14V4H10V5ZM7 9H17V7H7V9ZM4 11V20H8V14H16V20H20V11H4ZM14 20V16H10V20H14Z"
      fill="currentColor"
    />
  </Svg>
);
export { Building3Icon };

export default Building3Icon;
