import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LettersNIcon = (props) => (
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
      d="M8.5 20L8.5 6L15.5 6L15.5 20H17.5L17.5 6C17.5 4.89543 16.6046 4 15.5 4L6.5 4L6.5 20H8.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { LettersNIcon };

export default LettersNIcon;
