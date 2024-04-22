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
                                <View style={styles.imageAndResult}>
                                <Svg fill="#50d4c3" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <G id="SVGRepo_bgCarrier" stroke-width="0"/>
                                <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                <G id="SVGRepo_iconCarrier"> 
                                <Path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333 c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333 z"/>
                                <Path d="M401.067,268.761c0.227-0.303,0.462-0.6,0.673-0.915c0.203-0.304,0.379-0.619,0.565-0.93 c0.171-0.286,0.35-0.565,0.508-0.86c0.17-0.317,0.313-0.643,0.466-0.967c0.145-0.308,0.299-0.61,0.43-0.925 c0.13-0.314,0.235-0.635,0.349-0.953c0.122-0.338,0.251-0.672,0.356-1.018c0.096-0.318,0.167-0.642,0.248-0.964 c0.089-0.353,0.188-0.701,0.259-1.061c0.074-0.372,0.117-0.748,0.171-1.122c0.045-0.314,0.105-0.622,0.136-0.941 c0.138-1.4,0.138-2.81,0-4.21c-0.031-0.318-0.091-0.627-0.136-0.941c-0.054-0.375-0.097-0.75-0.171-1.122 c-0.071-0.359-0.17-0.708-0.259-1.061c-0.081-0.322-0.152-0.645-0.248-0.964c-0.105-0.346-0.234-0.68-0.356-1.018 c-0.114-0.318-0.219-0.639-0.349-0.953c-0.131-0.315-0.284-0.618-0.43-0.925c-0.153-0.324-0.296-0.65-0.466-0.967 c-0.158-0.294-0.337-0.574-0.508-0.86c-0.186-0.311-0.362-0.626-0.565-0.93c-0.211-0.315-0.446-0.612-0.673-0.915 c-0.19-0.254-0.366-0.514-0.569-0.761c-0.443-0.54-0.91-1.059-1.403-1.552c-0.004-0.004-0.006-0.008-0.01-0.011l-85.333-85.333 c-8.331-8.331-21.839-8.331-30.17,0s-8.331,21.839,0,30.17l48.915,48.915H128c-11.782,0-21.333,9.551-21.333,21.333 s9.551,21.333,21.333,21.333h204.497l-48.915,48.915c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0 l85.333-85.333c0.004-0.004,0.006-0.008,0.01-0.011c0.493-0.494,0.96-1.012,1.403-1.552 C400.701,269.275,400.877,269.014,401.067,268.761z"/>
                                </G>
                                </Svg>
                                    <TouchableOpacity onPress={() => goToGuide(result)}>
                                        <Text key={index} allowFontScaling={false} style={styles.resultsList}>{result}</Text>
                                    </TouchableOpacity>
                                </View>
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
    },
    imageAndResult: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});