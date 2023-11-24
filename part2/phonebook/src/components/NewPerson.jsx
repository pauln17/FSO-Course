import { useState } from "react";

const NewPerson = ({
    persons,
    setPersons,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    setPersonsDisplay,
    setFilterReset
}) => {
    const [newId, setNewId] = useState(0)

    const handleNewPerson = () => {
        let updatedPersons = [...persons];
        const newObject = { id: newId, name: newName, number: newNumber }
        const existingName = persons.findIndex(person => person.name === newObject.name)
        updatedPersons = [...persons, newObject]

        if (existingName === -1) {
            setPersons(updatedPersons)
            setPersonsDisplay(updatedPersons)
            setNewId(newId + 1)
        } else {
            alert(newObject.name + " already exists in the phonebook")
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