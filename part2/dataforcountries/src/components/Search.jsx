const Search = ({ setSearchFilter, setCountries }) => {

    const handleSearch = (e) => {
        setSearchFilter(e.target.value)
    }

    return (
        <>
            <div>
                <div>Search: </div>
                <input onChange={handleSearch}></input>
            </div>
        </>
    )
}

export default Search