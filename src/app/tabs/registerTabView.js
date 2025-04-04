import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { auth } from '../../../components/firebase';
import { useNavigation } from "@react-navigation/native";

import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.updateProfile({ displayName: fullname }).then(() => {
          console.log("User registered and logged in successfully:", user);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        });
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        onChangeText={setFullname}
        value={fullname}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 10,
  },
});
