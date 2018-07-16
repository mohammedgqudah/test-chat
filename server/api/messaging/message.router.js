const app = require('express').Router();
import passport from 'passport';
import { createMessage, findMessages, editMessage, createServerMessage } from './message.controller';

app.use(passport.authenticate('jwt', { session: false }));

app.post('/create', createMessage);
app.post('/create-server-message', createServerMessage);
app.get('/find', findMessages);
app.post('/edit', editMessage);
export default app;
