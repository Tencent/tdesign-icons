import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ButtonIcon = (props) => (
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
      d="M2 5H22V19H2V5ZM4 7V17H20V7H4ZM6 9H18V15H6V9ZM8 11V13H16V11H8Z"
      fill="currentColor"
    />
  </Svg>
);
export { ButtonIcon };

export default ButtonIcon;
