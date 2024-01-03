import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlayCircleFilledIcon = (props) => (
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
      d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM8.5 17.6292L8.5 6.37085L18.25 12L8.5 17.6292Z"
      fill="currentColor"
    />
  </Svg>
);
export { PlayCircleFilledIcon };

export default PlayCircleFilledIcon;
