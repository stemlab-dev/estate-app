import Svg, { SvgProps, Path } from "react-native-svg";

export const MapMarkerIcon = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M9 4.125a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75ZM7.125 7.5a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.857 2.694a5.666 5.666 0 0 1 7.91 7.779l-2.874 4.47c-.886 1.377-2.9 1.377-3.786 0l-2.873-4.47a5.666 5.666 0 0 1 1.623-7.78Zm.832 1.248a4.166 4.166 0 0 1 5.816 5.72l-2.874 4.47a.75.75 0 0 1-1.262 0l-2.874-4.47a4.166 4.166 0 0 1 1.194-5.72Z"
      clipRule="evenodd"
    />
  </Svg>
);
