import React, {useEffect} from 'react'
import { StyleSheet, SafeAreaView, Text, BackHandler, Image, ImageBackground, ScrollView, } from 'react-native'
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

    /*
    return (
        <ImageBackground source={require('../src/assets/images/wallpaperHome.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}> 
                <SafeAreaView style={styles.searchContainer}>
                    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
                        <Text allowFontScaling={false} style={styles.textWelcome}>BENVENUTO!</Text>
                        <Text allowFontScaling={false} style={styles.textGuide}>Cerca una guida</Text>
                        <SearchBar/>
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={styles.shadowContainer}>
                    <LinearGradient style={styles.rectangle} colors={["#bbf2ea", "#56d6c5"]} start={{x: 0.2, y:1}} end={{x: 1, y: 0.4}}>
                        <Text allowFontScaling={false} style={styles.textExplore}> Esplora le guide, {'\n'} libera il tuo potenziale </Text>
                        <Image style={styles.brainImage} source={require('../src/assets/images/brain.png')}/>
                    </LinearGradient> 
                </SafeAreaView>
                <SafeAreaView style={styles.categoriesContainer}>
                    <ScrollView>
                        <Text style={styles.textCategories}>Categorie:</Text>
                        <Categories/>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaView>
        </ImageBackground>
    );
    */
    return (
        <ImageBackground source={require('../src/assets/images/wallpaperHome.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}> 
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <Text allowFontScaling={false} style={styles.textWelcome}>BENVENUTO!</Text>
                    <Text allowFontScaling={false} style={styles.textGuide}>Cerca una guida</Text>
                    <SearchBar/>
                <SafeAreaView style={styles.shadowContainer}>
                    <LinearGradient style={styles.rectangle} colors={["#bbf2ea", "#56d6c5"]} start={{x: 0.2, y:1}} end={{x: 1, y: 0.4}}>
                        <Text allowFontScaling={false} style={styles.textExplore}> Esplora le guide, {'\n'} libera il tuo potenziale </Text>
                        <Image style={styles.brainImage} source={require('../src/assets/images/brain.png')}/>
                    </LinearGradient> 
                </SafeAreaView>
                <SafeAreaView style={styles.categoriesContainer}>
                    <Text style={styles.textCategories}>Categorie:</Text>
                    <Categories/>
                </SafeAreaView>
                </ScrollView>
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
        height: "100%"
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
    shadowContainer: {
        backgroundColor: "black",
        borderRadius: 45,
        height: 130,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 2.5,
        elevation: 7, //Per ombra Android
    },
    rectangle: {
        height: 130,
        backgroundColor: '#5cd7c7',
        borderRadius: 40,
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
        flex: 1,
        resizeMode: 'cover',
        height: "60%",
        width: "60%",
        marginRight: 5,
    },
    categoriesContainer: {
        flex: 1,
        marginTop: 15,
    },
});

export default Home