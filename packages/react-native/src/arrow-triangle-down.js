import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowTriangleDownIcon = (props) => (
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
      d="M9 12V2H15V12H19.5L12 22L4.5 12H9ZM8.5 14L12 18.6667L15.5 14H13V4H11V14H8.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { ArrowTriangleDownIcon };

export default ArrowTriangleDownIcon;
