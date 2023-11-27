import personService from "../services/persons"

const PersonLine = ({
    id,
    name,
    number,
    persons,
    setPersons,
    setPersonsDisplay,
    setError,
}) => {

    const handleDeletePerson = () => {
        const confirmDelete = window.confirm(`Delete ${name}?`)

        if (confirmDelete) {
            personService
                .remove(id)
                .then((returnedPerson) => {
                    const updatedPersons = persons.filter((person) => person.id !== id);
                    setPersons(updatedPersons)
                    setPersonsDisplay(updatedPersons)
                    setError({ type: "success", message: `Successfully removed ${name}` })
                })
                .catch(error => {
                    alert(`Failed to remove id: ${id}, error: ` + error)
                    console.log(error.response.data.error)
                    setError({ type: "failed", message: error.response.data.error })
                })
        }
    }

    return (
        <>
            <div>
                {name}{" "}{number}
                <button onClick={handleDeletePerson} style={{ margin: "5px" }}>delete</button>
            </div>
        </>
    )
}

export default PersonLine