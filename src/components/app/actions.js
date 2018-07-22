import * as authActions from '../../store/actions/auth.actions';
import * as messagesActions from '../../store/actions/messages.actions';
import * as serverActions from '../../store/actions/server.actions';
export default dispatch => {
    return {
        actions: {
            LOGIN: (id, password) => {
                dispatch(authActions.LOGIN(id, password));
            },
            SIGNUP: (name, email, password) => {
                dispatch(authActions.SIGNUP(name, email, password));
            },
            SEND_SERVER_MESSAGE: (value, data) => {
                dispatch(messagesActions.SEND_SERVER_MESSAGE(value, data));
            },
            FETCH_SERVERS: () => {
                dispatch(serverActions.FETCH_SERVERS());
            },
            FIND_CHANNEL_MESSAGES: data => {
                dispatch(serverActions.FIND_CHANNEL_MESSAGES(data));
            },
            CREATE_SERVER: data => {
                dispatch(serverActions.CREATE_SERVER(data));
            }
        },
        dispatch
    };
};

// change the create server component to user redux store instead of it's own state
