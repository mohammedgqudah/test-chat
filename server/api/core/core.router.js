const app = require('express').Router();
import passport from 'passport';
import {
    friendRequest,
    acceptFriendRequest,
    removeFriendRequest
} from './core.controller';

app.use(passport.authenticate('jwt', { session: false }));
// friend requests api
app.post('/friend-request', friendRequest);
app.post('/accept-friend-request', acceptFriendRequest);
app.post('/remove-friend-request', removeFriendRequest);
export default app;
