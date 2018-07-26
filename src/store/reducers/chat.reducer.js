export default (state, { type, payload }) => {
    switch (type) {
        case 'DISABLE_CARD_EVENT': {
            return {
                ...state,
                card_event: false
            };
        }
    }
    return {
        ...state
    };
};
