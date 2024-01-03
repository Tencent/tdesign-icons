import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CaretRightSmallIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <Path d="M16.5 12L9.5 5L9.5 19L16.5 12Z" fill="currentColor" />
  </Svg>
);
export { CaretRightSmallIcon };

export default CaretRightSmallIcon;
