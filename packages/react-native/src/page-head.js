import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PageHeadIcon = (props) => (
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
      d="M21 10V22H19V12L5 12L5 22H3L3 10L21 10ZM21 2V8L3 8L3 2L21 2ZM19 4L5 4V6L19 6V4Z"
      fill="currentColor"
    />
  </Svg>
);
export { PageHeadIcon };

export default PageHeadIcon;
