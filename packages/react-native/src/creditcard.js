import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CreditcardIcon = (props) => (
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
      d="M23 3V21L1 21L1 3L23 3ZM21 5L3 5L3 9H21V5ZM21 11L3 11L3 19H21V11ZM10 16L5 16L5 14L10 14V16Z"
      fill="currentColor"
    />
  </Svg>
);
export { CreditcardIcon };

export default CreditcardIcon;
