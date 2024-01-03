import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Flag4Icon = (props) => (
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
      d="M2 2L16 2V3L22 3L22 17L14 17V16L4 16L4 22H2L2 2ZM4 14L14 14L14 4L4 4L4 14ZM16 5V15L20 15L20 5L16 5Z"
      fill="currentColor"
    />
  </Svg>
);
export { Flag4Icon };

export default Flag4Icon;
