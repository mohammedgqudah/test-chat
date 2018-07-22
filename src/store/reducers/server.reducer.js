export default (state, { type, payload }) => {
    switch (type) {
        case 'FETCH_SERVER_SUCCESS': {
            return {
                ...state,
                servers: payload.servers,
                load_app: state.load_app + 1
            };
            break;
        }
        case 'ACTIVATE_SERVER': {
            return {
                ...state,
                active_server: payload.server_id
            };
            break;
        }
        case 'SET_CHANNEL_MESSAGES': {
            let { channel_id, messages } = payload;
            return {
                ...state,
                channels_messages: {
                    ...state.channels_messages,
                    [channel_id]: messages
                }
            };
            break;
        }
        case 'OPEN_USER_CARD': {
            let id = payload.id;
            if (id == state.active_card) id = 'CLOSED';
            return {
                ...state,
                active_card: id
            };
            break;
        }
        case 'DISABLE_CARD_EVENT': {
            return {
                ...state,
                card_event: false
            };
        }
        case 'SET_CREATE_SERVER': {
            return {
                ...state,
                show_create_server: payload
            };
            break;
        }
        case 'ADD_SERVER': {
            return {
                ...state,
                servers: [...state.servers, payload.server],
                show_create_server: false
            };
        }
        case 'SET_CREATE_CHANNEL': {
            return {
                ...state,
                add_channel_section_id: payload
            };
        }
    }
    return { ...state };
};
