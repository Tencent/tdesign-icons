import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Calendar1Icon = (props) => (
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
      d="M8 1V4L16 4V1L18 1V4L22 4L22 22L2 22L2 4L6 4L6 1L8 1ZM4 6L4 9L20 9V6L4 6ZM20 11L4 11L4 20L20 20L20 11ZM7 13L9.00391 13L9.00391 15.0039L7 15.0039L7 13ZM11 13H13.0039V15.0039H11V13ZM15 13H17.0039V15.0039H15V13ZM7 16L9.00391 16V18.0039H7V16ZM11 16H13.0039L13.0039 18.0039H11L11 16ZM15 16H17.0039L17.0039 18.0039H15L15 16Z"
      fill="currentColor"
    />
  </Svg>
);
export { Calendar1Icon };

export default Calendar1Icon;
