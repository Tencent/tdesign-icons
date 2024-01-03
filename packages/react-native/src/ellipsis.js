import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const EllipsisIcon = (props) => (
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
      d="M3 10.5H6V13.5H3V10.5ZM10.5 10.5H13.5V13.5H10.5V10.5ZM18 10.5H21V13.5H18V10.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { EllipsisIcon };

export default EllipsisIcon;
