const app = require('express').Router();
import passport from 'passport';
import {
    friendRequest,
    acceptFriendRequest,
    removeFriendRequest,
    pendingRequests,
    conversations
} from './core.controller';

app.use(passport.authenticate('jwt', { session: false }));
// friend requests api
app.post('/friend-request', friendRequest);
app.post('/accept-friend-request', acceptFriendRequest);
app.delete('/remove-friend-request', removeFriendRequest);
app.get('/pending-requests', pendingRequests);
app.get('/conversations', conversations);
export default app;
