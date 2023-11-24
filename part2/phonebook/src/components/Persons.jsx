import PersonLine from "./PersonLine"

const Persons = ({ personsDisplay, setPersons, setPersonsDisplay, persons }) => {
    return (
        <>
            {personsDisplay.map((personDisplay) => (
                <PersonLine
                    id={personDisplay.id}
                    name={personDisplay.name}
                    number={personDisplay.number}
                    key={personDisplay.id}
                    persons={persons}
                    setPersons={setPersons}
                    setPersonsDisplay={setPersonsDisplay}
                ></PersonLine>
            ))}
        </>
    )
}

export default Persons