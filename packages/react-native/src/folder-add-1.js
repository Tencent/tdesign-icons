import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FolderAdd1Icon = (props) => (
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
      d="M1 2.5H9.48063L11.4806 5H23V21H1V2.5ZM3 4.5V19H21V7H10.5194L8.51937 4.5H3ZM13 9V12H16V14H13V17H11V14H8V12H11V9H13Z"
      fill="currentColor"
    />
  </Svg>
);
export { FolderAdd1Icon };

export default FolderAdd1Icon;
