import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ComponentInputIcon = (props) => (
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
      d="M2 7L22 7V16L2 16L2 7ZM4 9L4 14L20 14V9L4 9ZM8 10V13H6V10H8Z"
      fill="currentColor"
    />
  </Svg>
);
export { ComponentInputIcon };

export default ComponentInputIcon;
