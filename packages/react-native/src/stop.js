import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const StopIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M8 8H16V16H8V8Z" fill="currentColor" />
  </Svg>
);
export { StopIcon };

export default StopIcon;
