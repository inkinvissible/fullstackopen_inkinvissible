import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification) {
    return (
      <div
        data-testid='notification'
        className='p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400'
      >
        {notification}
      </div>
    )
  }

  return null
}

Notification.displayName = "Notification"

export default Notification
