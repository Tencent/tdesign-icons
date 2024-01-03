import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LessThanOrEqualIcon = (props) => (
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
      d="M20.2969 3.56512L7.7353 8.50002L20.2969 13.4349L19.5656 15.2964L2.26562 8.50002L19.5656 1.70361L20.2969 3.56512ZM3.00046 19H21.0005V21H3.00046V19Z"
      fill="currentColor"
    />
  </Svg>
);
export { LessThanOrEqualIcon };

export default LessThanOrEqualIcon;
