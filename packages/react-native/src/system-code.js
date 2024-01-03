import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SystemCodeIcon = (props) => (
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
      d="M1 1H23V18H1V1ZM3 3V16H21V3H3ZM10.4056 6.84383L8.28062 9.5L10.4056 12.1562L8.84383 13.4056L5.71938 9.5L8.84383 5.59444L10.4056 6.84383ZM15.1562 5.59444L18.2806 9.5L15.1562 13.4056L13.5944 12.1562L15.7194 9.5L13.5944 6.84383L15.1562 5.59444ZM3.22222 21H20.7778V23H3.22222V21Z"
      fill="currentColor"
    />
  </Svg>
);
export { SystemCodeIcon };

export default SystemCodeIcon;
