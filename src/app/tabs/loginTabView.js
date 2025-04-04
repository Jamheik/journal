import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import React, { Component, useState } from "react";

import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [on, setOn] = useState(true);
  const navigation = useNavigation();
  const toggleSwitch = () => {
    setOn(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        Welcome to the diary
      </Text>


      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={on}
        onChangeText={setPassword}
        value={password}

      />

      <Button title="Show password"
        onPress={toggleSwitch}
      />

      <Button title="Sign in"
        onPress={() => console.log("Username:", username, "password:", password)}
      />

      <Button title="register"
        onPress={() => navigation.navigate('Register')}

      />

    </View>



  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'

  },

  h1: {
    color: '#black',
    fontSize: 40,
    alignItems: 'center',



  },

  text: {
    color: '#f99999',
    fontSize: 40,

  },
  input: {
    height: 60,
    fontSize: 24,
    borderColor: '#888',
    borderWidth: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,

  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 13,
    alignItems: 'center',
    borderRadius: 5,
  }


});


