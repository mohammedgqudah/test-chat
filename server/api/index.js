import express from 'express';
const app = express.Router();
import auth from './auth/auth.router';
import core from './core/core.router';
import message from './messaging/message.router';
import server from './servers/servers.router';
import profile from './profiles/profile.router';

app.use('/auth', auth);
app.use('/core', core);
app.use('/message', message);
app.use('/server', server);
app.use('/profile', profile);
export default app;
