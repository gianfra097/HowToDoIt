import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, Dimensions, TouchableOpacity} from 'react-native'
import { supabase } from '../lib/supabase'

const Guides = () => {

    const [allGuides, setAllGuides] = useState([])

    useEffect(() => {
        const fetchGuides = async () => {
            const {data, error} = await supabase.from("Guides").select('*')

            if(error){
                console.log(error)
            } else {
                setAllGuides(data)
            }
        }
        fetchGuides()
    }, [])
   
    return (
        <SafeAreaView style={styles.container}>
            {allGuides.map((guide, index) => (
                <SafeAreaView key={index}>
                    <TouchableOpacity /*onPress={() => navigation.navigate("GuidesPage", {clickedCategory: category.name})}*/>
                        <SafeAreaView style={styles.rectangle}>
                            <Text allowFontScaling={false} style={styles.guideTitle}>{guide.guideName}:</Text>
                        </SafeAreaView>
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
        width: Dimensions.get('window').width - 70,
        height: Dimensions.get('window').height / 15,
        justifyContent: "center",
        backgroundColor: "#86e3d6",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 2.5,
        elevation: 6, //Per ombra Android
    },
    guideTitle: {
        fontFamily: 'Satoshi-Black',
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').width/25,
        textAlign: "center", 
        marginTop: 3,
        marginBottom: 8,
    },
})

export default Guides