import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const AlphaIcon = (props) => (
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
      d="M14.0001 2V5.86583L19.3359 2.62623L20.3739 4.33581L14.0001 8.2056V16.7944L20.3739 20.6642L19.3359 22.3738L14.0001 19.1342V22H12.0001V17.9199L3.07324 12.5L12.0001 7.08012V2H14.0001ZM12.0001 9.41988L6.92697 12.5L12.0001 15.5801V9.41988Z"
      fill="currentColor"
    />
  </Svg>
);
export { AlphaIcon };

export default AlphaIcon;
