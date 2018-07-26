import { createStore, applyMiddleware, compose } from 'redux';
import reduceReducers from 'reduce-reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authReducer from './reducers/auth.reducer';
import authActions from './actions/auth.actions';
import channelReducer from './reducers/channels.reducer';
import messagesReducer from './reducers/messages.reducer';
import serverReducer from './reducers/server.reducer';
import chatReducer from './reducers/chat.reducer';
import dmReducer from './reducers/dm.reducer';
import prestate from './prestate';

const reducers = reduceReducers(
    authReducer,
    channelReducer,
    messagesReducer,
    serverReducer,
    chatReducer,
    dmReducer
);
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
