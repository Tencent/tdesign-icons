import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const StoreIcon = (props) => (
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
      d="M3.5 2.5H20.5V4.5H3.5V2.5ZM2.6802 5.5H21.3198L22.5 11.401V13.5H21V21.5H19V13.5H14V21.5H3V13.5H1.5V11.401L2.6802 5.5ZM5 13.5V19.5H12V13.5H5ZM20.4802 11.5L19.6802 7.5H4.3198L3.5198 11.5H20.4802Z"
      fill="currentColor"
    />
  </Svg>
);
export { StoreIcon };

export default StoreIcon;
