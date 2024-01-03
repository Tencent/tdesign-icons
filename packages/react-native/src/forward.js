import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ForwardIcon = (props) => (
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
      d="M12.75 4.33594V11.3359L5.75 4.33594V19.6644L12.75 12.6644V19.6644L20.4142 12.0002L12.75 4.33594ZM17.5858 12.0002L14.75 14.8359V9.16436L17.5858 12.0002ZM10.5858 12.0002L7.75 14.8359V9.16436L10.5858 12.0002Z"
      fill="currentColor"
    />
  </Svg>
);
export { ForwardIcon };

export default ForwardIcon;
