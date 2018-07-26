import * as authActions from '../../store/actions/auth.actions';
import * as messagesActions from '../../store/actions/messages.actions';
import * as serverActions from '../../store/actions/server.actions';
import * as channelsActions from '../../store/actions/channels.actions';
import * as dmsActions from '../../store/actions/dm.actions';
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
            },
            CREATE_CHANNEL: (server_id, section_id, name) => {
                dispatch(
                    channelsActions.CREATE_CHANNEL(server_id, section_id, name)
                );
            },
            CREATE_SECTION: (server_id, name) => {
                dispatch(serverActions.CREATE_SECTION(server_id, name));
            },
            FETCH_FRIENDS: () => {
                dispatch(dmsActions.FETCH_FRIENDS())
            },
            FETCH_DM_MESSAGES: (id) => {
                dispatch(dmsActions.FETCH_DM_MESSAGES(id))
            },
            SEND_DM_MESSAGE: (value, data) => {
                dispatch(dmsActions.SEND_DM_MESSAGE(value, data))
            },
            FRIEND_REQUEST: (full_id) => {
                dispatch(dmsActions.FRIEND_REQUEST(full_id))
            },
            FETCH_PENDING_REQUESTS: () => {
                dispatch(dmsActions.FETCH_PENDING())
            },
        },
        dispatch
    };
};

// change the create server component to user redux store instead of it's own state
