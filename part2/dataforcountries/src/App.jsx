import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Search from './components/Search'
import countriesService from './services/countries'


function App() {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then((returnedCountries) => {
        setCountries(returnedCountries)
      })
      .catch(error => {
        console.log("getAll error", error)
      })
  }, [])

  return (
    <>
      <Search
        setCountries={setCountries}
        setSearchFilter={setSearchFilter}
      />
      <Countries
        countries={countries}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
    </>
  )
}

export default App
