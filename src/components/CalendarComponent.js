import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";

const LandingComponent = () => {
  const onCalendarPress = (day) =>{
    alert(JSON.stringify(day.dateString));
  }
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        onDayPress={onCalendarPress}
        theme={{
          backgroundColor: '#000000',
          calendarBackground: '#000000',
          textSectionTitleColor: '#FFFFFF',
          selectedDayBackgroundColor: '#1e90ff',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#FFFFFF',
          dayTextColor: '#FFFFFF',
          textDisabledColor: '#555555',
        }}
        style={{
          borderWidth: 1,
          borderColor: "#FFFFFF",
          borderRadius: 10,
          margin: 10,
          width: "90%",
          alignSelf: "center",
        }}
        hideExtraDays={true}
        enableSwipeMonths={true}
        firstDay={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
});

export default LandingComponent;
