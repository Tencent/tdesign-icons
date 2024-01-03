import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowTriangleUpIcon = (props) => (
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
      d="M9 12V22H15V12H19.5L12 2L4.5 12H9ZM8.5 10L12 5.33333L15.5 10H13V20H11V10H8.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { ArrowTriangleUpIcon };

export default ArrowTriangleUpIcon;
