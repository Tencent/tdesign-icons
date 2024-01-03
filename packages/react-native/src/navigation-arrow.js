import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const NavigationArrowIcon = (props) => (
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
      d="M11.9996 1.76416L21.9456 21.656L11.9996 18.5479L2.05371 21.656L11.9996 1.76416ZM11.9996 6.2363L5.94557 18.3444L11.9996 16.4525L18.0537 18.3444L11.9996 6.2363Z"
      fill="currentColor"
    />
  </Svg>
);
export { NavigationArrowIcon };

export default NavigationArrowIcon;
