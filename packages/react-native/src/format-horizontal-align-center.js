import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FormatHorizontalAlignCenterIcon = (props) => (
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
      d="M6 2V22H4V2H6ZM20 2V22H18L18 2L20 2ZM13 5L13 19H11L11 5H13Z"
      fill="currentColor"
    />
  </Svg>
);
export { FormatHorizontalAlignCenterIcon };

export default FormatHorizontalAlignCenterIcon;
