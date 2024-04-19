import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const FetchGuidesFromCategory = (categoryID) => {

    //Recupero le guide con un determinato ID dal db e inserisco i dati dentro allGuidesFromId che ritornerò attraverso lo useEffect
    //Basterà quindi richiamare "const allGuidesFromId = FetchGuidesFromCategory(categoryID);" per avere tutte le categorie
    const [allGuidesFromId, setAllGuidesFromId] = useState([])
    useEffect(() => {
        const fetchGuidesOfCategory = async () => {
            try {
                const {data, error} = await supabase.from("Guides").select('*').eq('categoryID', categoryID)

                if(error){
                    console.log(error)
                } else {
                    setAllGuidesFromId(data)
                }
            } catch (error) {
                console.error('Errore durante il recupero delle guide tramite ID', error);
            }
        };
        fetchGuidesOfCategory()
    }, [])

    return allGuidesFromId

}

export default FetchGuidesFromCategory;