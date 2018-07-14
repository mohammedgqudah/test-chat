import { createStore, applyMiddleware, compose } from 'redux';
import reduceReducers from 'reduce-reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authReducer from './reducers/auth.reducer';
import authActions from './actions/auth.actions';
import prestate from './prestate';

const reducers = reduceReducers(authReducer);
const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ ||
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
let store = createStore(
    reducers,
    prestate,
    compose(
        applyMiddleware(thunk, logger),
        devTools()
    )
);

// === === === Development only === === ===
window.authActions = authActions;
window.store = store;
// === === === Development only === === ===

export default store;
