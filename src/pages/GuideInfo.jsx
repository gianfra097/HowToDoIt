import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Dimensions, ImageBackground, FlatList, TouchableOpacity, ScrollView } from "react-native"
import Svg, { Path, G } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import FetchGuideFromId from '../lib/FetchGuideFromId';

const { width } = Dimensions.get('window')

const GuideInfo = ({ route }) => {

    const navigation = useNavigation();

    const clickedGuideID = route.params.clickedGuideID;

    //Recupero la guida in base alla categoria cliccata
    const guide = FetchGuideFromId(clickedGuideID);

    const [idVideo, setIdVideo] = useState("");

    //Quando guide viene aggiornata (in questo caso popolata) richiama la funzione readIdVideo
    useEffect(() => {
        if (guide.videoTutorial && guide.videoTutorial.length > 0) {
            readIdVideo();
        }
    }, [guide])


    function readIdVideo(){
        let extractIdVideo = "";
        for(let i = guide.videoTutorial.length - 1; i >= 0; i--){
            const character = guide.videoTutorial[i];
            if(character === "="){
                 break
            }
            extractIdVideo = character + extractIdVideo;
        }
       setIdVideo(extractIdVideo)
    }

    return(
        <ImageBackground source={require('../assets/images/wallpaperHome.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                <SafeAreaView style={styles.buttons}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Svg fill="#ffffff" width={30} height={30} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="#ffffff">
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
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>    
                        <Svg fill="#ffffff" marginLeft={10} width={30} height={30} viewBox="0 0 512 512" id="_x30_1" version="1.1" stroke="#ffffff">
                            <G id="SVGRepo_bgCarrier" stroke-width="0"/>
                            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                            <G id="SVGRepo_iconCarrier"> 
                                <G> 
                                    <Path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M404.861,263.236 L404.861,263.236c-7.297,7.297-18.066,8.993-26.986,5.104v97.098c0,20.193-16.37,36.562-36.562,36.562H170.688 c-20.193,0-36.562-16.37-36.562-36.562v-97.098c-8.919,3.89-19.689,2.193-26.986-5.104c-9.519-9.519-9.519-24.952,0-34.471 L238.764,97.139h0c9.519-9.519,24.952-9.519,34.471,0l131.625,131.625C414.38,238.283,414.38,253.717,404.861,263.236z"/> 
                                    <Path d="M286.469,267.938h-60.938c-6.731,0-12.188,5.457-12.188,12.188v73.125c0,6.731,5.457,12.188,12.188,12.188h60.938 c6.731,0,12.188-5.457,12.188-12.188v-73.125C298.656,273.394,293.2,267.938,286.469,267.938z"/>
                                </G> 
                            </G>
                        </Svg>
                    </TouchableOpacity>
                </SafeAreaView>
                <Text allowFontScaling={false} style={styles.guideTitle}>{guide.guideName}</Text>
                <SafeAreaView style={styles.containerVideo}>
                    <YoutubePlayer
                        height={"100%"}
                        width={"100%"}
                        play={false}
                        videoId={idVideo}
                    />
                </SafeAreaView>
                <SafeAreaView style={styles.containerGuide}>
                    <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
                        <Text allowFontScaling={false} style={styles.guideText}>{guide.guide}</Text>
                    </ScrollView>
                </SafeAreaView>
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
    buttons: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? 10 : 25,
        marginBottom: Platform.OS === 'android' ? 30 : 40,
    },
    guideTitle: {
        fontFamily: 'Satoshi-Black',
        textTransform: 'uppercase',
        textAlign: "center",
        fontSize: Dimensions.get('window').width/25,
        marginBottom: Platform.OS === 'android' ? 5 : 10,
    },
    containerVideo: {
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get('window').width/2.13,
        marginBottom: Platform.OS === 'android' ? 10 : 15,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 8, //Per ombra Android
    },
    guideText: {
        fontFamily: 'Satoshi-Bold',
        marginLeft: 3,
        fontSize: Dimensions.get('window').width/28,
    },
    containerGuide: {
        flex: 1,
    },
})

export default GuideInfo;