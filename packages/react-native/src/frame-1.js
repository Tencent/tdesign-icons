import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Frame1Icon = (props) => (
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
      d="M2 2L22 2L22 22L2 22L2 2ZM4 4L4 20H8L8 4L4 4ZM10 4L10 20L14 20L14 4L10 4ZM16 4L16 20H20L20 4L16 4Z"
      fill="currentColor"
    />
  </Svg>
);
export { Frame1Icon };

export default Frame1Icon;
