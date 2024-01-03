import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TypographyIcon = (props) => (
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
      d="M2 3L17 3V11L2 11L2 3ZM4 5L4 9L15 9L15 5L4 5ZM2 14L22 14L22 16L2 16L2 14ZM2 19L22 19V21L2 21L2 19Z"
      fill="currentColor"
    />
  </Svg>
);
export { TypographyIcon };

export default TypographyIcon;
