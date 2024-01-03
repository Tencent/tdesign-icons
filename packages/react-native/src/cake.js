import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const CakeIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="rgba(0, 0, 0, 0.9)"
    {...props}
  >
    <G id="\xE8\x9B\x8B\xE7\xB3\x95_cake">
      <Path
        id="Union"
        d="M6.99805 1.99805H9.00195V4.00195H6.99805V1.99805ZM10.998 1.99805H13.002V4.00195H10.998V1.99805ZM14.998 1.99805H17.002V4.00195H14.998V1.99805ZM9 5V10H11V5H13V10H15V5H17V10H21V20H23V22H1V20H3V10H7V5H9ZM5 12V15H6.16228L9 15.9459L12 14.9459L15 15.9459L17.8377 15H19V12H5ZM19 17H18.1623L15 18.0541L12 17.0541L9 18.0541L5.83772 17H5V20H19V17Z"
        fill="currentColor"
      />
    </G>
  </Svg>
);
export { CakeIcon };

export default CakeIcon;
