import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LettersEIcon = (props) => (
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
      d="M7 6C7 4.89543 7.89543 4 9 4H17V6H9V11H17V13H9V18H17V20H9C7.89543 20 7 19.1046 7 18V6Z"
      fill="currentColor"
    />
  </Svg>
);
export { LettersEIcon };

export default LettersEIcon;
