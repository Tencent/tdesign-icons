import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const RelativityIcon = (props) => (
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
      d="M2 2H15V9H22V22H9V15H2V2ZM11 15V20H20V11H15V15H11ZM13 9V4H4V13H9V9H13ZM13 11H11V13H13V11Z"
      fill="currentColor"
    />
  </Svg>
);
export { RelativityIcon };

export default RelativityIcon;
