import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Dimensions, ImageBackground, FlatList, TouchableOpacity, ScrollView } from "react-native"
import Svg, { Path, G } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase'
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window')

const GuideInfo = ({ route }) => {

    const navigation = useNavigation();
    const clickedGuideID = route.params.clickedGuideID;
    const [guide, setGuide] = useState([]);
    const [idVideo, setIdVideo] = useState("");

    useEffect(() => {
        const fetchGuide = async () => {
            const {data, error} = await supabase.from("Guides").select('*').eq('id', clickedGuideID)

            if(error){
                console.log(error)
            } else {
                setGuide(data[0])
            }
        }
        fetchGuide()

    }, [])

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
                </SafeAreaView>
                <Text style={styles.guideTitle}>{guide.guideName}</Text>
                <SafeAreaView style={styles.containerVideo}>
                    <YoutubePlayer
                        height={Dimensions.get('window').height - 430}
                        width={Dimensions.get('window').width - 60}
                        //height={150}
                        //width={300}
                        play={false}
                        videoId={idVideo}
                    />
                </SafeAreaView>
                <SafeAreaView style={styles.containerGuide}>
                    <ScrollView>
                        <Text style={styles.guideText}>{guide.guide}</Text>
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
        marginTop: 10,
        marginBottom: Platform.OS === 'android' ? 30 : 40,
    },
    guideTitle: {
        fontFamily: 'Satoshi-Black',
        textTransform: 'uppercase',
        textAlign: "center",
        fontSize: Dimensions.get('window').width/25,
    },
    containerVideo: {
        alignItems: "center",
        justifyContent: "center",
    },
    guideText: {
        fontFamily: 'Satoshi-Bold',
        textAlign: "center",
        fontSize: Dimensions.get('window').width/28,
    }
})

export default GuideInfo;