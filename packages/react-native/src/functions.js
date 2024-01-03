import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FunctionsIcon = (props) => (
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
      d="M4 3H20V5H7.13955L15.4151 12L7.13955 19H20V21H4V19.0361L12.3182 12L4 4.9639V3Z"
      fill="currentColor"
    />
  </Svg>
);
export { FunctionsIcon };

export default FunctionsIcon;
