import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChartStackedIcon = (props) => (
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
      d="M4 2V20H6V9H12V20H14V5H20V20H22V22H2V2H4ZM18 20V16.5H16V20H18ZM16 14.5H18V7H16V14.5ZM10 20V16.5H8V20H10ZM8 14.5H10V11H8V14.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChartStackedIcon };

export default ChartStackedIcon;
