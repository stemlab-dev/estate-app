import Svg, { SvgProps, Path } from "react-native-svg";
export const PlusIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fill="currentColor"
      d="M9.75 3a.75.75 0 0 0-1.5 0v5.25H3a.75.75 0 0 0 0 1.5h5.25V15a.75.75 0 0 0 1.5 0V9.75H15a.75.75 0 0 0 0-1.5H9.75V3Z"
    />
  </Svg>
);
