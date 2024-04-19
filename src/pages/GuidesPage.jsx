import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Dimensions, ImageBackground, FlatList, TouchableOpacity, View } from "react-native"
import Svg, { Path, G } from 'react-native-svg';
import SearchBar from '../components/SearchBar';
import Guides from '../components/Guides';
import FetchGuidesFromCategory from '../lib/FetchGuidesFromCategory';

const { width } = Dimensions.get('window')

const GuidesPage = ({ navigation, route }) => {

    const clickedCategory = route.params.clickedCategory;
    const categoryID = route.params.categoryID;

    //Recupero i dati delle guide per id passato e li passo alla SearchBar che su GuidesPage filtra queste guide
    const allGuidesFromId = FetchGuidesFromCategory(categoryID);

    //Per chiudere i risultati della searchBar quando l'utente clicca al di fuori di essi
    const [searchResultsVisible, setIsSearchResultsVisible] = useState(true);

    return(
        <ImageBackground source={require('../assets/images/wallpaperHome.png')} style={styles.backgroundImage} onTouchStart={() => setIsSearchResultsVisible(false)}>
            
            <SafeAreaView style={styles.container}>  
            
            {/*Serve per nascondere le guide dietro la barra di ricerca quando ci sono i risultati*/}
                <View style={{flex: 1, zIndex: 1}}>

                    <TouchableOpacity activeOpacity={1} onPress={() => {setIsSearchResultsVisible(false)}}>
                    <View style={styles.backArrow}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Svg fill="#ffffff" width={25} height={25} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="#ffffff">
                                <G id="SVGRepo_bgCarrier" stroke-width="0"/>
                                <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                <G id="SVGRepo_iconCarrier"> 
                                    <G> 
                                        <G> 
                                            <Path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M384,277.333H179.499 l48.917,48.917c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251 l-85.333-85.333c-1.963-1.963-3.52-4.309-4.608-6.933c-2.155-5.205-2.155-11.093,0-16.299c1.088-2.624,2.645-4.971,4.608-6.933 l85.333-85.333c8.341-8.341,21.824-8.341,30.165,0s8.341,21.824,0,30.165l-48.917,48.917H384c11.776,0,21.333,9.557,21.333,21.333 S395.776,277.333,384,277.333z"/>
                                        </G> 
                                    </G> 
                                </G>
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    </TouchableOpacity>

                    <SearchBar data={allGuidesFromId} searchResultsVisible={searchResultsVisible} setIsSearchResultsVisible={setIsSearchResultsVisible}/>

                    <TouchableOpacity activeOpacity={1} style={{flex: 1, zIndex: -1}} onPress={() => {setIsSearchResultsVisible(false)}}>
                        <SafeAreaView style={styles.spaceContainer}/>

                        <View style={styles.guidesContainer}>
                            <Text allowFontScaling={false} style={styles.clickedCategory}>{clickedCategory}</Text>
                            <FlatList keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} data={['guidesComponents']} renderItem={({ item }) => {
                                switch (item) {
                                    case 'guidesComponents':
                                        return (
                                            <Guides categoryID={categoryID}/>
                                        );
                                }
                            }}/>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            
            </SafeAreaView>
            
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: "100%",
        height: Dimensions.get('screen').height, //Per evitare che la tastiera modifichi lo sfondo su Android utilizza screen no window
    },
    container: {
        flex: 1,
        margin: 30,
    },
    backArrow: {
        marginTop: 10,
        marginBottom: Platform.OS === 'android' ? 35 : 45,
        width: Dimensions.get('screen').width/15,
    },
    spaceContainer: {
        height: Dimensions.get('window').height/9,
        zIndex: -1,
    },
    guidesContainer: {
        flex: 1,
        zIndex: -1
    },
    clickedCategory: {
        fontSize: width / 13,
        fontFamily: 'Satoshi-Bold',
        marginLeft: 5,
    }
})

export default GuidesPage;