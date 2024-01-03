import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronRightIcon = (props) => (
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
      d="M8.08594 17.5L13.5859 12L8.08594 6.50003L9.50015 5.08582L16.4144 12L9.50015 18.9142L8.08594 17.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChevronRightIcon };

export default ChevronRightIcon;
