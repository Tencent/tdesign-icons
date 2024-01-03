import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CaretDownIcon = (props) => (
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
      d="M12.0003 17.9143L21.4144 8.50009L2.58594 8.50009L12.0003 17.9143ZM7.41441 10.5001L16.586 10.5001L12.0003 15.0859L7.41441 10.5001Z"
      fill="currentColor"
    />
  </Svg>
);
export { CaretDownIcon };

export default CaretDownIcon;
