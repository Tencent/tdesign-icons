import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CaretLeftIcon = (props) => (
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
      d="M15.5002 2.58569L15.5002 21.4141L6.08594 11.9999L15.5002 2.58569ZM8.91436 11.9999L13.5002 16.5857L13.5002 7.41412L8.91436 11.9999Z"
      fill="currentColor"
    />
  </Svg>
);
export { CaretLeftIcon };

export default CaretLeftIcon;
