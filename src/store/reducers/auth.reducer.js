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
            localStorage.setItem('USER_TOKEN', payload.token);
            localStorage.setItem('USER', payload.user);
            window.router.push('/');
            return {
                ...state,
                auth: { ...auth, user: true, logging_in: false }
            };
            break;
        }
    }
    return { ...state };
};
