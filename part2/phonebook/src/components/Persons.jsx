import PersonLine from "./PersonLine"

const Persons = ({
    personsDisplay,
    setPersons,
    setPersonsDisplay,
    persons,
    setError,
}) => {
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
                    setError={setError}
                ></PersonLine>
            ))}
        </>
    )
}

export default Persons