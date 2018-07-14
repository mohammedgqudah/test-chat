import _c from '../constants';
let { LOGIN_START, LOGIN_ERROR, LOGIN_SUCCESS} = _c;
export default (state, { type, payload }) => {
    switch (type) {
        case LOGIN_START: {
            return {
                ...state,
                auth: { disable_button: true, logging_in: true }
            };
            break;
        }
        case LOGIN_ERROR: {

        }
    }
    return { ...state };
};
