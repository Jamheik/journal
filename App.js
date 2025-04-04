import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState([
    { type: 'text', content: '' },
  ]);

  const pickImage = async (index) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Gallery access is needed.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, width, height } = result.assets[0];

      const updated = [...contentBlocks];
      updated.splice(index + 1, 0, {
        type: 'image',
        uri,
        width,
        height,
        caption: '',
      });
      updated.splice(index + 2, 0, { type: 'text', content: '' });
      setContentBlocks(updated);
    }
  };

  const updateText = (index, newText) => {
    const updated = [...contentBlocks];
    updated[index].content = newText;
    setContentBlocks(updated);
  };

  const updateCaption = (index, newCaption) => {
    const updated = [...contentBlocks];
    updated[index].caption = newCaption;
    setContentBlocks(updated);
  };

  const updateImageSize = (index, dim, value) => {
    const updated = [...contentBlocks];
    const num = parseInt(value);
    if (!isNaN(num)) {
      updated[index][dim] = num;
      setContentBlocks(updated);
    }
  };

  const removeBlock = (index) => {
    const updated = [...contentBlocks];
    updated.splice(index, 1);
    setContentBlocks(updated);
  };

  const moveBlock = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= contentBlocks.length) return;
    const updated = [...contentBlocks];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setContentBlocks(updated);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.titleInput}
        placeholder="Enter title..."
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Content:</Text>

      {contentBlocks.map((block, index) => {
        if (block.type === 'text') {
          return (
            <View key={index} style={styles.blockContainer}>
              <TextInput
                style={styles.textBlock}
                placeholder="Write something..."
                value={block.content}
                multiline
                onChangeText={(text) => updateText(index, text)}
              />
              <View style={styles.inlineButtons}>
                <Button title="Add Image" onPress={() => pickImage(index)} />
                {contentBlocks.length > 1 && (
                  <>
                    <TouchableOpacity
                      onPress={() => moveBlock(index, index - 1)}
                      style={styles.moveButton}
                    >
                      <Text style={styles.moveButtonText}>↑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => moveBlock(index, index + 1)}
                      style={styles.moveButton}
                    >
                      <Text style={styles.moveButtonText}>↓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeBlock(index)}
                      style={styles.removeButton}
                    >
                      <Text style={styles.removeButtonText}>🗑</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          );
        } else if (block.type === 'image') {
          return (
            <View key={index} style={styles.imageBlock}>
              <Image
                source={{ uri: block.uri }}
                style={{
                  width: block.width,
                  height: block.height,
                  borderRadius: 8,
                }}
                resizeMode="contain"
              />
              <View style={styles.imageSizeInputs}>
                <TextInput
                  placeholder="Width"
                  keyboardType="numeric"
                  style={styles.sizeInput}
                  value={block.width?.toString()}
                  onChangeText={(val) => updateImageSize(index, 'width', val)}
                />
                <TextInput
                  placeholder="Height"
                  keyboardType="numeric"
                  style={styles.sizeInput}
                  value={block.height?.toString()}
                  onChangeText={(val) => updateImageSize(index, 'height', val)}
                />
              </View>
              <TextInput
                style={styles.captionInput}
                placeholder="Enter caption..."
                value={block.caption}
                onChangeText={(text) => updateCaption(index, text)}
              />
              <View style={styles.inlineButtons}>
                <TouchableOpacity
                  onPress={() => moveBlock(index, index - 1)}
                  style={styles.moveButton}
                >
                  <Text style={styles.moveButtonText}>↑</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => moveBlock(index, index + 1)}
                  style={styles.moveButton}
                >
                  <Text style={styles.moveButtonText}>↓</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeBlock(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      })}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  titleInput: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  blockContainer: {
    marginBottom: 20,
  },
  textBlock: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  inlineButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 10,
  },
  imageBlock: {
    marginBottom: 30,
  },
  imageSizeInputs: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  sizeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    width: 100,
    backgroundColor: '#f1f1f1',
    fontSize: 14,
  },
  captionInput: {
    fontSize: 14,
    fontStyle: 'italic',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    backgroundColor: '#f1f1f1',
    marginTop: 10,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: '#ff4444',
    borderRadius: 12,
    padding: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  moveButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 6,
  },
  moveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
