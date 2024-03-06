import { View, TextInput, Text, StyleSheet, SafeAreaView } from "react-native";
import React from 'react'

const SearchBar = () => {
    return (
        <SafeAreaView>
            <TextInput placeholder="Cerca" style={styles.input}/>
        </SafeAreaView>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {

    },
});