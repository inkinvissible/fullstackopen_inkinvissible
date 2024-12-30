import PropTypes from 'prop-types'
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

// Props validation
Notification.propTypes = {
    notification: PropTypes.string
}

export default Notification