import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const WindowIcon = (props) => (
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
      d="M2 2H22V22H2V2ZM4 4V20H11V4H4ZM13 5.41421V11.5858L20 18.5858V12.4142L13 5.41421ZM20 9.58579V4H14.4142L20 9.58579ZM18.5858 20L13 14.4142V20H18.5858Z"
      fill="currentColor"
    />
  </Svg>
);
export { WindowIcon };

export default WindowIcon;
