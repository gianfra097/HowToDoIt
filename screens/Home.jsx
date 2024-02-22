import React, {useEffect} from 'react'
import { StyleSheet, SafeAreaView, Text, BackHandler } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import Button from "../src/components/Button"

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
        <SafeAreaView style={styles.container}>
            <Text style={styles.textColor}>Pagina Home</Text>
            <Button title="Pagina1" onPress={() => navigation.navigate("Pagina1")}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textColor: {
        color: 'red',
        textAlign: 'center',
        justifyContent: 'center',
    },
});

export default Home