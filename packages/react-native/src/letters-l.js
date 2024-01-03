import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LettersLIcon = (props) => (
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
      d="M7 4V18C7 19.1046 7.89543 20 9 20H17V18H9V4H7Z"
      fill="currentColor"
    />
  </Svg>
);
export { LettersLIcon };

export default LettersLIcon;
