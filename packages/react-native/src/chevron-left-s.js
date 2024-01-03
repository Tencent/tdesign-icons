import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronLeftSIcon = (props) => (
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
      d="M8.31543 12L13.2652 7.05029L14.6794 8.46451L11.1439 12L14.6794 15.5356L13.2652 16.9498L8.31543 12Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChevronLeftSIcon };

export default ChevronLeftSIcon;
