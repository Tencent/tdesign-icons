import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ErrorIcon = (props) => (
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
      d="M13 2L13 16.5H11L11 2L13 2ZM11 19H13.0039V21.0039H11V19Z"
      fill="currentColor"
    />
  </Svg>
);
export { ErrorIcon };

export default ErrorIcon;
