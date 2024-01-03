import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const HospitalIcon = (props) => (
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
      d="M4 2H20V4H19V8H22V22H2V8H5V4H4V2ZM7 4V10H4.0006L4 20H9V14H15V20H20V10H17V4H7ZM13 20V16H11V20H13ZM13 5V7H15V9H13V11H11V9H9V7H11V5H13Z"
      fill="currentColor"
    />
  </Svg>
);
export { HospitalIcon };

export default HospitalIcon;
