import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const WorkIcon = (props) => (
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
      d="M7.5 2.5H16.5V6.5H22V21.5H2V6.5H7.5V2.5ZM9.5 6.5H14.5V4.5H9.5V6.5ZM4 8.5V19.5H20V8.5H4Z"
      fill="currentColor"
    />
  </Svg>
);
export { WorkIcon };

export default WorkIcon;
