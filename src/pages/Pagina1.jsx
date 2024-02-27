import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

const Pagina1 = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textColor}>Pagina 1</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textColor: {
        color: 'yellow',
        textAlign: 'center',
        justifyContent: 'center',
    },
});

export default Pagina1