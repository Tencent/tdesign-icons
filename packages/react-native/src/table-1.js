import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Table1Icon = (props) => (
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
      d="M2 2L22 2L22 22L2 22L2 2ZM4 4L4 8L20 8V4L4 4ZM20 10H16L16 20H20L20 10ZM14 20L14 10L10 10L10 20L14 20ZM8 20L8 10H4L4 20H8Z"
      fill="currentColor"
    />
  </Svg>
);
export { Table1Icon };

export default Table1Icon;
