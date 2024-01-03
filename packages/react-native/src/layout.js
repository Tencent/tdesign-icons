import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LayoutIcon = (props) => (
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
      d="M2 2L22 2L22 22L2 22L2 2ZM4 4L4 9L20 9V4L4 4ZM20 11L13 11L13 20L20 20L20 11ZM11 20L11 11L4 11L4 20H11Z"
      fill="currentColor"
    />
  </Svg>
);
export { LayoutIcon };

export default LayoutIcon;
