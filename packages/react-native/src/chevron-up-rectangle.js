import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronUpRectangleIcon = (props) => (
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
      d="M2 2H22V22H2V2ZM4 4V20H20V4H4ZM12 8.08579L17.4142 13.5L16 14.9142L12 10.9142L8 14.9142L6.58579 13.5L12 8.08579Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChevronUpRectangleIcon };

export default ChevronUpRectangleIcon;
