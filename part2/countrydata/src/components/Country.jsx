import React, { useState, useEffect } from 'react'
import SingleCountry from './SingleCountry'
const Country = ({ country, countriesService }) => {
    const [showDetails, setShowDetails] = useState(false)
    const [countryData, setCountryData] = useState(null)

    useEffect(() => {
        if (showDetails && !countryData) {
            countriesService.getCountry(country.name.common)
                .then(data => setCountryData(data))
        }
    }, [showDetails, country.name.common])

    const handleShow = () => {
        setShowDetails(!showDetails)
    }

    return (
        <li>
            {country.name.common} 
            <button onClick={handleShow}>
                {showDetails ? 'hide' : 'show'}
            </button>
            {showDetails && countryData && <SingleCountry country={countryData} />}
        </li>
    )
}
export default Country