import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import firebase from 'firebase/app';
import 'firebase/storage';

const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `images/${new Date().toISOString()}`; // Create a unique filename
    const ref = firebase.storage().ref().child(filename);
    try {
        await ref.put(blob);
        const downloadURL = await ref.getDownloadURL();
        console.log('File available at', downloadURL);
        // Optionally, store the download URL in Firestore or Realtime Database
    } catch (error) {
        console.error('Upload failed', error);
    }
};


export default function ImagePickerExample() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const imageUrlInMachine = result.assets[0].uri;
            // This is image path, and this storing to firebase with
            setImage(imageUrlInMachine);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});
