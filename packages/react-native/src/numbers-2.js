import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Numbers2Icon = (props) => (
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
      d="M7 4H15C16.1046 4 17 4.89543 17 6V11C17 12.1046 16.1046 13 15 13H9V18H17V20H7V13C7 11.8954 7.89543 11 9 11H15V6H7V4Z"
      fill="currentColor"
    />
  </Svg>
);
export { Numbers2Icon };

export default Numbers2Icon;
