import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LettersIIcon = (props) => (
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
      d="M8.5 4H15.5V6H13V18H15.5V20H8.5V18H11V6H8.5V4Z"
      fill="currentColor"
    />
  </Svg>
);
export { LettersIIcon };

export default LettersIIcon;
