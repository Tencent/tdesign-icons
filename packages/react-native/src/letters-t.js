import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LettersTIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M6.5 4H17.5V6H13V20H11V6H6.5V4Z" fill="currentColor" />
  </Svg>
);
export { LettersTIcon };

export default LettersTIcon;
