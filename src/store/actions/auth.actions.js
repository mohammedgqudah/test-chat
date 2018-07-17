import _c from '../constants';
import { authenticated, unauthenticated } from '../axios';
export const LOGIN = (id, password) => {
    return dispatch => {
        dispatch({ type: _c.LOGIN_START });
        unauthenticated
            .post('/auth/login', {
                id,
                password
            })
            .then(
                ({ data }) => {
                    if (data.next) {
                        dispatch({
                            type: _c.LOGIN_SUCCESS,
                            payload: { token: data }
                        });
                    } else {
                        console.error(data);
                        dispatch({
                            type: _c.LOGIN_ERROR,
                            payload: { error: data.code }
                        });
                    }
                },
                error => {
                    console.error(data);
                    dispatch({
                        type: _c.LOGIN_ERROR,
                        payload: { error, server: true }
                    });
                }
            );
    };
};
export const SIGNUP = (name, email, password) => {
    return dispatch => {
        dispatch({ type: constants.SIGNUP_START });
        unauthenticated.post('/signup', { name, email, password }).then(
            ({ data }) => {
                if (data.next) {
                    dispatch({
                        type: _c.SIGNUP_SUCCESS,
                        payload: { token: data.token }
                    });
                } else {
                    console.error(data);
                    dispatch({
                        type: _c.SIGNUP_ERROR,
                        payload: { error: data.error }
                    });
                }
            },
            error => {
                console.error(data);
                dispatch({
                    type: _c.SIGNUP_ERROR,
                    payload: { error, server: true }
                });
            }
        );
    };
};
