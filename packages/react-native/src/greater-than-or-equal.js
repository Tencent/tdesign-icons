import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const GreaterThanOrEqualIcon = (props) => (
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
      d="M4.4349 1.70361L21.7348 8.50002L4.4349 15.2964L3.7036 13.4349L16.2652 8.50002L3.7036 3.56512L4.4349 1.70361ZM3 19H21V21H3V19Z"
      fill="currentColor"
    />
  </Svg>
);
export { GreaterThanOrEqualIcon };

export default GreaterThanOrEqualIcon;
