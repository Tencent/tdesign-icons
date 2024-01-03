import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ViewAgendaIcon = (props) => (
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
      d="M2 3H22V11H2V3ZM4 5V9H20V5H4ZM2 13H22V21H2V13ZM4 15V19H20V15H4Z"
      fill="currentColor"
    />
  </Svg>
);
export { ViewAgendaIcon };

export default ViewAgendaIcon;
