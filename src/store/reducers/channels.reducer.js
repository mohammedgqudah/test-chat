import _ from 'lodash';

export default (state, { type, payload }) => {
    let state_servers = state.servers;
    switch (type) {
        case 'ACTIVATE_CHANNEL': {
            let { server_id, section_id, channel_id } = payload;
            let servers = state_servers;
            let target_server = servers.find(s => s._id == server_id);
            target_server.sections = target_server.sections.map(section => {
                let channels = section.channels.map(channel => {
                    return { ...channel, active: false };
                });
                return { ...section, channels };
            });
            servers
                .find(s => s._id == server_id)
                .sections.find(sec => sec._id == section_id)
                .channels.find(c => c._id == channel_id).active = true;
            return {
                ...state,
                servers_last_link: {
                    ...state.servers_last_link,
                    [server_id]: {
                        section_id,
                        channel_id
                    }
                }
            };
            break;
        }
        case 'FOLD_SECTION': {
            let { section_id } = payload;
            return {
                ...state,
                folding_sections: {
                    ...state.folding_sections,
                    [section_id]: !state.folding_sections[section_id]
                }
            };
        }
        case 'SET_CREATE_CHANNEL': {
            return {
                ...state,
                add_channel_section_id: payload
            };
        }
        case 'ADD_CHANNEL': {
            // ...state.servers,
            //         [payload.server_id]: {
            //             ...server,
            //             sections
            //         }
            let server = state.servers.find(s => s._id == payload.server_id);
            let sections = server.sections;
            sections = sections.map(section => {
                if (section._id == payload.section_id) {
                    let channels = section.channels;
                    channels.push(payload.channel);
                    section.channels = _.uniqBy(channels, '_id');
                    return section;
                } else {
                    return section;
                }
            });
            let servers = state.servers.map(s => {
                if (s._id == payload.server_id) {
                    s.sections = sections;
                }
                return s;
            });
            return {
                ...state,
                servers,
                add_channel_section_id: 0
            };
        }
        case "SET_CREATE_SECTION": {
            return {
                ...state,
                show_create_section: payload
            }
        } 
    }
    return { ...state };
};
