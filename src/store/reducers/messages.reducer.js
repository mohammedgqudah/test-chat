import _ from 'lodash';
export default (state, { type, payload }) => {
    let channels_messages = state.channels_messages;
    switch (type) {
        case 'SEND_FAKE_SERVER_MESSAGE': {
            let messages = channels_messages[payload.channel_id] || [];
            return {
                ...state,
                channels_messages: {
                    ...channels_messages,
                    [payload.channel_id]: [...messages, payload.message]
                }
            };
            break;
        }
        case 'SEND_MESSAGE': {
            let messages_old = channels_messages[payload.channel_id] || [];
            let messages = messages_old.filter(m => m._id != payload._id);
            messages.push(payload.message);
            messages = _.uniqBy(messages, '_id');
            return {
                ...state,
                channels_messages: {
                    ...channels_messages,
                    [payload.channel_id]: messages
                }
            };
            break;
        }
        case 'REMOVE_MESSAGE_BY_ID': {
            let { path, path_id, message_id } = payload;
            messages = state[path][path_id];
            messages = messages.filter(m => m._id != message_id);
            return {
                ...state,
                [path]: {
                    ...state[path],
                    [path_id]: messages
                }
            };
            break;
        }
    }
    return { ...state };
};
