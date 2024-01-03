import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const VideoCameraMinusIcon = (props) => (
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
      d="M24 4.23381V19.7232L17 15.7232V20L0 20L6.9938e-07 4L17 4V8.43382L24 4.23381ZM17 10.7662V13.4197L22 16.2768V7.76619L17 10.7662ZM15 18V6L2 6L2 18H15ZM12.5 13L4.5 13V11H12.5V13Z"
      fill="currentColor"
    />
  </Svg>
);
export { VideoCameraMinusIcon };

export default VideoCameraMinusIcon;
