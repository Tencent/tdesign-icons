import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TimeFilledIcon = (props) => (
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
      d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12.9999 5.49999H10.9999L10.9998 12.4142L14.9999 16.4142L16.4141 15L12.9999 11.5858V5.49999Z"
      fill="currentColor"
    />
  </Svg>
);
export { TimeFilledIcon };

export default TimeFilledIcon;
