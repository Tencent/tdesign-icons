import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MailIcon = (props) => (
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
      d="M1 3H23V21L1 21V3ZM3 5V6.82947L12 11.3795L21 6.82947V5H3ZM21 9.07053L12 13.6205L3 9.07053V19L21 19V9.07053Z"
      fill="currentColor"
    />
  </Svg>
);
export { MailIcon };

export default MailIcon;
