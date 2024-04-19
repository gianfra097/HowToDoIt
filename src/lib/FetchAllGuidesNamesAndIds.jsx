import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const FetchAllGuidesNamesAndIds = () => {

    //Recupero tutti i nomi e gli id delle guide dal db e inserisco i dati dentro allGuides che ritornerò attraverso lo useEffect
    //Basterà quindi richiamare "const allGuidesNamesAndIds = FetchAllGuidesNamesAndIds();" per avere tutte le guide
    const [allGuidesNamesAndIds, setAllGuidesNamesAndIds] = useState([])
    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const { data, error } = await supabase.from("Guides").select('guideName, id');

                if (error) {
                    console.error(error);
                } else {
                    setAllGuidesNamesAndIds(data);
                }
            } catch (error) {
                console.error('Errore durante il recupero delle guide:', error);
            }
        };
        fetchGuides();
    }, []);

    return allGuidesNamesAndIds;
};

export default FetchAllGuidesNamesAndIds;