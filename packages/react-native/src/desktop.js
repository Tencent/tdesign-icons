import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DesktopIcon = (props) => (
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
      d="M1 3H23V18H13V20H17V22H7V20H11V18H1V3ZM3 5V16H21V5H3Z"
      fill="currentColor"
    />
  </Svg>
);
export { DesktopIcon };

export default DesktopIcon;
