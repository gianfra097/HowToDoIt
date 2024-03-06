import React, {useEffect} from 'react'
import { StyleSheet, SafeAreaView, Text, BackHandler, Image, ImageBackground, Animated } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import Button from "../src/components/Button"
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
            <SafeAreaView style={styles.container}>
                <Text style={styles.textColor}>CERCA UN ARGOMENTO:</Text>
                <SearchBar/>
                <Button title="Pagina1" onPress={newPage}/>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    textColor: {
        fontSize: 25,
        fontFamily: 'NotoSans-Bold',
        marginTop: 15,
        textAlign: 'center',
        justifyContent: 'center',
    },
});

export default Home