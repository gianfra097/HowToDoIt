import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const HomeButton = ({ title }) => {
    return (
        <SafeAreaView style={styles.homeButton}>
            <Text style={styles.homeButtonTextColor}>{title}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeButton: {
        backgroundColor: '#00bea5',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 280,
    },
    homeButtonTextColor: {
        fontFamily: 'NotoSans-ExtraBold',
        fontSize: 20,
        color: 'white'        
    },
});

export default HomeButton