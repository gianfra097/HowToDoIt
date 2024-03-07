import React, {useEffect} from 'react'
import { StyleSheet, SafeAreaView, Text, BackHandler, Image, ImageBackground, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import SearchBar from '../src/components/SearchBar';

const Home = ({ navigation }) => {
    const isFocused = useIsFocused(); //Ottieni lo stato di focus della schermata (cioè pagina corrente, quindi HOME)
    useEffect(() => {  //Funzione che, per android, disattiva il tasto back solo nella HOME per la WELCOME
        const backAction = () => {
            if (navigation.isFocused()) {
                return true; // Se la schermata è "Home", non consentire il ritorno
            }
            return false; // Altrimenti, consenti il ritorno alle altre pagine
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction,);
    
        return () => backHandler.remove();
    }, []);

    const newPage = () => {
        navigation.navigate("Pagina1")
    }

    return (
        <ImageBackground source={require('../src/assets/images/wallpaperHome.png')} style={styles.backgroundImage}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <SafeAreaView style={styles.container}>
                    <Text allowFontScaling={false} style={styles.textColor}>CERCA UN ARGOMENTO:</Text>
                    <SearchBar style={styles.searchBar}/>
                </SafeAreaView>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: Dimensions.get('window').height, //Per evitare che la tastiera modifichi lo sfondo su Android
        width: "100%",
    },
    container: {
        flex: 1,
        margin: 30,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    textColor: {
        fontSize: 25,
        fontFamily: 'NotoSans-Bold',
        marginTop: 20, //Margine tra linea inizio schermo e testo
        marginBottom: 20, //Margine sotto tra testo e barra
        textAlign: 'center',
        justifyContent: 'center',
    },
});

export default Home