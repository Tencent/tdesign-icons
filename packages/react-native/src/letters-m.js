import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LettersMIcon = (props) => (
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
      d="M18 20L18 6H13L13 20H11L11 6L6 6L6 20H4L4 4L18 4C19.1046 4 20 4.89543 20 6L20 20H18Z"
      fill="currentColor"
    />
  </Svg>
);
export { LettersMIcon };

export default LettersMIcon;
