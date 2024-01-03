import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PauseIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M11 17L11 7H8V17H11Z" fill="currentColor" />
    <Path d="M16 17L16 7H13L13 17H16Z" fill="currentColor" />
  </Svg>
);
export { PauseIcon };

export default PauseIcon;
