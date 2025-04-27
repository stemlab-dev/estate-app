import Svg, { SvgProps, Path } from "react-native-svg"
export const HeadsetIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M1.5 9.75a7.5 7.5 0 1 1 15 0v3.75a.75.75 0 0 1-.833.745 1.192 1.192 0 0 1-1.402.718c-.934.64-2.3 1.162-4.14 1.162a.75.75 0 0 1 0-1.5c1.513 0 2.565-.415 3.243-.866v-1.58c0-.972.93-1.376 1.632-1.126V9.75a6 6 0 0 0-12 0v1.311c.703-.25 1.632.156 1.632 1.127v1.62a1.191 1.191 0 0 1-2.3.438.751.751 0 0 1-.832-.746V9.75Z"
    />
  </Svg>
)