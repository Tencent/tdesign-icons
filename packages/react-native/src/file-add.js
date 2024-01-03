import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FileAddIcon = (props) => (
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
      d="M3 1H15.4142L21 6.58579V12H19V9H13V3H5V21H12V23H3V1ZM15 3.41421V7H18.5858L15 3.41421ZM20 14V18H24V20H20V24H18V20H14V18H18V14H20Z"
      fill="currentColor"
    />
  </Svg>
);
export { FileAddIcon };

export default FileAddIcon;
