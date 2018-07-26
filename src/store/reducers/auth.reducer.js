import _c from '../constants';
let { LOGIN_START, LOGIN_ERROR, LOGIN_SUCCESS } = _c;
export default (state, { type, payload }) => {
    let auth = state.auth;
    switch (type) {
        case LOGIN_START: {
            return {
                ...state,
                auth: { ...auth, logging_in: true, message: { message: '' } }
            };
            break;
        }
        case LOGIN_ERROR: {
            const errorMessage = m => {
                return {
                    ...state,
                    auth: {
                        ...auth,
                        logging_in: false,
                        message: {
                            type: 'danger',
                            message: m
                        }
                    }
                };
            };
            let { error } = payload;
            if (error == 'UserNotFound')
                return errorMessage(
                    'User not found, double check your email/name'
                );
            else if (error == 'InvalidBody')
                return errorMessage('Please enter valid data');
            else return errorMessage('Something went wrong')
            break;
        }
        case LOGIN_SUCCESS: {
            console.log(payload);
            localStorage.setItem('USER_TOKEN', payload.token);
            localStorage.setItem('USER_NAME', payload.user.name);
            localStorage.setItem('USER_TAG', payload.user.tag);
            localStorage.setItem('USER_EMAIL', payload.user.email);
            localStorage.setItem('USER_AVATAR', payload.user.avatar);
            return {
                ...state,
                auth: { ...auth, user: true, logging_in: false, logged_in: true}
            };
            break;
        }
    }
    return { ...state };
};
