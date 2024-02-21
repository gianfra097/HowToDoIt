import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const Button = ({ title }) => {
    return (
        <SafeAreaView style={styles.button}>
            <Text style={styles.buttonTextColor}>{title}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00bea5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
    },
    buttonTextColor: {
        fontFamily: 'NotoSans-ExtraBold',
        fontSize: 20,
        color: 'white'        
    },
});

export default Button