import { FEED_POST, FEED_POST_FAIL } from "../constants"

const initialState = {
    users: [],
    feed: [],
    usersFollowingLoaded: 0,
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case FEED_POST:
            return {
                ...state,
                feed: action.payload
            }
        case FEED_POST_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
}