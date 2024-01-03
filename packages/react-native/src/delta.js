import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DeltaIcon = (props) => (
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
      d="M18.9999 2.09131V22.7894L3.17188 13.0491L18.9999 2.09131ZM6.82784 12.9506L16.9999 19.2103V5.90845L6.82784 12.9506Z"
      fill="currentColor"
    />
  </Svg>
);
export { DeltaIcon };

export default DeltaIcon;
