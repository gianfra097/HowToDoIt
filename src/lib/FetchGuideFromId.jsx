import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const FetchGuideFromId = (clickedGuideID) => {

    //Recupero la guida con un determinato ID dal db e inserisco i dati dentro guide che ritornerò attraverso lo useEffect
    //Basterà quindi richiamare "const allGuides = FetchGuidesFromCategory();" per avere tutte le categorie
    const [guide, setGuide] = useState([]);
    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const {data, error} = await supabase.from("Guides").select('*').eq('id', clickedGuideID)

                if(error){
                    console.log(error)
                } else {
                    setGuide(data[0])
                }
            } catch (error) {
                console.error('Errore durante il recupero delle guide tramite ID', error);
            }
        };
        fetchGuide()
    }, [])

    return guide

}

export default FetchGuideFromId;