import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LockOnIcon = (props) => (
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
      d="M5.5 7.5C5.5 3.91015 8.41015 1 12 1C15.5899 1 18.5 3.91015 18.5 7.5V9H20.5V22H3.5V9H5.5V7.5ZM7.5 9H16.5V7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5V9ZM5.5 11V20H18.5V11H5.5ZM9 14.5H15V16.5H9V14.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { LockOnIcon };

export default LockOnIcon;
