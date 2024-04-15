import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const FetchGuidesFromCategory = (categoryID) => {

    //Recupero le guide con un determinato ID dal db e inserisco i dati dentro allGuides che ritornerò attraverso lo useEffect
    //Basterà quindi richiamare "const allGuides = FetchGuidesFromCategory(categoryID);" per avere tutte le categorie
    const [allGuides, setAllGuides] = useState([])
    useEffect(() => {
        const fetchGuidesOfCategory = async () => {
            const {data, error} = await supabase.from("Guides").select('*').eq('categoryID', categoryID)

            if(error){
                console.log(error)
            } else {
                setAllGuides(data)
            }
        }
        fetchGuidesOfCategory()
    }, [])

    return allGuides

}

export default FetchGuidesFromCategory;