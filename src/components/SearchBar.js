import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard, Text, ScrollView } from "react-native";
import Svg, { Path, G, Line } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window')

const SearchBar = ({ data, searchResultsVisible, setIsSearchResultsVisible }) => {

    const [isTextInputOpen, setTextInputIsOpen] = useState(false);
    const [textOnSearchBar, setTextOnSearchBar] = useState("");
    const [results, setResults] = useState([]);
    const navigation = useNavigation();

    //Tolgo la tastiera quando viene cliccato un punto esterno alla searchbar (oltre a togliere i risultati)
    //useEffect che si modifica ogni volta che varia searchResultsVisible (true o false), quindi quando è visibile il risultato della ricerca
    useEffect(() => {
        if (!searchResultsVisible) {
            setTextInputIsOpen(false);
            Keyboard.dismiss();
        }
    }, [searchResultsVisible]);

    //Se viene inserito del testo, controlla la pagina in cui ci troviamo ed effettua ricerca dedicata
    useEffect(() => {
        const filteredResults = [];
        if (textOnSearchBar && data.length > 0) {
            data.map((guide, index) => {
                if(guide.guideName.toLowerCase().startsWith(textOnSearchBar.toLowerCase())){
                    filteredResults.push(guide.guideName);
                }
            });
            if(filteredResults.length === 0){
                filteredResults.push("Nessun risultato trovato");
            }
            setResults(filteredResults);
        } else {
            setResults([]);
        }
        //if (textOnSearchBar && allGuidesFromId) {
    }, [textOnSearchBar]);

    //Se viene cliccata la X nella barra di ricerca
    const deleteText = () => {  
        setTextInputIsOpen(false);  //Togli la X
        Keyboard.dismiss();  //Chiudi tastiera
        setTextOnSearchBar(""); //Svuota barra di ricerca
    }

    //Se viene cliccato un risultato della SearchBar, rimandalo alla guida dedicata
    const goToGuide = (result) => {
        data.map((guide, index) => {
            if(guide.guideName === result){ //Se il nome della guida è uguale alla stringa risultato cliccata
                navigation.navigate("GuideInfo", {clickedGuideID: guide.id})  //Spedisci l'utente alla pagina con la guida dedicata
                setTextOnSearchBar(""); //Svuota barra di ricerca
                Keyboard.dismiss(); //Chiudi tastiera
            }
        })
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={[ isTextInputOpen && textOnSearchBar ? styles.resultsSearchBar : styles.searchContainerShadow]}>
                
                <View style={styles.searchBarContainer}>
                    <Image style={styles.searchImage} source={require('../assets/images/searchBar.png')}/>
                    <TextInput 
                        value={textOnSearchBar}
                        onChangeText={(text) => setTextOnSearchBar(text)}
                        onFocus={() => {setTextInputIsOpen(true); setIsSearchResultsVisible(true)}} 
                        //onBlur={() => setTextInputIsOpen(false)} 
                        placeholder="Cerca..." 
                        allowFontScaling={false}
                        style={styles.searchBarInput}/>
                        {textOnSearchBar && 
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


                {textOnSearchBar && isTextInputOpen && searchResultsVisible &&(
                    <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps='handled' style={styles.resultsScrollView}>
                        {results.map((result, index) => (
                            <View key={index}>
                            <View style={{backgroundColor: "#EBE9E9", height: 2}}/>
                            <TouchableOpacity activeOpacity={1} onPress={() => goToGuide(result)}>
                                <Text key={index} allowFontScaling={false} style={styles.resultsList}>• {result}</Text>
                            </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )}

            </View>
        </SafeAreaView>

        )
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        margin: 2,
        borderRadius: 15,
        height: Dimensions.get('window').height/20,
    },
    resultsSearchBar: {
        position: "absolute",
        top: 0,
        left: 0, 
        right: 0,
        backgroundColor: "#f8f8f8",
        maxHeight: Dimensions.get('window').height/4,
        marginBottom: 10,
        borderRadius: 15,
        zIndex: 1, //Per fare in modo che il container grigio sia visibile sopra gli altri elementi
    },
    searchContainerShadow: {
        backgroundColor: "#f8f8f8",
        borderRadius: 15,
        height: Dimensions.get('window').height/20,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3, //Per ombra Android
        marginBottom: 5, //Margin per visualizzare ombra in basso
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: "#f8f8f8",
        height: Dimensions.get('window').height/20,
    },
    searchImage: {
        height: Platform.OS === 'android' ? "70%" : "60%",
        width: "10%",
        resizeMode: "contain",
        marginLeft: 10,
    },
    searchBarInput: {
        marginLeft: 8,
        fontFamily: 'Satoshi-Bold',
        fontSize: width / 25,
        flex: 1,
    },
    containerX: {
        marginRight: 5,
    },
    resultsScrollView: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    resultsList: {
        fontSize: width / 24,
        fontFamily: 'Satoshi-Bold',
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5
    }
});