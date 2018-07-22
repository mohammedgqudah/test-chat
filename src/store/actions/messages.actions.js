import { authenticated } from '../axios';
export const SEND_SERVER_MESSAGE = (
    content,
    { server_id, section_id, channel_id }
) => {
    return dispatch => {
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
            _id: _id
        };
        dispatch({
            type: 'SEND_FAKE_SERVER_MESSAGE',
            payload: { channel_id, message: { ...message, fake: true } }
        });
        console.log('Server id', server_id);
        authenticated
            .post('/message/create-server-message', {
                channel_id,
                section_id,
                server_id,
                content
            })
            .then(({ data }) => {
                if (data.next) {
                    dispatch({
                        type: 'SEND_MESSAGE',
                        payload: { message: data.message, _id, channel_id }
                    });
                } else {
                    console.error(data);
                }
            });
    };
};
