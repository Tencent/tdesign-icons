import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const WalletIcon = (props) => (
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
      d="M1 3H16C17.6569 3 19 4.34315 19 6V7H23V21H1V3ZM3 9V19H21V9H3ZM3 7H17V6C17 5.44772 16.5523 5 16 5H3V7ZM16 13H19V15H16V13Z"
      fill="currentColor"
    />
  </Svg>
);
export { WalletIcon };

export default WalletIcon;
