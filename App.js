import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './components/firebase';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

   const handleSignIn = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
      } catch (error) {
        console.error('Error during sign-in:', error);
      }
    };

  return (
    <View style={styles.container}>
      <Text>Register for the Journal App!</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 }}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={handleSignIn} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
