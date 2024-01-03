import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TerminalRectangleIcon = (props) => (
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
      d="M23 3V21L1 21L1 3L23 3ZM21 5L3 5L3 19H21V5ZM19 17H12V15H19V17ZM10.0701 12L6.33096 15.7442L4.91579 14.331L7.2436 12L4.91579 9.66905L6.33096 8.25579L10.0701 12Z"
      fill="currentColor"
    />
  </Svg>
);
export { TerminalRectangleIcon };

export default TerminalRectangleIcon;
