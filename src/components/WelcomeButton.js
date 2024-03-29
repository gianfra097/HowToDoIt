import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

const WelcomeButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.welcomeButton}>
            <Text style={styles.welcomeButtonTextColor} allowFontScaling={false}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    welcomeButton: {
        backgroundColor: '#00bea5',
        paddingVertical: 15,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        //minWidth: 280,
        minWidth: "65%",
    },
    welcomeButtonTextColor: {
        fontFamily: 'Satoshi-Black',
        fontSize: width / 20,
        color: 'white'        
    },
});

export default WelcomeButton