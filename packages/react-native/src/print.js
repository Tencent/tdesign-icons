import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PrintIcon = (props) => (
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
      d="M4 2L20 2V7H23.5L23.5 18H19V22L5 22L5 18H0.5L0.5 7L4 7L4 2ZM6 7L18 7V4L6 4L6 7ZM2.5 9L2.5 16H5L5 14L19 14V16H21.5L21.5 9L2.5 9ZM17 16H7L7 20L17 20V16ZM17 10.4961L19.0039 10.4961V12.5L17 12.5V10.4961Z"
      fill="currentColor"
    />
  </Svg>
);
export { PrintIcon };

export default PrintIcon;
