import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MenuUnfoldIcon = (props) => (
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
      d="M2 4H22V6H2V4ZM22 9.57075V14.4292L18.1132 12L22 9.57075ZM2 13L2 11L17 11V13L2 13ZM2 20L2 18L22 18V20L2 20Z"
      fill="currentColor"
    />
  </Svg>
);
export { MenuUnfoldIcon };

export default MenuUnfoldIcon;
