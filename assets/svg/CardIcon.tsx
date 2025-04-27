import Svg, { SvgProps, Path } from "react-native-svg"
export const CardIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M4.5 16a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1ZM16.5 15a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Z"
    />
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.5 6.5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4h-14a4 4 0 0 1-4-4v-11Zm4-2a2 2 0 0 0-2 2V7h18v-.5a2 2 0 0 0-2-2h-14Zm16 4.5h-18v8.5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9Z"
      clipRule="evenodd"
    />
  </Svg>
)