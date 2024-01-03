import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const GreaterThanIcon = (props) => (
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
      d="M3.63574 4.37223L16.9846 12.0001L3.63574 19.628L4.62802 21.3645L21.0157 12.0001L4.62802 2.63574L3.63574 4.37223Z"
      fill="currentColor"
    />
  </Svg>
);
export { GreaterThanIcon };

export default GreaterThanIcon;
