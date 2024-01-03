import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LettersJIcon = (props) => (
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
      d="M9.66667 4H15V18.5C15 19.3284 14.3284 20 13.5 20H8V18H13V6H9.66667V4Z"
      fill="currentColor"
    />
  </Svg>
);
export { LettersJIcon };

export default LettersJIcon;
