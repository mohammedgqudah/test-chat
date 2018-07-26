export default {
    auth: {
        logging_in: false,
        message: {
            message: ''
        }
    },
    servers_last_link: {},
    folding_sections: {},
    loaded_by_id: {},
    servers: [],
    channels_messages: {},
    active_card: {},
    show_add_server: false,
    add_channel_section_id: 0,
    card_event: true,
    dm: {
        dm_messages: {},
        dm_loaded: {}
    },
    data: {},
    // if 2 the app will load because we need to load
    // 1- servers and 2- conversations
    load_app: 0
};
