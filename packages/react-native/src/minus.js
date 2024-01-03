import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MinusIcon = (props) => (
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
      d="M6.50195 11L17.502 11V13L6.50195 13L6.50195 11Z"
      fill="currentColor"
    />
  </Svg>
);
export { MinusIcon };

export default MinusIcon;
