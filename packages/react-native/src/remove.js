import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const RemoveIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M4 11L20 11V13L4 13L4 11Z" fill="currentColor" />
  </Svg>
);
export { RemoveIcon };

export default RemoveIcon;
