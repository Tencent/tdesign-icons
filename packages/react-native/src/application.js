import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ApplicationIcon = (props) => (
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
      d="M12.0001 0.845215L21.6604 6.42257V17.5773L12.0001 23.1546L2.33984 17.5773V6.42257L12.0001 0.845215ZM12.0001 3.15462L4.33984 7.57727V16.4226L12.0001 20.8452L19.6604 16.4226V7.57727L12.0001 3.15462ZM8.72275 8.61316L12.0001 10.7981L15.2774 8.61316L16.3868 10.2773L13.0001 12.5351V15.9999H11.0001V12.5351L7.61335 10.2773L8.72275 8.61316Z"
      fill="currentColor"
    />
  </Svg>
);
export { ApplicationIcon };

export default ApplicationIcon;
