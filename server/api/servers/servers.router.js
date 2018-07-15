const app = require('express').Router();
import passport from 'passport';
import {
    createChatServer,
    createInviteLink,
    invite,
    getChatServers,
    createSection,
    createChannel
} from './servers.controller';

app.use(passport.authenticate('jwt', { session: false }));
app.post('/create', createChatServer);
app.post('/create-invite-link', createInviteLink);
app.post('/invite/:token', invite);
app.get('/find', getChatServers);
app.post('/create-section', createSection);
app.post('/create-channel', createChannel);
export default app;
