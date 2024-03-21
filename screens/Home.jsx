import React, {useEffect} from 'react'
import { StyleSheet, SafeAreaView, Text, BackHandler, Image, ImageBackground, ScrollView, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
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
                        <Text allowFontScaling={false} style={styles.textWelcome}>BENVENUTO</Text>
                        <Text allowFontScaling={false} style={styles.textGuide}>Cerca una guida</Text>
                        <SearchBar style={styles.searchBar}/>
                    </ScrollView>
                </SafeAreaView>
                <LinearGradient style={styles.rectangle} colors={["#56d6c5", "#bbf2ea"]} start={{x: 1.5, y:1}} end={{x: 0.6, y: 2}}>
                    <Text style={styles.textExplore}> Esplora le guide, {'\n'} libera il tuo potenziale </Text>
                    <Image style={styles.brainImage} source={require('../src/assets/images/brain.png')}/>
                </LinearGradient> 
                <SafeAreaView style={styles.categoriesContainer}>
                    <ScrollView>
                        <Text style={styles.textCategories}>Categorie:</Text>
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
    textWelcome: {
        fontSize: 35,
        fontFamily: 'DelaGothic',
        marginTop: 20, //Margine tra linea inizio schermo e testo
    },
    textGuide: {
        fontSize: 20,
        fontFamily: 'Satoshi-Bold',
        marginBottom: 20, //Margine sotto tra testo e barra
    },
    textCategories: {
        fontSize: 25,
        fontFamily: 'Satoshi-Bold',
        marginLeft: 20,
    },
    rectangle: {
        height: 130,
        backgroundColor: '#5cd7c7',
        borderRadius: 40,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textExplore: {
        fontSize: 20,
        fontFamily: 'Satoshi-Bold',
        marginLeft: 8,
    },
    brainImage: {
        height: 100,
        width: 130,
        marginRight: 10,
    },
    categoriesContainer: {
        flex: 1,
        marginTop: 15,
    },
});

export default Home