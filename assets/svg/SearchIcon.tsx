import Svg, { SvgProps, Path } from "react-native-svg"
export const SearchIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      fill="#0D0D12"
      fillRule="evenodd"
      d="M11 2a9 9 0 1 0 5.618 16.032l3.675 3.675a1 1 0 0 0 1.414-1.414l-3.675-3.675A9 9 0 0 0 11 2Zm-7 9a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z"
      clipRule="evenodd"
    />
  </Svg>
)