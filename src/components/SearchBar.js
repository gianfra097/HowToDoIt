import { View, TextInput, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import React from 'react'

const SearchBar = () => {
    return (
        <SafeAreaView style={styles.searchContainerShadow}>
            <SafeAreaView style={styles.safeAreaSearchbar}>
                <View style={styles.searchBarContainer}>
                    <Image style={styles.searchImage} source={require('../assets/images/searchBar.png')}/>
                    <TextInput placeholder="Cerca..." style={styles.searchBarInput}/>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    searchContainerShadow: {
        backgroundColor: "white",
        borderRadius: 15,
        height: 40,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 5, //Per ombra Android
        marginBottom: 5, //Margin per visualizzare ombra in basso
        marginHorizontal: 5, //Margin per evitare che venga tagliata l'ombra nell'angolo destro
        
    },
    safeAreaSearchbar: {
        flex: 1,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: "#f8f8f8",
        height: 40,
    },
    searchImage: {
        height: 30,
        width: 30,
        marginLeft: 10,
    },
    searchBarInput: {
        padding: 8,
        fontSize: 15,
        flex: 1,  //Occupa tutta la larghezza a disposizione
    },
});