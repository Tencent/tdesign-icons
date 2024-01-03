import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowTriangleDownFilledIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M15 12H19.5L12 22L4.5 12H9V2H15V12Z" fill="currentColor" />
  </Svg>
);
export { ArrowTriangleDownFilledIcon };

export default ArrowTriangleDownFilledIcon;
