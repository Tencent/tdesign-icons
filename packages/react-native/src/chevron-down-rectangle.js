import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronDownRectangleIcon = (props) => (
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
      d="M2 2H22V22H2V2ZM4 4V20H20V4H4ZM8 9.08579L12 13.0858L16 9.08579L17.4142 10.5L12 15.9142L6.58579 10.5L8 9.08579Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChevronDownRectangleIcon };

export default ChevronDownRectangleIcon;
