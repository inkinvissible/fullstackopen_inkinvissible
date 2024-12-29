const Notification = ({notification}) => {
    const noDisplay = { display: 'none' }
    const style = {
    padding: 7,
    borderRadius: 5,
    border: 'solid',
    borderColor: 'black',
    boxShadow: '3px 3px',
    }
    return (
        <div style={notification ? style : noDisplay}>
            <p>{notification}</p>
        </div>
    )
}

export default Notification