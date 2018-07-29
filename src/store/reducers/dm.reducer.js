import _ from 'lodash';
export default (state, { type, payload }) => {
    switch (type) {
        case 'SET_FRIENDS': {
            let { friends } = payload;
            return {
                ...state,
                load_app: state.load_app + 1,
                dm: {
                    ...state.dm,
                    friends
                }
            };
            break;
        }
        case 'SET_DM_MESSAGES': {
            let { conversation_id, messages } = payload;
            return {
                ...state,
                dm: {
                    ...state.dm,
                    dm_loaded: {
                        ...state.dm.dm_loaded,
                        [conversation_id]: true
                    },
                    dm_messages: {
                        ...state.dm.dm_messages,
                        [conversation_id]: messages
                    }
                }
            };
            break;
        }
        case 'ADD_DM_MESSAGE': {
            let { conversation_id, message, remove } = payload;
            let messages = [...state.dm.dm_messages[conversation_id]];
            if (remove) {
                messages = messages.filter(m => m._id != remove);
            }
            messages.push(message);
            messages = _.uniqBy(messages, '_id');
            return {
                ...state,
                dm: {
                    ...state.dm,
                    dm_messages: {
                        ...state.dm.dm_messages,
                        [conversation_id]: messages
                    }
                }
            };
            break;
        }
        case 'ADD_PENDING': {
            let { redirect, pending } = payload;
            if (redirect) {
                setTimeout(() => {
                    window.router.push('/@me/friends/pending');
                }, 500);
            }
            return {
                ...state,
                dm: {
                    ...state.dm,
                    pending_requests: [...state.dm.pending_requests, pending]
                }
            };
            break;
        }
        case "FRIEND_REQUEST_ERROR": {
            return {
                ...state,
                dm: {
                    ...state.dm,
                    friend_request_error: payload.message
                }
            }
            break;
        }
        case 'SET_PENDING_REQUESTS': {
            let { pending_requests } = payload;
            return {
                ...state,
                load_app: state.load_app + 1,
                dm: {
                    ...state.dm,
                    pending_requests
                }
            };
        }
    }
    return { ...state };
};
