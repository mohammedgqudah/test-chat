const app = require('express').Router();
import passport from 'passport';
import { createMessage, findMessages, editMessage } from './message.controller';

app.use(passport.authenticate('jwt', { session: false }));

app.post('/create', createMessage);
app.get('/find', findMessages);
app.post('/edit', editMessage);
export default app;
