import { useEffect, useState } from 'react'
import Search from './components/Search'
import countriesService from './services/countries'
import Countries from './components/Countries'


function App() {
  
  const [countries, setCountries] = useState(null)
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    countriesService.getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  const countriesToShow = searchCountry && searchCountry ? countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase())) : countries

  const handleChangeSearch = (e) => setSearchCountry(e.target.value)

  return(

    <>
    <Search value={searchCountry} onChange={handleChangeSearch} />

    <Countries countries={countriesToShow} countriesService={countriesService}/>
    </>
  )

}

export default App
