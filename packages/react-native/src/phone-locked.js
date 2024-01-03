import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PhoneLockedIcon = (props) => (
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
      d="M4 1H20V11H18V3H6V21H11V23H4V1ZM17.5 14.5C18.1904 14.5 18.75 15.0596 18.75 15.75V16.5H16.25V15.75C16.25 15.0596 16.8096 14.5 17.5 14.5ZM20.75 16.5V15.75C20.75 13.9551 19.2949 12.5 17.5 12.5C15.7051 12.5 14.25 13.9551 14.25 15.75V16.5H12.9985V23H21.9985V16.5H20.75ZM19.9985 18.5V21H14.9985V18.5H19.9985Z"
      fill="currentColor"
    />
  </Svg>
);
export { PhoneLockedIcon };

export default PhoneLockedIcon;
