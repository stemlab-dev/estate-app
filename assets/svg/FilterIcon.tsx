import Svg, { SvgProps, Path } from "react-native-svg"
export const FilterIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      fill="#0D0D12"
      d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1ZM6 12a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM9 17a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
    />
  </Svg>
)