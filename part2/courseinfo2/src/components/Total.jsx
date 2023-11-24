const Total = ({ parts }) => {
    const exercisesArray = parts.map((part) => part.exercises)
    const sum = exercisesArray.reduce((sum, curr) => sum + curr, 0)
    return (
        <>
            <div style={{ marginBottom: "15px" }}>Total Exercises: {sum}</div>
        </>
    )
}

export default Total