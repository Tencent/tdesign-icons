import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Desktop1Icon = (props) => (
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
      d="M1 3H23V19H13V20H17V22H7V20H11V19H1V3ZM3 5V14H21V5H3ZM21 16H3V17H21V16Z"
      fill="currentColor"
    />
  </Svg>
);
export { Desktop1Icon };

export default Desktop1Icon;
