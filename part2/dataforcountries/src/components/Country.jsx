import { useState, useEffect } from "react"
import countriesService from "../services/countries"

const Country = ({ countryData, oneCountry, setSearchFilter }) => {
    const { name, capital, languages, flags } = countryData
    const [weatherData, setWeatherData] = useState([])

    const api_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY


    useEffect(() => {
        if (oneCountry) {
            countriesService
                .getCityWeather(capital, api_key)
                .then((cityWeather) => {
                    setWeatherData(cityWeather)
                })
                .catch(error => {
                    console.log("getCityWeather error", error);
                })

        }
    }, [oneCountry])

    return (
        <>
            {!oneCountry ? (
                <>
                    <div style={{ display: "flex" }}>
                        <div>{name["common"]}</div>
                        <button onClick={() => setSearchFilter(name["common"])}>show</button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <div style={{ marginTop: "25px", fontWeight: "bold", fontSize: "30px" }}>{name["common"]}</div>
                        <img alt="Country Flag" src={flags["png"]}></img>
                        <div style={{ margin: "10px 0px" }}>
                            <div style={{ fontWeight: "bold" }}>Capital:</div>
                            <div>{capital}</div>
                        </div>
                        <div >
                            <div style={{ fontWeight: "bold" }}>Languages </div>
                            {Object.values(languages).map((language) => (
                                <div key={language}>{language}</div>
                            ))}
                        </div>
                    </div>
                    {weatherData.main && (
                        <div>
                            <div style={{ marginTop: "15px", fontSize: "22px", fontWeight: "bold" }}>Weather in {capital}</div>
                            <div>Temperature: {weatherData.main.temp}</div>
                            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Image"></img>
                            <div>Wind Speeds: {weatherData.wind.speed}</div>

                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default Country