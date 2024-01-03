import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MirrorIcon = (props) => (
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
      d="M13.0003 2L13.0003 22H11.0003L11.0003 2L13.0003 2ZM9.0003 4.64087V18.5H1.30078L9.0003 4.64087ZM15.0003 4.64087L22.6998 18.5H15.0003V4.64087ZM4.69981 16.5H7.0003V12.3591L4.69981 16.5ZM17.0003 12.3591V16.5H19.3008L17.0003 12.3591Z"
      fill="currentColor"
    />
  </Svg>
);
export { MirrorIcon };

export default MirrorIcon;
