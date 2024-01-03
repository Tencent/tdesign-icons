import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChartIcon = (props) => (
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
      d="M2 2H22V22H2V2ZM4 4V20H20V4H4ZM13 7V18H11V7H13ZM8 11V18H6V11H8ZM18 13V18H16V13H18Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChartIcon };

export default ChartIcon;
