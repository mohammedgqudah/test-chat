import * as authActions from '../../store/actions/auth.actions';
export default dispatch => {                                                            
    return {
        actions: {
            LOGIN: (id, password) => {
                authActions.LOGIN(id, password)
            }
        },
        dispatch
    };
};
