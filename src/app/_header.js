
import React from 'react';
import { StatusBar } from 'expo-status-bar';

export default function Header() {
  return (
    <View style={{ paddingTop: 50, paddingBottom: 20, backgroundColor: '#f8f8f8', alignItems: 'center' }}>
      <StatusBar style="auto" />
    </View>
  );
}