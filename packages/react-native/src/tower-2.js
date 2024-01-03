import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Tower2Icon = (props) => (
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
      d="M12 0.585938L14.9728 3.55873L15.9356 18.0002H17V23.0002H7V18.0002H8.06445L9.02721 3.55873L12 0.585938ZM10.0689 18.0002H13.9311L13.0272 4.44157L12 3.41436L10.9728 4.44157L10.0689 18.0002ZM9 20.0002V21.0002H15V20.0002H9Z"
      fill="currentColor"
    />
  </Svg>
);
export { Tower2Icon };

export default Tower2Icon;
