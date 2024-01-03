import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Calendar2Icon = (props) => (
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
      d="M8 1V4H16V1H18V4H22V22H2V4H6V1H8ZM4 6V9H20V6H4ZM20 11H4V20H20V11Z"
      fill="currentColor"
    />
    <Path
      d="M16.9142 13.25L11.2574 18.9069L7.72183 15.3713L9.13604 13.9571L11.2574 16.0784L15.5 11.8358L16.9142 13.25Z"
      fill="currentColor"
    />
  </Svg>
);
export { Calendar2Icon };

export default Calendar2Icon;
