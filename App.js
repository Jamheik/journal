<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LandingView from './src/views/LandingView';

export default function App() {
  return (
    <View style={styles.container}>
      <LandingView/>
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
=======
>>>>>>> 3a8df65 (feat: add authentication screens and navigation setup)
