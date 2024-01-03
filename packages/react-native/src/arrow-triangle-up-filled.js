import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowTriangleUpFilledIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M15 12H19.5L12 2L4.5 12H9V22H15V12Z" fill="currentColor" />
  </Svg>
);
export { ArrowTriangleUpFilledIcon };

export default ArrowTriangleUpFilledIcon;
