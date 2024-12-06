const SingleCountry = ({ country }) => {
    return(
        <>
        <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <p>Area: {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(language => 
                        <li key={language}>{language}</li>
                    )}
                </ul>
                <img src={country.flags.png} alt={`Bandera de ${country.name.common}`} />

                <h2>Weather in {country.capital}</h2>
                
        </>
    )
}
export default SingleCountry