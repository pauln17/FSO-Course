const Total = ({ parts }) => {
    return (
        <>
            <div>Total Exercises: {parts[0].exercises + parts[1].exercises + parts[2].exercises}</div>
        </>
    )
}

export default Total