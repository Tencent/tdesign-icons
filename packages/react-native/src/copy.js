import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CopyIcon = (props) => (
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
      d="M2 2H15V7.5H13V4H4V13H7.5V15H2V2ZM9 9H22V22H9V9ZM11 11V20H20V11H11Z"
      fill="currentColor"
    />
  </Svg>
);
export { CopyIcon };

export default CopyIcon;
