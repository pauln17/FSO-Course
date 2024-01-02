import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: null,
    reducers: {
        notifyOnVote(state, action) {
            return action.payload
        },
        emptyNotification(state, action) {
            return null
        }
    }
})

export const { notifyOnVote, emptyNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
    return async dispatch => {
        dispatch(notifyOnVote(`You voted: ${content}`))

        setTimeout(() => {
            dispatch(emptyNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer