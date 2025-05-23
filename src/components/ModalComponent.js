import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { SessionContext } from '../context/SessionProvider';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const ModalComponent = ({ modalVisible, setModalVisible, text, setText, selectedDate,handleAddNote }) => {
    const { userId } = useContext(SessionContext);
    const db = getFirestore();

    const handleSaveNote = async () => {
        if (userId && text.trim()) {
            try {
                await addDoc(collection(db, 'notes'), {
                    userId: userId,
                    content: text,
                    createdAt: new Date().toISOString(),
                    date: selectedDate,
                });
                console.log('Note saved successfully');
                setText('');
                handleAddNote();
            } catch (error) {
                console.error('Error saving note:', error);
            }
        } else {
            console.warn('User ID or note content is missing');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add New Note</Text>

                    <TextInput
                        style={styles.modalTextInput}
                        placeholder="Write your note here..."
                        multiline
                        value={text}
                        onChangeText={setText}
                    />

                    <View style={styles.buttonRowBetween}>
                        <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalButton} onPress={handleSaveNote}>
                            <Text style={styles.modalButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    buttonRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonCancel: {
        backgroundColor: '#ff0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalTextInput: {
        width: '100%',
        height: 200,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
});

export default ModalComponent;