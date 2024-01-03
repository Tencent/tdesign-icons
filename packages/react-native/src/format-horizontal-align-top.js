import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FormatHorizontalAlignTopIcon = (props) => (
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
      d="M6 2V22H4V2H6ZM13 2L13 16H11L11 2L13 2ZM20 2V22H18L18 2L20 2Z"
      fill="currentColor"
    />
  </Svg>
);
export { FormatHorizontalAlignTopIcon };

export default FormatHorizontalAlignTopIcon;
