import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TableAddIcon = (props) => (
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
      d="M2 2H22V22H2V2ZM4 4V6H20V4H4ZM20 8H4V20H20V8ZM13 10V13H16V15H13V18H11V15H8V13H11V10H13Z"
      fill="currentColor"
    />
  </Svg>
);
export { TableAddIcon };

export default TableAddIcon;
