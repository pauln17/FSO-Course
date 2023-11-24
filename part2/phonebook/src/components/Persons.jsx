import PersonLine from "./PersonLine"

const Persons = ({ personsDisplay }) => {
    return (
        <>
            {personsDisplay.map((personDisplay) => (
                <PersonLine name={personDisplay.name} number={personDisplay.number} key={personDisplay.id}></PersonLine>
            ))}
        </>
    )
}

export default Persons