const app = require('express').Router();
import passport from 'passport';
import { friendRequest, acceptFriendRequest } from './core.controller';



app.use(passport.authenticate('jwt', {session:false}));
app.post('/friend-request', friendRequest);
app.post('/accept-friend-request', acceptFriendRequest);
export default app;