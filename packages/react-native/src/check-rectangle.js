import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckRectangleIcon = (props) => (
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
      d="M2 2H22V22H2V2ZM4 4V20H20V4H4ZM17.9142 9L10.5 16.4142L6.08579 12L7.5 10.5858L10.5 13.5858L16.5 7.58579L17.9142 9Z"
      fill="currentColor"
    />
  </Svg>
);
export { CheckRectangleIcon };

export default CheckRectangleIcon;
