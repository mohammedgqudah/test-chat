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
    }
    return { ...state };
};
