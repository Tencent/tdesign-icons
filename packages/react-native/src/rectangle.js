import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const RectangleIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M2 2H22V22H2V2ZM4 4V20H20V4H4Z" fill="currentColor" />
  </Svg>
);
export { RectangleIcon };

export default RectangleIcon;
