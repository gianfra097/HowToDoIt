import React from 'react'
import { StyleSheet, SafeAreaView, Text, Image } from 'react-native'

const Categories = () => {

    return (
        <SafeAreaView style={styles.container}>
            {Array.from(Array(18).keys()).map(i => ( // Scorri gli elementi del db
                <SafeAreaView key={i} style={[styles.square, i % 2 != 0 && styles.squareNotFirst]}/> //Applica lo stile squareNotFirst solo se non è il primo quadrato della riga
            ))}
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    square: {
        width: 150,
        height: 120,
        backgroundColor: "#86e3d6",
        marginBottom: 20,
        borderRadius: 20,
    },
    squareNotFirst: {
        marginLeft: 20,
    }
})

export default Categories