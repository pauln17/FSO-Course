import { useState, useEffect } from "react"

import Country from "./Country"

const Countries = ({
    countries,
    searchFilter,
    setSearchFilter
}) => {
    const [oneCountry, setOneCountry] = useState(false)
    const [displayCountries, setDisplayCountries] = useState([])

    useEffect(() => {
        setDisplayCountries(countries);
    }, [countries]);

    useEffect(() => {
        if (!searchFilter) {
            setDisplayCountries(countries)
            return
        }

        let updatedCountries = countries
            .filter(
                (country) => country.name["common"]
                    .toLowerCase()
                    .includes(
                        searchFilter.toLowerCase())
            )
        if (updatedCountries.length > 1) {
            setOneCountry(false)
        }

        if (updatedCountries.length === 1) {
            setOneCountry(true)
        } else if (updatedCountries.length > 10) {
            updatedCountries = updatedCountries.slice(0, 10)
        }
        setDisplayCountries(updatedCountries)
    }, [searchFilter])


    return (
        <>
            {!oneCountry && (
                <div style={{ fontSize: "30px", marginTop: "15px" }}>Countries</div>
            )}
            {displayCountries.map((country) => (
                <Country
                    key={country.name["common"]}
                    oneCountry={oneCountry}
                    countryData={country}
                    setSearchFilter={setSearchFilter}
                />
            ))
            }
        </>
    )
}

export default Countries