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
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        backgroundColor: "#F8F8F8",
        //height: 45,
        //height: "6%",
    },
    searchImage: {
        height: 45,
        width: 45,
        borderRadius: 12,
    },
    searchBarInput: {
        padding: 8,
        fontSize: 15,
        flex: 1,  //Occupa tutta la larghezza a disposizione
    },
});