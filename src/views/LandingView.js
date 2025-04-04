import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarComponent from '../components/CalendarComponent';

const LandingView = () => {
    return (
        <View style={styles.container}>
            <CalendarComponent/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
});

export default LandingView;
