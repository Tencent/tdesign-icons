import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckRectangleFilledIcon = (props) => (
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
      d="M22 2H2V22H22V2ZM6.08618 12L7.5004 10.5858L10.5004 13.5858L16.5004 7.58579L17.9146 9L10.5004 16.4142L6.08618 12Z"
      fill="currentColor"
    />
  </Svg>
);
export { CheckRectangleFilledIcon };

export default CheckRectangleFilledIcon;
