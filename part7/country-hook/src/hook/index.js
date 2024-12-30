import axios from 'axios'
import { useState, useEffect } from 'react'

const baseUrlCountry = 'https://studies.cs.helsinki.fi/restcountries/api/name'
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
   
    
    useEffect(() => {
        // Only make the API call if there's a name
        if (name) {
            axios.get(`${baseUrlCountry}/${name}`)
                .then(response => {
                    setCountry({ 
                        data: {
                            name: response.data.name.common,
                            capital: response.data.capital[0],
                            population: response.data.population,
                            flag: response.data.flags.png
                        },
                        found: true
                    })
                })
                .catch(() => {
                    setCountry({ found: false })
                })
        }
    }, [name])
    
    return country
}
