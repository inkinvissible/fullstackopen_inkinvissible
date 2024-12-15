const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={message.toLowerCase().includes('error') ? 'notificationError' : 'notification'}>
            <p>{message}</p>
        </div>
    )
}
export default Notification