import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const FetchAllCategories = () => {

    //Recupero le categories dal db e inserisco i dati dentro allCategories che ritornerò attraverso lo useEffect
    //Basterà quindi richiamare "const allCategories = FetchAllCategories();" per avere tutte le categorie
    const [allCategories, setAllCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const {data, error} = await supabase.from("Categories").select('*')

                if(error){
                    console.log(error)
                } else {
                    setAllCategories(data)
                }
            } catch (error) {
                console.error('Errore durante il recupero delle categorie', error);
            }
        };
        fetchCategories()
    }, [])

    return allCategories

}

export default FetchAllCategories;