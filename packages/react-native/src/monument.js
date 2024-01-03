import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MonumentIcon = (props) => (
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
      d="M9 1V2H15V1H17V3.16228L16 6.16228V15H17V18H19V23H5V18H7V15H8V6.16228L7 3.16228V1H9ZM10 7V15H14V7H10ZM14.2792 5L14.6126 4H9.38743L9.72076 5H14.2792ZM9 17V18H15V17H9ZM17 20H7V21H17V20Z"
      fill="currentColor"
    />
  </Svg>
);
export { MonumentIcon };

export default MonumentIcon;
