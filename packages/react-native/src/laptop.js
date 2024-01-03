import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LaptopIcon = (props) => (
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
      d="M1 3H23V18H1V3ZM3 5V16H21V5H3ZM0 19H24V21H0V19Z"
      fill="currentColor"
    />
  </Svg>
);
export { LaptopIcon };

export default LaptopIcon;
