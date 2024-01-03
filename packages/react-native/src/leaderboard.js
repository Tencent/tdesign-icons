import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LeaderboardIcon = (props) => (
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
      d="M8 3H16V11H22V21H2V9H8V3ZM10 19H14V5H10V19ZM16 19H20V13H16V19ZM8 19V11H4V19H8Z"
      fill="currentColor"
    />
  </Svg>
);
export { LeaderboardIcon };

export default LeaderboardIcon;
