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
export default notificationSlice.reducer