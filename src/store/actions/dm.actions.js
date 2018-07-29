import { authenticated } from '../axios';

export const FETCH_FRIENDS = () => {
    return async dispatch => {
        try {
            let { data } = await authenticated.get('/core/conversations');
            if (data.next) {
                dispatch({
                    type: 'SET_FRIENDS',
                    payload: { friends: data.conversations }
                });
            } else {
                dispatch({
                    type: 'SET_FRIENDS_ERROR',
                    payload: data
                });
            }
        } catch (error) {
            console.error('GET FRIENDS CATCH', error);
            console.info(error.response);
        }
    };
};
export const FETCH_DM_MESSAGES = conversation_id => {
    return async dispatch => {
        try {
            let { data } = await authenticated.get(
                `/message/find?link=${conversation_id}`
            );
            if (data.next) {
                dispatch({
                    type: 'SET_DM_MESSAGES',
                    payload: {
                        messages: data.messages,
                        conversation_id: conversation_id
                    }
                });
            } else {
                dispatch({
                    type: 'SET_DM_MESSAGES_ERROR',
                    payload: data
                });
            }
        } catch (error) {
            console.error('GET FRIENDS CATCH', error);
            console.info(error);
        }
    };
};
export const SEND_DM_MESSAGE = (content, { conversation_id }) => {
    return async dispatch => {
        let { USER_AVATAR, USER_EMAIL, USER_NAME } = localStorage;
        let _id = Date.now();
        let message = {
            content,
            user: {
                name: USER_NAME,
                avatar: USER_AVATAR,
                email: USER_EMAIL
            },
            createdAt: Date.now(),
            _id: _id,
            fake: true
        };
        try {
            dispatch({
                type: 'ADD_DM_MESSAGE',
                payload: { message, conversation_id }
            });
            let { data } = await authenticated.post('/message/create', {
                content,
                conversation_id
            });
            if (data.next) {
                dispatch({
                    type: 'ADD_DM_MESSAGE',
                    payload: {
                        message: data.message,
                        conversation_id,
                        remove: _id
                    }
                });
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log('CATCH', error);
        }
    };
};
export const FETCH_PENDING = () => {
    return async dispatch => {
        try {
            let { data } = await authenticated.get('/core/pending-requests');
            if (data.next) {
                dispatch({
                    type: 'SET_PENDING_REQUESTS',
                    payload: { pending_requests: data.pending_requests }
                });
            } else {
                dispatch({ type: 'FETCH_PENDING_ERROR', payload: data });
            }
        } catch (error) {
            console.log('CATCH', error);
        }
    };
};
export const FRIEND_REQUEST = full_id => {
    return async dispatch => {
        dispatch({
            type: 'FRIEND_REQUEST_ERROR',
            payload: { message: undefined }
        });
        try {
            let { data } = await authenticated.post('/core/friend-request', {
                name_id: full_id
            });
            if (data.next) {
                return dispatch({
                    type: 'ADD_PENDING',
                    payload: { redirect: true, pending: data.pending }
                });
            } else {
                console.log('Add Friend Error', data);
                return dispatch({
                    type: 'FRIEND_REQUEST_ERROR',
                    payload: { message: data.message }
                });
            }
        } catch (error) {
            console.log('Catch', error);
        }
    };
};
