import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MovieClapperIcon = (props) => (
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
      d="M2 2L22 2L22 22L2 22L2 2ZM4 4L4 8L8.86496 8L5.53163 4L4 4ZM8.13504 4L11.4684 8L15.865 8L12.5316 4L8.13504 4ZM15.135 4L18.4684 8H20V4L15.135 4ZM20 10L4 10L4 20L20 20L20 10ZM15 14H9V12H15V14Z"
      fill="currentColor"
    />
  </Svg>
);
export { MovieClapperIcon };

export default MovieClapperIcon;
