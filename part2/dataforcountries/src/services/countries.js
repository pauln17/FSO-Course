import axios from "axios";
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherBaseURL = `https://api.openweathermap.org/data/2.5/weather?q=`
const weatherImageBaseURL = `https://api.openweathermap.org/img/wn`

const getAll = () => {
    const request = axios.get(`${baseURL}/all`)
    return request.then(response => response.data)
}

const getCityWeather = (city, apiKey) => {
    const request = axios.get(`${weatherBaseURL}${city}&appid=${apiKey}`)
    return request.then(response => response.data)
}

const getCityImage = (icon) => {
    const request = axios.get(`${weatherBaseURL}/${icon}@2x.png`)
    return request.then(response => response.data)
}

export default { getAll, getCityWeather, getCityImage }
