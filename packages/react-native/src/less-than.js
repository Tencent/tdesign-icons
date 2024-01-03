import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LessThanIcon = (props) => (
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
      d="M20.3643 4.37223L7.0155 12.0001L20.3643 19.628L19.372 21.3645L2.98438 12.0001L19.372 2.63574L20.3643 4.37223Z"
      fill="currentColor"
    />
  </Svg>
);
export { LessThanIcon };

export default LessThanIcon;
