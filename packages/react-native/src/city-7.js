import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const City7Icon = (props) => (
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
      d="M14 2H2V22H22V10H14V2ZM12 10H8V20H4V4H12V10ZM10 20V12H20V20H16V16H14V20H10Z"
      fill="currentColor"
    />
  </Svg>
);
export { City7Icon };

export default City7Icon;
