import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CalendarComponent from '../../components/CalendarComponent';
import DailyNoteComponent from '../../components/dailyNoteComponent'; // Assuming this is the correct import path
import { SessionContext } from '../../context/SessionProvider';

export default function HomeTabView() {
  const { userId } = useContext(SessionContext); // Access userId from context

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <View style={styles.container}>
      <CalendarComponent onDateSelected={setSelectedDate} />

      <View style={styles.contentContainer}>
        {selectedDate && <DailyNoteComponent selectedDate={selectedDate} userId={userId} />} {/* Pass userId to DailyNoteComponent */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    color: '#333',
  },
  calendarContainer: {
    width: '100px',
    backgroundColor: '#red',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});