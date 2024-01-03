import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MinusRectangleIcon = (props) => (
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
      d="M2 2H22V22L2 22V2ZM4 4V20L20 20V4H4ZM6.5 11L17.5 11V13L6.5 13V11Z"
      fill="currentColor"
    />
  </Svg>
);
export { MinusRectangleIcon };

export default MinusRectangleIcon;
