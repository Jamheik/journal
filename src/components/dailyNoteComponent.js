import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import ModalComponent from './ModalComponent';

const DailyNoteComponent = ({ selectedDate }) => {
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddNote = () => {
    setModalVisible(false);
    // Logic to save the note can be added here
    console.log(`Note added for ${selectedDate}: ${text}`);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.dateText}>Notes for: {selectedDate}</Text>

      <ScrollView>

        <View style={styles.Content}>
          <Text style={styles.reportText}>Dummy Report:</Text>
          <Text style={styles.reportText}>
            "Today was a productive day. I completed my tasks and enjoyed a nice walk in the evening."
          </Text>
        </View>
        
        <View style={styles.Content}>
          <Text style={styles.reportText}>Dummy Report:</Text>
          <Text style={styles.reportText}>
            "Today was a productive day. I completed my tasks and enjoyed a nice walk in the evening."
          </Text>
        </View>

        <View style={styles.Content}>
          <Text style={styles.reportText}>Dummy Report:</Text>
          <Text style={styles.reportText}>
            "Today was a productive day. I completed my tasks and enjoyed a nice walk in the evening."
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={text}
        setText={setText}
        handleAddNote={handleAddNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  Content: {
    marginTop: 20,
    backgroundColor: '#fff',
  },
  reportText: {
    fontSize: 16,
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DailyNoteComponent;
