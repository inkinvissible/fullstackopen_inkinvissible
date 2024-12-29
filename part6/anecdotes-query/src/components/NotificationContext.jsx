import { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION': {
            return action.payload
        }
        case 'CLEAR_NOTIFICATION':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
    const { notification } = useContext(NotificationContext)
    return notification
}

export const useNotificationDispatch = () => {
    const { notificationDispatch } = useContext(NotificationContext)
    return notificationDispatch
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    useEffect(() => {
        if (notification) {
          const timer = setTimeout(() => {
            notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
          }, 5000)
          return () => clearTimeout(timer)
        }
      }, [notification])

    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch }}>
            {props.children}
        </NotificationContext.Provider>
    )
}
NotificationContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default NotificationContext