import React, { useState } from 'react'
import { View, TextInput, Image, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard } from "react-native";
import Svg, { Path, G } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

const SearchBar = () => {

    const [isTextInputOpen, setTextInputIsOpen] = useState(false);
    const [textOnSearchBar, setTextOnSearchBar] = useState("");

    const deleteText = () => {  //Se X viene cliccata
        setTextInputIsOpen(false);  //Togli la X
        Keyboard.dismiss();  //Chiudi tastiera
        setTextOnSearchBar(""); //Svuota barra di ricerca
    }

    return (
        <SafeAreaView style={styles.searchContainerShadow}>
            <SafeAreaView style={styles.safeAreaSearchbar}>
                <View style={styles.searchBarContainer}>
                    <Image style={styles.searchImage} source={require('../assets/images/searchBar.png')}/>
                    <TextInput 
                        value={textOnSearchBar}
                        onChangeText={(text) => setTextOnSearchBar(text)}
                        onFocus={() => 
                        setTextInputIsOpen(true)} 
                        onBlur={() => setTextInputIsOpen(false)} 
                        placeholder="Cerca..." 
                        allowFontScaling={false}
                        style={styles.searchBarInput}/>
                        {isTextInputOpen && 
                    <TouchableOpacity style={styles.containerX} onPress={deleteText}>
                        <Svg fill="#50d4c3" width="30px" height="30px" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <G id="SVGRepo_bgCarrier" stroke-width="0"/>
                            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                            <G id="SVGRepo_iconCarrier">
                                <Path d="M16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM16 6c-5.522 0-10 4.478-10 10s4.478 10 10 10c5.523 0 10-4.478 10-10s-4.477-10-10-10zM20.537 19.535l-1.014 1.014c-0.186 0.186-0.488 0.186-0.675 0l-2.87-2.87-2.87 2.87c-0.187 0.186-0.488 0.186-0.675 0l-1.014-1.014c-0.186-0.186-0.186-0.488 0-0.675l2.871-2.869-2.871-2.87c-0.186-0.187-0.186-0.489 0-0.676l1.014-1.013c0.187-0.187 0.488-0.187 0.675 0l2.87 2.87 2.87-2.87c0.187-0.187 0.489-0.187 0.675 0l1.014 1.013c0.186 0.187 0.186 0.489 0 0.676l-2.871 2.87 2.871 2.869c0.186 0.187 0.186 0.49 0 0.675z"/>
                            </G>
                        </Svg>
                    </TouchableOpacity>}
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
        height: Dimensions.get('window').height/20,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 3, //Per ombra Android
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
        height: Dimensions.get('window').height/20,
    },
    searchImage: {
        height: "80%",
        width: "10%",
        resizeMode: "contain",
        marginLeft: 10,
    },
    searchBarInput: {
        marginLeft: 8,
        fontSize: width / 25,
        flex: 1,
    },
    containerX: {
        marginRight: 5,
    }
});