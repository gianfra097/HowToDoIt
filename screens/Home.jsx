import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, Text, BackHandler, Image, ImageBackground, FlatList, TouchableOpacity, Modal, Dimensions, View} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import SearchBar from '../src/components/SearchBar';
import Categories from '../src/components/Categories';
import Svg, { Path, G } from 'react-native-svg';

const { width } = Dimensions.get('window')

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

    //Per chiudere i risultati della searchBar quando l'utente clicca al di fuori di essi
    const [searchResultsVisible, setIsSearchResultsVisible] = useState(true);

    //Per popup (info versione, developerd, ecc) da usare nel Modal
    const [isModalVisible, setIsModalVisible] = useState(false); 

    return (
        <ImageBackground source={require('../src/assets/images/wallpaperHome.png')} style={styles.backgroundImage} onTouchStart={() => setIsSearchResultsVisible(false)}>
            <SafeAreaView style={styles.container}>
                <FlatList keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} data={['homeScreenComponents']} renderItem={({ item }) => {
                    switch (item) {
                        case 'homeScreenComponents':
                            return (
                                <SafeAreaView>
                                    <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {setIsSearchResultsVisible(false)}}>
                                        <Text allowFontScaling={false} style={styles.textWelcome}>BENVENUTO!</Text>
                                        <Text allowFontScaling={false} style={styles.textGuide}>Cerca una guida</Text>
                                    </TouchableOpacity>
                                    <SearchBar searchResultsVisible={searchResultsVisible} setIsSearchResultsVisible={setIsSearchResultsVisible}/>
                                    <TouchableOpacity activeOpacity={1} style={{flex: 1, zIndex: -1}} onPress={() => {setIsSearchResultsVisible(false)}}>
                                        <SafeAreaView style={styles.shadowContainer}>
                                            <LinearGradient style={styles.rectangle} colors={["#bbf2ea", "#56d6c5"]} start={{x: 0.6, y:1}} end={{x: 1, y: 0.7}}>
                                                <Text allowFontScaling={false} style={styles.textExplore}> Esplora le guide, {'\n'} libera il tuo potenziale </Text>
                                                <Image style={styles.brainImage} source={require('../src/assets/images/brain.png')}/>
                                            </LinearGradient> 
                                        </SafeAreaView>
                                        <SafeAreaView style={styles.categoriesContainer}>
                                            <Text allowFontScaling={false} style={styles.textCategories}>Categorie:</Text>
                                            <Categories/>
                                        </SafeAreaView>
                                        <SafeAreaView style={styles.infoContainer}>
                                            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                                                <Svg width={20} height={20} viewBox="0 0 416.979 416.979" xmlns="http://www.w3.org/2000/svg">
                                                    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <G id="SVGRepo_iconCarrier">
                                                        <Path fill="#86e3d6" d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"/>
                                                    </G>
                                                </Svg>
                                            </TouchableOpacity>
                                        </SafeAreaView>
                                    </TouchableOpacity>
                                </SafeAreaView>
                            );
                        }
                }}/>
                <Modal transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)} animationType="slide">
                    <TouchableOpacity style={{flex: 1}} activeOpacity={1} onPress={() => {setIsModalVisible(false)}}>
                        <SafeAreaView style={styles.modalContainer}>
                            <SafeAreaView>
                                <TouchableOpacity activeOpacity={1} style={styles.objectModalContainer}>
                                    <Text style={{fontFamily: 'Satoshi-Black', marginTop: 10, marginBottom: 5}} allowFontScaling={false}>Version:</Text>
                                    <Text style={{fontFamily: 'Satoshi-Bold', marginBottom: 15}} allowFontScaling={false}>1.0</Text>
                                    <Text style={{fontFamily: 'Satoshi-Black', marginBottom: 5}} allowFontScaling={false}>Developed by:</Text>
                                    <Text style={{fontFamily: 'Satoshi-Bold', marginBottom: 15}} allowFontScaling={false}>Gianfranco Iaria</Text>
                                    <Text style={{fontFamily: 'Satoshi-Black', marginBottom: 5}} allowFontScaling={false}>Contacts:</Text>
                                    <Text style={{fontFamily: 'Satoshi-Bold', marginBottom: 15}} allowFontScaling={false}>gianfranco.iaria0@gmail.com</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </SafeAreaView>
                    </TouchableOpacity>
                </Modal>
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
    textWelcome: {
        fontSize: width / 12,
        fontFamily: 'DelaGothic',
        marginTop: 20, //Margine tra linea inizio schermo e testo
    },
    textGuide: {
        fontSize: width / 18,
        fontFamily: 'Satoshi-Bold',
        marginBottom: 20, //Margine sotto tra testo e barra
    },
    shadowContainer: {
        backgroundColor: "black",
        borderRadius: 45,
        height: Dimensions.get('window').height/6.9,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 2.5,
        //elevation: 4, //Per ombra Android
        marginLeft: Platform.OS === 'android' ? 1 : 0,
        zIndex: -1
    },
    rectangle: {
        height: Dimensions.get('window').height/6.9,
        backgroundColor: '#5cd7c7',
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4, //Per ombra Android
    },
    textExplore: {
        fontSize: width / 21,
        fontFamily: 'Satoshi-Bold',
        marginLeft: 8,
    },
    brainImage: {
        flex: 1,
        resizeMode: 'cover',
        height: Dimensions.get('window').height/9,  //Per migliorare risoluzione su altri dispositivi
        marginRight: 5,
    },
    categoriesContainer: {
        flex: 1,
        marginTop: 15,
        zIndex: -1
    },
    textCategories: {
        fontSize: width / 15,
        fontFamily: 'Satoshi-Bold',
        marginLeft: 20,
    },
    infoContainer: {
        flex: 1,
        margin: 20,
        width: Dimensions.get('window').width/17,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#000000aa",
        justifyContent: "flex-end",
    },
    objectModalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Home