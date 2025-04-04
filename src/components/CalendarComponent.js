import React, { useState } from "react";
import PropTypes from 'prop-types';
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarComponent = ({ onDateSelected }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onCalendarPress = (day) => {
    setSelectedDate(day.dateString);
    onDateSelected(day.dateString); // Export selected date
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        onDayPress={onCalendarPress}
        markedDates={
          selectedDate ? { [selectedDate]: { selected: true, selectedColor: '#ff6347' } } : {}
        }
        theme={{
          backgroundColor: '#f5f5f5',
          calendarBackground: '#f3edf7',
          textSectionTitleColor: '#000000',
          selectedDayBackgroundColor: '#ff6347', // Highlight selected date
          selectedDayTextColor: '#ffffff',
          todayBackgroundColor: '#87ceeb', // Highlight current date
          todayTextColor: '#ffffff',
          dayTextColor: '#000000',
          textDisabledColor: '#d9e1e8',
          monthTextColor: '#000000',
          arrowColor: '#000000',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
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

CalendarComponent.propTypes = {
  onDateSelected: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
});

export default CalendarComponent;
