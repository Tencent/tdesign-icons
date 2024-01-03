import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const BookmarkAddIcon = (props) => (
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
      d="M20 0V3H23V5H20V8H18V5H15V3H18V0H20ZM4 3H13V5H6V19.0568L12 14.7711L18 19.0568V10H20V22.9432L12 17.2289L4 22.9432V3Z"
      fill="currentColor"
    />
  </Svg>
);
export { BookmarkAddIcon };

export default BookmarkAddIcon;
