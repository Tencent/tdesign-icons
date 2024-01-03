import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ComponentDropdownIcon = (props) => (
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
      d="M2 2H22V9H2V2ZM4 4V7H20V4H4ZM4 11L4 20L20 20V11H22V22L2 22L2 11H4ZM6 12L18 12V14L6 14V12ZM6 16L18 16V18H6V16Z"
      fill="currentColor"
    />
  </Svg>
);
export { ComponentDropdownIcon };

export default ComponentDropdownIcon;
