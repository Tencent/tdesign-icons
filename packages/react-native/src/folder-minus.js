import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FolderMinusIcon = (props) => (
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
      d="M1 2.5H9.48063L11.4806 5H23V21H1V2.5ZM3 4.5V19H21V7H10.5194L8.51937 4.5H3ZM8 12H16V14H8V12Z"
      fill="currentColor"
    />
  </Svg>
);
export { FolderMinusIcon };

export default FolderMinusIcon;
