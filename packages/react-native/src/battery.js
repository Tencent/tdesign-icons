import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const BatteryIcon = (props) => (
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
      d="M0 5H21V19H0V5ZM2 7V17H19V7H2ZM24 9V15H22V9H24Z"
      fill="currentColor"
    />
  </Svg>
);
export { BatteryIcon };

export default BatteryIcon;
