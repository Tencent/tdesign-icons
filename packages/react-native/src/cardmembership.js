import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CardmembershipIcon = (props) => (
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
      d="M23 3V21L1 21L1 3L23 3ZM21 5L3 5L3 9H21V5ZM21 11H19V17.7662L15.5 15.6662L12 17.7662L12 11H3L3 19H21V11ZM17 11H14V14.2338L15.5 13.3338L17 14.2338V11Z"
      fill="currentColor"
    />
  </Svg>
);
export { CardmembershipIcon };

export default CardmembershipIcon;
