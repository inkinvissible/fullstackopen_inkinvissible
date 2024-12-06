import React, { useState, useEffect } from 'react'
import Country from './Country'
const Countries = ({ countries, countriesService }) => {
    const [singleCountry, setSingleCountry] = useState(null)

    useEffect(() => {
        if (countries && countries.length === 1) {
            countriesService.getCountry(countries[0].name.common)
                .then(country => setSingleCountry(country))
        }
    }, [countries, countriesService])

    if (!countries) return null
    
    if (countries.length === 1) {
        if (!singleCountry) return <p>Loading...</p>
        return <SingleCountry country={singleCountry} />
    }

    if (countries.length > 10) return <p>Too many matches, specify another filter</p>
    
    return (
        <div>
            <h1>Countries</h1>
            <ul>
                {countries.map(country => 
                    <Country 
                        key={country.name.common}
                        country={country} 
                        countriesService={countriesService}
                    />
                )}
            </ul>
        </div>
    )
}
export default Countries