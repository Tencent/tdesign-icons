import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FilterIcon = (props) => (
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
      d="M2.57031 3H21.4302L14.5002 12.8174V21H9.50023V12.8174L2.57031 3ZM6.43015 5L11.5002 12.1826V19H12.5002V12.1826L17.5703 5H6.43015Z"
      fill="currentColor"
    />
  </Svg>
);
export { FilterIcon };

export default FilterIcon;
