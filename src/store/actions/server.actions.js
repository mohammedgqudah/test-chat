import { authenticated, unauthenticated } from '../axios';
export const FETCH_SERVERS = () => {
    return dispatch => {
        authenticated.get('/server/find').then(
            ({ data }) => {
                if (data == 'Unauthorized')
                    return dispatch({ type: 'REQUEST_LOGIN' });
                if (data.next) {
                    dispatch({ type: 'FETCH_SERVER_SUCCESS', payload: data });
                } else
                    return dispatch({
                        type: 'FETCH_SERVER_ERROR',
                        payload: data
                    });
            },
            error => {
                console.log('FETCH SERVER ERROR', error);
            }
        );
    };
};
export const FIND_CHANNEL_MESSAGES = data => {
    return dispatch => {
        console.log('FETCHING CHANNEL MESSAGES', data);
        let { server_id, channel_id } = data;
        authenticated
            .get(`/message/find?link=${server_id}&sub_link=${channel_id}`)
            .then(({ data }) => {
                if (data.next) {
                    dispatch({
                        type: 'SET_CHANNEL_MESSAGES',
                        payload: { messages: data.messages, channel_id }
                    });
                } else {
                    console.error(data);
                }
            });
    };
};
export const CREATE_SERVER = name => {
    return dispatch => {
        authenticated.post('/server/create', { name }).then(
            ({ data }) => {
                if (data.next) {
                    dispatch({
                        type: 'ADD_SERVER',
                        payload: { server: data.server }
                    });
                } else {
                    console.error(data);
                }
            },
            error => {
                console.error(error.response);
            }
        );
    };
};
