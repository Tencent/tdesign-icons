import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LettersZIcon = (props) => (
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
      d="M16.5714 5.1C16.5714 4.49249 16.0789 4 15.4714 4H7V6H14.5714V7.13531L7 16.1353V18.9C7 19.5075 7.49249 20 8.1 20H17V18H9V16.8647L16.5714 7.86469V5.1Z"
      fill="currentColor"
    />
  </Svg>
);
export { LettersZIcon };

export default LettersZIcon;
