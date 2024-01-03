import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Task1Icon = (props) => (
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
      d="M7 1L17 1V3L21 3L21 23L3 23L3 3L7 3V1ZM7 5H5L5 21L19 21L19 5L17 5V7L7 7V5ZM15 3L9 3V5L15 5V3Z"
      fill="currentColor"
    />
  </Svg>
);
export { Task1Icon };

export default Task1Icon;
