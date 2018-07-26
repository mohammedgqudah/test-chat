import _ from 'lodash';
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
        case 'ADD_SECTION': {
            let servers = state.servers;
            let { server_id, section } = payload;
            servers = servers.map(s => {
                if (s._id == server_id) {
                    let sections = s.sections;
                    sections.push(section);
                    return { ...s, sections: _.uniqBy(sections, '_id') };
                } else return s;
            });
            return {
                ...state,
                servers,
                show_create_section: 0
            };
        }
    }
    return {
        ...state
    };
};
