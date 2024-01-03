import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronLeftRectangleIcon = (props) => (
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
      d="M2 2H22V22H2V2ZM4 4V20H20V4H4ZM14.9142 8L10.9142 12L14.9142 16L13.5 17.4142L8.08579 12L13.5 6.58579L14.9142 8Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChevronLeftRectangleIcon };

export default ChevronLeftRectangleIcon;
