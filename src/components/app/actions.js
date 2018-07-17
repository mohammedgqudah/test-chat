import * as authActions from '../../store/actions/auth.actions';
export default dispatch => {
    return {
        actions: {
            LOGIN: (id, password) => {
                dispatch(authActions.LOGIN(id, password));
            },
            SIGNUP: (name, email, password) => {
                dispatch(authActions.SIGNUP(name, email, password));
            }
        },
        dispatch
    };
};
