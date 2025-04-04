import React from 'react';
import { StyleSheet } from 'react-native';
import Navigation from '../components/UI/navigation';

import { SessionProvider } from '../context/SessionProvider';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Navigation />
    </SessionProvider>
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
