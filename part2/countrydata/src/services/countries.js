import axios from 'axios'
const baseAllUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const baseNameUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'
const weatherApiUrl = 'http://api.weatherapi.com/v1/current.json'
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

const getAll = () => {
    const request = axios.get(baseAllUrl)
    return request.then(response => response.data)
}

const getCountry = async (name) => {
    try {
        // Get country data
        const countryResponse = await axios.get(`${baseNameUrl}/${name}`)
        const country = countryResponse.data
        
        // Get weather for capital
        const weatherResponse = await axios.get(weatherApiUrl, {
            params: {
                key: weatherApiKey,
                q: country.capital[0], // Usar la capital del país
                aqi: 'no'
            }
        })

        // Combinar datos
        return {
            ...country,
            weather: {
                temperature: weatherResponse.data.current.temp_c,
                condition: weatherResponse.data.current.condition.text,
                icon: weatherResponse.data.current.condition.icon,
                windSpeed: weatherResponse.data.current.wind_kph
            }
        }
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

export default { getAll, getCountry }