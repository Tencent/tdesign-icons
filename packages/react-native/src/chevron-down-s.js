import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronDownSIcon = (props) => (
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
      d="M11.9996 15.6842L7.0498 10.7344L8.46402 9.32019L11.9996 12.8557L15.5351 9.32019L16.9493 10.7344L11.9996 15.6842Z"
      fill="currentColor"
    />
  </Svg>
);
export { ChevronDownSIcon };

export default ChevronDownSIcon;
