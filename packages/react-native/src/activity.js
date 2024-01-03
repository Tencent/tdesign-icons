import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ActivityIcon = (props) => (
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
      d="M22 2H2V22H22V2ZM20 4V11H17.4458L15.425 14.2333L9.5598 6.41307L5.54623 11H4V4H20ZM4 13H6.45377L9.4402 9.58693L15.575 17.7667L18.5542 13H20V20H4V13Z"
      fill="currentColor"
    />
  </Svg>
);
export { ActivityIcon };

export default ActivityIcon;
