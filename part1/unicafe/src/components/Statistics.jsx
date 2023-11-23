import Stat from './Stat';

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    const average = ((good - bad) / total) * 100
    const positive = (good / total) * 100
    return (
        <>  
            <table>
                <tbody>
                    <tr>
                        <td>
                            statistics
                        </td>
                    </tr>
                    <Stat type={"good"} stat={good}/>
                    <Stat type={"neutral"} stat={neutral}/>                 
                    <Stat type={"bad"} stat={bad}/>
                    <Stat type={"total"} stat={total}/>
                    <Stat type={"average"} stat={average}/>
                    <Stat type={"positive"} stat={positive}/>
                </tbody>
            </table>
        </>
    )
}

export default Statistics