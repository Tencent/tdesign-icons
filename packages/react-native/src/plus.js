import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = (props) => (
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
      d="M13 6.5V11L17.5 11V13L13 13V17.5H11L11 13L6.5 13L6.5 11H11L11 6.5L13 6.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { PlusIcon };

export default PlusIcon;
