import {
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    USER_LOGIN,
    USER_FAIL_LOGIN
} from '../constants/index';

const initialState = {
    currentUser: null,
    posts: [],
    chats: [],
    following: [],
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                currentUser: action.payload
            };
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            };
            case USER_LOGIN:
                return {
                    ...state,
                    currentUser: action.payload
                };
                case USER_FAIL_LOGIN:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
}