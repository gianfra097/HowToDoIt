import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const FetchAllGuides = () => {

    //Recupero tutte le guide dal db e inserisco i dati dentro allGuides che ritornerò attraverso lo useEffect
    //Basterà quindi richiamare "const allGuides = FetchAllGuides();" per avere tutte le guide
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

    return allGuides

}

export default FetchAllGuides;