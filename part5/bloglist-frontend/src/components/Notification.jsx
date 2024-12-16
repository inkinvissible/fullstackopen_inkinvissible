import { forwardRef, useState, useImperativeHandle } from 'react'

const Notification = forwardRef((_, ref) => {
  const [errorNotification, setErrorNotification] = useState('')
  const [notification, setNotification] = useState('')

  useImperativeHandle(ref, () => ({
    setErrorNotification,
    setNotification
  }))

  const errorNotificationStyle = {
    color: 'red',
    padding: '15px',
    borderRadius: '15px',
    borderColor: 'red',
    borderWidth: '2px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  }
  const notificationStyle = {
    color: 'black',
    padding: '15px',
    borderRadius: '15px',
    borderColor: 'green',
    borderWidth: '2px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  }

  if (errorNotification) {
    return <div style={errorNotificationStyle}>{errorNotification}</div>
  }

  if (notification) {
    return <div style={notificationStyle}>{notification}</div>
  }

  return null
})

Notification.displayName = 'Notification'

export default Notification