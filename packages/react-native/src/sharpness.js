import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SharpnessIcon = (props) => (
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
      d="M20.5006 0.585693V19.4999H1.5864L20.5006 0.585693ZM6.41482 17.4999H18.5006V5.41412L6.41482 17.4999ZM20.5006 20.9999V22.9999L1.50098 22.9999L1.50098 20.9999L20.5006 20.9999Z"
      fill="currentColor"
    />
  </Svg>
);
export { SharpnessIcon };

export default SharpnessIcon;
