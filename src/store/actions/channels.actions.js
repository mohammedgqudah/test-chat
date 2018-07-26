import('babel-polyfill');
import { authenticated } from '../axios';
export const CREATE_CHANNEL = (server_id, section_id, name) => {
    return async dispatch => {
        try {
            let { data } = await authenticated.post('/server/create-channel', {
                server_id,
                section_id,
                name
            });
            if (data.next) {
                dispatch({
                    type: 'ADD_CHANNEL',
                    payload: { server_id, section_id, channel: data.channel }
                });
            } else {
                dispatch({ type: 'CREATE_CHANNEL_ERROR', payload: data });
            }
        } catch (error) {
            console.error(error);
        }
    };
};
