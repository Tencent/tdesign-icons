import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowLeftUpIcon = (props) => (
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
      d="M16.5957 18.0104L8.40332 9.81802L8.40332 16.182H6.40332L6.40332 6.40381L16.1815 6.40381L16.1815 8.40381L9.81753 8.40381L18.0099 16.5962L16.5957 18.0104Z"
      fill="currentColor"
    />
  </Svg>
);
export { ArrowLeftUpIcon };

export default ArrowLeftUpIcon;
