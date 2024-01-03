import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SimCard1Icon = (props) => (
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
      d="M7.58579 1H21V23H3V5.58579L7.58579 1ZM8.41421 3L5 6.41421V21H19V3H8.41421ZM10.5 9.00586H13.5V16.9876H11.5V11.0059H10.5V9.00586Z"
      fill="currentColor"
    />
  </Svg>
);
export { SimCard1Icon };

export default SimCard1Icon;
