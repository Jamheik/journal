import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarComponent from "../components/CalendarComponent";
import DailyNoteComponent from "../components/dailyNoteComponent";

const LandingView = () => {
  return (
    <View style={styles.container}>
      <CalendarComponent />
      <DailyNoteComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#f5f5f5",
    width: "100%",
  },

  text: {
    fontSize: 18,
    color: "#333",
  },
});

export default LandingView;
