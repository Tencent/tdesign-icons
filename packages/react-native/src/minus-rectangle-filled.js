import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MinusRectangleFilledIcon = (props) => (
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
      d="M2 2H22V22L2 22V2ZM6.5 11V13L17.5 13V11L6.5 11Z"
      fill="currentColor"
    />
  </Svg>
);
export { MinusRectangleFilledIcon };

export default MinusRectangleFilledIcon;
