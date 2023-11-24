import personService from "../services/persons"

const PersonLine = ({ id, name, number, persons, setPersons, setPersonsDisplay }) => {

    const handleDeletePerson = () => {
        const confirmDelete = window.confirm(`Delete ${name}?`)

        if (confirmDelete) {
            personService
                .remove(id)
                .then(() => {
                    const updatedPersons = persons.filter((person) => person.id !== id);
                    setPersons(updatedPersons)
                    setPersonsDisplay(updatedPersons)
                })
                .catch(error => {
                    alert(`Failed to remove id: ${id}, error: ` + error)
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