import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, Image, Dimensions, TouchableOpacity, View, ActivityIndicator} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FetchAllCategories from '../lib/FetchAllCategories';
import GuidesPage from '../pages/GuidesPage'

const Categories = () => {

    const navigation = useNavigation();

    //Recupero i dati delle Guide
    const allCategories = FetchAllCategories();

    //Timeout per spinner prima che vengono caricate tutte le categorie
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(allCategories.length > 0){
            setIsLoading(false)
        }
    })
   
    return (
        <SafeAreaView style={styles.container}>
            {!isLoading ? 
            (allCategories.map((category, index) => (
                <SafeAreaView key={index}>
                    <TouchableOpacity onPress={() => navigation.navigate("GuidesPage", {clickedCategory: category.name, categoryID: category.id})}>
                        <SafeAreaView style={[styles.square, index % 2 != 0 && styles.squareNotFirst]}>
                            <Image style={styles.categoriesImage} source={{ uri: category.image }}/>
                        </SafeAreaView>
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={[styles.categoriesText, index % 2 != 0 && styles.categoriesTextNotFirst]}>{category.name}</Text>
                </SafeAreaView>
            ))) : (
                <View style={{justifyContent: "center"}}>
                    <ActivityIndicator size="large"/>
                </View>
            )}
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
    square: {
        width: Dimensions.get('window').width / 3 + 6,
        height: Dimensions.get('window').height / 6,
        backgroundColor: "#86e3d6",
        //marginBottom: 20, //Se presente categoriesText, il marginBottom si sposta direttamente sul testo
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 2.5,
        elevation: 6, //Per ombra Android
    },
    squareNotFirst: {
        marginLeft: 30,
    },
    categoriesText: {
        fontFamily: 'Satoshi-Bold',
        fontSize: Dimensions.get('window').width/25,
        textAlign: "center", 
        marginBottom: 20, 
        marginTop: 5
    },
    categoriesTextNotFirst: {
        marginLeft: 30,
    },
    categoriesImage: {
        flex: 1,
        resizeMode: 'cover',
        //height: Dimensions.get('window').height/10,  //Essendoci cover non è indispensabile la grandezza
    }
})

export default Categories