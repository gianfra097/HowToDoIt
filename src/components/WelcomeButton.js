import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const WelcomeButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.welcomeButton}>
            <Text style={styles.welcomeButtonTextColor}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    welcomeButton: {
        backgroundColor: '#00bea5',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 280,
    },
    welcomeButtonTextColor: {
        fontFamily: 'NotoSans-ExtraBold',
        fontSize: 20,
        color: 'white'        
    },
});

export default WelcomeButton