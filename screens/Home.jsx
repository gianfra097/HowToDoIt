import React, {useEffect} from 'react'
import { StyleSheet, SafeAreaView, Text, BackHandler, Image, ImageBackground, ScrollView, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import SearchBar from '../src/components/SearchBar';
import Categories from '../src/components/Categories';

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

    return (
        <ImageBackground source={require('../src/assets/images/wallpaperHome.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}> 
                <SafeAreaView style={styles.searchContainer}>
                    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
                        <Text allowFontScaling={false} style={styles.textColor}>CERCA UN ARGOMENTO:</Text>
                        <SearchBar style={styles.searchBar}/>
                        <Text style={styles.categories}>CATEGORIE:</Text>
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={styles.categoriesContainer}>
                    <ScrollView>
                        <Categories/>
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
        height: Dimensions.get('window').height, //Per evitare che la tastiera modifichi lo sfondo su Android
        width: "100%",
    },
    container: {
        flex: 1,
        margin: 30,
    },
    categoriesContainer: {
        flex: 1,
        marginTop: 15,
    },
    textColor: {
        fontSize: 25,
        fontFamily: 'Satoshi-Black',
        marginTop: 20, //Margine tra linea inizio schermo e testo
        marginBottom: 20, //Margine sotto tra testo e barra
        textAlign: 'center',
        justifyContent: 'center',
    },
    categories: {
        fontSize: 25,
        fontFamily: 'Satoshi-Black',
        marginTop: 50,
        textAlign: 'center',
    },
});

export default Home