import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SystemLogIcon = (props) => (
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
      d="M1 1H23V23H1V1ZM3 9.66667V21H21V9.66667H3ZM21 7.66667V3H3V7.66667H21ZM5 4H7.00391V6.00391H5V4ZM6 12L18 12V14L6 14V12ZM6 16H12V18H6V16Z"
      fill="currentColor"
    />
  </Svg>
);
export { SystemLogIcon };

export default SystemLogIcon;
