import { Text, View, StyleSheet, Button, TextInput, Touchable, TouchableOpacity} from "react-native";
import React, { useState } from "react";




export default function register() {
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [on, setOn] = useState(true);

  const toggleSwitch = () => {
    setOn(prevState => !prevState);
  };

  


    return (
        <View  style={styles.container}>
          <Text style={styles.h1}>
            register
          </Text>


          <TextInput
            placeholder="First name"
            style={styles.input}
            onChangeText={setFirstname}
            value={firstname}
          />

          <TextInput
            placeholder="Last name"
            style={styles.input}
            onChangeText={setLastname}
            value={lastname}
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


          <Button title="register" 
            onPress= {() => console.log("register")}
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
