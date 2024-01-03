import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CaretUpSmallIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M12.0001 7.5L19 14.5L5 14.5L12.0001 7.5Z" fill="currentColor" />
  </Svg>
);
export { CaretUpSmallIcon };

export default CaretUpSmallIcon;
