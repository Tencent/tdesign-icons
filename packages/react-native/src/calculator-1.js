import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Calculator1Icon = (props) => (
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
      d="M4 2H20V22H4V2ZM6 4V8H18V4H6ZM18 10H15V12H18V10ZM18 14H15L15 16H18V14ZM18 18H15V20H18V18ZM13 20V18H11V20H13ZM9 20V18H6V20H9ZM6 16H9L9 14H6V16ZM6 12H9V10H6V12ZM11 10V12H13V10H11ZM13 14H11L11 16H13V14Z"
      fill="currentColor"
    />
  </Svg>
);
export { Calculator1Icon };

export default Calculator1Icon;
