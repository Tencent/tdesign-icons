import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TaskAddIcon = (props) => (
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
      d="M7 1H17V3H21V12H19V5H17V7H7V5H5V21H12V23H3V3H7V1ZM9 5H15V3H9V5ZM20 14V18H24V20H20V24H18V20H14V18H18V14H20Z"
      fill="currentColor"
    />
  </Svg>
);
export { TaskAddIcon };

export default TaskAddIcon;
