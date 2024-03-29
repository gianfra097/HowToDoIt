import React from 'react'
import { StyleSheet, SafeAreaView, Text, Image, Dimensions, FlatList } from 'react-native'

const Categories = () => {

    return (
        <SafeAreaView style={styles.container}>
            {Array.from(Array(10).keys()).map(i => ( // Scorri gli elementi del db
                <SafeAreaView key={i} style={[styles.square, i % 2 != 0 && styles.squareNotFirst]}/> //Applica lo stile squareNotFirst solo se non è il primo quadrato della riga
            ))}
        </SafeAreaView>
    )
    
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
        width: Dimensions.get('window').width / 3 + 6,
        height: Dimensions.get('window').height / 6,
        backgroundColor: "#86e3d6",
        marginBottom: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 2.5,
        elevation: 6, //Per ombra Android
    },
    squareNotFirst: {
        marginLeft: 30,
    }
})

export default Categories