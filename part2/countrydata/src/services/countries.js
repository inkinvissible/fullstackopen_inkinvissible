import axios from 'axios'
const baseAllUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const baseNameUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getAll = () => {
    const request = axios.get(baseAllUrl)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get(`${baseNameUrl}/${name}`)
    return request.then(response => response.data)
}

export default {getAll, getCountry}