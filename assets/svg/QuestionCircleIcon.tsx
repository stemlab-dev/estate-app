import Svg, { SvgProps, Path } from "react-native-svg"
export const QuestionCircleIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M15.75 9a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0ZM9.105 7.609a.499.499 0 1 0-.652-.752l-.423.423a.75.75 0 0 1-1.06-1.06l.423-.423a1.999 1.999 0 1 1 2.612 3.012l-.036.027a.547.547 0 0 0-.219.437v.102a.75.75 0 0 1-1.5 0v-.102c0-.644.303-1.25.819-1.637l.036-.027Zm-.855 4.016a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"
      clipRule="evenodd"
    />
  </Svg>
)