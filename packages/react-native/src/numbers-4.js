import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Numbers4Icon = (props) => (
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
      d="M8.5 4V12H15.5V4H17.5V20H15.5V14H8.5C7.39543 14 6.5 13.1046 6.5 12V4H8.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { Numbers4Icon };

export default Numbers4Icon;
