import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FileOutlookIcon = (props) => (
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
      d="M3 1H15.4142L21 6.58579V23H3V1ZM5 3V21H19V9H13V3H5ZM15 3.41421V7H18.5858L15 3.41421ZM8.5 12C8.5 10.8954 9.39543 10 10.5 10H13.5C14.6046 10 15.5 10.8954 15.5 12V16C15.5 17.1046 14.6046 18 13.5 18H10.5C9.39543 18 8.5 17.1046 8.5 16V12ZM13.5 12H10.5V16H13.5V12Z"
      fill="currentColor"
    />
  </Svg>
);
export { FileOutlookIcon };

export default FileOutlookIcon;
