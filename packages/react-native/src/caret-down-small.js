import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CaretDownSmallIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M12.0001 16.5L19 9.5L5 9.5L12.0001 16.5Z" fill="currentColor" />
  </Svg>
);
export { CaretDownSmallIcon };

export default CaretDownSmallIcon;
