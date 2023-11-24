import personService from "../services/persons";

const NewPerson = ({
    persons,
    setPersons,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    setPersonsDisplay,
    setFilterReset,
    setError,
}) => {

    const handleNewPerson = () => {
        const newObject = { name: newName, number: newNumber }
        const existingName = persons.findIndex(person => person.name === newObject.name)

        if (existingName === -1) {
            personService
                .create(newObject)
                .then((returnedPerson) => {
                    const updatedPersons = [...persons, returnedPerson]
                    setPersons(updatedPersons)
                    setPersonsDisplay(updatedPersons)
                    setError({ type: "success", message: `Successfully added ${returnedPerson.name}` })
                })
                .catch(error => {
                    console.log("handleNewPerson error", error)
                    setError({ type: "failed", message: `Failed to add ${newName}` })
                })
        } else {
            const confirmReplace = window.confirm(newObject.name + " already exists in the phonebook, replace the old number with a new one?")
            if (confirmReplace) {
                const personId = persons[existingName].id
                personService
                    .update(personId, newObject)
                    .then((returnedPerson) => {
                        const updatedPersons = persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson)
                        setPersons(updatedPersons);
                        setPersonsDisplay(updatedPersons);
                        setError({ type: "success", message: `Successfully updated ${returnedPerson.name}` })
                    })
                    .catch(error => {
                        console.log("handleNewPerson error", error);
                        setError({ type: "failed", message: `Failed to update ${newName}` })
                    })
            }
        }
        setFilterReset(true)
    }

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <div>Add New</div>
                <div>
                    Name:
                    <input required onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div>
                    Number:
                    <input required onChange={(e) => setNewNumber(e.target.value)} />
                </div>
                <div>
                    <button type="submit" onClick={handleNewPerson}>add</button>
                </div>
            </form>
        </>
    )
}

export default NewPerson