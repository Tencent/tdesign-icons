import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChatIcon = (props) => (
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
      d="M1.5 2H22.5V18H6.87574L1.5 22.7038V2ZM3.5 4V18.2962L6.12426 16H20.5V4H3.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChatIcon };

export default ChatIcon;
