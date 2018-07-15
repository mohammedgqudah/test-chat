import express from 'express';
const app = express.Router();
import auth from './auth/auth.router';
import core from './core/core.router';
import message from './messaging/message.router';
import server from './servers/servers.router';

app.use('/auth', auth);
app.use('/core', core);
app.use('/message', message);
app.use('/server', server);
export default app;
