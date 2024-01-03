import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TrendingUpIcon = (props) => (
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
      d="M2.08594 16.5L8.50016 10.0858L12.5002 14.0858L17.5859 9L13.5002 9V7L21.0002 7V14.5H19.0002V10.4142L12.5002 16.9142L8.50016 12.9142L3.50015 17.9142L2.08594 16.5Z"
      fill="currentColor"
    />
  </Svg>
);
export { TrendingUpIcon };

export default TrendingUpIcon;
