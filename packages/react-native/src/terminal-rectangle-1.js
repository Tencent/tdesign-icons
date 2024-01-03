import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TerminalRectangle1Icon = (props) => (
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
      d="M1 3H23V21H1V3ZM3 5V8H21V5H3ZM21 10H3V19H21V10ZM7 11.0858L10.4142 14.5L7 17.9142L5.58579 16.5L7.58579 14.5L5.58579 12.5L7 11.0858ZM12 15L18 15L18 17L12 17V15Z"
      fill="currentColor"
    />
  </Svg>
);
export { TerminalRectangle1Icon };

export default TerminalRectangle1Icon;
