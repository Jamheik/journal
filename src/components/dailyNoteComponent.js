import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    date: "2025-4-4",
    timestamp: "2025-2-3T12:00:00Z",
    text: "Minua ei vituttanut (paljoa)",
  },
  {
    date: "2025-4-4",
    timestamp: "2025-2-3T12:00:00Z",
    text: "Minua ei vituttanut (paljoa)",
  },
  {
    date: "2025-4-3",
    timestamp: "2025-2-3T12:00:00Z",
    text: "Minua ei vituttanut (paljoa)",
  },
  {
    date: "2025-4-2",
    timestamp: "2025-2-3T12:00:00Z",
    text: "Minua ei vituttanut (paljoa)",
  },
  {
    date: "2025-4-1",
    timestamp: "2025-2-3T12:00:00Z",
    text: "Minua ei vituttanut (paljoa)",
  },
];

const DailyNoteComponent = () => {
  const renderNote = ({ item }) => {
    return (
      <View style={styles.itemRender}>
        <Text style={styles.text}>{item.date}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const handleActionButtonPress = () => {
    console.log("Action button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleActionButtonPress}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  itemRender: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default DailyNoteComponent;
