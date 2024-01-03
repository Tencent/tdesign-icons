import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CalendarIcon = (props) => (
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
      d="M6 4V1.5H8V4H16V1.5H18V4H22V22H2V4H6ZM4 6V9H20V6H4ZM20 11H4V20H20V11Z"
      fill="currentColor"
    />
  </Svg>
);
export { CalendarIcon };

export default CalendarIcon;
