import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL,
    FEED_POST, FEED_POST_FAIL,
    USER_LOGIN, USER_FAIL_LOGIN
} from '../constants'
import data from '../../data/data.json'

export const checkAuthenticated = () => async dispatch => {
    const users = data["users"]
    try {
        const uid = await AsyncStorage.getItem('current-user')
        if (parseInt(uid) !== null) {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: users[uid]
            });
        }
        else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: null
            });
        }
    } catch (e) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: null
        });
    }
};


export const fetchFeedPosts = () => dispatch => {
    const posts = data["posts"]
    if (posts !== null) {
        dispatch({
            type: FEED_POST,
            payload: posts
        });

    }
    else {
        dispatch({
            type: FEED_POST_FAIL,
            payload: []
        });
    }
};


export const loginUser = (id) => async dispatch => {
    const users = data["users"]
    try {
        await AsyncStorage.setItem('current-user', String(id))
        dispatch({
            type: USER_LOGIN,
            payload: users[id]
        });
    } catch (e) {
        dispatch({
            type: USER_FAIL_LOGIN,
            payload: null
        });
    }
};