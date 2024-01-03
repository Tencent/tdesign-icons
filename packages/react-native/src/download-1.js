import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Download1Icon = (props) => (
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
      d="M13 3L13 12.5858L17 8.58579L18.4142 10L12 16.4142L5.58579 10L7 8.58579L11 12.5858L11 3L13 3ZM3 18H21V20H3V18Z"
      fill="currentColor"
    />
  </Svg>
);
export { Download1Icon };

export default Download1Icon;
