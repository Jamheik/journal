import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import ModalComponent from './ModalComponent';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const DailyNoteComponent = ({ selectedDate, userId }) => {
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const q = query(
          collection(db, 'notes'),
          where('date', '==', selectedDate),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        const fetchedNotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotes(fetchedNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [selectedDate, userId]);

  const refreshNotes = async () => {
    setRefreshing(true);
    try {
      const q = query(
        collection(db, 'notes'),
        where('date', '==', selectedDate),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const fetchedNotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error refreshing notes:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteDoc(doc(db, 'notes', noteId));
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      console.log('Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const confirmDelete = (noteId) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => handleDeleteNote(noteId) },
      ]
    );
  };

  const renderNote = ({ item }) => (
    <TouchableWithoutFeedback
      onLongPress={() => confirmDelete(item.id)}
      delayLongPress={600}
    >
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>{item.content}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const handleAddNote = async () => {
    refreshNotes();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Notes for: {selectedDate}</Text>

      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={refreshNotes}
      />

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
        selectedDate={selectedDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  noteContainer: {
    backgroundColor: '#f3edf7',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noteText: {
    fontSize: 16,
    color: '#333',
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
