import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ComponentLayoutIcon = (props) => (
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
      d="M2 2L22 2L22 22L2 22L2 2ZM4 4L4 11L11 11L11 4L4 4ZM13 4L13 20L20 20L20 4L13 4ZM11 20L11 13L4 13L4 20H11Z"
      fill="currentColor"
    />
  </Svg>
);
export { ComponentLayoutIcon };

export default ComponentLayoutIcon;
