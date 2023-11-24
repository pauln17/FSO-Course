import { useEffect } from "react"

const Search = ({
    persons,
    filterReset,
    setFilterReset,
    setPersonsDisplay
}) => {
    const handleSearchFilter = (e) => {
        const updatedFilter = e.target.value.toLowerCase()
        const updatedPersons = persons.filter((person) => person.name.toLowerCase().includes(updatedFilter))

        if (!updatedFilter) {
            setPersonsDisplay(persons)
            return
        }
        setPersonsDisplay(updatedPersons)

    }

    useEffect(() => {
        if (filterReset) {
            setPersonsDisplay(persons)
            setFilterReset(false)
        }
    }, [filterReset])

    return (
        <>
            <div style={{ marginBottom: "15px" }}>
                Search:
                <input required onChange={handleSearchFilter} />
            </div>
        </>
    )
}

export default Search