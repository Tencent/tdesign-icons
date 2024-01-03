import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MultiplyIcon = (props) => (
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
      d="M8.81753 7.40381L11.9995 10.5858L15.1815 7.40381L16.5957 8.81802L13.4137 12L16.5957 15.182L15.1815 16.5962L11.9995 13.4142L8.81753 16.5962L7.40332 15.182L10.5853 12L7.40332 8.81802L8.81753 7.40381Z"
      fill="currentColor"
    />
  </Svg>
);
export { MultiplyIcon };

export default MultiplyIcon;
