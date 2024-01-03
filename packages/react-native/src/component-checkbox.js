import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ComponentCheckboxIcon = (props) => (
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
      d="M2 2L15 2V7.5H13V4L4 4L4 13H7.5V15H2L2 2ZM9 9L22 9L22 22L9 22L9 9ZM11 11L11 20L20 20L20 11L11 11ZM19.4142 14L15 18.4142L12.0858 15.5L13.5 14.0858L15 15.5858L18 12.5858L19.4142 14Z"
      fill="currentColor"
    />
  </Svg>
);
export { ComponentCheckboxIcon };

export default ComponentCheckboxIcon;
