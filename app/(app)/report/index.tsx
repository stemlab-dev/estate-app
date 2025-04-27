import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Issues } from "@/constants/data";
import colors from "@/constants/color";
import { SafeAreaView } from "react-native-safe-area-context";

const reports = () => {
  const handleReport = (category: string) => {
    if (!category) {
      return;
    }
    router.navigate({
      pathname: "/report/send-report",
      params: { category },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        
        // edges={['top']}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={{ opacity: 0 }}
          />
          <Text style={styles.title}>Report an Issue</Text>
          <TouchableOpacity onPress={() => router.navigate("/reports")}>
            <MaterialCommunityIcons
              name="headset"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.section}>
          {Issues.map((issue) => (
            <Pressable
              style={styles.pressable}
              key={issue.id}
              onPress={() => handleReport(issue.id)}
            >
              <View style={{ width: "100%", flex: 1 }}>
                <Text style={styles.textTitle}>{issue.title}</Text>
                <Text style={styles.text}>{issue.discription}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="black"
              />
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default reports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: 10,
    backgroundColor: "white",
  },
  header: {
    fontWeight: "600",
    fontSize: 20,
    // color: 'white',
    textAlign: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
    paddingVertical: 6,
  },
  textTitle: {
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 6,
  },
  text: {
    fontSize: 14,
    textAlign: "left",
    textOverflow: "hidden",
    lineHeight: 20,
  },
  section: {
    marginTop: 10,
  },
  pressable: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 2,
    backgroundColor: "ghostWhite",
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: "#ccc",
  },
});
