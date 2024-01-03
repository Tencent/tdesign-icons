import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ScrollBarIcon = (props) => (
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
      d="M22 2L22 22H20L20 2L22 2ZM2 2L18 2L18 22L2 22L2 2ZM4 4L4 20L16 20L16 4L4 4Z"
      fill="currentColor"
    />
  </Svg>
);
export { ScrollBarIcon };

export default ScrollBarIcon;
