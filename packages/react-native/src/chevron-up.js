import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronUpIcon = (props) => (
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
      d="M17.5001 15.9142L12.0002 10.4142L6.50015 15.9142L5.08594 14.5L12.0002 7.58582L18.9144 14.5L17.5001 15.9142Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChevronUpIcon };

export default ChevronUpIcon;
