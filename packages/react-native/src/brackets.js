import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const BracketsIcon = (props) => (
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
      d="M2 3.5H7V5.5H4V18.5H7V20.5H2V3.5ZM17 3.5H22V20.5H17V18.5H20V5.5H17V3.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { BracketsIcon };

export default BracketsIcon;
