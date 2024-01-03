import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MobileListIcon = (props) => (
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
      d="M4 1H20V6H18V3H6V21H18V16H20V23H4V1ZM13 8H24V10H13V8ZM13 12H21V14H13V12ZM11 17H13.0039V19.0039H11V17Z"
      fill="currentColor"
    />
  </Svg>
);
export { MobileListIcon };

export default MobileListIcon;
