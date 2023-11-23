const Stat = ({type, stat}) => {

    return (
        <>
            <tr>
                <td>{type}{": "}{stat}</td>
            </tr>
        </>
    )
}

export default Stat