import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CaretLeftSmallIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M14.5 5L14.5 19L7.5 12L14.5 5Z" fill="currentColor" />
  </Svg>
);
export { CaretLeftSmallIcon };

export default CaretLeftSmallIcon;
