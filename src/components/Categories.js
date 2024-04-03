import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, Image, Dimensions} from 'react-native'
import { supabase } from '../lib/supabase'

const Categories = () => {

    const [allCategories, setAllCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const {data, error} = await supabase.from("Categories").select('*')

            if(error){
                console.log(error)
            } else {
                setAllCategories(data)
            }
        }
        fetchCategories()
    }, [])
   
    /*
    return (
        <SafeAreaView style={styles.container}>
            {Array.from(Array(10).keys()).map(i => ( // Scorri gli elementi del db
                <SafeAreaView key={i} style={[styles.square, i % 2 != 0 && styles.squareNotFirst]}/> //Applica lo stile squareNotFirst solo se non è il primo quadrato della riga
            ))}
        </SafeAreaView>
    )
    */
    return (
        <SafeAreaView style={styles.container}>
            {allCategories.map((category, index) => (
                <SafeAreaView key={index}>
                    <SafeAreaView style={[styles.square, index % 2 != 0 && styles.squareNotFirst]}>
                    <Image style={styles.categoriesImage} source={{ uri: category.image }}/>
                    </SafeAreaView>
                    <Text allowFontScaling={false} style={[styles.categoriesText, index % 2 != 0 && styles.categoriesTextNotFirst]}>{category.name}</Text>
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