import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import colors from "@/constants/color";

interface DotProps {
  style?: StyleProp<ViewStyle>;
}
const Dot = ({ style }: DotProps) => {
  return (
    <View
      style={{ ...styles.dot, ...(StyleSheet.flatten(style) || {}) }}
    />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "white",
	backgroundColor: colors.primary
  },
});
