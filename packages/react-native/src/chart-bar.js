import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChartBarIcon = (props) => (
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
      d="M4 2V20H6V9H12V20H14V5H20V20H22V22H2V2H4ZM18 20V7H16V20H18ZM10 20V11H8V20H10Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChartBarIcon };

export default ChartBarIcon;
