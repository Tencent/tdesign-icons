import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CalculatorIcon = (props) => (
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
      d="M3 1H21V23H3V1ZM5 3V7H19V3H5ZM19 9H5V21H19V9ZM7 12H11V14H7V12ZM13 12H17V14H13V12ZM7 16H11V18H7V16ZM13 16H17V18H13V16Z"
      fill="currentColor"
    />
  </Svg>
);
export { CalculatorIcon };

export default CalculatorIcon;
