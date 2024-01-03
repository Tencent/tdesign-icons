import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DivideIcon = (props) => (
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
      d="M11 7L13.0039 7V9.00391L11 9.00391V7ZM6.5 11H17.5V13H6.5V11ZM11 15H13.0039V17.0039H11V15Z"
      fill="currentColor"
    />
  </Svg>
);
export { DivideIcon };

export default DivideIcon;
