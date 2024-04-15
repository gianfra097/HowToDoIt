import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, Dimensions, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import FetchGuidesFromCategory from '../lib/FetchGuidesFromCategory';
import GuideInfo from '../pages/GuideInfo';

const Guides = ({ categoryID }) => {

    const navigation = useNavigation();
    
    //Recupero le guide in base alla categoria cliccata
    const allGuides = FetchGuidesFromCategory(categoryID);
   
    return (
        <SafeAreaView style={styles.container}>
            {allGuides.map((guide, index) => (
                <SafeAreaView key={index}>
                    <TouchableOpacity onPress={() => navigation.navigate("GuideInfo", {clickedGuideID: guide.id})}>
                        <LinearGradient style={styles.rectangle} colors={["#bbf2ea", "#56d6c5"]} start={{x: 0.8, y:1.3}} end={{x: 1, y: 0}}>
                            <SafeAreaView style={styles.containerCircle}>
                                <Svg style={styles.svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <G id="SVGRepo_bgCarrier" stroke-width="0"/>
                                    <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                    <G id="SVGRepo_iconCarrier">
                                        <Path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </G>
                                    <SafeAreaView style={{height: "100%", justifyContent: "center"}}>
                                        <Text allowFontScaling={false} style={styles.numberGuide}>{index+1}</Text>
                                    </SafeAreaView>
                                </Svg>
                            </SafeAreaView>
                            <SafeAreaView style={styles.containerGuide}>
                                <Text allowFontScaling={false} style={styles.guideTitle}>{guide.guideName}:
                                    <Text allowFontScaling={false} style={styles.guidePreview}>
                                        {'\n'}{guide.guide.substring(0,40).replace(/\s\w+$/, '...')}
                                    </Text>
                                </Text>
                            </SafeAreaView>
                        </LinearGradient>
                    </TouchableOpacity>
                </SafeAreaView>
            ))}
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    rectangle: {
        width: Dimensions.get('window').width - 60,
        height: Dimensions.get('window').height / 13,
        flexDirection: "row", // Imposta il layout dei figli in riga
        justifyContent: "left",
        backgroundColor: "#86e3d6",
        borderRadius: Platform.OS === 'android' ? 20 : 30,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 2.5,
        elevation: 3, //Per ombra Android
    },
    containerCircle: {
        justifyContent: "center",
    },
    svg: {
        width: Dimensions.get('window').width/9,
        marginLeft: 10,
        marginRight: 5,
    },
    numberGuide: {
        fontFamily: 'Satoshi-Bold',
        fontSize: Dimensions.get('window').width/23,
        textAlign: "center",
        marginBottom: Platform.OS === 'android' ? 1 : 0,
    },
    containerGuide: {
        justifyContent: "center",
    },
    guideTitle: {
        fontFamily: 'Satoshi-Black',
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').width/30,
    },
    guidePreview: {
        fontFamily: 'Satoshi-Medium',
        textTransform: 'none',
        fontSize: Dimensions.get('window').width/30,
    },
})

export default Guides