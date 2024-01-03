import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const EqualIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M4 7H20V9H4V7ZM4 15H20V17H4V15Z" fill="currentColor" />
  </Svg>
);
export { EqualIcon };

export default EqualIcon;
