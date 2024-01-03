import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowRightIcon = (props) => (
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
      d="M4.5 11L16.0858 11L11.5858 6.50003L13 5.08582L19.9142 12L13 18.9142L11.5858 17.5L16.0858 13L4.5 13L4.5 11Z"
      fill="currentColor"
    />
  </Svg>
);
export { ArrowRightIcon };

export default ArrowRightIcon;
