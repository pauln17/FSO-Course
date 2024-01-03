import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'NOTIFICATION_VOTE': return `You voted ${action.message}`
        case 'NOTIFICATION_CREATE': return `You created ${action.message}`
        case 'NOTIFICATION_ERROR': return `${action.message}`
        case 'CLEAR': return null
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const setNotification = (dispatch, content, timeout, type) => {
    dispatch({ type, message: `'${content}'` })

    setTimeout(() => {
        dispatch({ type: 'CLEAR', message: '' })
    }, timeout * 1000)
}

export default NotificationContext