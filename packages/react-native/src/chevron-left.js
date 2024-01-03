import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronLeftIcon = (props) => (
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
      d="M15.9144 17.5L10.4144 12L15.9144 6.50003L14.5002 5.08582L7.58594 12L14.5002 18.9142L15.9144 17.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChevronLeftIcon };

export default ChevronLeftIcon;
