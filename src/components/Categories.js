import React from 'react'
import { StyleSheet, SafeAreaView, Text, Image } from 'react-native'

const Categories = () => {

    return (
        <SafeAreaView style={styles.container}>
            {Array.from(Array(18).keys()).map(i => ( // Scorri gli elementi del db
                <SafeAreaView key={i} style={[styles.square, i % 3 != 0 && styles.squareNotFirst]}/> //Applica lo stile squareNotFirst solo se non è il primo quadrato della riga
            ))}
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: "#5cd7c7",
        marginBottom: 20,
    },
    squareNotFirst: {
        marginLeft: 15,
    }
})

export default Categories