import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SwapRightIcon = (props) => (
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
      d="M15 7.58569L22.4142 14.9999L2 14.9999V12.9999L17.5858 12.9999L13.5858 8.99991L15 7.58569Z"
      fill="currentColor"
    />
  </Svg>
);
export { SwapRightIcon };

export default SwapRightIcon;
