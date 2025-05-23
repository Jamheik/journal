import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
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
      setRefreshing(true);
      setNotes([]); // Clear notes before fetching new ones
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
      } finally {
        setRefreshing(false);
      }
    };

    fetchNotes();
  }, [selectedDate, userId]);

  const refreshNotes = async () => {
    setRefreshing(true);
    setNotes([]);
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
      delayLongPress={400}
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
      <View>
        <Text style={styles.headerText}>Notes for the day</Text>
        <Text style={styles.dateText}>{new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
      </View>

      {refreshing && (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />
      )}

      {notes.length === 0 && !refreshing && (
        <Text style={styles.noNotesText}>Doesn't have any notes for the day</Text>
      )}

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
    padding: 0,
    margin: 0,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'light',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    padding: 0,
  },
  noteContainer: {
    backgroundColor: '#f3edf7',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  noteText: {
    fontSize: 16,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1, // Ensure it stays above other elements
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  noNotesText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default DailyNoteComponent;
