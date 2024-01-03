import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SpaceIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M3 9L3 14L21 14V9H23V16L1 16L1 9H3Z" fill="currentColor" />
  </Svg>
);
export { SpaceIcon };

export default SpaceIcon;
