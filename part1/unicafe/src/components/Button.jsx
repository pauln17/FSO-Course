const Button = ({data, set, type, handleFeedback}) => {
    const updatedValue = data + 1
 return (
    <>
        <button onClick={() => {
            set(updatedValue)
            handleFeedback(updatedValue)
        }}
        >
            {type}
        </button>
    </>
 )
}

export default Button