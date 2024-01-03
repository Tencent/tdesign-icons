import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckIcon = (props) => (
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
      d="M20.9852 7.37845L10.3786 17.985L4.01465 11.6211L5.42886 10.2069L10.3786 15.1566L19.571 5.96423L20.9852 7.37845Z"
      fill="currentColor"
    />
  </Svg>
);
export { CheckIcon };

export default CheckIcon;
