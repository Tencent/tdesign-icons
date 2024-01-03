import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LettersHIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M9 4V11H15V4H17V20H15V13H9V20H7V4H9Z" fill="currentColor" />
  </Svg>
);
export { LettersHIcon };

export default LettersHIcon;
