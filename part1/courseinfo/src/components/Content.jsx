import Part from "./Part";

const Content = ({parts}) => {
    return (
        <>
            <Part name={parts[0].name}/>
            <Part name={parts[1].name}/>
            <Part name={parts[2].name}/>
        </>
    )
}

export default Content