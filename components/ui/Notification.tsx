import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Dot from "./Dot";
import { router } from "expo-router";
import colors from "@/constants/color";
import { BellIcon } from "@/assets/svg";

const Notification = ({ isNotification }: { isNotification: boolean }) => {
  return (
    <Pressable
      onPress={() => router.navigate("/notifications")}
      style={styles.notification}
    >
      <BellIcon color="black" />
      {!!isNotification && <Dot style={{ ...styles.notificationAlert }} />}
    </Pressable>
  );
};

export default Notification;

const styles = StyleSheet.create({
  notification: {
    position: "relative",
    borderColor: colors.borderLight,
    padding: 8,
    borderWidth: 1,
    borderRadius: 16,
  },
  notificationAlert: {
    top: 9,
    right: 5,
    position: "absolute",
    backgroundColor: "red",
  },
});
