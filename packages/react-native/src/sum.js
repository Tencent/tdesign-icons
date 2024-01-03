import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SumIcon = (props) => (
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
      d="M1.58594 3H21.0002V5H6.41436L13.4144 12L6.41437 19H21.0002V21H1.58594L10.5859 12L1.58594 3Z"
      fill="currentColor"
    />
  </Svg>
);
export { SumIcon };

export default SumIcon;
