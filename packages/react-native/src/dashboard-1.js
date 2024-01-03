import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Dashboard1Icon = (props) => (
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
      d="M2 2H11V9H2V2ZM4 4V7H9V4H4ZM13 2H22V13H13V2ZM15 4V11H20V4H15ZM2 11H11V22H2V11ZM4 13V20H9V13H4ZM13 15H22V22H13V15ZM15 17V20H20V17H15Z"
      fill="currentColor"
    />
  </Svg>
);
export { Dashboard1Icon };

export default Dashboard1Icon;
