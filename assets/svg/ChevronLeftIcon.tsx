import Svg, { SvgProps, Path } from "react-native-svg";
export const ChevronLeftIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill="currentColor"
      d="M7.917 13.37a2 2 0 0 1 0-2.74l7.355-7.815a1 1 0 0 1 1.456 1.37L9.373 12l7.355 7.815a1 1 0 1 1-1.456 1.37l-7.355-7.814Z"
    />
  </Svg>
);
