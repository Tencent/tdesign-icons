import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CaretUpIcon = (props) => (
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
      d="M12.0003 6.08569L21.4144 15.4999L2.58594 15.4999L12.0003 6.08569ZM7.41441 13.4999L16.586 13.4999L12.0003 8.91412L7.41441 13.4999Z"
      fill="currentColor"
    />
  </Svg>
);
export { CaretUpIcon };

export default CaretUpIcon;
