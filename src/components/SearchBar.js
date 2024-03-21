import { View, TextInput, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import React from 'react'

const SearchBar = () => {
    return (
        <SafeAreaView style={styles.safeAreaSearchbar}>
            <View style={styles.searchBarContainer}>
                <Image style={styles.searchImage} source={require('../assets/images/searchBar.png')}/>
                <TextInput placeholder="Cerca l'argomento..." style={styles.searchBarInput}/>
            </View>
        </SafeAreaView>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    safeAreaSearchbar: {
        flex: 1,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 0.3,
        borderColor: 'rgba(0, 0, 0, 0.2)',
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